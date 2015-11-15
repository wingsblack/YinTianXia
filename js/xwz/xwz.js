(function () {

    if (!Function.prototype.bind) {
        Function.prototype.bind = function () {
            var _this = this;
            return function () {
                _this.apply(arguments);
            }
        }
    }

    var xwz = window.xwz = {};
    xwz.EmptyFn = function () { };

    xwz.apply = function (source, copy) {
        for (var a in copy) {
            if (copy.hasOwnProperty(a)) source[a] = copy[a];
        }
    }


    var ObjectPrototype = Object.prototype;
    xwz.apply(xwz, {
        isArray: function (obj) {
            return ObjectPrototype.toString.call(obj) === "[object Array]"
        }
    })

    xwz.Util = {
        _time: new Date(),
        toTime: function (timespan) {
            this._time.setTime(timespan);
            var time = "";
            var tmp;
            tmp = this._time.getHours() + "";
            if (tmp.length == 1) tmp = "0" + tmp;
            time += tmp + ":";
            tmp = this._time.getMinutes() + "";
            if (tmp.length == 1) tmp = "0" + tmp;
            time += tmp;
            return time;
        },
        namespace: function (paths) {
            domain = window;
            var p = paths.split(".");
            var d;
            for (var i = 0; i < p.length; i++) {
                domain = domain[p[i]] || (domain[p[i]] = {});
            }
        }
    }



    xwz.apply(xwz.Util, {
        ajaxGet: function (url, cb) {
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json'
            }).done(function (data) {
                cb(data);
            });
        }
    })



    //HTML模版处理
    xwz.HtmlTemplate = {

    }
    //var socketUrl = "http://1818.sfbtcn.com/socket";

    //var WS = {
    //    'login': 'admin',
    //    'passcode': 'password'
    //};


    //var socket = new SockJS(socketUrl);

    //client = Stomp.over(socket);
    //client.debug = null;

    //var stompFailureCallback = function (error) {
    //    if (error.indexOf("Lost connection") != -1) {
    //        alert("错误:" + error)
    //        //setTimeout(connect, 10000);
    //    }
    //};


    //client.connect(WS.login, WS.passcode, function (frame) {
    //    alert(frame);


    //    client.subscribe("/public/chat/04f3e4566ddb4548a864a7b2c7aab7d7", function (message) {

    //        console.log(message)
    //        return;

    //        var c = JSON.parse(message.body);
    //        if (c.eventType == "PRIVATE_CHAT") {
    //            var data = {};
    //            var uid;
    //            data.createdAt = c.createTime;
    //            data.textMessage = c.textMessage;

    //            data.avatar = c.messageFrom.avatar;
    //            data.nickName = c.messageFrom.nickName;
    //            uid = data.uid = c.messageFrom.id;
    //            data.sex = c.messageFrom.sex;
    //            data.identityIcon = c.messageFrom.identityIcon;

    //            var _user = {}
    //            _user["uid"] = uid;
    //            _user["header"] = data.avatar;
    //            _user["name"] = data.nickName;
    //            if (data.sex == 1) {
    //                _user["sex"] = '/front/assets2/img/man.png';
    //            } else {
    //                _user["sex"] = '/front/assets2/img/woman.png';
    //            }

    //            _user["identityIcon"] = data.identityIcon;

    //            var ctime = Util.formatDate(data.createdAt);
    //            var msg = data.textMessage;
    //            var avatar = data.avatar;
    //            var nickName = data.nickName;
    //            var sendid = data.uid;
    //            var sex = data.sex;
    //            var identityIcon = data.identityIcon;

    //            if (sex != 'woman') sex = 'man';
    //            var mymsgClass = '';
    //            if (me && typeof (me["id"]) != "undefined" && me["id"] == sendid) {
    //                mymsgClass = 'mymsg';
    //            }
    //            var tpl = '<div class="liaotian-div ' + mymsgClass + '">';
    //            tpl += '<div class="liaotian-sender">';
    //            tpl += '<img  width="25" height="25" src="' + avatar + '">';
    //            tpl += '<i class="name">' + nickName + '</i>';
    //            tpl += '<i><img class="identicon"  src="' + identityIcon + '"></i>'
    //            tpl += '<i><img width="16px" height="16px" src="/front/assets2/img/' + sex + '.png"></i>';
    //            tpl += '<i class="time">' + ctime + '</i>';
    //            tpl += '</div>';
    //            tpl += '<div class="liaotian-content">';
    //            tpl += '<em></em>';
    //            tpl += '<div class="message">' + msg + '</div>';
    //            tpl += '<div class="clr"></div>';
    //            tpl += '</div>';
    //            tpl += '</div>';

    //            if ($("#siliao_diallog").length == 0) {
    //                //没有私聊窗口 直接弹出
    //                talkto(uid, _user);
    //                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).append(tpl);
    //                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid)[0].scrollTop = 1e8;
    //            } else {
    //                var userTab = $("#siliao_diallog").find(".siliao_tabs").find("#talk_tab_" + uid);
    //                if (userTab.length == 0) {
    //                    // createUserTab(uid);
    //                    // talkto(uid,_user);
    //                    talkingList[uid] = _user;
    //                    createUserTab(uid);
    //                }
    //                activeUserTab(uid);
    //                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).append(tpl);
    //                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid)[0].scrollTop = 1e8;
    //                if (nowTalkUid != uid) {
    //                    $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).hide();
    //                }
    //                if ($("#siliao_diallog").is(":hidden")) {
    //                    $("#siliao_diallog").modal('show');
    //                }
    //            }
    //        }
    //    })
    //    //PrivateChat.chat(client);
    //    //PublicChat.chat(client);
    //    //PublicChat.userEvent(client);
    //    //PublicChat.kickuser(client);
    //}, stompFailureCallback)

}());