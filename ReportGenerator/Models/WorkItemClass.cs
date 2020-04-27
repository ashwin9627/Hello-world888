using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DevOpsTest.Models
{
    //public class WorkItemClass
    //{
    //}
        public class SystemAssignedTo
        {
            public string displayName { get; set; }
            public object id { get; set; }
        }

        public class Avatar
        {
            public string href { get; set; }
        }

        public class Links
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

        public class Avatar2
        {
            public string href { get; set; }
        }

        public class Links2
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

        public class Fields
        {
            public string __invalid_name__SystemAreaPath { get; set; }
            public string __invalid_name__SystemTeamProject { get; set; }
            public string __invalid_name__SystemIterationPath { get; set; }
            public string __invalid_name__SystemWorkItemType { get; set; }
            public string __invalid_name__SystemState { get; set; }
            public string __invalid_name__SystemReason { get; set; }
            public SystemAssignedTo __invalid_name__SystemAssignedTo { get; set; }
            public DateTime __invalid_name__SystemCreatedDate { get; set; }
            public SystemCreatedBy __invalid_name__SystemCreatedBy { get; set; }
            public DateTime __invalid_name__SystemChangedDate { get; set; }
            public SystemChangedBy __invalid_name__SystemChangedBy { get; set; }
            public int __invalid_name__SystemCommentCount { get; set; }
            public string __invalid_name__SystemTitle { get; set; }
            public double __invalid_name__MicrosoftVSTSSchedulingRemainingWork { get; set; }
            public DateTime __invalid_name__MicrosoftVSTSCommonStateChangeDate { get; set; }
            public int __invalid_name__MicrosoftVSTSCommonPriority { get; set; }
            public double __invalid_name__MicrosoftVSTSSchedulingEffort { get; set; }
            public string __invalid_name__SystemDescription { get; set; }
        }

        public class Value1
        {
            public int id { get; set; }
            public int rev { get; set; }
            public Fields fields { get; set; }
            public string url { get; set; }
        }

        public class WorkItemClass
        {
            public int count { get; set; }
            public List<Value1> value { get; set; }
        }
    }