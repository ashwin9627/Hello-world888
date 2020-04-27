using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
namespace BugReport.Models
{
    public class WorkItemResponse
    {
        public class Fields
        {
            //fields
            [JsonProperty(PropertyName = "System.TeamProject")]
            public string TeamProject { get; set; }
            [JsonProperty(PropertyName = "System.WorkItemType")]
            public string WorkItemType { get; set; }
            [JsonProperty(PropertyName = "System.State")]
            public string State { get; set; }
            [JsonProperty(PropertyName = "Custom.PlannedHours")]
            public float PlannedHours { get; set; }
            [JsonProperty(PropertyName = "Custom.ActualHours")]
            public float ActualHours { get; set; }
            [JsonProperty(PropertyName = "System.IterationPath")]
            public string Sprint { get; set; }
            [JsonProperty(PropertyName = "Microsoft.VSTS.Scheduling.OriginalEstimate")]
            public float OriginalEstimate { get; set; }
            [JsonProperty(PropertyName = "Microsoft.VSTS.Scheduling.CompletedWork")]
            public float CompletedWork { get; set; }
            [JsonProperty(PropertyName = "Microsoft.VSTS.Scheduling.RemainingWork")]
            public float RemainingWork { get; set; }
            [JsonProperty(PropertyName = "System.Title")]
            public string Title { get; set; }
            

        }

        public class ValueResp
        {
            public int id { get; set; }
            public Fields fields { get; set; }
        }

        public class Response
        {
            public int count { get; set; }
            public List<ValueResp> value { get; set; }

        }
    }
}