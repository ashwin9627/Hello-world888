using DevOpsTestCases.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace DevOpsTestCases.BL
{
    public class Oauth
    {
        OauthCredintials credintials = new OauthCredintials();
        //string url = "https://app.vssps.visualstudio.com/oauth2/authorize?client_id={0}&response_type=Assertion&state=User1&scope=vso.auditlog vso.build_execute vso.code_full vso.code_status vso.connected_server vso.dashboards_manage vso.entitlements vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_acquire vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.machinegroup_manage vso.memberentitlementmanagement vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.security_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full&redirect_uri={1}";
        //string redirectUrl = "http://mindtreetestcopyplan.azurewebsites.net/test/CopyTestCase";
        //string clientSecret = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJjaWQiOiJjMWQzNGMxYS0wZmQ2LTQ4NmQtODFhMi02ZjFmN2JiMzFiODMiLCJjc2kiOiIxYzk5NGVjNS1mMjJmLTRlODQtYTNjZC0xNWQ3Y2JjY2YyYzQiLCJuYW1laWQiOiIzZTQxNDRkMS1hMTFiLTYwMmQtOTc0NC0wNWRiNWE2OTBjN2YiLCJpc3MiOiJhcHAudnN0b2tlbi52aXN1YWxzdHVkaW8uY29tIiwiYXVkIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsIm5iZiI6MTU4MjE3NDU4MywiZXhwIjoxNzQwMDI3MzgzfQ.2JsRkfLG38RvhnAmuBMkaK-XvuOjyaAOkdDQ_QmymHHM0TB9hfVZk-DZtJlJPeg56TNpA9b7Rdon0P5p1MlrPDlI2V_yr-xLlh_BZqu04MvayOt02jq-D8-LROJAjfMPb0bCmxQycVhoQSOBINQMnA-tJRZDJilHa_kOMyc-kTuuT7IdPFWxGG1w5c9KUCtZLo5xOV6ytrGAK4cz3CUomQ7-1Cw5oF3KH3JtUoGLKh40q5ZaCOPvNrCIQwzlqt_3b6EBhnyxgGDUMfTQQVQevqEkoTeBBwDYvbvJX2OusHs3135EKhqfIt6FjoR3MCGVwqGunfXbY3oYTtSQ-alXeg";
        //string clientId = "C1D34C1A-0FD6-486D-81A2-6F1F7BB31B83";       
        //string appScope = "vso.analytics vso.auditlog vso.build_execute vso.code_full vso.code_status vso.connected_server vso.dashboards_manage vso.environment_manage vso.extension.data_write vso.extension_manage vso.gallery_acquire vso.gallery_manage vso.graph_manage vso.identity_manage vso.loadtest_write vso.memberentitlementmanagement_write vso.notification_diagnostics vso.notification_manage vso.packaging_manage vso.profile_write vso.project_manage vso.release_manage vso.securefiles_manage vso.security_manage vso.serviceendpoint_manage vso.symbols_manage vso.taskgroups_manage vso.test_write vso.tokenadministration vso.tokens vso.variablegroups_manage vso.wiki_write vso.work_full";

        public string GenerateAccessToken(string clientid,string code,string redirectUrl)
        {
            return string.Format("client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion={0}&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion={1}&redirect_uri={2}",
            HttpUtility.UrlEncode(credintials.clientSecret),
            HttpUtility.UrlEncode(code),
            credintials.redirectUrl
        );
        }

        public AccessDetails AccessDetails(string body)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri("https://app.vssps.visualstudio.com");
            var request = new HttpRequestMessage(HttpMethod.Post, "/oauth2/token");
            var requestContent = body;
            request.Content = new StringContent(requestContent, Encoding.UTF8, "application/x-www-form-urlencoded");
            var response = client.SendAsync(request).Result;
            if (response.IsSuccessStatusCode)
            {
                string result = response.Content.ReadAsStringAsync().Result;
                AccessDetails details = Newtonsoft.Json.JsonConvert.DeserializeObject<AccessDetails>(result);
                return details;
            }
            return new AccessDetails();
        }

        public AccessDetails RefreshAccessToken(string refreshToken)
        {
            using (var client = new HttpClient())
            {
                //string redirectUri = System.Configuration.ConfigurationManager.AppSettings["RedirectUri"];
                //string cientSecret = System.Configuration.ConfigurationManager.AppSettings["ClientSecret"];
                //string baseAddress = System.Configuration.ConfigurationManager.AppSettings["BaseAddress"];

                var request = new HttpRequestMessage(HttpMethod.Post, credintials.BaseAddress + "/oauth2/token");
                var requestContent = string.Format(
                    "client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion={0}&grant_type=refresh_token&assertion={1}&redirect_uri={2}",
                    HttpUtility.UrlEncode(credintials.clientSecret),
                    HttpUtility.UrlEncode(refreshToken), credintials.redirectUrl
                    );

                request.Content = new StringContent(requestContent, Encoding.UTF8, "application/x-www-form-urlencoded");
                try
                {
                    var response = client.SendAsync(request).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        string result = response.Content.ReadAsStringAsync().Result;
                        AccessDetails accesDetails = JsonConvert.DeserializeObject<AccessDetails>(result);
                        return accesDetails;
                    }
                    else
                    {
                        return new AccessDetails();
                    }
                }
                catch (Exception ex)
                {
                    //ProjectService.logger.Info(DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") + "\t" + ex.Message + "\t" + "\n" + ex.StackTrace + "\n");
                    return new AccessDetails();
                }
            }
        }
    }
}
