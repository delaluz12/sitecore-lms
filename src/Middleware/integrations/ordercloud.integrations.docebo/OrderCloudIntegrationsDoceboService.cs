using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Flurl.Http;
using Flurl.Http.Configuration;
using Newtonsoft.Json;
using ordercloud.integrations.docebo.Models;
using ordercloud.integrations.docebo.Mappers;
using OrderCloud.SDK;

namespace ordercloud.integrations.docebo
{
    public interface IOrderCloudIntegrationsDoceboService
    {
        Task<DoceboToken> GetToken();
        Task<DoceboEnrollmentResponse> EnrollUsers(List<DoceboItem> lineItems);
    }

    public class OrderCloudIntegrationsDoceboConfig
    {
        public string BaseUrl { get; set; }
        public string ClientID { get; set; }
        public string ClientSecret { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class OrderCloudIntegrationsDoceboService : IOrderCloudIntegrationsDoceboService
    {
        private readonly IFlurlClient _flurl;
        public OrderCloudIntegrationsDoceboConfig _config { get; }

        public OrderCloudIntegrationsDoceboService(OrderCloudIntegrationsDoceboConfig config, IFlurlClientFactory flurlFactory)
        {
            _config = config;
            _flurl = flurlFactory.Get($"{_config?.BaseUrl}/");
        }
        private IFlurlRequest Token(string resource)
        {
            return _flurl.Request($"{resource}");
        }
        private IFlurlRequest Request(string resource, DoceboToken token)
        {
            return _flurl.Request($"{resource}").WithOAuthBearerToken(token.access_token);
        }
        public async Task<DoceboToken> GetToken()
        {
            return await this.Token("oauth2/token")
                .PostMultipartAsync(mp => mp.AddStringParts($"client_id={_config.ClientID}&client_secret={_config.ClientSecret}&grant_type=password&scope=api&username={_config.Username}&password={_config.Password}"))
                .ReceiveJson<DoceboToken>();
        }
        public async Task<DoceboEnrollmentResponse> EnrollUsers(List<DoceboItem> lineItems)
        {
            DoceboToken token = await GetToken();
            DoceboEnrollmentRequest request = DoceboMapper.MapRequest(lineItems);
            return await this.Request("learn/v1/enrollment/batch", token).PostJsonAsync(request).ReceiveJson<DoceboEnrollmentResponse>();
        }
    }
}
