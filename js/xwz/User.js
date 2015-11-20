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

    User.prototype.RegisteredEvent = function () {

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

        var faceOpen = false, selectOpen = false;

        $(document).click(function () {
            if (faceOpen) {
                $("#ytx-popface").hide();
                faceOpen = false;
            }

            if (selectOpen) {
                faceOpen = false;
                $("#SimulationSelect .SimulationOptions").hide();
            }
        })

        $("#SimulationSelect > .SimulationText").click(function () {
            $(this).next(".SimulationOptions").show();
            selectOpen = true;
            return false;
        })

        $("#SimulationSelect").delegate("a", "click", function () {
            var $this = $(this);
            var $target = $("#SimulationSelect > .SimulationText");
            $target.html($this.html()).attr("value", $this.attr("value"))
            $("#SimulationSelect .SimulationOptions").hide();

            $this.addClass("selected").siblings().removeClass("selected");
        })
    }


    var UserEdit = function (user) { }

    UserEdit.Activation = function () {}



}();