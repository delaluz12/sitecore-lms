using ordercloud.integrations.library;
using OrderCloud.SDK;
using System.Collections.Generic;

namespace Headstart.Models
{
    
    public class HSUser : User<UserXp>, IHSObject
    {
    }

    
    public class UserXp
    {
    public string Country { get; set; }
    public string OrderEmails { get; set; }
    public string RequestInfoEmails { get; set; }
    public List<string> AddtlRcpts { get; set; }
    public string lms_CompanyName { get; set; }
    public string lms_SfdcAccountId { get; set; }
    public string lms_sfdc_id { get; set; }
    public string lms_okta_user_id { get; set; }
    public string lms_uuid { get; set; }
    public string lms_user_id { get; set; }
    public string lms_subscription_uuid { get; set; }
    }
}
