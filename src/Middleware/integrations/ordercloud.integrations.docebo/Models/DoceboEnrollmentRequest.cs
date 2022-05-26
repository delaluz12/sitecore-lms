using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.docebo.Models
{
    public class DoceboEnrollmentRequest
    {
        public List<DoceboItem> items { get; set; }
        public Options options { get; set; }
        public bool trigger_gamification { get; set; }
    }

    public class Options
    {
        public bool enroll_disabled_users { get; set; }
        public bool duplicates_as_recertification { get; set; }
        public bool enable_waitinglist { get; set; }
        public bool enrollment_date_now { get; set; }
        public bool trigger_notifications { get; set; }
        public bool trigger_certifications { get; set; }
    }

    public class DoceboItem
    {
        public int course_id { get; set; }
        public string user_id { get; set; }
        public string level { get; set; }
        public string status { get; set; }
        public string field_2 { get; set; } // ExternalOrderId
    }

}
