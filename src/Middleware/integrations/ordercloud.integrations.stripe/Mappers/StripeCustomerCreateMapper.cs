using ordercloud.integrations.stripe.Interfaces;
using OrderCloud.SDK;
using Stripe;

namespace ordercloud.integrations.stripe.Mappers
{
    /// <summary>
    /// https://stripe.com/docs/api/customers
    /// </summary>
    public class StripeCustomerCreateMapper
    {
        public static CustomerCreateOptions MapCustomerOptions(PaymentSystemCustomer customer)
        {
            return new CustomerCreateOptions()
            {
                Name = $"{customer.FirstName} {customer.LastName}",
                Email = customer.Email
            };
        }
    }
}
