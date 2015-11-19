/// <reference path="../../index.html" />

!function () {

    //用户类
    var User = function () {
        this.getAllUser();
        this.method = xwz.getUserEvent();
        

    }


    User.prototype.id = null;
    User.prototype.roleCode = null;
    User.prototype.nickName = null;
    User.prototype.sex = null;
    User.prototype.identityIcon = null;
    User.prototype.avatar = null;
    User.prototype.isLogin = false;
   

    User.prototype.getAllUser = function () {
        xwz.Util.ajaxGet(xwz.API_MEM_LIST, this.onLoadAllUser.bind())
    }

    User.prototype.onLoadAllUser = function (data) {
        var rows = data.rows;
        var html = '';
        for (var i = 0; i < rows.length; i++) {
            var user = rows[i];


            html += '<li data-user="' + user.id + '">' +
                '<img class="avatar" src="' + user.avatar + '"/>' +
                '<div class="keabout"><div class="namelevel clearFix">' +
                    '<span class="name">' + user.nickName + '</span>' +
                    '<span class="level level3">LV&nbsp;3</span>' +
                '</div>' +
                '<div class="time">2015-11-08 00:06</div></div></li>'
        }

        $("#onlist").append($(html));
    }

    User.prototype.message = function (frame) {
        var c = JSON.parse(frame.body);
        var nickName = c.messageFrom.nickName;
        var uid = c.messageFrom.id;
        var identityIcon = c.messageFrom.identityIcon;

        if (c.eventType == "USER_ONLINE") {
            xwz.Chat.appendTip(nickName + "上线了");

        } else if (c.eventType == "USER_OFFLINE") {
            $("#onlist").children("li[data-user=" + uid + "]").remove();
            //xwz.Chat.appendTip(nickName + "下线了");

        } else if (c.eventType == "USER_KICKED") {
            $("#onlist").children("li[data-user=" + uid + "]").remove();
            //xwz.Chat.appendTip(nickName + "下线了");
        }




    }

    User.prototype.login = function (loginName, password) {
        var _this = this;
        $.post(xwz.API_USER_LOGIN, "loginName=" + loginName + "&password=" + password, function (data) {
            if (data.code == 0) {
                data = {
                    id: "ea3af0f050a4589e0150a929e7e30149",
                    roleCode: "service",
                    nickName: "天才",
                    sex: "",
                    identityIcon: "member_1.png",
                    avatar: "01"
                }

                _this.isLogin = true;
                _this.id = data.id;
                _this.nickName = data.nickName;

                alert("登陆成功");
                dialog.close();
            } else {
                $("#login-alert-error").html("<span>" + data.message + "</span>");
            }
        });
    }


    User.prototype.send = function (text) {
        //if (!this.isLogin) return;
        xwz.Socket.getInstance().send(xwz.API_PUBLIC_CHAT_SEND + xwz.COMPANY_ID, {}, text);
    }



    xwz.User = User;



}();