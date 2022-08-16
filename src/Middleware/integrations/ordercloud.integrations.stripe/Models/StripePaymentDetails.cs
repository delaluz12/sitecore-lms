using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.stripe.Models
{
    public class StripePaymentDetails
    {
        public string OrderID { get; set; }
        public string KeyName { get; set; }
        public string CustomerID { get; set; }
        public string PaymentMethodID { get; set; }
    }
}
