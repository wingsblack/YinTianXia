/// <reference path="../../index.html" />


var socket = xwz.Socket.getInstance(xwz.API_SOCKET_SERVER);
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


    //左侧用户
    var user = new xwz.User();

    //注册用户事件
    socket.RegisteredChat(user);
    
    $(".topzhuce").click(function () {

        dialog = art.dialog({
            content: document.getElementById('user_login_fincebox'),
            id: 'EF893L',
            width: 388,
            lock: true
        })

    });


    $('#login_form').on("submit", function () {
        var loginName = $("#name").val();
        if (loginName.length == 0) {
            $("#login-alert-error").html("<span>用户名不能为空</span>");
            return false;
        }
        var password = $("#password").val();
        if (password.length == 0) {
            $("#login-alert-error").html("<span>密码不能为空</span>");
            return false;
        }

        user.login(loginName, password);

        return false;
    });

    $('#send_msg_btn').click(function () {
       
        var text = $("#ytx-input").val();
        if (text) {
            var c = $("[name=robot-chat]").prop("checked");
            var robot = $("#SimulationSelect .SimulationText").attr("value");
            if (robot && c) {
                //机器人发言
                client.send(API.PUBLIC_CHAT_SEND + User.companyId, { 'uid': robot, 'role': 'robot' }, text);
            } else {
                user.send(text);
            }
            $("#ytx-input").val("")
            // tinyMCE.activeEditor.setContent("");

        } else {
            alert("聊天信息不能为空");
        }
        return false;
    });
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






