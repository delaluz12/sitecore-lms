using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.stripe.Models
{
    public class PaymentIntentRequest
    {
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string Key { get; set; }
    }
}
