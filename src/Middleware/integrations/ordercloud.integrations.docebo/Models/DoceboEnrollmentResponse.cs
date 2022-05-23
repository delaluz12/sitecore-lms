using System;
using System.Collections.Generic;
using System.Text;

namespace ordercloud.integrations.docebo.Models
{
    public class DoceboEnrollmentResponse
    {
        public List<DoceboData> data { get; set; }
        public string version { get; set; }
        public int[] permissions { get; set; }
        public object[] _links { get; set; }
    }

    public class DoceboData
    {
        public int row_index { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
        public int course_id { get; set; }
        public int user_id { get; set; }
        public object session_id { get; set; }
    }

}
