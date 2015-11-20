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

    /*
        @source 源对象
        @copy 被复制对象
    */
    xwz.apply = function (source, copy) {
        for (var a in copy) {
            if (copy.hasOwnProperty(a)) source[a] = copy[a];
        }
        return source;
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


    var Constructor = function () {
        return this;
    }
    var BaseClass = function () { }

    BaseClass.prototype.constructor = Constructor;

    
    var classes = {};

    var ClassManager = xwz.ClassManager = {

        regClass: function (config) {
            var className = config.className;

        }

    };



    var Loader = xwz.Loader = function () {

    }

    


    xwz.define = function (className,config) {
        return ClassManager.regClass(className,config);
    }


    xwz.inherits = function (sub,base) {
        sub.prototype = new base();
    }

    xwz.Base = BaseClass;

    var DispatchEvent = xwz.DispatchEvent = function () {
        this._events = {};
    }
    

    xwz.inherits(xwz.DispatchEvent, xwz.Base)

    //HTML模版处理
    xwz.HtmlTemplate = {

    }
   
    xwz.Project = {};

    xwz.setConfig = function (config) {
        return xwz.apply(xwz.Project, config);
    }
}());