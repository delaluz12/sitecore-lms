using System;
using Stripe;
using OrderCloud.SDK;
using ordercloud.integrations.stripe.Models;
using System.Threading.Tasks;

namespace ordercloud.integrations.stripe
{
    public interface IOrderCloudIntegrationsStripeService
    {
        PaymentIntentResponse CreatePaymentIntent(PaymentIntentRequest request);
    }

    public class OrderCloudIntegrationsStripeService : IOrderCloudIntegrationsStripeService
    {
        public OrderCloudIntegrationsStripeConfig _config { get; }

        public OrderCloudIntegrationsStripeService(OrderCloudIntegrationsStripeConfig config)
        {
            _config = config;
        }

        // Create Payment Intent
        public PaymentIntentResponse CreatePaymentIntent(PaymentIntentRequest request)
        {
            // This will be set based on rules
            StripeConfiguration.ApiKey = (string)_config.GetType().GetProperty(request.Key).GetValue(_config, null);

            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
            {
                Amount = (long?)request.Amount * 100, // Send in pennies
                Currency = request.Currency,
                PaymentMethodTypes = new System.Collections.Generic.List<string>() { "card" },
            });

            PaymentIntentResponse resp = new PaymentIntentResponse()
            {
                clientSecret = paymentIntent.ClientSecret
            };

            return resp;
        }
    }
}
