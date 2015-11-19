/// <reference path="../../index.html" />


!function () {

    var __socket = null;

    var _Socket = xwz.Socket = function (url) {
        this._socket = new SockJS(url);
        this._client = Stomp.over(this._socket);
        this._client.debug = null;
        this._listen = [];
    }

    _Socket.getInstance = function (url) {
        if (__socket == null) {
            __socket = new _Socket(url);
        } else {
           
        }

        return __socket;
    }

    _Socket.prototype.isConnection = false;
    //_Socket.prototype.listen = [];



    _Socket.prototype._ListenChat = function () {
        var chat;

        while ((chat = this._listen.shift()) != null) {
            this._client.subscribe(chat.method, chat.message);
        }
    }

    _Socket.prototype.connect = function (name, pass) {

        var _this = this;
        this._client.connect(name, pass, function () {
            _this.isConnection = true;
            _this._ListenChat();
        }, function () {
            setTimeout(function () {
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
}();