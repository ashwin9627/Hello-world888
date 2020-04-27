using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ReportGenerator.Models
{

    public class AvatarRelease
    {
        public string href { get; set; }
    }

    public class LinksRelease
    {
        public Avatar avatar { get; set; }
    }

    public class ModifiedByRelease
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar2Release
    {
        public string href { get; set; }
    }

    public class Links2Release
    {
        public Avatar2 avatar { get; set; }
    }

    public class CreatedByRelease
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links2 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar3Release
    {
        public string href { get; set; }
    }

    public class Links3Release
    {
        public Avatar3 avatar { get; set; }
    }

    public class CreatedForRelease
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links3 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class VariablesRelease
    {
    }

    public class ReleaseDeployPhas
    {
        public int id { get; set; }
        public string phaseId { get; set; }
        public string name { get; set; }
        public int rank { get; set; }
        public string phaseType { get; set; }
        public string status { get; set; }
        public object runPlanId { get; set; }
        public List<object> deploymentJobs { get; set; }
        public string errorLog { get; set; }
        public List<object> manualInterventions { get; set; }
        public DateTime? startedOn { get; set; }
    }

    public class Avatar4
    {
        public string href { get; set; }
    }

    public class Links4Release
    {
        public Avatar4 avatar { get; set; }
    }

    public class RequestedByRelease
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links4 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class Avatar5
    {
        public string href { get; set; }
    }

    public class Links5Release
    {
        public Avatar5 avatar { get; set; }
    }

    public class RequestedForRelease
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links5 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class LastModifiedBy
    {
        public string displayName { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string descriptor { get; set; }
    }

    public class DeployStep
    {
        public int id { get; set; }
        public int deploymentId { get; set; }
        public int attempt { get; set; }
        public string reason { get; set; }
        public string status { get; set; }
        public string operationStatus { get; set; }
        public List<ReleaseDeployPhas> releaseDeployPhases { get; set; }
        public RequestedBy requestedBy { get; set; }
        public RequestedFor requestedFor { get; set; }
        public DateTime queuedOn { get; set; }
        public LastModifiedBy lastModifiedBy { get; set; }
        public DateTime lastModifiedOn { get; set; }
        public bool hasStarted { get; set; }
        public List<object> tasks { get; set; }
        public string runPlanId { get; set; }
        public List<object> issues { get; set; }
    }

    public class EnvironmentOptions
    {
        public string emailNotificationType { get; set; }
        public string emailRecipients { get; set; }
        public bool skipArtifactsDownload { get; set; }
        public int timeoutInMinutes { get; set; }
        public bool enableAccessToken { get; set; }
        public bool publishDeploymentStatus { get; set; }
        public bool badgeEnabled { get; set; }
        public bool autoLinkWorkItems { get; set; }
        public bool pullRequestDeploymentEnabled { get; set; }
    }

    public class Condition
    {
        public bool result { get; set; }
        public string name { get; set; }
        public string conditionType { get; set; }
        public string value { get; set; }
    }

    public class Avatar6
    {
        public string href { get; set; }
    }

    public class Links6
    {
        public Avatar6 avatar { get; set; }
    }

    public class Owner
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links6 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class WebRelease
    {
        public string href { get; set; }
    }

    public class SelfRelease
    {
        public string href { get; set; }
    }

    public class Links7
    {
        public Web web { get; set; }
        public Self self { get; set; }
    }

    public class Release
    {
        public int id { get; set; }
        public string name { get; set; }
        public string url { get; set; }
        public Links7 _links { get; set; }
    }

    public class Web2Release
    {
        public string href { get; set; }
    }

    public class Self2Release
    {
        public string href { get; set; }
    }

    public class Links8
    {
        public Web2 web { get; set; }
        public Self2 self { get; set; }
    }

    public class ReleaseDefinitionRelease
    {
        public int id { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public object projectReference { get; set; }
        public string url { get; set; }
        public Links8 _links { get; set; }
    }

    public class Avatar7
    {
        public string href { get; set; }
    }

    public class Links9
    {
        public Avatar7 avatar { get; set; }
    }

    public class ReleaseCreatedBy
    {
        public string displayName { get; set; }
        public string url { get; set; }
        public Links9 _links { get; set; }
        public string id { get; set; }
        public string uniqueName { get; set; }
        public string imageUrl { get; set; }
        public string descriptor { get; set; }
    }

    public class ProcessParameters
    {
    }

    public class Environment
    {
        public int id { get; set; }
        public int releaseId { get; set; }
        public string name { get; set; }
        public string status { get; set; }
        public Variables variables { get; set; }
        public List<object> variableGroups { get; set; }
        public List<DeployStep> deploySteps { get; set; }
        public int rank { get; set; }
        public int definitionEnvironmentId { get; set; }
        public EnvironmentOptions environmentOptions { get; set; }
        public List<object> demands { get; set; }
        public List<Condition> conditions { get; set; }
        public List<object> workflowTasks { get; set; }
        public List<object> deployPhasesSnapshot { get; set; }
        public Owner owner { get; set; }
        public List<object> schedules { get; set; }
        public Release release { get; set; }
        public ReleaseDefinition releaseDefinition { get; set; }
        public ReleaseCreatedBy releaseCreatedBy { get; set; }
        public string triggerReason { get; set; }
        public ProcessParameters processParameters { get; set; }
    }

    public class Variables2
    {
    }

    public class Self3
    {
        public string href { get; set; }
    }

    public class Web3
    {
        public string href { get; set; }
    }

    public class Links10
    {
        public Self3 self { get; set; }
        public Web3 web { get; set; }
    }

    public class ReleaseDefinition2
    {
        public int id { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public object projectReference { get; set; }
        public string url { get; set; }
        public Links10 _links { get; set; }
    }

    public class Self4
    {
        public string href { get; set; }
    }

    public class Web4
    {
        public string href { get; set; }
    }

    public class Links11
    {
        public Self4 self { get; set; }
        public Web4 web { get; set; }
    }

    public class ProjectReferenceRelease
    {
        public string id { get; set; }
        public string name { get; set; }
    }

    public class PropertiesRelease
    {
    }

    public class ValueRelease
    {
        public int id { get; set; }
        public string name { get; set; }
        public string status { get; set; }
        public DateTime createdOn { get; set; }
        public DateTime modifiedOn { get; set; }
        public ModifiedBy modifiedBy { get; set; }
        public CreatedBy createdBy { get; set; }
        public CreatedFor createdFor { get; set; }
        public List<Environment> environments { get; set; }
        public Variables2 variables { get; set; }
        public List<object> variableGroups { get; set; }
        public ReleaseDefinition2 releaseDefinition { get; set; }
        public int releaseDefinitionRevision { get; set; }
        public string description { get; set; }
        public string reason { get; set; }
        public string releaseNameFormat { get; set; }
        public bool keepForever { get; set; }
        public int definitionSnapshotRevision { get; set; }
        public string logsContainerUrl { get; set; }
        public string url { get; set; }
        public Links11 _links { get; set; }
        public List<object> tags { get; set; }
        public object triggeringArtifactAlias { get; set; }
        public ProjectReference projectReference { get; set; }
        public Properties properties { get; set; }
    }

    public class ReleaseModel1
    {
        public int count { get; set; }
        public List<ValueRelease> value { get; set; }
    }

}