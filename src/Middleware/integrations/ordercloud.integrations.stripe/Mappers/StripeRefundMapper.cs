using System;
using Stripe;
using ordercloud.integrations.stripe.Interfaces;

namespace ordercloud.integrations.stripe.Mappers
{
    /// <summary>
    /// https://stripe.com/docs/api/refunds
    /// </summary>
    public class StripeRefundMapper
    {
        public RefundCreateOptions MapRefundCreateOptions(FollowUpCCTransaction transaction) =>
            new RefundCreateOptions()
            {
                Amount = Convert.ToInt64(transaction.Amount),
                PaymentIntent = transaction.TransactionID
            };

        public CCTransactionResult MapRefundCreateResponse(Refund refund) =>
            new CCTransactionResult()
            {
                Message = refund.Status,
                Succeeded = refund.Status.ToLower() == "succeeded",
                TransactionID = refund.Id,
                Amount = refund.Amount
            };
    }
}
