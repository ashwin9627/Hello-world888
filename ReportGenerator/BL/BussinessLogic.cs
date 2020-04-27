using BugReport.Models;
using DevConsole;
using DevOpsTest.Models;
using DevOpsTestCases.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ReportGenerator.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace DevOpsTestCases.BL
{

    public class BussinessLogic
    {
        Org o1;
        Credentials accountInfo = new Credentials();
        public List<WorkItemResponse.Response> GetWorkItemInBatch(List<string> witIds, string projectNamedata)
        {
            /*
                GET https://dev.azure.com/fabrikam/_apis/wit/workitems?ids=297,299,300&api-version=5.1
                Returns work items with detals
            */
            // ServiceMethods _sMethods = new ServiceMethods(config);
            List<WorkItemResponse.Response> witListResponse = new List<WorkItemResponse.Response>();
            string WorkItemAPIVersion = "5.1";
            string BaseAddress = "https://dev.azure.com/";
            string OrganizationName = Org.OrganizationName;

            string projectName1 = Org.ProjectName;
            foreach (string witIdList in witIds)
            {
                string api = string.Format("{0}{1}/{2}/_apis/wit/workitems?ids={3}&api-version={4}", BaseAddress, OrganizationName, projectName1, witIdList, WorkItemAPIVersion);
                //  var response = _sMethods.HttpGetMethod(api);

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Org.pat);
                    var response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        string res = response.Content.ReadAsStringAsync().Result;
                        WorkItemResponse.Response witResponse = JsonConvert.DeserializeObject<WorkItemResponse.Response>(res);
                        witListResponse.Add(witResponse);
                    }
                }
            }
            return witListResponse;
        }


        public List<WorkItemResponse.Response> GetWorkItemsProject(string workItemName, string config, string projectName)
        {
            List<WorkItemResponse.Response> witRes = new List<WorkItemResponse.Response>();
            //string OrganizationName = "test900";
            string OrganizationName = Org.OrganizationName;
            string Pat = Org.pat;
            string WorkItemAPIVersion = "5.1";
            string projectName1 = Org.ProjectName;
            string BaseAddress = "https://dev.azure.com/";
            string api = string.Format("{0}{1}/{2}/_apis/wit/wiql?api-version={3}", BaseAddress, OrganizationName, projectName1, WorkItemAPIVersion);

            object wiql = new
            {
                query = "Select [Work Item Type],[State], [Title],[Created By] " +
                            "From WorkItems " +
                            "Where [Work Item Type] = '" + workItemName + "'" +
                            "And [System.TeamProject] = '" + projectName1 + "' " +
                            "Order By [Stack Rank] Desc, [Backlog Priority] Desc"
            };
            var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); // mediaType needs to be application/json-patch+json for a patch call
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Org.pat);
                var response = client.PostAsync(api, postValue).Result;
                List<string> witIds = new List<string>();
                if (response.IsSuccessStatusCode)
                {
                    string res = response.Content.ReadAsStringAsync().Result;
                    if (!string.IsNullOrEmpty(res))
                    {
                        WorkItemCount.Count witCount = new WorkItemCount.Count();
                        witCount = JsonConvert.DeserializeObject<WorkItemCount.Count>(res);
                        string witListIds = string.Empty;
                        int i = 0;
                        foreach (var wi in witCount.workItems)
                        {
                            witListIds = witListIds + wi.id + ",";
                            i++;
                            if (i == 199)
                            {
                                witListIds = witListIds.TrimEnd(',');
                                witIds.Add(witListIds);
                                witListIds = string.Empty;
                                i = 0;
                            }
                        }
                        if (i < 199)
                        {
                            witListIds = witListIds.TrimEnd(',');
                            witIds.Add(witListIds);
                        }
                        if (witIds.Count == 0)
                        {
                            witListIds = witListIds.TrimEnd(',');
                            witIds.Add(witListIds);
                        }
                        witRes = GetWorkItemInBatch(witIds, projectName1);
                    }
                }
                return witRes;
            }
        }


        public RespData ProjectNamesStore()
        {
            Org Org1 = new Org();
            try
            {
                string OrganizationName = Org.OrganizationName;
                string BaseAddress = "https://dev.azure.com/";
                string api = string.Format("{0}{1}/_apis/projects?api-version=5.0-preview.3", BaseAddress, OrganizationName);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//);accessToken1

                    HttpResponseMessage response = client.GetAsync(api).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;



                        Org1.ProjectNameList = JsonConvert.DeserializeObject<RespData>(obj);

                        List<SelectListItem> proList = new List<SelectListItem>();
                        foreach (var data in Org1.ProjectNameList.value)
                        {
                            proList.Add(new SelectListItem { Text = data.name, Value = data.name });
                        }
                        // Org1.DropdownList = proList;
                    }
                }
            }
            catch (Exception ex)
            {

            }


            return Org1.ProjectNameList;
        }

        public void projectDetails()
        {

            List<string> responseList = new List<string>();
            Org orgClass = new Org();
            try
            {
                string OrganizationName = Org.OrganizationName;
                string Pat = Org.pat;
                string WorkItemAPIVersion = "5.1";
                string BaseAddress = "https://dev.azure.com/";
                string api = string.Format("{0}{1}/_apis/projects?api-version=5.0-preview.3", BaseAddress, OrganizationName);

                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Org.pat);
                    //HttpResponseMessage response = client.GetAsync("https://dev.azure.com/AzureDevOpsDemoGen/_apis/projects?api-version=5.0-preview.3").Result;
                    //HttpResponseMessage response = client.GetAsync("https://dev.azure.com/test900/_apis/projects?api-version=5.0-preview.3").Result;
                    HttpResponseMessage response = client.GetAsync(api).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        // org.hasmodel = true;
                        var obj = response.Content.ReadAsStringAsync().Result;
                        var Result = JsonConvert.DeserializeObject<RespData>(obj);
                        List<string> projectList = new List<string>();
                        foreach (var data in Result.value)
                        {
                            string pNmame = data.name;
                            projectList.Add(pNmame);
                        }
                        ////////////////////////////////////////////////////////////
                        foreach (var projectloop in Result.value)
                        {
                            //   string token = "deuhz62cyulysixhr4dudqjooh5r3vd7mjbuqc256ywmk5qho7bq";
                            // string pat = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", token)));
                            List<string> responseList1 = new List<string>();
                            try
                            {
                                string BaseAddress1 = "https://dev.azure.com/";
                                string OrganizationName1 = Org.OrganizationName;
                                string projectName1 = projectloop.name;

                                //  https://dev.azure.com/test900/dockertest/_apis/wit/wiql?api-version=5.1
                                string api1 = string.Format("{0}{1}/{2}/_apis/wit/wiql?api-version=5.1", BaseAddress1, OrganizationName1, projectName1);
                                using (var client1 = new HttpClient())
                                {
                                    object wiql = new
                                    {
                                        query = "Select [Work Item Type],[State], [Title],[Created By] " +
                            "From WorkItems " +
                            "Where [Work Item Type] = 'test case' " +
                            //"OR [Work Item Type]='Task'" +
                            //"OR [Work Item Type]='Feature'" +
                            "And [System.TeamProject] = '" + projectName1 + "' " +
                            "Order By [Stack Rank] Desc, [Backlog Priority] Desc"
                                    };
                                    var postValue1 = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); // mediaType needs to be application/json-patch+json for a patch call

                                    using (var client2 = new HttpClient())
                                    {
                                        client2.DefaultRequestHeaders.Accept.Clear();
                                        client2.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                                        client2.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Org.pat);
                                        var response1 = client.PostAsync(api1, postValue1).Result;
                                        if (response1.IsSuccessStatusCode)
                                        {
                                            var obj1 = response1.Content.ReadAsStringAsync().Result;
                                            var Result1 = JsonConvert.DeserializeObject<WorkItemClass>(obj1);
                                            foreach (var ing in Result1.value)
                                            {
                                                responseList1.Add(ing.id.ToString());
                                            }
                                            //var value = Result.Attributes.MajorIssue.attributeValue;
                                            var value = GetWorkItemInBatch(responseList1, Org.ProjectName);
                                            //                 ViewBag.storedData = responseList1; //responseList.ToList();
                                        }
                                        if (responseList1.Count > 1)
                                        {
                                            Org orgClass1 = new Org();
                                        }
                                    }
                                }
                            }
                            catch (Exception ex)
                            {
                                //       ViewBag.error = ex.Message;
                            }
                        }
                        ///////////////////////////////////////////////////////////
                        //  ViewBag.storedData = projectList; //responseList.ToList();

                    }
                    else
                    {

                    }
                }
            }
            catch (Exception ex)
            {
            }

            // ViewBag.storedData = responseList.ToList();
            //
        }
        public Profile profile()
        {
            string accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiIzZTQxNDRkMS1hMTFiLTYwMmQtOTc0NC0wNWRiNWE2OTBjN2YiLCJzY3AiOiJ2c28uYXVkaXRsb2cgdnNvLmJ1aWxkX2V4ZWN1dGUgdnNvLmNvZGVfZnVsbCB2c28uY29kZV9zdGF0dXMgdnNvLmNvbm5lY3RlZF9zZXJ2ZXIgdnNvLmRhc2hib2FyZHNfbWFuYWdlIHZzby5lbnRpdGxlbWVudHMgdnNvLmVudmlyb25tZW50X21hbmFnZSB2c28uZXh0ZW5zaW9uLmRhdGFfd3JpdGUgdnNvLmV4dGVuc2lvbl9tYW5hZ2UgdnNvLmdhbGxlcnlfYWNxdWlyZSB2c28uZ2FsbGVyeV9tYW5hZ2UgdnNvLmdyYXBoX21hbmFnZSB2c28uaWRlbnRpdHlfbWFuYWdlIHZzby5sb2FkdGVzdF93cml0ZSB2c28ubWFjaGluZWdyb3VwX21hbmFnZSB2c28ubWVtYmVyZW50aXRsZW1lbnRtYW5hZ2VtZW50IHZzby5ub3RpZmljYXRpb25fZGlhZ25vc3RpY3MgdnNvLm5vdGlmaWNhdGlvbl9tYW5hZ2UgdnNvLnBhY2thZ2luZ19tYW5hZ2UgdnNvLnByb2ZpbGVfd3JpdGUgdnNvLnByb2plY3RfbWFuYWdlIHZzby5yZWxlYXNlX21hbmFnZSB2c28uc2VjdXJlZmlsZXNfbWFuYWdlIHZzby5zZWN1cml0eV9tYW5hZ2UgdnNvLnNlcnZpY2VlbmRwb2ludF9tYW5hZ2UgdnNvLnN5bWJvbHNfbWFuYWdlIHZzby50YXNrZ3JvdXBzX21hbmFnZSB2c28udGVzdF93cml0ZSB2c28udG9rZW5hZG1pbmlzdHJhdGlvbiB2c28udG9rZW5zIHZzby52YXJpYWJsZWdyb3Vwc19tYW5hZ2UgdnNvLndpa2lfd3JpdGUgdnNvLndvcmtfZnVsbCIsImF1aSI6IjM2ZmNkMTkxLWE5ZTUtNGI0NS04M2FhLWU2YzE1MmU0NjcyNiIsImFwcGlkIjoiNDZhYTIxOWMtNmUwYy00ZDA1LWE0YzUtNDIyYjE2NDdiZjcwIiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJuYmYiOjE1ODIxOTc0NjEsImV4cCI6MTU4MjIwMTA2MX0.g712jYdztDcoGn70NgdMWjucAEYGWA_j5eNe8xXa34XKi81hSvFWhXeRQa8schmmo0UQEh-kXrhzLEmhd5LifL7KfDErFecfBgnxK_pB67fN8dh55tkodQ1M-48qVOpsJKGmZU6_0BYAc-cF_-RwAPds9tMlVGoN7iKyZHCklkvu79gLIXfBW07xBNHasTx4v9goXZqZieUuBEJFLEFU6C4oCxTypQ4tEf79TWOgMa2220n-NDhrG4-0oqWIk6FI-SeQNtyp83RRvB4roEVXXgIwOr2cQvVAQpcKW3Ju4f6FMGzR5s42HIpk19R8WEHY-Zu1NHEFKCcGYDujoJKDtg";
            // https://app.vssps.visualstudio.com/_apis/accounts?api-version=5.1
            string api = string.Format("https://app.vssps.visualstudio.com/_apis/accounts?memberId={0}?api-version=5.1", accessToken);

            Profile testData = new Profile();
            using (var client = new HttpClient())
            {
                try
                {
                    string baseAddress = "https://app.vssps.visualstudio.com/";

                    client.BaseAddress = new Uri(baseAddress);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync("_apis/profile/profiles/me?api-version=4.1").Result;
                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;
                        testData = JsonConvert.DeserializeObject<Profile>(obj);
                    }
                }
                catch (Exception ex)
                {

                }
            }
            return testData;
        }
        public string accessToken1 = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiIzZTQxNDRkMS1hMTFiLTYwMmQtOTc0NC0wNWRiNWE2OTBjN2YiLCJzY3AiOiJ2c28uYXVkaXRsb2cgdnNvLmJ1aWxkX2V4ZWN1dGUgdnNvLmNvZGVfZnVsbCB2c28uY29kZV9zdGF0dXMgdnNvLmNvbm5lY3RlZF9zZXJ2ZXIgdnNvLmRhc2hib2FyZHNfbWFuYWdlIHZzby5lbnRpdGxlbWVudHMgdnNvLmVudmlyb25tZW50X21hbmFnZSB2c28uZXh0ZW5zaW9uLmRhdGFfd3JpdGUgdnNvLmV4dGVuc2lvbl9tYW5hZ2UgdnNvLmdhbGxlcnlfYWNxdWlyZSB2c28uZ2FsbGVyeV9tYW5hZ2UgdnNvLmdyYXBoX21hbmFnZSB2c28uaWRlbnRpdHlfbWFuYWdlIHZzby5sb2FkdGVzdF93cml0ZSB2c28ubWFjaGluZWdyb3VwX21hbmFnZSB2c28ubWVtYmVyZW50aXRsZW1lbnRtYW5hZ2VtZW50IHZzby5ub3RpZmljYXRpb25fZGlhZ25vc3RpY3MgdnNvLm5vdGlmaWNhdGlvbl9tYW5hZ2UgdnNvLnBhY2thZ2luZ19tYW5hZ2UgdnNvLnByb2ZpbGVfd3JpdGUgdnNvLnByb2plY3RfbWFuYWdlIHZzby5yZWxlYXNlX21hbmFnZSB2c28uc2VjdXJlZmlsZXNfbWFuYWdlIHZzby5zZWN1cml0eV9tYW5hZ2UgdnNvLnNlcnZpY2VlbmRwb2ludF9tYW5hZ2UgdnNvLnN5bWJvbHNfbWFuYWdlIHZzby50YXNrZ3JvdXBzX21hbmFnZSB2c28udGVzdF93cml0ZSB2c28udG9rZW5hZG1pbmlzdHJhdGlvbiB2c28udG9rZW5zIHZzby52YXJpYWJsZWdyb3Vwc19tYW5hZ2UgdnNvLndpa2lfd3JpdGUgdnNvLndvcmtfZnVsbCIsImF1aSI6ImU1Yjc3NzJmLWU0ZWUtNDBhNC04ZmY2LTgyYWQxMDM1M2I1NSIsImFwcGlkIjoiNDZhYTIxOWMtNmUwYy00ZDA1LWE0YzUtNDIyYjE2NDdiZjcwIiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJuYmYiOjE1ODIxOTU0NTMsImV4cCI6MTU4MjE5OTA1M30.MP0KdhieQJACD95gynaTFMY7JHKlTz8GllbZVmOg16Q-o4lJbrjwO0TRHc0wlJYoKS_k2o1BoyEO1l5YvzSNVOw7T7tUtVhK1XLGXe8O4FIPmgOQNZ3yALW6L1DWGj3qfvVoYKxm0RJAVbSOjsN_FoXGWl696RFYD9J2oRBf4iWIBvThAVdz6MlUyAOgeTfgGKLUcIqi-vD-WF0SgJepTsyHkhlFcnWG4aR0JD4cs1vLyDiMfWPI17ZsyM8uAEecgkcoeCe0GAhczdgzfCfDxcNuQTmKLaL92b-FKQEHmoMPHfAAGQuAHP-tlljXUXVLDbjUuCuQsHnBxrKpmv4Yjg";
        public Organization Organization(string memberId)
        {
            // string memberId = "3e4144d1-a11b-602d-9744-05db5a690c7f";
            Organization testData = new Organization();
            try
            {
                string accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiIzZTQxNDRkMS1hMTFiLTYwMmQtOTc0NC0wNWRiNWE2OTBjN2YiLCJzY3AiOiJ2c28uYXVkaXRsb2cgdnNvLmJ1aWxkX2V4ZWN1dGUgdnNvLmNvZGVfZnVsbCB2c28uY29kZV9zdGF0dXMgdnNvLmNvbm5lY3RlZF9zZXJ2ZXIgdnNvLmRhc2hib2FyZHNfbWFuYWdlIHZzby5lbnRpdGxlbWVudHMgdnNvLmVudmlyb25tZW50X21hbmFnZSB2c28uZXh0ZW5zaW9uLmRhdGFfd3JpdGUgdnNvLmV4dGVuc2lvbl9tYW5hZ2UgdnNvLmdhbGxlcnlfYWNxdWlyZSB2c28uZ2FsbGVyeV9tYW5hZ2UgdnNvLmdyYXBoX21hbmFnZSB2c28uaWRlbnRpdHlfbWFuYWdlIHZzby5sb2FkdGVzdF93cml0ZSB2c28ubWFjaGluZWdyb3VwX21hbmFnZSB2c28ubWVtYmVyZW50aXRsZW1lbnRtYW5hZ2VtZW50IHZzby5ub3RpZmljYXRpb25fZGlhZ25vc3RpY3MgdnNvLm5vdGlmaWNhdGlvbl9tYW5hZ2UgdnNvLnBhY2thZ2luZ19tYW5hZ2UgdnNvLnByb2ZpbGVfd3JpdGUgdnNvLnByb2plY3RfbWFuYWdlIHZzby5yZWxlYXNlX21hbmFnZSB2c28uc2VjdXJlZmlsZXNfbWFuYWdlIHZzby5zZWN1cml0eV9tYW5hZ2UgdnNvLnNlcnZpY2VlbmRwb2ludF9tYW5hZ2UgdnNvLnN5bWJvbHNfbWFuYWdlIHZzby50YXNrZ3JvdXBzX21hbmFnZSB2c28udGVzdF93cml0ZSB2c28udG9rZW5hZG1pbmlzdHJhdGlvbiB2c28udG9rZW5zIHZzby52YXJpYWJsZWdyb3Vwc19tYW5hZ2UgdnNvLndpa2lfd3JpdGUgdnNvLndvcmtfZnVsbCIsImF1aSI6IjM2ZmNkMTkxLWE5ZTUtNGI0NS04M2FhLWU2YzE1MmU0NjcyNiIsImFwcGlkIjoiNDZhYTIxOWMtNmUwYy00ZDA1LWE0YzUtNDIyYjE2NDdiZjcwIiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJuYmYiOjE1ODIxOTc0NjEsImV4cCI6MTU4MjIwMTA2MX0.g712jYdztDcoGn70NgdMWjucAEYGWA_j5eNe8xXa34XKi81hSvFWhXeRQa8schmmo0UQEh-kXrhzLEmhd5LifL7KfDErFecfBgnxK_pB67fN8dh55tkodQ1M-48qVOpsJKGmZU6_0BYAc-cF_-RwAPds9tMlVGoN7iKyZHCklkvu79gLIXfBW07xBNHasTx4v9goXZqZieUuBEJFLEFU6C4oCxTypQ4tEf79TWOgMa2220n-NDhrG4-0oqWIk6FI-SeQNtyp83RRvB4roEVXXgIwOr2cQvVAQpcKW3Ju4f6FMGzR5s42HIpk19R8WEHY-Zu1NHEFKCcGYDujoJKDtg";
                // https://app.vssps.visualstudio.com/_apis/accounts?api-version=5.1
                string api = string.Format("https://app.vssps.visualstudio.com/_apis/accounts?memberId={0}&api-version=5.1", memberId);


                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;


                        testData = JsonConvert.DeserializeObject<Organization>(obj);
                    }
                    else
                    {
                        var Message = response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return testData;
        }
        public BuildModel BuildDetailsCount(string ProjectName)
        {
            BuildModel testData = new BuildModel();
            try
            {
                string api = string.Format("https://dev.azure.com/{0}/{1}/_apis/build/builds?api-version=5.1", Org.OrganizationName, ProjectName);//Org.ProjectName);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;

                        testData = JsonConvert.DeserializeObject<BuildModel>(obj);
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return testData;
        }
        public List<ValueBuild> BuildDetails(string ProjectName)
        {
            List<ValueBuild> BuildList = new List<ValueBuild>();
            try
            {
                string api = string.Format("https://dev.azure.com/{0}/{1}/_apis/build/builds?api-version=5.1", Org.OrganizationName, ProjectName);//Org.ProjectName);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;

                        BuildModel testData = JsonConvert.DeserializeObject<BuildModel>(obj);

                        foreach (var data in testData.value)
                        {
                            if (data.result == "failed")
                            {
                                BuildList.Add(data);
                            }
                        }
                    }
                    else
                    {
                        var Message = response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return BuildList;
        }

        public ReleaseModel1 ReleaseCount(string projectName)
        {
            //
            ReleaseModel1 testData = new ReleaseModel1();
            ReleaseModel1 ReleaseList = new ReleaseModel1();
            try
            {
                string api = string.Format("https://vsrm.dev.azure.com/{0}/{1}/_apis/Release/releases?$expand=Environments&api-version=5.1", Org.OrganizationName, projectName);//Org.ProjectName);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;

                        testData = JsonConvert.DeserializeObject<ReleaseModel1>(obj);
                    }
                }
            }

            catch (Exception ex)
            {

            }
            return testData;
        }



        public List<ValueRelease> Release(string projectName)
        {
            //
            List<ValueRelease> ReleaseList = new List<ValueRelease>();
            try
            {
                string api = string.Format("https://vsrm.dev.azure.com/{0}/{1}/_apis/Release/releases?$expand=Environments&api-version=5.1", Org.OrganizationName, projectName);//Org.ProjectName);
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);//Org.pat);
                    HttpResponseMessage response = client.GetAsync(api).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var obj = response.Content.ReadAsStringAsync().Result;

                        ReleaseModel1 testData = JsonConvert.DeserializeObject<ReleaseModel1>(obj);

                        foreach (var data in testData.value)
                        {
                            foreach (var data1 in data.environments)
                            {
                                foreach (var data2 in data1.deploySteps)
                                {
                                    foreach (var data3 in data1.deploySteps)
                                    {
                                        foreach (var data4 in data3.releaseDeployPhases)
                                        {
                                            if (data4.status == "failed")
                                            {
                                                ReleaseList.Add(data);
                                            }
                                        }
                                    }
                                }
                              }
                        }
                    }
                    else
                    {
                        var Message = response.Content.ReadAsStringAsync();
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return ReleaseList;
        }


        //WHERE[System.AssignedTo] = 'joselugo'  WHERE[Adatum.CustomMethodology.Severity] >= 2
        //public void GetWorkItem()
        //{
        //    List<WorkItemResponse.Response> witRes = new List<WorkItemResponse.Response>();
        //    List<string> responseList1 = new List<string>();
        //    string BaseAddress = "https://dev.azure.com/";
        //    string api = string.Format("{0}{1}/{2}/_apis/wit/wiql?api-version=5.1", BaseAddress, Org.OrganizationName, Org.ProjectName);
        //    string workItemName = "Bug";
        //    object wiql = new
        //    {
        //        query = "Select [Work Item Type],[State], [Title],[Created By] " +
        //                    "From WorkItems " +
        //                    "Where [Work Item Type] = '" + workItemName + "'" +
        //                    "And [System.TeamProject] = '" + Org.ProjectName + "' " +
        //                    "Order By [Stack Rank] Desc, [Backlog Priority] Desc"
        //    };
        //    var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); // mediaType needs to be application/json-patch+json for a patch call
        //    using (var client = new HttpClient())
        //    {
        //        client.DefaultRequestHeaders.Accept.Clear();
        //        client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        //        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Org.pat);
        //        var response = client.PostAsync(api, postValue).Result;
        //        List<string> witIds = new List<string>();
        //        if (response.IsSuccessStatusCode)
        //        {
        //            string res = response.Content.ReadAsStringAsync().Result;
        //            if (!string.IsNullOrEmpty(res))
        //            {
        //                WorkItemCount.Count witCount = new WorkItemCount.Count();
        //                witCount = JsonConvert.DeserializeObject<WorkItemCount.Count>(res);
        //               var wiqlResponse = JsonConvert.DeserializeObject<WorkItemClass>(res);
        //                string witListIds = string.Empty;
        //                int i = 0;
        //                //    foreach (var wi in witCount.workItems)
        //                //    {
        //                //        witListIds = witListIds + wi.id + ",";
        //                //        i++;
        //                //        if (i == 199)
        //                //        {
        //                //            witListIds = witListIds.TrimEnd(',');
        //                //            witIds.Add(witListIds);
        //                //            witListIds = string.Empty;
        //                //            i = 0;
        //                //        }
        //                //    }
        //                //    if (i < 199)
        //                //    {
        //                //        witListIds = witListIds.TrimEnd(',');
        //                //        witIds.Add(witListIds);
        //                //    }
        //                //    if (witIds.Count == 0)
        //                //    {
        //                //        witListIds = witListIds.TrimEnd(',');
        //                //        witIds.Add(witListIds);
        //                //    }

        //                //    witRes = GetWorkItemInBatch(witIds, Org.ProjectName);
        //                //if (wiqlResponse.workItems == null || wiqlResponse.workItems.Count == 0)
        //                //    return null;
        //                string defaultUrl = "https://dev.azure.com/" + Org.OrganizationName + "/_apis/wit/workitems?ids=";
        //                string url = defaultUrl;
        //                // var urlResponse.value = new List<Models.ExpandWI.Value>();
        //               // wiqlResponse.value = new List<WorkItemClass>();
        //                string endUrl = "&$expand=all&api-version=5.1";
        //                //for (int j = 0; j < wiqlResponse.workItems.Count; j++)
        //                for(int j=0;j<wiqlResponse.count;j++)
        //                {
        //                    if (j % 200 == 0 && j != 0)
        //                    {
        //                        //var batchResponse = Account.GetApi<RootObject>(url + endUrl);

        //                        urlResponse.count += batchResponse.count;
        //                        foreach (var item in batchResponse.value)
        //                        {
        //                            urlResponse.value.Add(item);
        //                        }
        //                        url = defaultUrl;
        //                    }
        //                    if (j % 200 == 0)
        //                    {
        //                        url += wiqlResponse.workItems[j].id;
        //                    }
        //                    else
        //                    {
        //                        url += "," + wiqlResponse.workItems[j].id;
        //                    }
        //                }
        //                url += endUrl;
        //                var lastBatchResponse = Account.GetApi<RootObject>(url);
        //                urlResponse.count += lastBatchResponse.count;
        //                foreach (var item in lastBatchResponse.value)
        //                    urlResponse.value.Add(item);

        //                System.Web.HttpContext.Current.Session["EWorkItems"] = urlResponse;
        //                List<string> Types = new List<string>();
        //                foreach (var i in urlResponse.value)
        //                {
        //                    if (!Types.Contains(i.fields.WorkItemType))
        //                        Types.Add(i.fields.WorkItemType);
        //                }

        //            }
                    
        //        }

        //    }
        //   // return witRes;
        //}
        
    }
        }
