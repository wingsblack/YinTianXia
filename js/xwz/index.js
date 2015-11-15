/// <reference path="../../index.html" />





$(function () {



    //聊天历史
    xwz.Chat.getChatHistory();


    var socket = new xwz.Socket(xwz.API_SOCKET_SERVER);
    socket.connect(xwz.CONST_LOGIN, xwz.CONST_PASS_CODE);

    //公聊处理
    var chat = new xwz.Chat.PublicChat();

    //注册公聊事件
    socket.RegisteredChat(chat);


    //chat.message({
    //    body: "{\"eventType\":\"PUBLIC_CHAT\",\"messageFrom\":{\"id\":\"4028911849970e79014997112c860004\",\"login\":null,\"email\":null,\"status\":null,\"nickName\":\"虚拟用户8\",\"sex\":1,\"qq\":null,\"avatar\":\"/images/avatar/t3/32/19.png\",\"roleId\":null,\"roleIcon\":null,\"roleCode\":\"normal\",\"identityIcon\":\"/front/assets2/identity/member_1.png\"},\"textMessage\":\"{\\\"id\\\":null,\\\"messageType\\\":null,\\\"senderId\\\":null,\\\"senderAvatar\\\":null,\\\"senderName\\\":null,\\\"senderSex\\\":null,\\\"senderRoleIcon\\\":null,\\\"identityIcon\\\":null,\\\"message\\\":\\\"太背了\\\",\\\"sendTime\\\":null,\\\"gag\\\":null,\\\"messageStatus\\\":null,\\\"handan\\\":null}\",\"createTime\":1444521924294}"
    //});


    //左侧用户
    var user = new xwz.User();

    //注册用户事件
    socket.RegisteredChat(user);
    



});

//$(function () {



//    return;

//    $(".topzhuce").click(function () {

//        art.dialog({
//            content: document.getElementById('user_login_fincebox'),
//            id: 'EF893L',
//            width: 388,
//            lock: true
//        })

//    })

//})






