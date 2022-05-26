using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.docebo.Models
{
    public class DoceboSubscriptionRequest
    {
        public List<int> user_ids { get; set; }
        public bool user_all { get; set; }
        public User_Filters user_filters { get; set; }
    }

    public class User_Filters
    {
        public string search { get; set; }
    }

}
