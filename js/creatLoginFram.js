// JavaScript Document

/****************弹层对象**************************/

var IDXPopWindow = Class.create();

IDXPopWindow.prototype = {
    initialize: function (append, options) {
        this._parent = jQuery(append);/*插入节点*/
        this.SetOptions(options);/*写入参数设置*/
        //this.init();
    },
    init: function () {
        var _hasAppend = this._parent.children('.' + this.options.frameClass);
        if (_hasAppend.size() > 0) {
            _hasAppend.remove();
        }
        this._parent.append('<div class="' + this.options.frameClass + '"></div>');
        this._windowFrame = this._parent.find(':last'); //this._parent.children(':last');
        this._windowFrame.hide();
        this._windowFrame.append('<div class="' + this.options.opacityLayerClass + '"></div>');
        var s = this.getBrowserSize();
        this._windowFrame.css({ 'width': s['width'], 'height': s['height'] });
        if (jQuery.browser.msie && jQuery.browser.version == 6) {
            this._windowFrame.css('position', 'absolute');
        }

        this._windowFrame.append(this.getWindowHtml());
        this._window = this._windowFrame.children(':last');
        if (jQuery.browser.msie && jQuery.browser.version == 6) {
            var marginLeft = 0 - this.options.width * 0.5;
            var top = document.documentElement.scrollTop + (document.documentElement.offsetHeight - this.options.height) * 0.5;
            this._window.css({ 'left': '50%', 'top': top + 'px', 'margin-left': marginLeft + 'px' });
        } else {
            var marginLeft = 0 - this.options.width * 0.5;
            var marginTop = 0 - this.options.height * 0.5;
            this._window.css({ 'left': '50%', 'top': '50%', 'margin-left': marginLeft + 'px', 'margin-top': marginTop + 'px' });
        }

        this._closeBtn = this._window.children('.' + this.options.closeClass);
        var obj = this;
        this._closeBtn.click(function () {
            obj.closeWindow();
        })
    },
    openWindow: function () {
        this._windowFrame.show()
    },
    SetOptions: function (options) {
        this.options = {
            frameClass: 'idx-popwindow-frame',
            opacityLayerClass: 'opacity-layer',
            windowClass: 'idx-popwindow',
            boxClass: 'frame',
            closeClass: 'close',
            frameUrl: '',
            height: 0,/*弹层实际内容高度*/
            width: 0/*弹层实际内容宽度*/
        }
        Extend(this.options, options || {});
    },
    getWindowHtml: function () {
        var html = '';
        html += '<div class="' + this.options.windowClass + '" style="width:' + this.options.width + 'px;height:' + this.options.height + 'px;">';
        html += '<div class="' + this.options.boxClass + '"><iframe src="' + this.options.frameUrl + '" height="' + this.options.height + '" width="' + this.options.width + '" frameborder="0" scrolling="no"></iframe></div>';
        html += '<span class="' + this.options.closeClass + '">X</span>';
        html += '</div>';
        return html;
    },
    getBrowserSize: function () {
        var size = {};
        if (jQuery.browser.msie && jQuery.browser.version == 6) {
            this.clientHeight = document.body.clientHeight;
            this.clientWidth = document.body.clientWidth;
            size['height'] = this.clientHeight + 'px';
            size['width'] = this.clientWidth + 'px';
        } else {
            size['height'] = '100%';
            size['width'] = '100%';
        }
        return size;
    },
    closeWindow: function () {
        //$('.idx-flash-sect').css('visibility','visible');
        this._windowFrame.hide();
    }
};


var delegate = function () {
    //委托的方法列表  
    var ArrayFuction = [];
    //添加方法，相当于+=  
    this.AddF = function (f) {
        if (typeof (f) === "function") {
            ArrayFuction.push(f);
        }
        else {
            throw new Error("委托只能接受方法");
        }
    };
    //移除方法，相当于-=  
    this.RemoveF = function (f) {
        if (typeof (f) === "function") {
            var length = ArrayFuction.length;
            for (var i = 0; i < length; i++) {
                if (ArrayFuction[i] == f) {
                    ArrayFuction = ArrayFuction.splice(i, 1);
                }
            }
        }
        else {
            throw new Error("委托只能接受方法");
        }
    };

    this.RemoveFAll = function () {
        var length = ArrayFuction.length;
        for (var i = 0; i < length; i++) {
            ArrayFuction = ArrayFuction.splice(i, 1);
        }
    }

    //调用委托下所有方法  
    this.Run = function () {
        for (var item in ArrayFuction) {
            ArrayFuction[item]();
        }
    }
}

var default_width = 350;//默认快捷登录层的宽度
var default_height = 430;//默认快捷登录层的高度

