//辅助函数
var Util =  function () {

    var dialog = function (url, width, height, title, id) {
        if (!url) return false;
        width = width || 800;
        height = height || 388;
        title = title || "标题";
        id = "3F67";

        art.dialog.open(url, {
            id: id,
            drag: false,
            lock: true,
            width: width,
            height: height,
            title: title
        });
    };
   

    return {
        dialog: dialog
    }
}();