using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Headstart.Common;
using Headstart.Common.Services;
using Headstart.Common.Services.ShippingIntegration.Models;
using Headstart.Models;
using Headstart.Models.Headstart;
using ordercloud.integrations.exchangerates;
using ordercloud.integrations.library;
using ordercloud.integrations.stripe;
using ordercloud.integrations.stripe.Interfaces;
using ordercloud.integrations.stripe.Models;
using OrderCloud.Catalyst;
using OrderCloud.SDK;
using Stripe;

namespace ordercloud.integrations.cardconnect
{
	public interface ICreditCardCommand
	{
		Task<Payment> AuthorizePayment(StripePaymentDetails payment, string userToken);
		Task VoidTransactionAsync(HSPayment payment, HSOrder order, string userToken, StripePaymentDetails originalPayment = null, string transactionID = null);
		Task VoidPaymentAsync(string orderID, string userToken, StripePaymentDetails originalPayment, string transactionID = null);
	}

	public class CreditCardCommand : ICreditCardCommand
	{
		private readonly IOrderCloudIntegrationsStripeService _stripe;
		private readonly IOrderCloudClient _oc;
		private readonly IHSExchangeRatesService _hsExchangeRates;
		private readonly ISupportAlertService _supportAlerts;
		private readonly AppSettings _settings;

		public CreditCardCommand(
			IOrderCloudIntegrationsStripeService stripe,
			IOrderCloudClient oc,
			IHSExchangeRatesService hsExchangeRates,
			ISupportAlertService supportAlerts,
			AppSettings settings
		)
		{
			_stripe = stripe;
			_oc = oc;
			_hsExchangeRates = hsExchangeRates;
			_supportAlerts = supportAlerts;
			_settings = settings;
		}

		public async Task<Payment> AuthorizePayment(
			StripePaymentDetails payment,
            string userToken
		)
		{
			Require.That(payment.PaymentMethodID != null, new ErrorCode("CreditCard.CreditCardAuth", "Request must include either CreditCardDetails or CreditCardID"));

			var orderWorksheet = await _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, payment.OrderID);
			var order = orderWorksheet.Order;

			Require.That(!order.IsSubmitted, new ErrorCode("CreditCardAuth.AlreadySubmitted", "Order has already been submitted"));

			var ccAmount = orderWorksheet.Order.Total;

			var ocPaymentsList = (await _oc.Payments.ListAsync<HSPayment>(OrderDirection.Incoming, payment.OrderID, filters: "Type=CreditCard" ));
			var ocPayments = ocPaymentsList.Items;
			var ocPayment = ocPayments.Any() ? ocPayments[0] : null;
			if(ocPayment == null)
            {
				throw new CatalystBaseException("Payment.MissingCreditCardPayment", "Order is missing credit card payment");
            }
            try
            {
				if(ocPayment?.Accepted == true)
                {
					if(ocPayment.Amount == ccAmount)
                    {
						return ocPayment;
                    } else
                    {
						await VoidTransactionAsync(ocPayment, order, userToken, payment);
                    }
                }
				var config = new StripeConfig()
				{
					SecretKey = "UpdateMe",
					KeyName = payment.KeyName
				};

				var transaction = new AuthorizeCCTransaction() 
				{
					OrderID = order.ID,
					Amount = order.Total,
					Currency = "USD",
					StripePaymentMethodID = payment.PaymentMethodID,
					StripeCustomerID = payment.CustomerID,
					OrderWorksheet = orderWorksheet,

				};
				var authCall = await _stripe.AuthorizePaymentIntentAsync(transaction, config);
				var transactionFollowUp = new FollowUpCCTransaction() 
				{
					TransactionID = authCall.TransactionID,
					Amount = authCall.Amount
				};
				var captureCall = await _stripe.CapturePriorAuthorizationAsync(transactionFollowUp, config);
				// Make sure to update the order xp for the stripe payment id
				await _oc.Orders.PatchAsync(OrderDirection.Incoming, orderWorksheet.Order.ID, new PartialOrder
				{
					xp = new {
						StripePaymentID = captureCall.TransactionID
					}
				});

				ocPayment = await _oc.Payments.PatchAsync<HSPayment>(OrderDirection.Incoming, order.ID, ocPayment.ID, new PartialPayment { Accepted = true, Amount = ccAmount, xp =  new {
					stripePaymentID = captureCall.TransactionID
				}
				});
				var paymentTransaction = new PaymentTransaction()
				{
					Amount = captureCall.Amount,
					DateExecuted = DateTime.Now,
					ResultCode = captureCall.AuthorizationCode,
					ResultMessage = captureCall.Message,
					Succeeded = captureCall.Succeeded,
					Type = "CreditCard",
					xp = new
					{
						CardConnectResponse = captureCall,
						CCBillingAddress = orderWorksheet.Order.BillingAddress

					}
				};

				return await _oc.Payments.CreateTransactionAsync(OrderDirection.Incoming, order.ID, ocPayment.ID, paymentTransaction);
			}
            catch (CreditCardAuthorizationException ex)
            {
                ocPayment = await _oc.Payments.PatchAsync<HSPayment>(OrderDirection.Incoming, order.ID, ocPayment.ID, new PartialPayment { Accepted = false, Amount = ccAmount });
				await _oc.Payments.CreateTransactionAsync(OrderDirection.Incoming, order.ID, ocPayment.ID, CardConnectMapper.Map(ocPayment, ex.Response));
				throw new CatalystBaseException($"CreditCardAuth.{ex.ApiError.ErrorCode}", ex.ApiError.Message, ex.Response);
			}
		}

