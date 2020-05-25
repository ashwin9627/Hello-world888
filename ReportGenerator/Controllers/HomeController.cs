using DevConsole;
using DevOpsTest.Models;
using DevOpsTestCases.BL;
using DevOpsTestCases.Models;
using distribution_copy.Models;
using Newtonsoft.Json;
using ReportGenerator.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Mvc;
using static BugReport.Models.WorkItemResponse;

namespace ReportGenerator.Controllers
{

    public class HomeController : Controller
    {
        [assembly: log4net.Config.XmlConfigurator(ConfigFile = "log4net.config")]
        OauthCredintials credintials = new OauthCredintials();
        Oauth oauth = new Oauth();
        BussinessLogic logic = new BussinessLogic();
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        // GET: Test
        public ActionResult Index()
        {
            try
            {
                String code = Request.QueryString["Code"];
                Session["code"] = code;
                string data = oauth.GenerateAccessToken(credintials.clientId, code, credintials.redirectUrl);
                AccessDetails accessDetails = oauth.AccessDetails(data);

                AccessDetails accessToken = new AccessDetails();
                accessToken.access_token = accessDetails.access_token;
                Org.pat = accessDetails.access_token;
              //  Org.pat = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", accessDetails.access_token)));
                Session["AT"] = accessDetails.access_token;//accessToken.access_token;
                return RedirectToAction("Reports", "Home");
            }
            catch (Exception ex)
            {
                log.Info(ex);
                return RedirectToAction("Index1", "Home");
            }
        }

        public ActionResult Index1()
        {
            credintials.url = string.Format(credintials.url, credintials.clientId, credintials.redirectUrl);
            return Redirect(credintials.url);
        }
        public ActionResult Reports()
        {
            if (Session["AT"] == null)
            {
                return RedirectToAction("Index1", "Home");
            }
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public object OrganizationList()
        {
            Profile profileResp = logic.profile();
            Organization orgList = logic.Organization(profileResp.id);
            var OrderData = orgList.value.OrderBy(x => x.accountName);
            //string output = JsonConvert.SerializeObject(orgList);
            string output = JsonConvert.SerializeObject(OrderData);
            return output;
        }

        public object GetProjects(string orgName)
        {
            Org.OrganizationName = orgName;
            RespData profileResp = logic.ProjectNamesStore();
            var OrderData = profileResp.value.OrderBy(x => x.name);
            Session["projectList"] = profileResp;

        //  string output = JsonConvert.SerializeObject(profileResp);
            string output = JsonConvert.SerializeObject(OrderData);
            return output;
        }
        public ActionResult About()
        { 
            return View();
        }
        public object Build(string projectname)
        {
            //Workitemlist123(projectname);
            Session.Remove("BuildCount");
            Org.ProjectName = projectname;
            BuildModel buildstorecount = logic.BuildDetailsCount(projectname);
            Session["BuildCount"] = buildstorecount.count;
            Session["BuildSprint"] = buildstorecount; //BuildModel
            //var daysfilter=buildstorecount.value.Where(x=>x.lastChangedDate==)
            ViewBag.BuildCount = buildstorecount.count;
           // List<ValueBuild> buildstore = logic.BuildDetails(projectname);
            //string output = JsonConvert.SerializeObject(buildstore);
            string output = JsonConvert.SerializeObject(buildstorecount);
            return output;
        }
        public object Release(string projectname)
        {
            Session.Remove("ReleaseCount");
            ReleaseModel1 releseCount = logic.ReleaseCount(projectname);
            Session["ReleaseCount"] = releseCount.count;
            Session["ReleaseSprint"] = releseCount; //ReleaseModel1
            ViewBag.ReleaseCount = releseCount.count;
          //  List<ValueRelease> releasestore = logic.Release(projectname);
            string output = JsonConvert.SerializeObject(releseCount);
            return output;
        }


        //"https://dev.azure.com/" + ORG + "/_apis/projects/" + project + "/teams?api-version=5.1"
        //  public JsonResult IterationsList(string ORG, string project)
        public List<IterationDetails> IterationsList(string ORG, string project)
        {
            TeamDetails teams = new TeamDetails();
            List<IterationDetails> iterationsList = new List<IterationDetails>();
            string responseBody = "";
            string api = string.Format("https://dev.azure.com/{0}/_apis/projects/{1}/teams?api-version=5.1", Org.OrganizationName, project);
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;
                        teams = JsonConvert.DeserializeObject<TeamDetails>(obj);
                    }
                }

