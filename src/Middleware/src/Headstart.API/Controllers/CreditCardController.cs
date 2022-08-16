using System.Threading.Tasks;
using Headstart.Models.Attributes;
using Microsoft.AspNetCore.Mvc;
using ordercloud.integrations.cardconnect;
using ordercloud.integrations.library;
using ordercloud.integrations.stripe.Models;
using OrderCloud.Catalyst;
using OrderCloud.SDK;

namespace Headstart.Common.Controllers.CardConnect
{
    /// <summary>
    /// ME Credit Card Payments for Headstart
    /// </summary>
    public class MePaymentController : CatalystController
    {
        private readonly ICreditCardCommand _card;
        private readonly AppSettings _settings;
        public MePaymentController(AppSettings settings, ICreditCardCommand card) 
        {
            _card = card;
            _settings = settings;
        }
        /// <summary>
        /// POST Payment
        /// </summary>
        [HttpPost, Route("me/payments"), OrderCloudUserAuth(ApiRole.Shopper)]
        public async Task<Payment> Post([FromBody] StripePaymentDetails payment)
        {                
            return await _card.AuthorizePayment(payment, UserContext.AccessToken);
        }
    }
}
