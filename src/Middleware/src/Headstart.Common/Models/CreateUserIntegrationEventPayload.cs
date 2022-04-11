using OrderCloud.SDK;
using System;
using System.Collections.Generic;
using System.Text;

namespace Headstart.Common.Models
{
    public class CreateUserIntegrationEventPayload
    {
        public dynamic ConfigDatea { get; set; }
        public User ExistingUser { get; set; }
        public OpenIdConnect OpenIDConnect { get; set; }
        public IdpTokenResponse TokenResponse { get; set; }
        public string OrderCloudAccessToken { get; set; }
    }

    public class CreateUserIntegrationEventResponse
    {
        public string ErrorMessage { get; set; }
        public string Username { get; set; }
    }

    public class IdpTokenResponse
    {
        // these are not ordercloud tokens, they're tokens from the identity provider
        public string access_token { get; set; }
        public string id_token { get; set; }
    }
}