		public async Task VoidPaymentAsync(string orderID, string userToken, StripePaymentDetails originalPayment, string transactionID = null)
        {
			var order = await _oc.Orders.GetAsync<HSOrder>(OrderDirection.Incoming, orderID);
			var paymentList = await _oc.Payments.ListAsync<HSPayment>(OrderDirection.Incoming, order.ID);
			var payment = paymentList.Items.Any() ? paymentList.Items[0] : null;
			if(payment == null) { return; }

			await VoidTransactionAsync(payment, order, userToken, originalPayment, transactionID);
			await _oc.Payments.PatchAsync(OrderDirection.Incoming, orderID, payment.ID, new PartialPayment { Accepted = false });
        }

		public async Task VoidTransactionAsync(HSPayment payment, HSOrder order, string userToken, StripePaymentDetails originalPayment = null, string transactionID = null)
        {
			try
			{
				if (payment.Accepted == true)
				{
					var transaction = payment.Transactions
										.Where(x => x.Type == "CreditCard")
										.OrderBy(x => x.DateExecuted)
										.LastOrDefault(t => t.Succeeded);
					var retref = transaction?.xp?.CardConnectResponse?.retref;
					if (transaction != null && originalPayment != null)
					{
						var userCurrency = await _hsExchangeRates.GetCurrencyForUser(userToken);
						var config = new StripeConfig()
						{
							SecretKey = "UpdateMe",
							KeyName = originalPayment.KeyName
						};
						var response = await _stripe.RefundCaptureAsync(new FollowUpCCTransaction()
						{
							Amount = (decimal)payment.Amount,
							TransactionID = transactionID,
						}, 
						config);

						// Make sure to update the order xp for the stripe payment id to null

						await _oc.Payments.CreateTransactionAsync(OrderDirection.Incoming, order.ID, payment.ID, new PaymentTransaction() {
							Amount = payment.Amount,
							DateExecuted = DateTime.Now,
							ResultCode = response.ResponseCode,
							ResultMessage = response.Message,
							Succeeded = response.Succeeded,
							Type = "CreditCardVoidAuthorization",
						});
					}
				}
			}
			catch (StripeException ex)
			{

				//await _supportAlerts.VoidAuthorizationFailed(payment, transactionID, order, ex);
				await _oc.Payments.CreateTransactionAsync(OrderDirection.Incoming, order.ID, payment.ID, new PaymentTransaction()
				{
					Amount = payment.Amount,
					DateExecuted = DateTime.Now,
					ResultCode = ex.StripeResponse.StatusCode.ToString(),
					ResultMessage = ex.StripeError.Message,
					Succeeded = true,
					Type = "CreditCardVoidAuthorization",
				});
				throw new CatalystBaseException("Payment.FailedToVoidAuthorization", ex.StripeError.Message);
			}
		}

		private string GetMerchantID(CurrencySymbol userCurrency)
		{
			if (userCurrency == CurrencySymbol.USD)
				return _settings.CardConnectSettings.UsdMerchantID;
			else if (userCurrency == CurrencySymbol.CAD)
				return _settings.CardConnectSettings.CadMerchantID;
			else
				return _settings.CardConnectSettings.EurMerchantID;
		}
	}
}
