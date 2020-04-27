using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportGenerator.Models
{
    //public class Avatar
    //{
    //    public string href { get; set; }
    //}

    //public class Links
    //{
    //    public Avatar avatar { get; set; }
    //}

    //public class SystemCreatedBy
    //{
    //    public string displayName { get; set; }
    //    public string url { get; set; }
    //    public Links _links { get; set; }
    //    public string id { get; set; }
    //    public string uniqueName { get; set; }
    //    public string imageUrl { get; set; }
    //    public string descriptor { get; set; }
    //}

    //public class Avatar2
    //{
    //    public string href { get; set; }
    //}

    //public class Links2
    //{
    //    public Avatar2 avatar { get; set; }
    //}

    //public class SystemChangedBy
    //{
    //    public string displayName { get; set; }
    //    public string url { get; set; }
    //    public Links2 _links { get; set; }
    //    public string id { get; set; }
    //    public string uniqueName { get; set; }
    //    public string imageUrl { get; set; }
    //    public string descriptor { get; set; }
    //}

    public class FieldsBug
    {

        [JsonProperty(PropertyName = "System.AreaPath")]
        public string AreaPath { get; set; }
        [JsonProperty(PropertyName = "System.TeamProject")]
        public string TeamProject { get; set; }
        [JsonProperty(PropertyName = "System.IterationPath")]
        public string IterationPath { get; set; }
        [JsonProperty(PropertyName = "System.WorkItemType")]
        public string WorkItemType { get; set; }
        [JsonProperty(PropertyName = "System.State")]
        public string State { get; set; }
        [JsonProperty(PropertyName = "System.Reason")]
        public string Reason { get; set; }
        [JsonProperty(PropertyName = "System.CreatedDate")]
        public DateTime CreatedDate { get; set; }
        [JsonProperty(PropertyName = "System.CreatedBy")]
        public SystemCreatedBy CreatedBy { get; set; }
        [JsonProperty(PropertyName = "System.ChangedDate")]
        public DateTime ChangedDate { get; set; }
        [JsonProperty(PropertyName = "System.ChangedBy")]
        public SystemChangedBy ChangedBy { get; set; }
        [JsonProperty(PropertyName = "System.CommentCount")]
        public int CommentCount { get; set; }
        [JsonProperty(PropertyName = "System.Title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.Activity")]
        public string Activity { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.StateChangeDate")]
        public DateTime StateChangeDate { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.Priority")]
        public int Priority { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.Severity")]
        public string Severity { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.ValueArea")]
        public string ValueArea { get; set; }
        
    }

    //public class Self
    //{
    //    public string href { get; set; }
    //}

    //public class WorkItemUpdates
    //{
    //    public string href { get; set; }
    //}

    //public class WorkItemRevisions
    //{
    //    public string href { get; set; }
    //}

    //public class WorkItemComments
    //{
    //    public string href { get; set; }
    //}

    //public class Html
    //{
    //    public string href { get; set; }
    //}

    //public class WorkItemType
    //{
    //    public string href { get; set; }
    //}

    //public class Fields2
    //{
    //    public string href { get; set; }
    //}

    //public class Links3Bug
    //{
    //    public Self self { get; set; }
    //    public WorkItemUpdates workItemUpdates { get; set; }
    //  //  public WorkItemRevisions workItemRevisions { get; set; }
    //    //public WorkItemComments workItemComments { get; set; }
    //    //public Html html { get; set; }
    //    public WorkItemType workItemType { get; set; }
    //    public Fields2 fields { get; set; }
    //}

    public class BugDetails
    {
        public int id { get; set; }
        public int rev { get; set; }
        public FieldsBug fields { get; set; }
        public Links3 _links { get; set; }
        public string url { get; set; }
    }
    
}