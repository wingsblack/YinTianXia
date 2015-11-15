/// <reference path="../../index.html" />

/*
<li id="8619109"><div class="time">21:26</div><i style="background-position:-53px -45px"></i><div class="sszbconhuifu" id="say" style="display:none"><div class="huifubox"><a href="#" class="huifuboxcon">对TA说</a></div></div><div class="namebox" id="name">天一阁</div><div class="atext" id="content">宣老师！耶伦的讲话与油的趋势有什么影响？？？？？？？？？？？？？？？？？？？？？？？？？？</div></li>
*/

//公共聊天模块
!function () {

    var htmlTemp = '<li>'

    var _Chat = function () {
        this.method = xwz.getPublicChat();
    }


    _Chat.prototype.message = function (frame) {

        var body = eval("(" + frame.body + ")");
        var time = xwz.Util.toTime(body.createTime);
        var avatar = body.messageFrom.avatar;
        var message = eval("(" + body.textMessage + ")");

        var msg = {
            time: time,
            avatar: avatar,
            nickName: body.messageFrom.nickName,
            message: message.message
        }

        xwz.Chat.appendMessage(msg);
    }


    xwz.Chat.PublicChat = _Chat;






}();