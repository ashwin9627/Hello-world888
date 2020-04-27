using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;

namespace ReportGenerator.Models
{
    public class AvatarNew
    {
        public string href { get; set; }
    }

    public class LinksNew
    {
        public Avatar avatar { get; set; }
    }

    public class SystemCreatedBy
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar2New
    {
        public string href { get; set; }
    }

    public class Links2New
    {
        public Avatar2 avatar { get; set; }
    }

    public class SystemChangedBy
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links2 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar3New
    {
        public string href { get; set; }
    }

    public class Links3New
    {
        public Avatar3 avatar { get; set; }
    }

    public class SystemAuthorizedAs
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links3 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar4New
    {
        public string href { get; set; }
    }

    public class Links4New
    {
        public Avatar4 avatar { get; set; }
    }

    public class SystemAssignedTo
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links4 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar5New
    {
        public string href { get; set; }
    }

    public class Links5New
    {
        public Avatar5 avatar { get; set; }
    }

    public class MicrosoftVSTSCommonActivatedBy
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links5 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class FieldsNew
    {
        
        

        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.System.Id")]
        public int Id { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AreaId")]
        public int AreaId { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AreaPath")]
        public string AreaPath { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.TeamProject")]
        public string TeamProject { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.NodeName")]
        public string NodeName { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AreaLevel1")]
        public string AreaLevel1 { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.Rev")]
        public int Rev { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AuthorizedDate")]
        public DateTime AuthorizedDate { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.RevisedDate")]
        public DateTime RevisedDate { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.IterationId")]
        public int IterationId { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.IterationPath")]
        public string IterationPath { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.IterationLevel1")]
        public string IterationLevel1 { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.IterationLevel2")]
        public string IterationLevel2 { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.WorkItemType")]
        public string WorkItemType { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.State")]
        public string State { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.Reason")]
        public string Reason { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.CreatedDate")]
        public DateTime CreatedDate { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.CreatedBy")]
        public SystemCreatedBy CreatedBy { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.ChangedDate")]
        public DateTime ChangedDate { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.ChangedBy")]
        public SystemChangedBy ChangedBy { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AuthorizedAs")]
        public SystemAuthorizedAs AuthorizedAs { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.PersonId")]
        public int PersonId { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.Watermark")]
        public int Watermark { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.CommentCount")]
        public int CommentCount { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.Title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__Microsoft.VSTS.Common.StateChangeDate")]
        public DateTime StateChangeDate { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__Microsoft.VSTS.Common.Priority")]
        public int Priority { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.Parent")]
        public int Parent { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__System.AssignedTo")]
        public SystemAssignedTo AssignedTo { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__Microsoft.VSTS.Common.ActivatedDate")]

        public DateTime? ActivatedDate { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Common.Severity")]
        public string Severity { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__Microsoft.VSTS.Common.ActivatedBy")]
        public MicrosoftVSTSCommonActivatedBy ActivatedBy { get; set; }
        [JsonProperty(PropertyName = "__invalid_name__Microsoft.VSTS.TCM.AutomationStatus")]
        public string AutomationStatus { get; set; }
    }

    public class Attributes
    {
        public bool isLocked { get; set; }
        public string name { get; set; }
    }

    public class Relation
    {
        public string rel { get; set; }
        public string url { get; set; }
        public Attributes attributes { get; set; }
    }

    public class SelfNew
    {
        public string href { get; set; }
    }

    public class WorkItemUpdates
    {
        public string href { get; set; }
    }

    public class WorkItemRevisions
    {
        public string href { get; set; }
    }

    public class WorkItemComments
    {
        public string href { get; set; }
    }

    public class Html
    {
        public string href { get; set; }
    }

    public class WorkItemType
    {
        public string href { get; set; }
    }

    public class Fields2
    {
        public string href { get; set; }
    }

    public class Links6New
    {
        public Self self { get; set; }
        public WorkItemUpdates workItemUpdates { get; set; }
        public WorkItemRevisions workItemRevisions { get; set; }
        public WorkItemComments workItemComments { get; set; }
        public Html html { get; set; }
        public WorkItemType workItemType { get; set; }
        public Fields2 fields { get; set; }
    }

    public class ValueNew
    {
        public int totalworkItemCounts { get; set; }
        public int id { get; set; }
        public int rev { get; set; }
        public Fields fields { get; set; }
        public List<Relation> relations { get; set; }
        public Links6 _links { get; set; }
        public string url { get; set; }
    }

    public class WorkNew
    {
        public int count { get; set; }
        public List<ValueNew> value { get; set; }
    }
    
}