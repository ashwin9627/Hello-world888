using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BugReport.Models
{
    public class WorkItemCount
    {
        public class WorkItem
        {
            public int id { get; set; }
            public string url { get; set; }
        }

        public class Count
        {
            public IList<WorkItem> workItems { get; set; }
        }
    }
}