                if (teams.value != null && teams.value.Count > 0)
                {
                    foreach (var team in teams.value)
                    {
                        IterationDetails iterationDetails = new IterationDetails();
                        string teamname = team.name;
                        string url = "https://dev.azure.com/" + ORG + "/" + project + "/" + teamname + "/_apis/work/teamsettings/iterations?api-version=5.1";
                        using (var client = new HttpClient())
                        {
                            client.DefaultRequestHeaders.Accept.Clear();
                            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                            HttpResponseMessage response = client.GetAsync(url).Result;

                            if (response.IsSuccessStatusCode)
                            {
                                var obj = response.Content.ReadAsStringAsync().Result;
                                iterationDetails = JsonConvert.DeserializeObject<IterationDetails>(obj);
                                iterationDetails.teamname = teamname;
                                iterationsList.Add(iterationDetails);
                            }

                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //  return Json("");
                return iterationsList;
            }
            Session["iterationsList"] = iterationsList;
            //return Json(iterationsList, JsonRequestBehavior.AllowGet);
            return iterationsList;
        }

        public JsonResult iterationMethod(string ORG, string project)
        {
            List<IterationDetails> iterationStore = new List<IterationDetails>();
            iterationStore=IterationsList(ORG, project);
            //string output = JsonConvert.SerializeObject(iterationStore);
            // return output;
            return Json(iterationStore, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult Workitem()
        //{
        //    logic.GetWorkItem();
        //    return null;
        //}

        // public JsonResult Workitem()
        public List<ValueNew> Workitemlist(string projectName)
        {
            Session.Remove("WorkItemscount");
            WorkNew urlResponse = new WorkNew();
            string queryString = @"Select [Work Item Type],[State], [Title],[Created By] From WorkItems ";
            if (Org.ProjectName != null)
                queryString += "where [System.TeamProject]='" + projectName + "' "; //+ Org.ProjectName + "' ";
            queryString += "Order By [Stack Rank] Desc, [Backlog Priority] Desc";
            var wiql = new { query = queryString };
            var content = JsonConvert.SerializeObject(wiql);
            string url = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/wiql?api-version=5.1";
            ResponseWI wiqlResponse = Store.GetApi<ResponseWI>(url, "POST", content);
            if (wiqlResponse.workItems == null || wiqlResponse.workItems.Count == 0)
                return null;

            string defaultUrl = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/workitems?ids=";
            url = defaultUrl;
            urlResponse.value = new List<ValueNew>();
            string endUrl = "&$expand=all&api-version=5.1";
            for (int j = 0; j < wiqlResponse.workItems.Count; j++)
            {
                if (j % 200 == 0 && j != 0)
                {
                    var batchResponse = Store.GetApi<WorkNew>(url + endUrl);
                    urlResponse.count += batchResponse.count;
                    foreach (var item in batchResponse.value)
                    {
                        urlResponse.value.Add(item);
                    }
                    url = defaultUrl;
                }
                if (j % 200 == 0)
                {
                    url += wiqlResponse.workItems[j].id;
                }
                else
                {
                    url += "," + wiqlResponse.workItems[j].id;
                }
            }
            url += endUrl;
            var lastBatchResponse = Store.GetApi<WorkNew>(url);
            urlResponse.count += lastBatchResponse.count;
            foreach (var item in lastBatchResponse.value)
                urlResponse.value.Add(item);


            System.Web.HttpContext.Current.Session["EWorkItems"] = urlResponse;
            List<ValueNew> Types = new List<ValueNew>();
            List<ValueNew> BugFind = new List<ValueNew>();
            List<IterationDetails> iterationsListStore = new List<IterationDetails>();
            iterationsListStore = IterationsList(Org.OrganizationName, projectName);//Org.ProjectName);
            Session["WorkItemscount"] = urlResponse.count;
            ViewBag.WorkItemscount = urlResponse.count;
            foreach (var i in urlResponse.value)
            {
                if (i.fields.WorkItemType == "Bug" && i.fields.Severity == "1 - Critical")
                {
                    //BugDetails bugStore=BugDetails(i.id);
                    //if(bugStore.fields.Severity== "1 - Critical")
                    //{
                    Types.Add(i);
                    // }
                    //&& i.fields.Severity == "1 - Critical"
                    //  if (!Types.Contains(i.fields.__invalid_name__SystemWorkItemType))
                    //    Types.Add(i);//.__invalid_name__SystemWorkItemType);
                }
            }
            //string output = JsonConvert.SerializeObject(Types);
            //return Json(Types, JsonRequestBehavior.AllowGet);
            //Session["criticalBug"] = Types;
            return Types;
        }
        public object Workitem(string projectName)
        {
            //List<ValueNew> workList = Workitemlist(projectName);
            
             List<ValueNew> workList = Workitemlist123(projectName);
            string output = JsonConvert.SerializeObject(workList);
            return output;
        }
        public object WorkitemDeadline(string projectName)
        {
            List<ValueNew> workList = WorkitemDeadlineGet(projectName);
            string output = JsonConvert.SerializeObject(workList);
            return output;
        }
        //public JsonResult WorkitemDeadline()
        public List<ValueNew> WorkitemDeadlineGet(string projectName)
        {
            Session.Remove("WorkItemstotal");
            WorkNew urlResponse = new WorkNew();
            string queryString = @"Select [Work Item Type],[State], [Title],[Created By] From WorkItems ";
            if (Org.ProjectName != null)
                queryString += "where [System.TeamProject]='" + projectName + "' "; //+ Org.ProjectName + "' ";
            queryString += "Order By [Stack Rank] Desc, [Backlog Priority] Desc";
            var wiql = new { query = queryString };
            var content = JsonConvert.SerializeObject(wiql);
            string url = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/wiql?api-version=5.1";
            ResponseWI wiqlResponse = Store.GetApi<ResponseWI>(url, "POST", content);

            if (wiqlResponse.workItems == null || wiqlResponse.workItems.Count == 0)
                return null;

            //if (wiqlResponse.count >= 0)
            //{
            //    Session["WorkItemstotal"] = wiqlResponse.count;
            //}
            string defaultUrl = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/workitems?ids=";
            url = defaultUrl;
            urlResponse.value = new List<ValueNew>();
            string endUrl = "&$expand=all&api-version=5.1";
            for (int j = 0; j < wiqlResponse.workItems.Count; j++)
            {
                if (j % 200 == 0 && j != 0)
                {
                    var batchResponse = Store.GetApi<WorkNew>(url + endUrl);
                    urlResponse.count += batchResponse.count;
                    foreach (var item in batchResponse.value)
                    {
                        urlResponse.value.Add(item);
                    }
                    url = defaultUrl;
                }
                if (j % 200 == 0)
                {
                    url += wiqlResponse.workItems[j].id;
                }
                else
                {
                    url += "," + wiqlResponse.workItems[j].id;
                }
            }
            url += endUrl;
            var lastBatchResponse = Store.GetApi<WorkNew>(url);
            urlResponse.count += lastBatchResponse.count;
            foreach (var item in lastBatchResponse.value)
                urlResponse.value.Add(item);

            System.Web.HttpContext.Current.Session["EWorkItems"] = urlResponse;
            List<ValueNew> Types = new List<ValueNew>();
            List<ValueNew> Types1 = new List<ValueNew>();
            List<ValueNew> BugFind = new List<ValueNew>();
            List<IterationDetails> iterationsListStore = new List<IterationDetails>();
            iterationsListStore = IterationsList(Org.OrganizationName, projectName);//Org.ProjectName);
            Session["WorkItemstotal"] = urlResponse.count;
           ViewBag.WorkItemstotal = urlResponse.count;
            int sessioncount = 0;
            foreach (var i in urlResponse.value)
            {
                i.totalworkItemCounts = urlResponse.count;
                //Types.Add(i);
                sessioncount += 1;
                if (i.fields.WorkItemType == "Bug" || i.fields.WorkItemType == "Task" || i.fields.WorkItemType == "User Story" || i.fields.WorkItemType == "Product Backlog Item")
                {
                    foreach (var iter in iterationsListStore)
                    {
                        foreach (var iter1 in iter.value)
                        {
                            if (i.fields.Sprint == iter1.path)
                            {
                                DateTime finishDate = Convert.ToDateTime(iter1.attributes.finishDate);
                                string fin = finishDate.ToString(DateTime.Now.ToString("MM/dd/yyyy"));
                                string toDate = DateTime.Now.ToString("MM/dd/yyyy");
                                var Today = DateTime.Today;
                                string finishDateSprint = iter1.attributes.finishDate;
                                // DateTime finishdateConvert=new DateTime();

                                int value = DateTime.Compare(finishDate, Today);

                                DateTime date = Convert.ToDateTime("01-01-0001 00:00:00");
                                // checking
                                if (finishDate != null && finishDate != date)
                                    if (value < 0)
                                        Types.Add(i);
                            }
                        }

                    }

                }
            }


            Session["WorkItemExtendedDate"] = Types;

            return Types;//return output;
        }
        List<WorkCounts> WorkList = new List<WorkCounts>();
        public object AllProjectList()
        {

            RespData proStore = (RespData)Session["projectList"];
            foreach (var project in proStore.value)
            {
                WorkCounts StoredData = new WorkCounts();
                var criticalBug = Workitemlist(project.name);
                var Build = logic.BuildDetails(project.name);
                var Release = logic.Release(project.name);
                var workItemDeadLineList = WorkitemDeadlineGet(project.name);
                var Buildcount = 0;
                var ReleaseCount = 0;
                var criticalBugCount = 0;
                var workItemDadLineCount = 0;
                if (Build == null)
                {
                    Buildcount = 0;
                }
                else
                {
                    Buildcount = Build.Count();
                }
                if (Release == null)
                    ReleaseCount = 0;
                else
                    ReleaseCount = Release.Count();
                if (criticalBug == null)
                    criticalBugCount = 0;
                else
                    criticalBugCount = criticalBug.Count();
                if (workItemDeadLineList == null)
                    workItemDadLineCount = 0;
                else
                    workItemDadLineCount = workItemDeadLineList.Count();

                //var criticalBugCount=criticalBug
                StoredData = DataStore(project.id, project.name, Buildcount, ReleaseCount, criticalBugCount, workItemDadLineCount);
                WorkList.Add(StoredData);
            }
            string output = JsonConvert.SerializeObject(WorkList);
            return output;
        }

        public WorkCounts DataStore(string id, string name, int buildcount, int releaseCount, int criticalBugCount, int workItemDadLineCount)
        {
            WorkCounts workData = new WorkCounts();
            workData.ProjectId = id;
            workData.ProjectName = name;
            workData.BuildCount = buildcount;//buildcount.ToString();
            workData.ReleaseCount = releaseCount; //releaseCount.ToString();
            workData.CriticalBugCount = criticalBugCount;
            workData.WorkItemDeadLineCount = workItemDadLineCount.ToString();
            //throw new NotImplementedException();
            return workData;
        }
        public WorkCounts DataStore1(string id, string name, int buildcount, int releaseCount)
        {
            WorkCounts workData = new WorkCounts();
            workData.ProjectId = id;
            workData.ProjectName = name;
            workData.BuildCount = buildcount;//buildcount.ToString();
            workData.ReleaseCount = releaseCount;//releaseCount.ToString();
            //throw new NotImplementedException();
            return workData;
        }
        public WorkCounts DataStore2(string id, string name,int criticalBugCount, int workItemDadLineCount)
        {
            WorkCounts workData = new WorkCounts();
            workData.ProjectId = id;
            workData.ProjectName = name;
           
            workData.CriticalBugCount = criticalBugCount;
            workData.WorkItemDeadLineCount = workItemDadLineCount.ToString();
            //throw new NotImplementedException();
            return workData;
        }
        List<WorkCounts> WorkList1 = new List<WorkCounts>();
        public object AllDataChart(string orgName)
        {
            RespData proStore = (RespData)Session["projectList"];
            foreach (var project in proStore.value)
            {
                WorkCounts StoredData = new WorkCounts();
                //var criticalBug = Workitemlist(project.name);
                var Build = logic.BuildDetails(project.name);
                var Release = logic.Release(project.name);
                //var workItemDeadLineList = WorkitemDeadlineGet(project.name);
                var Buildcount = 0;
                var ReleaseCount = 0;

                if (Build == null)
                {
                    Buildcount = 0;
                }
                else
                {
                    Buildcount = Build.Count();
                }
                if (Release == null)
                    ReleaseCount = 0;
                else
                    ReleaseCount = Release.Count();


                //var criticalBugCount=criticalBug
                StoredData = DataStore1(project.id, project.name, Buildcount, ReleaseCount);
                WorkList1.Add(StoredData);
            }
            string output = JsonConvert.SerializeObject(WorkList1);
            return output;
        }

        public object AllDataWorkitem()
        {
            RespData proStore1 = (RespData)Session["projectList"];
            foreach (var project in proStore1.value)
            {
                WorkCounts StoredData = new WorkCounts();
                var criticalBug = Workitemlist123(project.name);//Workitemlist(project.name);
                var workItemDeadLineList = WorkitemDeadlineGet(project.name);
                var criticalBugCount = 0;
                var workItemDadLineCount = 0;
                if (workItemDeadLineList == null)
                {
                    workItemDadLineCount = 0;
                }
                else
                {
                    workItemDadLineCount = workItemDeadLineList.Count();
                }
                if (criticalBug == null)
                    criticalBugCount = 0;
                else
                    criticalBugCount = criticalBug.Count();


                //var criticalBugCount=criticalBug
                StoredData = DataStore2(project.id, project.name, criticalBugCount, workItemDadLineCount);
                WorkList1.Add(StoredData);
            }
            string output = JsonConvert.SerializeObject(WorkList1);
            return output;
        }


        //
        public List<ValueNew> Workitemlist123(string projectName)
        {
            Session.Remove("WorkItemscount");
            WorkNew urlResponse = new WorkNew();
            //  string queryString = @"Select [Work Item Type]= 'Bug',[State], [Title],[Created By] From WorkItems ";
            //  if (Org.ProjectName != null)
            //      //WHERE[System.AssignedTo] = 'joselugo'  WHERE[Adatum.CustomMethodology.Severity] >= 2
            //      queryString += "where [System.TeamProject]='" + projectName + "' "; //+ Org.ProjectName + "' ";
            ////  queryString += "Order By [Stack Rank] Desc, [Backlog Priority] Desc";
            //  var wiql = new { query = queryString };
            //  var content = JsonConvert.SerializeObject(wiql);
              string url = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/wiql?api-version=5.1";
            object wiql = new
            {
                query = "Select [Work Item Type],[State], [Title],[Created By] " +
                              "From WorkItems " +
                              // "Where [Work Item Type] = '" + workItemName + "' " +
                              "Where [Work Item Type] = 'Bug' " +
                              //"OR [Work Item Type]='Task'" +
                              //"OR [Work Item Type]='Feature'" +
                              //"And [Work Item Type] = 'Epic' " +
                              "And [System.TeamProject] = '" + projectName + "' " +
                              "Order By [Stack Rank] Desc, [Backlog Priority] Desc"
            };
            var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); // mediaType needs to be application/json-patch+json for a patch call
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);
                var response = client.PostAsync(url, postValue).Result;
            }

                var content = JsonConvert.SerializeObject(wiql);
                ResponseWI wiqlResponse = Store.GetApi<ResponseWI>(url, "POST", content);

            if (wiqlResponse.workItems == null || wiqlResponse.workItems.Count == 0)
                return null;

            string defaultUrl = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/workitems?ids=";
            url = defaultUrl;
            urlResponse.value = new List<ValueNew>();
            string endUrl = "&$expand=all&api-version=5.1";
            for (int j = 0; j < wiqlResponse.workItems.Count; j++)
            {
                if (j % 200 == 0 && j != 0)
                {
                    var batchResponse = Store.GetApi<WorkNew>(url + endUrl);
                    urlResponse.count += batchResponse.count;
                    foreach (var item in batchResponse.value)
                    {
                        urlResponse.value.Add(item);
                    }
                    url = defaultUrl;
                }
                if (j % 200 == 0)
                {
                    url += wiqlResponse.workItems[j].id;
                }
                else
                {
                    url += "," + wiqlResponse.workItems[j].id;
                }
            }
            url += endUrl;
            var lastBatchResponse = Store.GetApi<WorkNew>(url);
            urlResponse.count += lastBatchResponse.count;
            foreach (var item in lastBatchResponse.value)
                urlResponse.value.Add(item);


            System.Web.HttpContext.Current.Session["EWorkItems"] = urlResponse;
            List<ValueNew> Types = new List<ValueNew>();
            List<ValueNew> BugFind = new List<ValueNew>();
            List<IterationDetails> iterationsListStore = new List<IterationDetails>();
            iterationsListStore = IterationsList(Org.OrganizationName, projectName);//Org.ProjectName);
            Session["WorkItemscount"] = urlResponse.count;
            ViewBag.WorkItemscount = urlResponse.count;
            foreach (var i in urlResponse.value)
            {
                if (i.fields.WorkItemType == "Bug" && i.fields.Severity == "1 - Critical")
                {
                    //BugDetails bugStore=BugDetails(i.id);
                    //if(bugStore.fields.Severity== "1 - Critical")
                    //{
                    Types.Add(i);
                    // }
                    //&& i.fields.Severity == "1 - Critical"
                    //  if (!Types.Contains(i.fields.__invalid_name__SystemWorkItemType))
                    //    Types.Add(i);//.__invalid_name__SystemWorkItemType);
                }
            }
            //string output = JsonConvert.SerializeObject(Types);
            //return Json(Types, JsonRequestBehavior.AllowGet);
            //Session["criticalBug"] = Types;
            return Types;
        }
        //


