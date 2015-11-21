using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.IO;
using System.Text;

/// <summary>
/// Class1 的摘要说明
/// </summary>
public class Class1
{
    public Class1()
    {

    }


    public static string Post(string url, string postDataStr)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);

        request.Method = "POST";
        request.ContentType = "application/x-www-form-urlencoded";
        Stream myRequestStream;
        if (!string.IsNullOrEmpty(postDataStr))
        {
            byte[] byteArray = Encoding.UTF8.GetBytes(postDataStr);
            request.ContentLength = byteArray.Length;
            myRequestStream = request.GetRequestStream();
            myRequestStream.Write(byteArray, 0, byteArray.Length);
            myRequestStream.Close();

        }


        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        Stream myResponseStream = response.GetResponseStream();
        StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
        string retString = myStreamReader.ReadToEnd();
        myStreamReader.Close();
        myResponseStream.Close();

        return retString;


    }

    public static void HttpGet(string Url, string postDataStr)
    {
        HttpWebRequest request = (HttpWebRequest)WebRequest.Create(Url + (postDataStr == "" ? "" : "?") + postDataStr);
        request.Method = "GET";
        request.ContentType = HttpContext.Current.Request.ContentType;
        HttpWebResponse response = (HttpWebResponse)request.GetResponse();
        HttpContext.Current.Response.ContentType = response.ContentType;
        Stream myResponseStream = response.GetResponseStream();
        string Disposition = response.Headers.Get("Content-Disposition");
        if (!string.IsNullOrEmpty(Disposition)) {
            HttpContext.Current.Response.Headers.Add("Content-Disposition", Disposition);
        }
        byte[] buffer = new byte[1 * 1024];
        int bytesProcessed = 0;
        int bytesRead;
        do
        {
            bytesRead = myResponseStream.Read(buffer, 0, buffer.Length);
            HttpContext.Current.Response.OutputStream.Write(buffer, 0, bytesRead);
            bytesProcessed += bytesRead;
        }
        while (bytesRead > 0);

        myResponseStream.Close();

    }


    public static string PostParams()
    {
        HttpRequest Request = HttpContext.Current.Request;
        string[] keys = Request.Form.AllKeys;

        StringBuilder sb = new StringBuilder();

        foreach (string key in keys)
        {
            sb.Append(key).Append("=").Append(Request.Form[key]).Append("&");
        }

        return sb.ToString();

    }
}