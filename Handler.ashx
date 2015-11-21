<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {

    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";



        char nametype1 = Convert.ToChar(Convert.ToInt32("21152"));

        context.Response.Write(nametype1);
    }

    public bool IsReusable {
        get {
            return false;
        }
    }

}