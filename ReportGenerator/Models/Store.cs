using DevOpsTest.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace ReportGenerator.Models
{
    public class Store
    {
        public static T GetApi<T>(string url, string method = "GET", string requestBody = null)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes(string.Format("{0}:{1}", "", Org.pat))));
            HttpRequestMessage Request;
            if (requestBody != null)
            {
                HttpContent content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                Request = new HttpRequestMessage(new HttpMethod(method), url) { Content = content };
            }
            else
                Request = new HttpRequestMessage(new HttpMethod(method), url);

            using (HttpResponseMessage response = client.SendAsync(Request).Result)
            {
                if (response.IsSuccessStatusCode)
                {
                    var responseBody = response.Content.ReadAsStringAsync().Result;
                    return JsonConvert.DeserializeObject<T>(responseBody);
                }
                else
                    return default;
            }
        }
    }
}