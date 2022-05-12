using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.stripe.Models
{
    public class PaymentIntentResponse
    {
        public string clientSecret { get; set; }
    }
}
