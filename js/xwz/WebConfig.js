/// <reference path="xwz.js" />


!function () {


    //websocket服务器
    xwz.API_HOST = "http://1818.sfbtcn.com"

    //公聊接口
    xwz.API_PUBLIC_CHAT = '/public/chat/'

    //会员列表
    xwz.API_MEM_LIST = xwz.API_HOST + '/home/allman'

    //聊天历史
    xwz.API_CHAT_HISTORY = xwz.API_HOST + '/chat/history';

    //用户事件
    xwz.API_USER_EVENT = '/public/user/'

    //socket服务器
    xwz.API_SOCKET_SERVER = xwz.API_HOST + '/socket';

    //登陆密码
    xwz.CONST_LOGIN = 'admin';
    //登陆信息
    xwz.CONST_PASS_CODE = 'password';

    xwz.COMPANY_ID = null;

    xwz.API_USER_LOGIN = xwz.API_HOST + "/account/ajaxLogin";

    xwz.API_PUBLIC_CHAT_SEND = "/app/chat/";


    xwz.API_RILI_LIST = xwz.API_HOST +  '/finance_calendar/list';

    //获取公聊连接
    xwz.getPublicChat = function () {
        if (xwz.COMPANY_ID == null) throw "缺少项目标识";
        return xwz.API_PUBLIC_CHAT + xwz.COMPANY_ID;
    }

    //获取用户事件
    xwz.getUserEvent = function () {
        if (xwz.COMPANY_ID == null) throw "缺少项目标识";
        return xwz.API_USER_EVENT + xwz.COMPANY_ID;
    }



}();