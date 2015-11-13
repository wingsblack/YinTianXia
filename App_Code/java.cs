using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

/// <summary>
/// java 的摘要说明
/// </summary>
public class java : IHttpHandler, IRequiresSessionState
{

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    public void ProcessRequest(HttpContext context)
    {

        string path = context.Request.Path;
        path = "http://1818.sfbtcn.com" + path;

        context.Response.ContentType = "text/json";
        try
        {
            string write;
            if (context.Request.HttpMethod == "POST")
            {
                write = Class1.Post(path, Class1.PostParams());
                context.Response.Write(write);
            }          
            else{
                Class1.HttpGet(path, string.Empty);
            }


        }
        catch (Exception e)
        {
            context.Response.Write(e.Message);
        }



    }
}