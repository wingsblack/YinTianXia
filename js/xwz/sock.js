/// <reference path="../../index.html" />
/// <reference path="../plugin/websocket/sockjs.js" />
/// <reference path="../plugin/websocket/stomp.js" />


!function () {

    var __socket = null;

    var _Socket = xwz.Socket = function (url) {
        
        this._socket = new SockJS(url);
        this._client = Stomp.over(this._socket);
        this._client.debug = null;
        this._listen = [];
        this.__listen = [];
        this.url = url;
    }

    _Socket.prototype.isConnection = false;
    _Socket.prototype.listen = [];
    _Socket.prototype.__listen = [];
    _Socket.prototype.name = null;
    _Socket.prototype.pass = null;
    _Socket.prototype.timer = null;
    _Socket.prototype.url = null;

    _Socket.getInstance = function (url) {
        if (__socket == null) {
            __socket = new _Socket(url);
        } 
        return __socket;
    }

   
    _Socket.prototype._ListenChat = function () {
        var chat;

        while ((chat = this._listen.shift()) != null) {
            this._client.subscribe(chat.method, chat.message);
            this.__listen.push(chat);
        }
    }

    _Socket.prototype.connect = function (name, pass) {
        this.name = name;
        this.pass = pass;
        console.log("开始连接")

        var _this = this;
        this._client.connect(name, pass, function () {
            console.log("成功连接")
            _this.isConnection = true;
            _this._ListenChat();
            $("#ytx-loading").hide();
        }, function () {
            console.log("断开连接")
            $("#ytx-loading").show();
            _this.isConnection = false;
            _this.timer = setTimeout(function () {
                _this.connect(name, pass);
            }, 1000);

        })
    }

    _Socket.prototype.RegisteredChat = function (chat) {
        this._listen.push(chat);
        if (this.isConnection) this._ListenChat();
    }

    _Socket.prototype.send = function (api, obj, text) {
        this._client.send(api, obj, text);
    }
    
    _Socket.prototype.dispose = function () {
        var chat;
        while ((chat = this.__listen.shift()) != null) {
            this._client.unsubscribe(chat.method);
            this._listen.push(chat);
        }
        this._client.disconnect();
        this._socket.close();
    }

    _Socket.prototype.reConnection = function () {
        return;
        this.dispose();

        this._socket = new SockJS(this.url);
        this._client = Stomp.over(this._socket);
        this.isConnection = false;
        
        clearTimeout(this.timer);
        this.connect(this.name, this.pass);
        

    }
}();