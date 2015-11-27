/// <reference path="xwz.js" />


!function () {

    var dropdown = xwz.dropdown = {
        user: null
    };


    dropdown.init = function () {

        this.elm = $("#dropdown");

        this.initEvent();

    }

    dropdown.setData = function (data) {
        this.user = data;
    }



    dropdown.initEvent = function () {

        this.elm.find("a.biaojimenyou").click(function () {

            $.post(xwz.API_HOST +  '/app/account/updatebyadmin',
                { uid: dropdown.user.uid, sleepwalk: '1' },
                function (e) {
                    this.user.onSleepWalk()
                }.bind(this));


        }.bind(this))
    }

}();