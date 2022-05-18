using System.Threading.Tasks;
using Headstart.Models.Attributes;
using Microsoft.AspNetCore.Mvc;
using ordercloud.integrations.stripe;
using ordercloud.integrations.library;
using OrderCloud.Catalyst;
using OrderCloud.SDK;
using ordercloud.integrations.stripe.Models;

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
    }
}