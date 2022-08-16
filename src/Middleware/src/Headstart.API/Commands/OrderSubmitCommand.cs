using Headstart.Models;
using ordercloud.integrations.cardconnect;
using ordercloud.integrations.library;
using OrderCloud.SDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using Headstart.Common.Services.ShippingIntegration.Models;
using Headstart.Models.Headstart;
using Headstart.Common;
using OrderCloud.Catalyst;
using ordercloud.integrations.docebo.Models;
using ordercloud.integrations.docebo;
using ordercloud.integrations.stripe.Models;
using ordercloud.integrations.stripe;

namespace Headstart.API.Commands
{
    public interface IOrderSubmitCommand
    {
        Task<HSOrder> SubmitOrderAsync(string orderID, OrderDirection direction, string userToken, StripePaymentDetails payment = null);
    }
    public class OrderSubmitCommand : IOrderSubmitCommand
    {
        private readonly IOrderCloudClient _oc;
        private readonly AppSettings _settings;
        private readonly ICreditCardCommand _card;
        private readonly IOrderCloudIntegrationsDoceboService _docebo;

        public OrderSubmitCommand(IOrderCloudClient oc, AppSettings settings, ICreditCardCommand card, IOrderCloudIntegrationsDoceboService docebo)
        {
            _oc = oc;
            _settings = settings;
            _card = card;
            _docebo = docebo;
        }

        public async Task<HSOrder> SubmitOrderAsync(string orderID, OrderDirection direction, string userToken, StripePaymentDetails stripePaymentDetails = null)
        {
            var worksheet = await _oc.IntegrationEvents.GetWorksheetAsync<HSOrderWorksheet>(OrderDirection.Incoming, orderID);
            await ValidateOrderAsync(worksheet, stripePaymentDetails, userToken);
            var incrementedOrderID = await IncrementOrderAsync(worksheet);
            string stripeTransactionID = "";

            // Charge the credit card
            if (!String.IsNullOrEmpty(stripePaymentDetails.OrderID))
            {
                stripePaymentDetails.OrderID = incrementedOrderID;
                Payment authorizedPayment = await _card.AuthorizePayment(stripePaymentDetails, userToken);
                stripeTransactionID = authorizedPayment?.xp?.stripePaymentID;
                await _oc.IntegrationEvents.CalculateAsync(OrderDirection.Outgoing, incrementedOrderID, userToken);
            }

            List<DoceboItem> doceboItems = new List<DoceboItem>();

            for (int i = 0; i < worksheet.LineItems.Count; i++)
            {
                var courseID = worksheet.LineItems[i].Product?.xp?.lms_course_id;
                var subscriptionID = worksheet.LineItems[i].Product?.xp?.lms_SubscriptionUuid;
                if (!String.IsNullOrEmpty(courseID))
                {
                    var lineItem = new DoceboItem()
                    {
                        course_id = Int32.Parse(courseID),
                        user_id = worksheet?.Order.FromUser?.xp?.lms_user_id,
                        status = stripePaymentDetails != null ? "subscribed" : "waiting",
                        field_2 = incrementedOrderID

                    };
                    doceboItems.Add(lineItem);
                }
                if (!String.IsNullOrEmpty(subscriptionID))
                {
                    var doceboSubscription = new DoceboSubscriptionRequest()
                    {
                        user_ids = new List<int>()
                        {
                            Int32.Parse(worksheet?.Order.FromUser?.xp?.lms_user_id)
                        }
                    };
                    try
                    {
                        await _docebo.SubscribeUsers(doceboSubscription, subscriptionID);
                    }
                    catch (Exception) {
                        await _card.VoidPaymentAsync(incrementedOrderID, userToken, stripePaymentDetails, stripeTransactionID); 
                        throw; 
                    }
                }
            }

            try
            {
                if (doceboItems.Count > 0)
                {
                    await _docebo.EnrollUsers(doceboItems);
                }
            }
            catch (Exception) 
            {
                await _card.VoidPaymentAsync(incrementedOrderID, userToken, stripePaymentDetails, stripeTransactionID); 
                throw; 
            }
            try
            {
                return await _oc.Orders.SubmitAsync<HSOrder>(direction, incrementedOrderID, userToken);
            }
            catch (Exception)
            {
                await _card.VoidPaymentAsync(incrementedOrderID, userToken, stripePaymentDetails, stripeTransactionID);
                throw;
            }
        }

        private async Task ValidateOrderAsync(HSOrderWorksheet worksheet, StripePaymentDetails payment, string userToken)
        {
            Require.That(
                !worksheet.Order.IsSubmitted, 
                new ErrorCode("OrderSubmit.AlreadySubmitted", "Order has already been submitted")
            );

            var lineItemsInactive = await GetInactiveLineItems(worksheet, userToken);
            Require.That(
                !lineItemsInactive.Any(),
                new ErrorCode("OrderSubmit.InvalidProducts", "Order contains line items for products that are inactive"), lineItemsInactive
            );

            try
            {
                // ordercloud validates the same stuff that would be checked on order submit
                await _oc.Orders.ValidateAsync(OrderDirection.Incoming, worksheet.Order.ID);
            } catch(OrderCloudException ex) {
                // credit card payments aren't accepted yet, so ignore this error for now
                // we'll accept the payment once the credit card auth goes through (before order submit)
                var errors = ex.Errors.Where(ex => ex.ErrorCode != "Order.CannotSubmitWithUnaccceptedPayments");
                if(errors.Any())
                {
                    throw new CatalystBaseException("OrderSubmit.OrderCloudValidationError", "Failed ordercloud validation, see Data for details", errors);
                }
            }
            
        }

        private async Task<List<HSLineItem>> GetInactiveLineItems(HSOrderWorksheet worksheet, string userToken)
        {
            List<HSLineItem> inactiveLineItems = new List<HSLineItem>();
            foreach (HSLineItem lineItem in worksheet.LineItems)
            {
                try
                {
                    await _oc.Me.GetProductAsync(lineItem.ProductID, sellerID: _settings.OrderCloudSettings.MarketplaceID, accessToken: userToken);
                }
                catch (OrderCloudException ex) when (ex.HttpStatus == HttpStatusCode.NotFound)
                {
                    inactiveLineItems.Add(lineItem);
                }
            }
            return inactiveLineItems;
        }

        private async Task<string> IncrementOrderAsync(HSOrderWorksheet worksheet)
        {
            if (worksheet.Order.xp.IsResubmitting == true)
            {
                // orders marked with IsResubmitting true are orders that were on hold and then declined 
                // so buyer needs to resubmit but we don't want to increment order again
                return worksheet.Order.ID;
            }
            if(worksheet.Order.ID.StartsWith(_settings.OrderCloudSettings.IncrementorPrefix))
            {
                // order has already been incremented, no need to increment again
                return worksheet.Order.ID;
            }
            var order = await _oc.Orders.PatchAsync(OrderDirection.Incoming, worksheet.Order.ID, new PartialOrder
            {
                ID = _settings.OrderCloudSettings.IncrementorPrefix + "{orderIncrementor}"
            });
            return order.ID;
        }
    }
}
