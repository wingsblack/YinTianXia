!function () {
    var PrivateChat = {};

    var nowTalkUid = '';
    var talkingList = [];


    _initalize = function () {
        if ($("#siliao_diallog").length == 0) {
            var dialogWrap = $('<div id="siliao_diallog" class="modal fade">');

            var dialog = $('<div class="modal-dialog" style="border-radius:0;"></div>');

            var dialogContent = $('<div class="modal-content"></div>');

            var chatWrap = $('<div class="siliao_wrap"></div>');

            var chatTab = $('<div class="siliao_tabs"></div>');

            var modalWrap = $('<div class="siliao_box"></div>');
            var modalHead = $('<div class="modal-header siliao_content"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">关闭</span></button><h4 class="modal-title talkto"></h4></div>')
            var modalBody = $('<div class="modal-body"></div>');
            var chatWindow = $('<div id="chat_windows"></div>');
            var chatTextarea = $('<div class="faxin"><div class="editor-bar"></div><div style="position:relative" class="fayan-wrap"><div class="tinmy-wrap"><textarea id="siliao_content" name="content" class="form-control editme"></textarea></div><button id="send_siliao_btn" class="fayan-btn"><div>发送</div><div>send</div><div></div></button></div></div>')

            chatWindow.appendTo(modalBody);
            chatTextarea.appendTo(modalBody);

            modalHead.appendTo(modalWrap);
            modalBody.appendTo(modalWrap);

            chatTab.appendTo(chatWrap);
            modalWrap.appendTo(chatWrap);

            chatWrap.appendTo(dialogContent);
            dialogContent.appendTo(dialog);
            dialog.appendTo(dialogWrap);

            dialogWrap.appendTo('body');

            dialogWrap.css({ width: "600px" });
            dialogWrap.css({ 'margin-left': (($(window).width() - 600) / 2) + 'px' });
            chatWindow.css({ width: "100%", height: "330px" });

            chatTab.height(chatWrap.height());
            closeTab();
            activeTab();
            su = UE.getEditor('siliao_content', {
                serverUrl: '/ueditor',
                // imagePath:serverPath,
                initialFrameHeight: 80,
                autoHeight: false,
                autoHeightEnabled: false,
                elementPathEnabled: false,
                wordCount: false,
                toolbars: [['simpleupload', 'emotion', 'fontfamily', 'fontsize', 'forecolor']],
                // lang:/^zh/.test(navigator.language || navigator.browserLanguage || navigator.userLanguage) ? 'zh-cn' : 'en',
                // langPath:UMEDITOR_CONFIG.UMEDITOR_HOME_URL + "lang/",
                focus: true
            });
            su.addListener('keydown', function (type, event) {
                if (event.keyIdentifier == 'Enter') {
                    $('#send_siliao_btn').click();
                }
            });
        }
        $("#siliao_diallog").modal('show');
        sendPrivateMsg();
    }

    function talkto(uid, userData) {
       _initalize();

        if (typeof (talkingList[uid]) != "undefined") {
            activeUserTab(uid);
        } else {
            talkingList[uid] = userData;
            createUserTab(uid);
            activeUserTab(uid);
        }


    }

    function closeTab() {

        $(document).on("click", "#siliao_diallog .siliao_tabs .select_link em", function () {
            var tablid = $(this).parents(".select_link").attr("id");
            var uid = tablid.substr(9);
            if (typeof (talkingList[uid]) != "undefined") {
                delete (talkingList[uid]);
            }
            $("#siliao_diallog .siliao_tabs").find("#talk_tab_" + uid).remove();
            $("#siliao_diallog #chat_windows").find("#talk_win_" + uid).remove();
            if ($("#siliao_diallog .siliao_tabs .select_link").length > 0) {
                var first_tab_id = $("#siliao_diallog .siliao_tabs .select_link").eq(0).attr("id");
                var first_tab_uid = first_tab_id.substr(9);
                activeUserTab(first_tab_uid);
            } else {
                $("#siliao_diallog .close").click();
            }
        })
    }


    function activeTab() {
        $(document).on("click", "#siliao_diallog .siliao_tabs .select_link a", function () {
            var tablid = $(this).parents(".select_link").attr("id");
            var uid = tablid.substr(9);
            activeUserTab(uid);
        })
    }

    function activeUserTab(uid) {
        $("#siliao_diallog .siliao_tabs").find("#talk_tab_" + uid).addClass('active');
        $("#siliao_diallog .siliao_tabs").find("#talk_tab_" + uid).siblings().removeClass('active');

        $("#siliao_diallog #chat_windows").find("#talk_win_" + uid).addClass("active").show();
        $("#siliao_diallog #chat_windows").find("#talk_win_" + uid).siblings().removeClass("active").hide();
        nowTalkUid = uid;
    }

    function createUserTab(uid) {
        var userinfo = talkingList[uid];
        var uid = userinfo["uid"];
        var user_name = userinfo["name"];
        $("#siliao_diallog").find(".siliao_tabs").append('<div  class="select_link" id="talk_tab_' + uid + '"><a href="javascript:void(0)">' + user_name + '</a><em>x</em></div>');
        $("#siliao_diallog").find("#chat_windows").append('<div  class="talk_win" id="talk_win_' + uid + '"></div>');
    }


    function sendPrivateMsg() {
        //发送私聊信息
        $("#send_siliao_btn").unbind("click").bind("click", function (event) {
            // var text = $.trim($("#siliao_content").val());

            var text = su.getContent();
            if (text) {
                if (nowTalkUid) {
                    var User = xwz.User.getInstance();
                    xwz.Socket.getInstance().send(xwz.API_PRIVATE_CHAT + nowTalkUid, {}, text);
                    var nowtime = xwz.Util.toTime(new Date().getTime(),"yyyy-MM-dd hh:mm:ss");
                    var sex;
                    if (User.sex == 1) {
                        sex = "man";
                    } else {
                        sex = "woman";
                    }
                    var message = '<div class="liaotian-div mymsg"><div class="liaotian-sender">';
                    message += '<img width="25" height="25" src="/images/avatar/t3/32/' + User.avatar + '.png">';
                    message += '<i class="name">' + User.nickName + '</i><i><img class="identicon"  src="/front/assets2/identity/' + User.identityIcon + '">';
                    message += '</i><i><img width="16px" height="16px" src="theme/default/images/' + sex + '.png"></i>';
                    message += '<i class="time">' + nowtime + '</i></div><div class="liaotian-content"><em>';
                    message += '</em><div class="message">' + text + '</div><div class="clr"></div></div></div>';

                    $("#siliao_diallog").find("#chat_windows").find(".active").append(message);
                    $("#siliao_diallog").find("#chat_windows").find(".active")[0].scrollTop = 1e8;
                    // $("#siliao_content").val("");
                    su.setContent("");
                } else {
                    alert("请选择聊天对象");
                }
            } else {
                alert("聊天信息不能为空");
            }
            return false;
        });
    }


    PrivateChat.method = xwz.API_PRIVATE_CHAT_GET;
    PrivateChat.message = function (message) {
        var c = JSON.parse(message.body);
        if (c.eventType == "PRIVATE_CHAT") {
            var data = {};
            var uid;
            data.createdAt = c.createTime;
            data.textMessage = c.textMessage;

            data.avatar = c.messageFrom.avatar;
            data.nickName = c.messageFrom.nickName;
            uid = data.uid = c.messageFrom.id;
            data.sex = c.messageFrom.sex;
            data.identityIcon = c.messageFrom.identityIcon;

            var _user = {}
            _user["uid"] = uid;
            _user["header"] = data.avatar;
            _user["name"] = data.nickName;
            if (data.sex == 1) {
                _user["sex"] = '/front/assets2/img/man.png';
            } else {
                _user["sex"] = '/front/assets2/img/woman.png';
            }

            _user["identityIcon"] = data.identityIcon;

            var ctime = xwz.Util.toTime(data.createdAt, "yyyy-MM-dd hh:mm:ss")
            var msg = data.textMessage;
            var avatar = data.avatar;
            var nickName = data.nickName;
            var sendid = data.uid;
            var sex = data.sex;
            var identityIcon = data.identityIcon;

            if (sex != 'woman') sex = 'man';
            var mymsgClass = '';

            if (xwz.User.getInstance().id == sendid) {
                mymsgClass = 'mymsg';
            }
            var tpl = '<div class="liaotian-div ' + mymsgClass + '">';
            tpl += '<div class="liaotian-sender">';
            tpl += '<img  width="25" height="25" src="' + avatar + '">';
            tpl += '<i class="name">' + nickName + '</i>';
            tpl += '<i><img class="identicon"  src="' + identityIcon + '"></i>'
            tpl += '<i><img width="16px" height="16px" src="/front/assets2/img/' + sex + '.png"></i>';
            tpl += '<i class="time">' + ctime + '</i>';
            tpl += '</div>';
            tpl += '<div class="liaotian-content">';
            tpl += '<em></em>';
            tpl += '<div class="message">' + msg + '</div>';
            tpl += '<div class="clr"></div>';
            tpl += '</div>';
            tpl += '</div>';

            if ($("#siliao_diallog").length == 0) {
                //没有私聊窗口 直接弹出
                xwz.PrivateChat.talkto(uid, _user);
                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).append(tpl);
                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid)[0].scrollTop = 1e8;
            } else {
                var userTab = $("#siliao_diallog").find(".siliao_tabs").find("#talk_tab_" + uid);
                if (userTab.length == 0) {
                    // createUserTab(uid);
                    // talkto(uid,_user);
                    talkingList[uid] = _user;
                    xwz.PrivateChat.createUserTab(uid);
                }
                xwz.PrivateChat.activeUserTab(uid);
                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).append(tpl);
                $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid)[0].scrollTop = 1e8;
                if (nowTalkUid != uid) {
                    $("#siliao_diallog").find("#chat_windows").find("#talk_win_" + uid).hide();
                }
                if ($("#siliao_diallog").is(":hidden")) {
                    $("#siliao_diallog").modal('show');
                }
            }
        }
    }


    PrivateChat.activeUserTab = activeUserTab;
    PrivateChat.talkto = talkto;
    PrivateChat.createUserTab = createUserTab;



    xwz.PrivateChat = PrivateChat;

}();