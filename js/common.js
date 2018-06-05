/**
 * Created by sam on 2015-12-01.
 */
//获取URL参数，jquery方法，使用方法：$.getUrlParam('id');
var H5url = "";
/*ccq
(function ($) {
    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
})(jQuery);
*/
/*
字符串格式化
$.format("ab{0}d","d");
*/
jQuery.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = jQuery.makeArray(arguments);
            args.unshift(source);
            return jQuery.format.apply(this, args);
        };

    if (arguments.length > 2 && params.constructor != Array) {
        params = jQuery.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    jQuery.each(params, function (i, n) {
        if (n == null) {
            n = "";
        }
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};


/*
对话框
*/

var messageBox = {};

messageBox.H5Dialog = function (msg) {
    var dd = dialog();
    dd.content(msg);
    dd.show();

    setTimeout(function () {
        dd.close().remove();
    }, 2000);
}
messageBox.Confirm = function (msg, okFn) {
    var d = dialog({
        title: '提示',
        width: document.body.clientWidth / 4.0,	
        content: msg,
        okValue: '确定',
        ok: function () {
            if (okFn) {
                okFn();
            }
            return true;
        },
        cancelValue: '取消',
        cancel: function () { }
    });
    d.show()
}
/*
提示信息并在3秒后跳转到URL
 */
messageBox.H5DialogSkip = function (msg, url) {
    var dd = dialog();
    dd.content(msg);
    dd.show();
    setTimeout(function () {
        dd.close().remove();
        window.location.href = url;
    }, 3000);
}
/*判断用户是否登录*/
function VerifyUserLogin(Code) {
    if (Code == 401) {
        window.location.href = H5url + "login.html";
        return;
    }
    var userId = getLocalStorage();
    if (!userId) {
        window.location.href = H5url + "login.html";
    }
}



//消息处理,返回成功或失败
ApiMessageHandle = function (json) {
    if (json.Code == 401) {
        VerifyUserLogin(json.Code);
        return false;
    }
    if (json.Code == 1) {
        messageBox.H5Dialog(json.Msg);
        return false;
    }
    return true;
}

/*web请求，统一处理异常
options
{
    path:api路径 如：
    data:请求数据对象 如：
    success:请求成功执行方法 如：
    EnableError:请求数据失败，是否继续执行
    LoadMsg:加载信息提示
}
*/
ApiRequest = function (options) {
    var defaults = {
        EnableError: false,
        cache: false,
        jsonpCallback: 'getjson',
        dataType: 'jsonp',
        type: 'get'
    };
    var opts = $.extend(defaults, options);
    //设置opts参数
	//ccq
    //opts.url = "http://api.app.idx.com.cn" + options.path;
	opts.url = options.path;
    opts.beforeSned = function () {
        options.LoadMsg();
        options.beforeSned();
    };
	//ccq
    //opts.url = "http://api.app.idx.com.cn" + options.path;
    opts.url = options.path;
	
	opts.success = function (json) {
        //异常处理
        if (!ApiMessageHandle(json) && !opts.EnableError) return;
        //UI交互
        options.success(json);
    };
    opts.error= function (e) {
        console.log(JSON.stringify(e));
        if (!$.isEmptyObject(opts.error)) {
            options.error(e);
        }
    }
    //设置用户参数
    var getUserId = window.localStorage.getItem("userinfoid");
    if (getUserId && getUserId > 0) {
        if ($.isEmptyObject(opts.data)) {
            opts.data = {};
        }
        opts.data.userId = getUserId;
    }
  
    // console.log(opts.data)
    $.ajax(opts);
}
/*本地保存用户信息*/
function saveLocalStoreage(obj) {
    localStorage.setItem("userinfoid", obj);
}
/*获取用户信息*/
function getLocalStorage() {
   return localStorage.getItem("userinfoid");
}

//对象转换为url   {param1:value1,param2:value2} to param1=value1&param2=value2
function objToUrlStr(obj) {
    var result = '';
    $.each(obj, function (name, value) {
        result += name + '=' + value + '&';
    });

    var len = result.length;
    //去掉做后一个&
    if (len > 0) {
        result = result.substring(0, len - 1);
    }
    return result;
}

//判断访问终端
var browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}