var idxbase = new function () {
    this.OtherReturnUrl = "";//联合登陆返回URL
    this.DOMAIN = "http://" + window.location.host.replace("http://", ""); // "http://www.dev.idx.com.cn"; //主站地址
    this.PASSPORTURL = "http://passport.idx.com.cn"; //认证中心地址

    this.LOGINURL = this.PASSPORTURL + "/account/login"; //独立登录页面

    this.LoginSimpleReturnUrl = this.DOMAIN + "/Base/LoginSuccessCallBackPage?msg="; //快捷登录回调地址
	
    this.LoginSimpleUrl = this.PASSPORTURL + "/account/LoginSimple?returnUrl=" + this.LoginSimpleReturnUrl; //快捷登录网址

    this.SetOtherReturnUrl = function (url) {
        this.LoginSimpleUrl = this.LoginSimpleUrl + "&OtherReturnUrl=" + url;
        //快捷登录的弹层
        this._IDXPopWindow = new IDXPopWindow('body', {
            frameUrl: this.LoginSimpleUrl,
            height: default_height, /*弹层实际内容高度*/
            width: default_width/*弹层实际内容宽度*/
        }); //引用gloab.js内
    }

    //快捷登录窗口
    //url：使用联合登陆时的返回地址
    //flag:1：使用快捷登录页面1,2：使用快捷登录页面2（只有用户名和密码方式）
    this.SetOtherReturnUrl = function (url, flag) {
        this.LoginSimpleUrl = this.LoginSimpleUrl + "&OtherReturnUrl=" + url + "&flag=" + flag;
        //快捷登录的弹层
        var w = default_width;
        var h = default_height;
        if (flag == "2") {
            w = default_width;
            h = default_height;
        }
        this._IDXPopWindow = new IDXPopWindow('body', {
            frameUrl: this.LoginSimpleUrl,
            height: h, /*弹层实际内容高度*/
            width: w/*弹层实际内容宽度*/
        }); //引用gloab.js内
    }

    //快捷登录的弹层
    this._IDXPopWindow = new IDXPopWindow('body', {
        frameUrl: this.LoginSimpleUrl,
        height: default_height, /*弹层实际内容高度*/
        width: default_width/*弹层实际内容宽度*/
    }); //引用gloab.js内


    //获取当前用户ID 
    this.GetCurrentUserId = function () {
        var userid = $.ajax({
            url: "/Base/GetCurrentUserId",
            type: "GET",
            cache: false,
            async: false
        }).responseText;
        return parseFloat(userid);
    }

    //获取当前用户的店铺Id
    this.GetCurrentUserShopId = function () {
        var userid = $.ajax({
            url: "/Base/GetCurrentUserShopId",
            type: "GET",
            cache: false,
            async: false
        }).responseText;
        return parseFloat(userid);
    }

    //获取当前用户的昵称
    this.GetCurrentUserNickName = function () {
        var nickname = $.ajax({
            url: "/Base/GetCurrentUserNickName",
            type: "GET",
            cache: false,
            async: false
        }).responseText;
        return nickname;
    }

    //检测是否登录
    this.CheckLogin = function () {
        var userid = this.GetCurrentUserId();
        if (userid > 0) {
            console.log(userid);
            if(idxSetUserId){
                idxSetUserId(userid);
            }
            return true; //已登录
        } else {
            return false;
        }
    }

    //登录弹层
    this.GotoLogin = function () {
        this._IDXPopWindow.init();
        this._IDXPopWindow.openWindow();
    }


    //登录完成以后的方法委托
    /*
    del.AddF(aa);  
    del.AddF(bb);  
    del.RemoveF(1);  
    del.Run();  
    */
    this.Delegate = new delegate();

    this.SetHeaderLoginState = function () {
        $('[idx="header-logined"]').show();
        $('[idx="header-nologin"]').hide();
        var nickname = this.GetCurrentUserNickName();
        $('[idx="header-logined-nickname"]').html(nickname);
    }

    //登录后的回调方法，给/Base/LoginSuccessCallBackPage页面使用
    this.LoginSuccessCallBack = function (data) {
        //alert("LoginSuccessCallBack");
        if (data == "ok") {//登录成功
            //关闭登录层
            this._IDXPopWindow.closeWindow();

            //更新top的登录状态
            this.SetHeaderLoginState();

            //执行前面委托方法
            if (this.Delegate != null) {
                this.Delegate.Run();
                this.Delegate.RemoveFAll();
            }
        }
        else { //登录失败
            switch (data) {
                case "error3":
            }
            alert("登录失败！" + ">>" + data);
        }
    }
}

/*Add by sunkai 2013-08-13*/
/*快捷注册*/
var idxopen = new function() {

    this.DOMAIN = "http://" + window.location.host.replace("http://", ""); // "http://www.dev.idx.com.cn"; //主站地址
    this.PASSPORTURL = "http://passport.idx.com.cn"; //认证中心地址

    this.RegisterSimpleReturnUrl = this.DOMAIN + "/Base/RegisterSuccessCallBackPage?msg="; //快捷登录回调地址

    this.RegisterSimpleUrl = this.PASSPORTURL + "/Account/RegisterSimple?returnUrl=" + this.RegisterSimpleReturnUrl; //快捷登录网址

    //快捷注册的弹层
    this._IDXPopWindow = new IDXPopWindow('body', {
        frameUrl: this.RegisterSimpleUrl,
        height: default_height, /*弹层实际内容高度*/
        width: default_width/*弹层实际内容宽度*/
    }); //引用gloab.js内


    //注册弹层
    this.GotoRegister = function() {
        this._IDXPopWindow.init();
        this._IDXPopWindow.openWindow();
    };

    //注册以后的方法委托
    this.Delegate = new delegate();

    //注册后的回调方法，给/Base/RegisterSuccessCallBackPage页面使用
    this.RegisterSuccessCallBack = function(data) {
        if (data == "ok") { //登录成功
            //关闭登录层
            this._IDXPopWindow.closeWindow();
            //执行前面委托方法
            if (this.Delegate != null) {
                this.Delegate.Run();
                this.Delegate.RemoveFAll();
            }
        } else { //注册失败          
            alert(data);
        }
    };
};
