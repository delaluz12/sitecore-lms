using System;
using System.Collections.Generic;
using System.Text;
using OrderCloud.SDK;
using ordercloud.integrations.docebo.Models;

namespace ordercloud.integrations.docebo.Mappers
{
    public static class DoceboMapper
    {
        public static DoceboEnrollmentRequest MapRequest(List<DoceboItem> lineItems) 
        {
            var dr = new DoceboEnrollmentRequest()
            {
                items = lineItems,
                options = new Options() 
                { 
                    enroll_disabled_users = true,
                    duplicates_as_recertification = true,
                    enable_waitinglist = true,
                    enrollment_date_now = true,
                    trigger_certifications = true,
                    trigger_notifications = true
                },
                trigger_gamification = true
            };
            return dr;
        }
    }
}
