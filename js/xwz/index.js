/// <reference path="../../index.html" />


var socket  = xwz.Socket.getInstance(xwz.API_SOCKET_SERVER);;
var dialog;

$(function () {
 
   
    //聊天历史
    xwz.Chat.getChatHistory();

   
   

    socket.connect(xwz.CONST_LOGIN, xwz.CONST_PASS_CODE);

    //公聊处理
    var chat = new xwz.Chat.PublicChat();

    //注册公聊事件
    socket.RegisteredChat(chat);


    //chat.message({
    //    body: "{\"eventType\":\"PUBLIC_CHAT\",\"messageFrom\":{\"id\":\"4028911849970e79014997112c860004\",\"login\":null,\"email\":null,\"status\":null,\"nickName\":\"虚拟用户8\",\"sex\":1,\"qq\":null,\"avatar\":\"/images/avatar/t3/32/19.png\",\"roleId\":null,\"roleIcon\":null,\"roleCode\":\"normal\",\"identityIcon\":\"/front/assets2/identity/member_1.png\"},\"textMessage\":\"{\\\"id\\\":null,\\\"messageType\\\":null,\\\"senderId\\\":null,\\\"senderAvatar\\\":null,\\\"senderName\\\":null,\\\"senderSex\\\":null,\\\"senderRoleIcon\\\":null,\\\"identityIcon\\\":null,\\\"message\\\":\\\"太背了\\\",\\\"sendTime\\\":null,\\\"gag\\\":null,\\\"messageStatus\\\":null,\\\"handan\\\":null}\",\"createTime\":1444521924294}"
    //});

    //右键菜单
    xwz.dropdown.init();

    //用户
    xwz.User.getAllUser();
    
    var user = new xwz.User();
    user.check();
    user.RegisteredEvent();
    xwz.dropdown.user = user;
    //注册用户事件
    socket.RegisteredChat(user);
    
   


    
    $("#soft-download").click(function () {
        //开户判断是否需要登录
        if (xwz.Project.isLoginDownload && !user.isLogin) {
            $(".topzhuce").click();
            return false;
        }
        art.dialog({
            content: document.getElementById('downloadlist'),
            id: 'EF893L',
            title: '软件下载',
            width: 820,
            zIndex: 1500,
            lock: true
        });
    });

    $('#cjrl').unbind('click').bind('click', function () {
       
        Util.dialog(xwz.API_RILI_LIST, 800, 500, "财经日历", 'handan');
    });



});






