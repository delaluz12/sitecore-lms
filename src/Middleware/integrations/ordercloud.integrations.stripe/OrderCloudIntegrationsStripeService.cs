using System;
using Stripe;
using OrderCloud.SDK;
using ordercloud.integrations.stripe.Models;
using System.Threading.Tasks;
using ordercloud.integrations.stripe.Interfaces;
using OrderCloud.Catalyst;
using System.Collections.Generic;
using System.Linq;
using ordercloud.integrations.stripe.Mappers;

namespace ordercloud.integrations.stripe
{
    public interface IOrderCloudIntegrationsStripeService: ICreditCardProcessor, ICreditCardSaver
    {
        PaymentIntentResponse CreatePaymentIntent(PaymentIntentRequest request);
    }

    public class OrderCloudIntegrationsStripeService : IOrderCloudIntegrationsStripeService
    {
        public OrderCloudIntegrationsStripeConfig _config { get; }
        protected readonly OCIntegrationConfig _defaultConfig = new StripeConfig();

        public OrderCloudIntegrationsStripeService(OrderCloudIntegrationsStripeConfig config)
        {
            _config = config;
        }

        // Create Payment Intent
        public PaymentIntentResponse CreatePaymentIntent(PaymentIntentRequest request)
        {
            var cents = request.Amount * 100;
            // This will be set based on rules
            StripeConfiguration.ApiKey = (string)_config.GetType().GetProperty(request.Key).GetValue(_config, null);

            var paymentIntentService = new PaymentIntentService();
            var paymentIntent = paymentIntentService.Create(new PaymentIntentCreateOptions
            {
                Amount = (long)cents, // Send in pennies
                Currency = request.Currency,
                PaymentMethodTypes = new System.Collections.Generic.List<string>() { "card" },
            });

            PaymentIntentResponse resp = new PaymentIntentResponse()
            {
                clientSecret = paymentIntent.ClientSecret
            };

            return resp;
        }

        #region ICreditCardProcessor

