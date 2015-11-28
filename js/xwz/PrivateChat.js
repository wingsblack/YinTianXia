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
        //sendPrivateMsg();
    }

    PrivateChat.talkto = function (uid, userData) {
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

    xwz.PrivateChat = PrivateChat;
}();