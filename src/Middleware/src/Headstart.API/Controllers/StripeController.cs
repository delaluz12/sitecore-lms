using System.Threading.Tasks;
using Headstart.Models.Attributes;
using Microsoft.AspNetCore.Mvc;
using ordercloud.integrations.stripe;
using ordercloud.integrations.library;
using OrderCloud.Catalyst;
using OrderCloud.SDK;
using ordercloud.integrations.stripe.Models;
using Headstart.Models;
using ordercloud.integrations.stripe.Interfaces;

namespace Headstart.API.Controllers
{
    /// <summary>
    /// Stripe Credit Card Payments for Headstart
    /// </summary>
    public class StripeController : CatalystController
    {
        private readonly IOrderCloudIntegrationsStripeService _stripe;
        public StripeController(IOrderCloudIntegrationsStripeService stripe)
        {
            _stripe = stripe;
        }

        /// <summary>
        /// POST PaymentIntentResponse
        /// </summary>
        [HttpPost, Route("stripe/create-payment-intent"), OrderCloudUserAuth(ApiRole.Shopper)]
        public PaymentIntentResponse Post([FromBody] PaymentIntentRequest request)
        {
            return _stripe.CreatePaymentIntent(request);
        }
        /// <summary>
        /// POST Get Stripe Customer ID
        /// </summary>
        [HttpPost, Route("stripe/{keyName}/customerid"), OrderCloudUserAuth(ApiRole.Shopper)]
        public Task<string> Post(string keyName, [FromBody] MeUser user)
        {
            var config = new StripeConfig() 
            {
                SecretKey = "UpdateMe",
                KeyName = keyName
            };
            var customer = new PaymentSystemCustomer() 
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email
            };
            return _stripe.GetStripeCustomerID(customer, config);
        }
        /// <summary>
        /// GET client secret from new SetupIntent
        /// </summary>
        [HttpGet, Route("stripe/{keyName}/{customerID}/setupintent"), OrderCloudUserAuth(ApiRole.Shopper)]
        public async Task<string> GetSetupIntentSecret(string keyName, string customerID)
        {
            var config = new StripeConfig()
            {
                SecretKey = "UpdateMe",
                KeyName = keyName
            };
            return await _stripe.CreateSetupIntent(customerID, config);
        }
        /// <summary>
        /// GET client secret from new SetupIntent
        /// </summary>
        [HttpGet, Route("stripe/{keyName}/{paymentmethodid}/payment"), OrderCloudUserAuth(ApiRole.Shopper)]
        public async Task<Payment> GetPayment(string keyName, string paymentmethodid)
        {
            var config = new StripeConfig()
            {
                SecretKey = "UpdateMe",
                KeyName = keyName
            };
            return await _stripe.GeneratePayment(paymentmethodid, config);
        }
    }
}