        public async Task<string> GetIFrameCredentialAsync(OCIntegrationConfig overrideConfig = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)overrideConfig);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var token = await Task.FromResult(config.PublishableKey);
            return token;
        }

        public async Task<string> GetStripeCustomerID(PaymentSystemCustomer customer, OCIntegrationConfig configOverride = null)
        {
            string customerID;
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var options = new CustomerSearchOptions
            {
                Query = $"email:'{customer.Email}'",
            };
            var existingCustomers = await StripeClient.SearchCustomerAsync(options, config);
            if (existingCustomers.Data.Count > 0)
            {
                customerID = existingCustomers.Data[0].Id;
            }
            else
            {
                var stripeCustomerOptions = StripeCustomerCreateMapper.MapCustomerOptions(customer);
                var stripeCustomer = await StripeClient.CreateCustomerAsync(stripeCustomerOptions, config);
                customerID = stripeCustomer.Id;
            }
            return customerID;
        }

        public async Task<string> CreateSetupIntent(string customerID, OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);

            var options = new SetupIntentCreateOptions
            {
                Customer = customerID,
                PaymentMethodTypes = new List<string> { "card" }
            };
            string clientSecret;
            var setupIntent = await StripeClient.CreateSetupIntent(options, config);
            clientSecret = setupIntent.ClientSecret;

            return clientSecret;
        }

        public async Task<Payment> GeneratePayment(string pamentmethodid, OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var paymentMethod = await StripeClient.GetPaymentMethod(pamentmethodid, config);
            var ocPayment = new Payment()
            {
                DateCreated = DateTime.Now,
                Accepted = false,
                Type = PaymentType.CreditCard,
                xp = new
                {
                    partialAccountNumber = paymentMethod.Card.Last4,
                    stripePaymentMethodID = paymentMethod.Id
                }
            };
            return ocPayment;
        }

        public async Task<CCTransactionResult> AuthorizePaymentIntentAsync(AuthorizeCCTransaction transaction,
            OCIntegrationConfig configOverride = null)
        {
            {
                var updatedConfig = addSecretKey((StripeConfig)configOverride);
                var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
                var paymentIntentMapper = new StripePaymentIntentMapper();
                var paymentIntentCreateOptions = paymentIntentMapper.MapPaymentIntentOptions(transaction);
                var createdPaymentIntent = await StripeClient.CreateAndConfirmPaymentIntentAsync(paymentIntentCreateOptions, config);
                return paymentIntentMapper.MapPaymentIntentCreateAndConfirmResponse(createdPaymentIntent);
            }
        }

        public async Task<CCTransactionResult> CapturePriorAuthorizationAsync(FollowUpCCTransaction transaction,
            OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var paymentIntentMapper = new StripePaymentIntentMapper();
            var paymentIntentCaptureOptions = paymentIntentMapper.MapPaymentIntentCaptureOptions(transaction);
            var capturedPaymentIntent = await StripeClient.CapturePaymentIntentAsync(transaction.TransactionID, paymentIntentCaptureOptions, config);
            return paymentIntentMapper.MapPaymentIntentCaptureResponse(capturedPaymentIntent);
        }

        public async Task<CCTransactionResult> VoidAuthorizationAsync(FollowUpCCTransaction transaction,
            OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var paymentIntentMapper = new StripePaymentIntentMapper();
            var cancelPaymentIntentOptions = paymentIntentMapper.MapPaymentIntentCancelOptions(transaction);
            var canceledPaymentIntent = await StripeClient.CancelPaymentIntentAsync(transaction.TransactionID, cancelPaymentIntentOptions, config);
            return paymentIntentMapper.MapPaymentIntentCancelResponse(canceledPaymentIntent);
        }

        public async Task<CCTransactionResult> RefundCaptureAsync(FollowUpCCTransaction transaction,
            OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var refundMapper = new StripeRefundMapper();
            var refundCreateOptions = refundMapper.MapRefundCreateOptions(transaction);
            var refund = await StripeClient.CreateRefundAsync(refundCreateOptions, config);
            return refundMapper.MapRefundCreateResponse(refund);
        }
        #endregion

        #region ICreditCardSaver

        public async Task<CardCreatedResponse> CreateSavedCardAsync(PaymentSystemCustomer customer,
            PCISafeCardDetails card, OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var paymentMethodMapper = new StripePaymentMethodMapper();

            if (!customer.CustomerAlreadyExists)
            {
                var stripeCustomerOptions = StripeCustomerCreateMapper.MapCustomerOptions(customer);
                var stripeCustomer = await StripeClient.CreateCustomerAsync(stripeCustomerOptions, config);
                customer.ID = stripeCustomer.Id;
            }

            var paymentMethodCreateOptions = paymentMethodMapper.MapPaymentMethodCreateOptions(customer.ID, card);
            var paymentMethod = await StripeClient.CreatePaymentMethodAsync(paymentMethodCreateOptions, config);
            var paymentMethodAttachOptions = paymentMethodMapper.MapPaymentMethodAttachOptions(customer.ID);
            paymentMethod = await StripeClient.AttachPaymentMethodToCustomerAsync(paymentMethod.Id, paymentMethodAttachOptions, config);
            return paymentMethodMapper.MapPaymentMethodCreateResponse(customer.ID, paymentMethod);
        }

        public async Task<List<PCISafeCardDetails>> ListSavedCardsAsync(string customerID,
            OCIntegrationConfig configOverride = null)
        {
            {
                var updatedConfig = addSecretKey((StripeConfig)configOverride);
                var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
                var paymentMethodMapper = new StripePaymentMethodMapper();
                var listPaymentMethodsOptions = paymentMethodMapper.MapPaymentMethodListOptions(customerID);
                var paymentMethodList = await StripeClient.ListPaymentMethodsAsync(listPaymentMethodsOptions, config);
                return paymentMethodMapper.MapStripePaymentMethodListResponse(paymentMethodList);
            }
        }

        public async Task<PCISafeCardDetails> GetSavedCardAsync(string customerID, string paymentMethodID,
            OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            var cardMapper = new StripeCardMapper();
            var paymentMethod = await StripeClient.RetrievePaymentMethodAsync(paymentMethodID, config);
            return cardMapper.MapStripeCardGetResponse(paymentMethod);
        }

        public async Task DeleteSavedCardAsync(string customerID, string paymentMethodID, OCIntegrationConfig configOverride = null)
        {
            var updatedConfig = addSecretKey((StripeConfig)configOverride);
            var config = ValidateStipeConfig<StripeConfig>(updatedConfig ?? _defaultConfig);
            await StripeClient.DetachPaymentMethodToCustomerAsync(paymentMethodID, config);
        }
        #endregion

        protected void ValidateConfigData(OCIntegrationConfig config)
        {
            if (config == null) return;
            var type = config.GetType();
            var missing = type
                .GetProperties()
                .Where(prop =>
                {
                    var value = prop.GetValue(config);
                    var isRequired = Attribute.IsDefined(prop, typeof(RequiredIntegrationFieldAttribute));
                    return isRequired && value == null;
                });

            if (missing.Any())
            {
                var names = missing.Select(p => p.Name).ToList();
                throw new IntegrationMissingConfigsException(config, names);
            }
        }

        protected void ValidateConfigType<T>(OCIntegrationConfig config) where T : OCIntegrationConfig
        {
            if (config == null) return;
            var type = config.GetType();
            if (type != typeof(T))
            {
                throw new ArgumentException($"Integration configuration must be of type {typeof(T).Name} to match this service. Found {type.Name} instead.", "configOverride");
            }
        }

        protected T ValidateStipeConfig<T>(OCIntegrationConfig config) where T : OCIntegrationConfig
        {
            ValidateConfigType<T>(config);
            ValidateConfigData(config);
            return config as T;
        }

        protected StripeConfig addSecretKey(StripeConfig config)
        {
            config.SecretKey = (string)_config.GetType().GetProperty(config.KeyName).GetValue(_config, null);
            return config;
        }
    }
}