        //Sprint WorkItems
        public object ReleaseSprint(string orgName, string projectName, string sprintName)
        {
            List<ReleaseModel1> releaseSprintList = new List<ReleaseModel1>();
            List<IterationDetails> sprintStore = (List<IterationDetails>)Session["iterationsList"];
            //Session["ReleaseSprint"] = releseCount; //ReleaseModel1
            ReleaseModel1 releaseSprint = (ReleaseModel1)Session["ReleaseSprint"];
            DateTime checkDate1 = DateTime.Now.AddMonths(-1);
            DateTime checkDate2 = DateTime.Now.AddMonths(1);
            DateTime Today = DateTime.Today;
            if(Today >=checkDate1 && Today <= checkDate2)
            {

            }

            //if
            foreach (var sprintData in sprintStore)
            {
                foreach (var sprintData1 in sprintData.value)
                {
                    if (sprintData1.path == sprintName)
                    {
                        foreach (var releaseData in releaseSprint.value)
                        {
                            DateTime releaseFinishTime = releaseData.createdOn;
                            DateTime startDate = Convert.ToDateTime(sprintData1.attributes.startDate);
                            DateTime finishDate = Convert.ToDateTime(sprintData1.attributes.finishDate);
                            if (releaseFinishTime >= startDate && releaseFinishTime <= finishDate)
                            {
                                releaseSprintList.Add(releaseSprint);
                                //is between the 2 dates
                            }
                        }
                    }
                }
            }
            string output = JsonConvert.SerializeObject(releaseSprintList);
            return output;
        }
        public object BuildSprint(string orgName, string projectName,string sprintName)
        {
            List<BuildModel> BuildSprintList = new List<BuildModel>();
            List<IterationDetails> sprintStore = (List<IterationDetails>)Session["iterationsList"];
          //  Session["BuildSprint"] = buildstorecount; //BuildModel
            BuildModel buildSprint = (BuildModel)Session["BuildSprint"];
            foreach (var sprintData in sprintStore)
            {
                foreach (var sprintData1 in sprintData.value)
                {
                    if (sprintData1.path == sprintName)
                    {
                        foreach (var buildData in buildSprint.value)
                        {
                            DateTime buildFinishTime = buildData.finishTime;
                            DateTime startDate = Convert.ToDateTime(sprintData1.attributes.startDate);
                            DateTime finishDate = Convert.ToDateTime(sprintData1.attributes.finishDate);
                            if (buildFinishTime >= startDate && buildFinishTime <= finishDate)
                            {
                                BuildSprintList.Add(buildSprint);
                                //is between the 2 dates
                        }
                        }
                    }
                }
            }
            string output = JsonConvert.SerializeObject(BuildSprintList);
            return output;
           
        }
    }
    

public class WorkCounts
    {
        public string ProjectName { get; set; }
        public string ProjectId { get; set; }
        public int BuildCount { get; set; }
        public int ReleaseCount { get; set; }
        public int CriticalBugCount { get; set; }
        public string WorkItemDeadLineCount { get; set; }
   }
    }    

