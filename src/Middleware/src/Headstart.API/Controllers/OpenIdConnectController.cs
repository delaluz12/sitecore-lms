using Microsoft.AspNetCore.Mvc;
using OrderCloud.SDK;
using System.Threading.Tasks;
using OrderCloud.Catalyst;
using Headstart.Common.Models;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System;

namespace Headstart.API.Controllers
{
    public class OpenIdConnectController: CatalystController
    {
        private readonly IOrderCloudClient _oc;
        public OpenIdConnectController(IOrderCloudClient oc)
        {
            _oc = oc;
        }

        // this endpoint gets called by the OrderCloud API when a user first tries to login via openid connect
        // it is responsible for associating a user from the external idp to a user in ordercloud
        [HttpPost, Route("createuser")]
        public async Task<CreateUserIntegrationEventResponse> CreateUser([FromBody] CreateUserIntegrationEventPayload integrationEvent)
        {
            var clientID = integrationEvent.OpenIDConnect.OrderCloudApiClientID;
            var apiClientAssignments = await _oc.ApiClients.ListAssignmentsAsync(clientID, accessToken: integrationEvent.OrderCloudAccessToken);
            var buyerID = apiClientAssignments.Items.FirstOrDefault()?.BuyerID;
            if (buyerID == null)
            {
                // We're relying on the fact that DFS has a buyer assigned to the api client
                return new CreateUserIntegrationEventResponse
                {
                    ErrorMessage = "Failed to determine buyerID for incoming user - API Client not assigned a buyer",
                    Username = null
                };
            }

            var jwt = new JwtSecurityToken(integrationEvent.TokenResponse.id_token);
            var user = await _oc.Users.CreateAsync(buyerID, new User
            {
                Username = Guid.NewGuid().ToString(),
                Email = jwt.Claims.FirstOrDefault(c => c.Type == "email")?.Value,
                FirstName = jwt.Claims.FirstOrDefault(c => c.Type == "name")?.Value.Split(' ')[0],
                LastName = jwt.Claims.FirstOrDefault(c => c.Type == "name")?.Value.Split(' ')[1],
                Active = true
            }, integrationEvent.OrderCloudAccessToken);

            return new CreateUserIntegrationEventResponse
            {
                ErrorMessage = null,
                Username = user.Username
            };
        }

        // this endpoint gets called by the OrderCloud API whenever a user needs to get a new ordercloud token via openidconnect AFTER the first attempt
        // it is responsible for updating user details in ordercloud when they have changed in idp
        [HttpPost, Route("syncuser")]
        public async Task<CreateUserIntegrationEventResponse> SyncUser([FromBody] CreateUserIntegrationEventPayload integrationEvent)
        {
            var existingUser = integrationEvent.ExistingUser;
            var jwt = new JwtSecurityToken(integrationEvent.TokenResponse.id_token);
            var email = jwt.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
            var firstName = jwt.Claims.FirstOrDefault(c => c.Type == "given_name")?.Value.Split(' ')[0];
            var lastName = jwt.Claims.FirstOrDefault(c => c.Type == "family_name")?.Value.Split(' ')[1];

            // cant sync username due to bug in platform: https://four51.atlassian.net/browse/EX-2155
            var shouldSyncUser = firstName != existingUser.FirstName || lastName != existingUser.LastName || email != existingUser.Email;
            if (!shouldSyncUser)
            {
                return new CreateUserIntegrationEventResponse
                {
                    ErrorMessage = null,
                    Username = existingUser.Username
                };
            }

            var clientID = integrationEvent.OpenIDConnect.OrderCloudApiClientID;
            var apiClientAssignments = await _oc.ApiClients.ListAssignmentsAsync(clientID, accessToken: integrationEvent.OrderCloudAccessToken);
            var buyerID = apiClientAssignments.Items.FirstOrDefault()?.BuyerID;
            if (buyerID == null)
            {
                // We're relying on the fact that a buyer is assigned to the api client
                return new CreateUserIntegrationEventResponse
                {
                    ErrorMessage = "Failed to determine buyerID for incoming user - API Client not assigned a buyer",
                    Username = null
                };
            }

            var user = await _oc.Users.PatchAsync(buyerID, existingUser.ID, new PartialUser
            {
                Email = email,
                FirstName = firstName,
                LastName = lastName
            }, integrationEvent.OrderCloudAccessToken);

            return new CreateUserIntegrationEventResponse
            {
                ErrorMessage = null,
                Username = user.Username
            };
        }
    }
}
