// JavaScript Document
/* 得到字符串的真实长度（双字节换算为两个单字节）*/
function getStrActualLen(sChars){
    return sChars.replace(/[^\x00-\xff]/g,"xx").length;
}
/*滚动到顶部*/
 $(".top2-box").click(function(){
                $('body,html').animate({scrollTop:0},1000);
                return false;
            });
 $('#j-backtop li').hover(function(){
	 $(this).find('.backbox').show();
	 },function(){
	 $(this).find('.backbox').hide();	 		 
		 })
jQuery(function(){  
var jq=jQuery; 
jq(window).scroll(function () { 
if (jq(window).scrollTop() > 0) { 
jq('.backtop').css("visibility","visible");
} else { 
jq('.backtop').css("visibility","hidden"); 
} 
}); 
jq('.backtop').click(function () { 
jq('html,body').animate({ 
scrollTop : '0px' 
}, 200);  
}); 
});
/* 截取固定长度子字符串 sSource为字符串iLen为长度*/
function getInterceptedStr(sSource, iLen){
    if(sSource.replace(/[^\x00-\xff]/g,"xx").length <= iLen){
        return sSource;
    }

    var str = "";
    var l = 0;
    var schar;
    for(var i=0; schar=sSource.charAt(i); i++){
        str += schar;
        l += (schar.match(/[^\x00-\xff]/) != null ? 2 : 1);
        if(l >= iLen)	break;
    } 
    return str;
}
	
/**
*倒计时
* @param leftSecs 剩余秒数
* @param containID 倒计时容器ID
*/
function countTime(leftSecs,containID){
	var interval = 1000;
	var curleftSec = leftSecs;
	var intervalHandle;
	var _contain = document.getElementById(containID);
	var ShowCountDown = function(secs){ 
		//console.log(1)
		var day=Math.floor(secs/(60*60*24)); 
		var hour=Math.floor((secs-day*24*60*60)/3600); 
		var minute=Math.floor((secs-day*24*60*60-hour*3600)/60); 
		var second=Math.floor(secs-day*24*60*60-hour*3600-minute*60); 
		_contain.innerHTML = "还剩<b class=\"time\">"+day+"</b>天<b class=\"time\">"+hour+"</b>小时<b class=\"time\">"+minute+"</b>分钟<b class=\"time\">"+second+"</b>秒"; 
		curleftSec--;
	} 
	intervalHandle = setInterval(function(){
		if(curleftSec>=0)		
			ShowCountDown(curleftSec);
		else{
			clearInterval(intervalHandle);
			window.location.reload();
			//_contain.innerHTML="";
			
		} 
	}, interval); 
} 
/********实时计算输入框内字数长度********/
/*   
length:最大长度 
ele: 输入对象 
callBack： 回调方法，参数len表示当前输入框内容字节数， 方法中的this指向ele对 
autoFire: 初使化自动调用一次 
*/ 
function input_max(maxlength, ele, showEle, callBack,autoFire){ 
	if(ele.addEventListener){ 
		ele.addEventListener('input', change, false); 
	}else{ 
		ele.attachEvent('onpropertychange', function(){if(window.event.propertyName == "value"){ change();}}); 
	} 
	
	function change(){
		var len = Math.ceil(byteLength(ele.value)/2); 
		len = (len <= maxlength) ? len : maxlength - len; 
		callBack(showEle,len,maxlength)
	}; 
	
	function byteLength(b) { 
		if (typeof b == "undefined") { return 0 } 
		var a = b.match(/[^x00-x80]/g); 
		return (b.length + (!a ? 0 : a.length)) 
	}; 
	
	//自动调用一次 
	if(autoFire){change()}; 
};
	 
// 回调函数 
function input_max_callBack(showEle,len,maxlen){ 
	var input = document.getElementById('personality-message'), note = showEle;  
	var content = input.value;
	if (len >= 0){ 
		note.innerHTML = maxlen-len;  
		content = input.value;
	}else{  
		content = getInterceptedStr(content,maxlen*2);
		input.value = content; 
	}  
}  

/************************************************************/
var arrSeltTag = {}; /*已选定标签数组*/
arrSeltTag['official'] = []; /*官方标签*/
arrSeltTag['customer'] = []; /*自定义标签*/

var userAgent = navigator.userAgent.toLowerCase();
jQuery.browser = {
    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    safari: /webkit/.test(userAgent),
    opera: /opera/.test(userAgent),
    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
};
var mobilebrowser={
	versions:function(){
	var u = navigator.userAgent, app = navigator.appVersion;
	return {
		trident: u.indexOf('Trident') > -1, //IE内核
		presto: u.indexOf('Presto') > -1, //opera内核
		webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		mobile:!!u.match(/AppleWebKit.*Mobile.*/)&&!!u.match(/AppleWebKit/), //是否为移动终端
		ios: !!u.match(/(i[^;]+\;(U;)? CPU.+Mac OS X)/), //ios终端
		android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
		iPad: u.indexOf('iPad') > -1, //是否iPad
		webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language:(navigator.browserLanguage || navigator.language).toLowerCase()
};  
/*判断使用那套导航样式*/
function checkScreen(){
	var _body = jQuery('#body');

	var _header = _body.children('.header');
	var _mainMenu = _body.children('.main-menu');
	var _idxMainView = _body.children('.idx-mainview');
	if(_mainMenu.is('.veasy-main-menu')){
		setTimeout("setMainMenuHeight(580)",500);
		return; 
	} 
	
	var screenWidth = screen.width;
	if(screenWidth<1025 || mobilebrowser.versions.mobile){ 
		_body.width('980').children().width('980');
		_idxMainView.addClass('nopadiglft220');
		_header.addClass('header-1024');
		_mainMenu.addClass('h-main-menu'); 
		if(mobilebrowser.versions.mobile)
			_header.addClass('header-mobile'); 
	}
	setTimeout("setMainMenuHeight(580)",500); 
} 
 
 
/*添加收藏夹*/
function addFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
/*将索引数组的值，以固定的分割字符，拼为字符串*/
function arrToStr(arr, splitWord) {
    var value = '';
    if (jQuery.isArray(arr) && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                value += arr[i];
            } else {
                value += '|' + arr[i];
            }
        }
    }
    return value;
}
/*打开关闭 激活优惠券表单*/
function switchAddCouponForm(display) {
    var _switch = jQuery('[actarget="switchAddCouponForm"]');
    var _form = jQuery('[node-name="addCouponForm"]');
    var _close = jQuery('[actarget="closeAddCouponForm"]', _form);
    switch (display) {
        case "block": _form.show(); break;
        case "none": _form.hide(); break;
        default: break;
    }
    _switch.click(function () {
        if (_form.is(':hidden')) {
            _form.show()
        } else {
            _form.hide()
        }
    });
    _close.click(function () {
        if (_form.is(':hidden')) {
            _form.show()
        } else {
            _form.hide()
        }
    })
}
/**
* 回到页面顶部
* @param acceleration 加速度
* @param time 时间间隔 (毫秒)
**/
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;

    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;

    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;

    // 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
    // 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));

    // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

    // 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}
/**
* 获取鼠标在页面上的位置
* @param ev		触发的事件
* @return			x:鼠标在页面上的横向位置, y:鼠标在页面上的纵向位置
*/
function getMousePoint(ev) {
    // 定义鼠标在视窗中的位置
    var point = {
        x: 0,
        y: 0
    };

    // 如果浏览器支持 pageYOffset, 通过 pageXOffset 和 pageYOffset 获取页面和视窗之间的距离
    if (typeof window.pageYOffset != 'undefined') {
        point.x = window.pageXOffset;
        point.y = window.pageYOffset;
    }
    // 如果浏览器支持 compatMode, 并且指定了 DOCTYPE, 通过 documentElement 获取滚动距离作为页面和视窗间的距离
    // IE 中, 当页面指定 DOCTYPE, compatMode 的值是 CSS1Compat, 否则 compatMode 的值是 BackCompat
    else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
        point.x = document.documentElement.scrollLeft;
        point.y = document.documentElement.scrollTop;
    }
    // 如果浏览器支持 document.body, 可以通过 document.body 来获取滚动高度
    else if (typeof document.body != 'undefined') {
        point.x = document.body.scrollLeft;
        point.y = document.body.scrollTop;
    }

    // 加上鼠标在视窗中的位置
    point.x += ev.clientX;
    point.y += ev.clientY;

    // 返回鼠标在视窗中的位置
    return point;
}
function sliderVertical(e, containerID, moverID) {
    if (!e) e = window.event;
    var _eventTarget = (e.srcElement) ? e.srcElement : e.target;
    var eventarget_pos = jQuery(_eventTarget).position();
    var _eventTargetParent = _eventTarget.parentNode;
    var rangeBox_height = jQuery(_eventTargetParent).height();
    var slider_range = rangeBox_height - $(_eventTarget).height();

    if (jQuery.browser.msie) {/*阻止IE下mouseup事件丢失*/
        if (_eventTarget.setCapture) _eventTarget.setCapture();
    }

    var _container = jQuery('#' + containerID);
    var _mover = jQuery('#' + moverID);
    var mover_height = _mover.height();
    var container_height = _container.height();


    /*获取鼠标事件坐标*/
    var start_point = getMousePoint(e);
    var end_point = null;
    /*绑定事件*/
    if (mover_height > container_height) {
        if (jQuery.browser.msie) {
            document.attachEvent('onmousemove', rangeStar);
            document.attachEvent('onmouseup', rangeEnd);
        } else {
            document.addEventListener('mousemove', rangeStar, true);
            document.addEventListener('mouseup', rangeEnd, true);
        }
    }

    function rangeStar(e) {
        if (!e) e = window.event;
        /*禁止文本被选中*/
        if (document.all) {
            document.getElementsByTagName('body').onselectstart = function () { return false }; //for ie
        } else {
            jQuery('body').addClass('noselectstart')
        }

        end_point = getMousePoint(e);
        var change_pos = end_point.y - start_point.y;
        var new_top = eventarget_pos.top + change_pos;
        if (new_top >= 0 && new_top < slider_range) {
            var change_percentage = (change_pos / slider_range).toFixed(2);
            jQuery(_eventTarget).css('top', new_top);
            var mover_top = parseInt(_mover.css('top'));
            mover_top = 0 - parseInt((new_top / slider_range) * (mover_height - container_height));
            _mover.css('top', mover_top);
        }
        (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
    }
    function rangeEnd(e) {
        if (!e) e = window.event;
        end_point = getMousePoint(e);

        /*取消禁止文本被选中**/
        if (document.all) {
            document.getElementsByTagName('body').onselectstart = function () { }; //for ie
        } else {
            jQuery('body').removeClass('noselectstart')
        }

        /*取消事件邦定*/
        if (jQuery.browser.msie) {
            if (_eventTarget.releaseCapture) _eventTarget.releaseCapture(); /*阻止IE下mouseup事件丢失*/
            document.detachEvent('onmouseup', rangeEnd);
            document.detachEvent('onmousemove', rangeStar);
        } else {
            document.removeEventListener('mouseup', rangeEnd, true);
            document.removeEventListener('mousemove', rangeStar, true);
        }
        (e.stopPropagation) ? e.stopPropagation() : e.cancelBubble = true;
    }
}
/*打开或关闭创意库标签 */
function switchCLTags(elemID, alwysClose) { 
    var _node = jQuery('#' + elemID);
    var _parent = _node.parent();
    height = _parent.height();
    if (alwysClose == true) {
        _node.css('height', height)
    } else {
        if (_node.height() == height) {
            _node.css('height', 'auto')
        } else {
            _node.css('height', height)
        }
    }
}
/*获取指定名称的cookie的值*/
function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
}
/*设置指定名称的cookie的值*/
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString()));
}
/*文字滚动*/
/*function txtRoll(speed,roll,roll1,roll2){ 
	var _roll=jQuery('#'+roll); 
	if(_roll.size()<1) return;
	
	var _roll1=jQuery('#'+roll1);
	var _roll2=jQuery('#'+roll2);
	_roll2.html(_roll1.html());
	
	function Marquee(){ 
        var sl= _roll.scrollLeft(); 
		if(_roll2.width()-sl<=0){
			_roll.scrollLeft(sl-=_roll1.width());
		}else{
           _roll.scrollLeft(++sl);
		}
	}
	var MyMar=setInterval(Marquee,speed);
	_roll.hover(
		function(){ if(MyMar) clearInterval(MyMar)},
		function(){	MyMar=setInterval(Marquee,speed)}
	);	 
}*/
/*顶部搜索,搜索结果页跳转*/
function setSearchKeyWord(target,iptId){
	window.location.href = 'http://www.idx.com.cn/1.htm?k='+escape(jQuery('#'+iptId).val())+'&kl=1';
}
/*设置制定dom节点为fixed*/
function fix(fixID,boxID,fixClass){
	console.log(fixID+"--"+boxID);
	var _fixed_nav = jQuery('#'+fixID);
	var _fixed_box = jQuery('#'+boxID);
	var commodityfixTop = _fixed_box.position().top;
	var commoditywidth = _fixed_box.width();
	
	_fixed_nav.css('width',commoditywidth);
	jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() > commodityfixTop){ 
			if(!_fixed_nav.is('.'+fixClass))
				_fixed_nav.addClass(fixClass)
		}else{
			_fixed_nav.removeClass(fixClass)
		}
	})
}
	
(function ($) {
    $.extend({
        iptTips: function (iptTipO) {/*input输入框的文字提示*/
            var options = {
                tipsSel: '',
                isAwaysShow: false
            }
            if (iptTipO) { var o = $.extend(options, iptTipO) }
            var _iptTips = $(o.tipsSel);
            _iptTips.each(function () {
                var _iptTip = $(this);
                var _input = _iptTip.prev();
                var ipt_text = _iptTip.val();
                if (ipt_text != '') {
                    _iptTip.hide();
                } else {
                    _iptTip.show();
                }
                _input.focusout(function () {
                    var val = _input.val();
                    if (val == '') _iptTip.show();
                });
                _input.focusin(function () {
                    _iptTip.hide();
                });
                _iptTip.click(function () {
                    _iptTip.hide();
                    _input.focus();
                });
            })
        },
        isArray: function (v) {
            return Object.prototype.toString.apply(v) === '[object Array]';
        },
        showFastSearchBox:function (boxO) {
            var options = {
                jumpUrl: '',
                boxSwitchSel: '[actarget="fastSearchSwitch"]',
                boxSel: '[node-name="fastSearchBox"]',
                iptKeywordSel: 'input[type="text"]',
                iptTypeSel: 'input[type="hidden"]',
                dropSwitchSel: '[actarget="dropSwitch"]',
                selTypeTxtSel: '[node-name="seltTypeTxt"]',
                typeListSel: '[node-name="typeList"]',
                typesSel: 'li',
                curTypeClass: '',
                hoverTypeClass: ''
            }
            if (boxO) { var o = $.extend(options, boxO) }

            var _boxSwitch = $(o.boxSwitchSel);
            if (_boxSwitch.size() == 0) return;

            var _parent = _boxSwitch.parent();
            var _searchBox = $(o.boxSel, _parent);
            var _iptKeyword = $(o.iptKeywordSel, _searchBox), _iptType = $(o.iptTypeSel, _searchBox);
            var _dropSwitch = $(o.dropSwitchSel, _searchBox);
            var _selTypeTxt = $(o.selTypeTxtSel, _searchBox);
            var _typeList = $(o.typeListSel, _searchBox), _types = $(o.typesSel, _typeList);

            _boxSwitch.click(function () {
                if (_searchBox.is(':hidden')) {
                    _searchBox.show();
                    _iptKeyword.val('').focus();
                } else {
                    _searchBox.hide();
                }
            });

            _dropSwitch.click(function () {
                _typeList.show().mouseleave(function () { $(this).hide() });
            });

            _types.click(function () {
                var _type = $(this);
                _selTypeTxt.text(_type.text());
                _iptType.val(_type.attr('typeid'));
                if (!_type.is('.' + o.curTypeClass)) {
                    _type.addClass(o.curTypeClass).siblings().removeClass(o.curTypeClass)
                }
                _typeList.hide();
                _iptKeyword.focus();
            }).hover(
				function () { $(this).addClass(o.hoverTypeClass) },
				function () { $(this).removeClass(o.hoverTypeClass) }
			);

            _iptKeyword.keyup(function (e) {
                var keyword = _iptKeyword.val();
                if (keyword.length > 0) {
                    switch (e.keyCode) {
                        case 13:
                            alert(keyword + ',' + _iptType.val())
                            break;
                    }
                }
            });
        },
        showPayConfirmWin:function (winO) {
            var options = {
                appendBoxSel: 'body',
                linkComplete: '#',
                linkProblem: '#',
                linkRepay: '#'
            }
            if (winO) { $.extend(options, winO) }
            var html = '<div class="popwindow-payment-frame">';
            html += '<div class="opacity-layer"></div>';
            html += '<div class="popwindow-payment">';
            html += '<div class="hgroup"><h3>支付订单</h3><span class="close">X</span></div>';
            html += '<div class="content">';
            html += '<p class="txt">请您在新打开的网上银行页面进行支付，支付完成前请不要关闭该窗口。</p>';
            html += '<p class="btns clearfix"><a href="' + options.linkComplete + '" class="btn ml linkbtn-2">已完成支付</a><a href="' + options.linkProblem + '" class="btn linkbtn-1">支付遇到问题？</a></p>';
            html += '<a href="' + options.linkRepay + '" class="link-repay">返回重新选择银行</a>';
            html += '</div></div></div>';
            var _box = $(options.appendBoxSel);
            _box.append(html);
            var _win = _box.children(':last');
            var _close = $('.close', _win);
            _close.click(function () { _win.remove() })
        },
        refreshMiniCart:function (cartO) {/*头部购物车*/
            var options = {
                getAjaxUrl: '',
                delAjaxUrl: '',
                maxN:5,
                boxId:'site-top-cart-box',
                cartId:'site-top-cart',
				totleNumSel:'[node-name="totleNum"]',
				cartLink:'http://www.idx.com.cn/ShopCart',
                itemHoverClass:'hover',
				animateTime:300
            }

            if (cartO) { var _o = $.extend(options, cartO) }
			var _box = $('#'+ _o.boxId), _cart = $('#' + _o.cartId);
			var _totleNum = _box.find(_o.totleNumSel);
			var _loading = null;
			var lave_num = 0;
			
			loading();	
			getCartData(false);	
			
			_box.bind({
				'mouseenter':function(){   
					_cart.show().animate({opacity:1},_o.animateTime) 
				},
				'mouseleave':function(){  
					_cart.stop().animate({opacity:0},_o.animateTime*0.5,function(){_cart.hide() }) 
				}
			})
			
			function emptyCartHtml(){
				return '<div class="cart-empty"><i class="s-icon none"></i><span>购物车里什么也没有！</span></div>';
			}
			function cartBtmHtml(isEmpty,laveNum){
				if(isEmpty){
					return  '<div class="cart-bottm empty"><a href="'+_o.cartLink+'">&gt;&gt;查看我的购物车&lt;&lt;</a></div>';				
				}else{
					return (laveNum>0)? '<div class="cart-bottm"><span class="totle">购物车里还有<em class="hightlight-orange">'+laveNum+'</em>件商品</span><a href="'+_o.cartLink+'" class="count">去结算</a></div>':
										'<div class="cart-bottm"><a href="'+_o.cartLink+'" class="count">去结算</a></div>';
				}
			} 
			function refreshTotleNum(num){
				_totleNum.html(num)
			}
			function loading(){
				_cart.html('<div class="cart-loading">Loading...</div>');
				_loading = _cart.children(':first');
			}
			function catListHtml(data){
				var html = '';
				refreshTotleNum(data.length); 
                var length = (data.length > _o.maxN) ? _o.maxN : data.length; 				
				
				lave_num = (data.length - _o.maxN)>0 ? (data.length - _o.maxN):0;
                for (var i = 0; i < length; i++) {
                    var dataitem = data[i];
					var single_cost = parseFloat(dataitem.Pirce)*dataitem.WorkNum; 
					html +='<ul class="item clearfix" dataID="' + dataitem.ShopCartId + '">\n'+
							'<li class="img"><a href="'+dataitem.WorkUrl+'" title="'+dataitem.ShoesName+'"><img src="'+dataitem.WorkImgUrl+'" width="40" height="40" alt="'+dataitem.ShoesName+'"></a></li>\n'+
							'<li class="intro">\n'+
								'<p class="text-overflow"><a href="'+dataitem.WorkUrl+'" title="'+dataitem.ShoesName+'">'+dataitem.ShoesName+'</a></p>\n'+
								((dataitem.Size=='' || dataitem.Size==null || dataitem.Size==undefined) ?'':'<p class="hightlight-gray">'+dataitem.Size+'码</p>\n')+
							'</li>\n'+
							'<li class="toolbar">\n'+
								'<p class="price hightlight-orange">￥'+single_cost.toFixed(2)+'</p>\n'+
								'<p class="delt clearfix" act-type="delt"><i class="s-icon"></i>删除</p>\n'+
							'</li>\n'+
						'</ul>';  
                }
                return html;
			}
			function handleItems(){
				var _items = _cart.find('[dataID]');
				_items.each(function(i,elem){
					var _item = $(elem);
					var _deltBtn = _item.find('[act-type="delt"]');
					var dataID = _item.attr('dataID');
					_deltBtn.bind('click',function(){
						deltItem(_item,dataID)	
					}) 
				});
			}
			function deltItem(elem,dataid){
				$.ajax({
                    url: _o.delAjaxUrl + '?id=' + dataid,
                    type: "get",
                    data: '',
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "deltResult",
                    success: function (msg) {
                        var result = msg[0].result;
                        switch (result) {
                            case 'nologin':
                                alert('尚未登录，请先登录');
                                break;
                            case 'true':
                                elem.remove(); 
								getCartData(true)
                                break;
                            case 'false':
                                alert('删除异常');
                                break;
                            default: break;
                        };
                    }
                })
			}
			function getCartData(isRefresh){ 
				$.ajax({ 
					url: _o.getAjaxUrl,
                	type: "get",
                    data: '',
                    dataType: "jsonp",
                    jsonp: "callback",
                    jsonpCallback: "jsonMiniCart",
                    success: function (json) {
						_loading.remove()
						if (json == undefined || json.length == 0) {
							_cart.html(emptyCartHtml()+cartBtmHtml(true));
							refreshTotleNum(0);
                        }else{
                            var list_html = '<div class="cart-list">'+catListHtml(json)+'</div>';  
							_cart.html(list_html+cartBtmHtml(false,lave_num)); 
							handleItems()  
                        }  
					}
				});
			}
        },
		homeBanner:function(hbO){
			var options = {
				box:null,
				bannerBox:null,
				bannerWidth:1903,
				bannerHeight:450,
				btnBox:null,
				curBannerClass:'',
				selectBtnClass:'',
				intervalTime:4000,
				animateTime:500,
				isAsynchronous: false,
                ajaxUrl:''
			}
			if(hbO){ var _o = $.extend(options,hbO)}
			
			var _banners ,_btns;
			var intervalHandle;
			var totle_num, cur_index, next_index;
			
			
			if (!_o.isAsynchronous){
				setBoxHeight();
				initBanner();
				intervalHandle = setInterval(singeShow, _o.intervalTime);
                bindEvent()
			}else{
				$.ajax({
					url:_o.ajaxUrl + '?v=' + Math.random(),
                    type:'get',
                    dataType: 'script',
                    success:function(json){
						var json_length = bannerJson.length;
						if (json_length == 0) return;
						
						var banner_html='',btn_html=''; 
						for (var i = 0; i < json_length; i++){ 
							if (bannerJson[i].linkurl == "") {
								banner_html += '<div class="banner" index="'+i+'" style="background-color:#'+bannerJson[i].bgcolor+';">\n'+
												'<div class="item"><img src="'+bannerJson[i].imgurl+'" alt="'+bannerJson[i].title+'" /></div>\n'+
											'</div>\n'; 
							} else {
								banner_html += '<div class="banner" index="'+i+'" style="background-color:#'+bannerJson[i].bgcolor+';">\n'+
													'<div class="item">\n'+
														'<a href="'+bannerJson[i].linkurl+'" target="_blank" title="'+bannerJson[i].title+'"><img src="'+bannerJson[i].imgurl+'" alt="'+bannerJson[i].title+'" /></a>\n'+
													'</div>\n'+
												'</div>\n';  
							}
							btn_html += '<span>'+(i + 1)+'</span>' ;
						} 
						_o.bannerBox.html(banner_html);
						_o.btnBox.html(btn_html); 
						_o.btnBox.css('margin-left',(0-_o.btnBox.innerWidth()*0.5));
						
						setBoxHeight();
						initBanner();
						intervalHandle = setInterval(singeShow, _o.intervalTime);
                        bindEvent()
					}
				})
			} 
			function setBoxHeight(){  
				_o.box.height(_o.bannerHeight)
				/*banner图片自适应高度宽度*/
				/*var proportion = $(window).width()/_o.bannerWidth; 
				var h = _o.bannerHeight*proportion ;
				_o.box.height(h)*/
			}
            function initBanner(){
                _banners = _o.bannerBox.children()
                _btns = _o.btnBox.children();
                totle_num = _btns.size();

                _btns.first().addClass(_o.selectBtnClass);

                _banners.each(function (i,elem) { 
                    if (i == 0) {
                        $(elem).addClass(_o.curBannerClass);
                    } else {
                        $(elem).css({'opacity':0});
                    }
                    cur_index = 0; 
                });
				_btns.eq(cur_index).addClass(_o.selectBtnClass)
            }
            function singeShow(){ 
				next_index = (cur_index + 1) < totle_num ? (cur_index + 1) : 0;
				var _curBanner = _banners.filter('[index="'+cur_index+'"]');
				var _nextBanner = _banners.filter('[index="'+next_index+'"]');
				
				_btns.removeClass(_o.selectBtnClass).eq(next_index).addClass(_o.selectBtnClass);
				
				cur_index = next_index;
				_nextBanner.stop().addClass(_o.curBannerClass).animate({
                    opacity: 1.0
                }, _o.animateTime, function () {
                    _banners.not(':eq('+next_index+')').css({'opacity':0});
                });
                _curBanner.stop().removeClass(_o.curBannerClass).animate({
                    opacity: 0
                }, _o.animateTime);
            }
            function bindEvent(){
				_btns.each(function(i,elem){
					var _btn = $(this); 
					 
					_btn.bind({
						'mouseenter':function(){
							if(intervalHandle)
								clearInterval(intervalHandle); 
								
							if(_btn.is('.'+_o.selectBtnClass)) return;	 							
							if(_o.box.has(':animated').size()>0)
								_banners.stop();  
								
							var _curBanner = _banners.filter('.'+_o.curBannerClass); 
							var _nextBanner = _banners.filter('[index="'+i+'"]'); 	
							_btns.removeClass(_o.selectBtnClass).eq(i).addClass(_o.selectBtnClass);
							cur_index = i;
							_nextBanner.addClass(_o.curBannerClass).animate({
								opacity:1.0
							},_o.animateTime,function(){ 
								_banners.not(':eq('+i+')').css({'opacity':0});
							});
							_curBanner.removeClass(_o.curBannerClass).animate({
								opacity:0
							},_o.animateTime);  
						},
						'mouseleave':function(){  
							intervalHandle = setInterval(singeShow,_o.intervalTime);
						}
					}) 
				})
            }
			
			$(window).resize(function(){setBoxHeight();}) 
		}
    });
    $.fn.extend({
        mailAutoComplete: function (AutoCompleteO) {
            var options = {
                _this: $(this),
                boxClass: '',
                listClass: '',
                focusClass: '',
                appendTo: '', /*被插入mailListBox的元素*/
                mailArr: [],
                textHint: false, //文字提示的自动显示与隐藏
                hintText: ""
            }
            var o = $.extend({}, options, AutoCompleteO || {});

            var _appendToNode = $(o.appendTo);
            var newArr = mailArr = o.mailArr;

            /*创建邮件内部列表内容*/
            function createHtml(text, arr, curindex) {
                var maillist_html = '';
                if ($.isArray(arr)) {
                    $.each(arr, function (i, n) {
                        if (i === curindex) {
                            maillist_html += '<li node-name="autoComplete-mail-item" class="' + o.focusClass + '" id="autoCompleteMail_' + i + '">' + text + arr[i] + '</li>';
                        } else {
                            maillist_html += '<li node-name="autoComplete-mail-item" id="autoCompleteMail_' + i + '">' + text + arr[i] + '</li>';
                        }
                    });
                }

                return maillist_html;
            }
            var index = -1/*标志触发上下键时，当前选中的邮箱地址的index*/, iptval/*输入框当前value*/;
            $(this).each(function () {
                var _iptMail = $(this);
                if ($('.' + o.boxClass).size() > 0) return;

                var _appendToBox = _iptMail.parents(o.appendTo)
                var ipt_width = _iptMail.outerWidth(); 
			    _appendToBox.append('<div class="' + o.boxClass + '" style="width:' + ipt_width + 'px;display:none;"></div>');
                var _autoMailBox = _appendToBox.children(':last');
                if (o.textHint && o.hintText != '') {
                    _autoMailBox.append('<p class="autoComplete-mail-tips">' + o.hintText + '</p>');
                }
                _autoMailBox.append('<ul class="' + o.listClass + '"></ul>');
                var _autoMailList = _autoMailBox.children('ul:last');
                var mail_live_str = ''; /*保存鼠标滑过的当前邮箱地址 */

                _iptMail.focus(function () {
                    index = -1;
                    $(this).keyup(function (e) {/*当有键被按下*/
                        var value = $.trim($(this).val());
                        iptval = value;
                        if (/@/.test(value)) {
                            iptval = value.replace(/@.*/, "");
                        }
                        if (value.length > 0) {/*如果输入框有值，且触发以下按键*/
                            switch (e.keyCode) {
                                case 38: /*向上*/
                                    if (index <= 0) {
                                        index = newArr.length;
                                    }
                                    index--;
                                    break;
                                case 40: /*向下*/
                                    if (index >= newArr.length - 1) {
                                        index = -1;
                                    }
                                    index++;
                                    break;
                                case 13: /*回车*/
                                    if (index > -1 && index < newArr.length) {/*如果当前有激活列表*/
                                        $(this).val($("#autoCompleteMail_" + index).text());
                                    }
                                    break;
                                default:
                                    if (/@/.test(value)) {
                                        index = -1;
                                        //获得@后面的值
                                        //iptval = value.replace(/@.*/, "");
                                        //创建新匹配数组
                                        var site = value.replace(/.*@/, "@");
                                        newArr = $.map(mailArr, function (n) {
                                            var reg = new RegExp(site);
                                            if (reg.test(n)) {
                                                return n;
                                            }
                                        });
                                    } else {
                                        newArr = mailArr;
                                    }
                                    break;
                            }
                            if (_autoMailBox.is(':hidden')) _autoMailBox.show();
                            var autoMailHtml = createHtml(iptval, newArr, index);
                            if (autoMailHtml == '') {
                                _autoMailBox.hide()
                            }
                            _autoMailList.html(autoMailHtml);

                            if (e.keyCode === 13) {/*回车*/
                                _autoMailBox.hide()
                            }
                        } else {
                            _autoMailBox.hide()
                        }
                    })
                }).blur(function () {
                    _autoMailBox.hide();
                });
                /*绑定mouseover事件*/
                $('[node-name="autoComplete-mail-item"]').live("mouseover", function () {
                    index = parseInt($(this).attr("id").split("_")[1]);
                    mail_live_str = $(this).text();
                    _autoMailList.children("." + o.focusClass).removeClass();
                    $(this).addClass(o.focusClass);
                });

                _autoMailList.bind("mousedown", function () {
                    _iptMail.val(mail_live_str);
                });
            });
        },
        tab:function (tabOption) {
            var options = {
                tabMenuSel: '',
                tabBtns: '',
                tabContsSel: '',
                mSelectedClass: '',
                mNormalClass: '',
                eventtype: 'click',
                dotab: function (op, eTarget, parent) {
                    var tabconts = $(parent).find(op.tabContsSel); 
                    var index = eTarget.prevAll().filter(op.tabBtns).length;
                    if (!eTarget.hasClass(op.mSelectedClass)) {
                        eTarget.addClass(op.mSelectedClass).siblings('.' + op.mSelectedClass).removeClass(op.mSelectedClass).addClass(op.mNormalClass);
                        tabconts.hide().eq(index).show();
                    }
                },
                callback: function (op, eTarget, parent) { }
            }
            if (tabOption) {
                $.extend(options, tabOption);
            }

            return this.each(function (i, elem) {
                var tabparent = $(elem);
                var _o = options;
                var tabmenu = tabparent.find(_o.tabMenuSel);
                var tabbtns = tabmenu.find(_o.tabBtns); 
                tabbtns.bind(_o.eventtype, function () {
                    _o.dotab(_o, $(this), elem);
                    _o.callback(_o, $(this), elem);
                })
            });
        },
        imitateSelect: function (selectOption) {
            var options = {
                _this: $(this),
                txtSel: '',
                iptSel: '',
                btnSel: '',
                listSel: '',
                itemSel: '',
                itemValueAttr: '',
				callback:function(ipt,choiceElem){}
            }
            if (selectOption) { var o = $.extend(options, selectOption) }
            o._this.each(function () {
                var _box = $(this);
                var _txt = $(o.txtSel, _box);
                var _ipt = $(o.iptSel, _box);
                var _btn = $(o.btnSel, _box);
                var _list = $(o.listSel, _box);
                var _items = $(o.itemSel, _list);

                _btn.click(function () {
                    _list.show();
                });
                _box.mouseleave(function () {
                    _list.hide();
                })
                _items.live('click',function () {
                    var item_txt = $(this).text();
                    var item_value = $(this).attr(o.itemValueAttr);
                    _txt.text(item_txt);
                    _ipt.val(item_value); 
					if(!$(this).is('.cur')){
						$(this).addClass('cur').siblings().removeClass('cur')
					}
                    if (_ipt.is('[actype="change"]')) {
                        getChange(_ipt.attr('id'))
                    }
                    _list.hide();
					o.callback(_ipt,$(this))
                });
            });
            return $(this)
        },
        hoverMoveCover: function (moveO) {
            var options = {
                _this: $(this),
                coverSel:'[node-name="cover"]',
                orgTop:0,
                orgLeft:0,
                toTop:0,
                toLeft:0,
                time: 300 
            }
            if (moveO) { var o = $.extend(options, moveO) }
            o._this.each(function () {
                var _curItem = $(this);
                var _cover = $(o.coverSel, _curItem);
                _curItem.hover(
					function () { _cover.stop().animate({ top: o.toTop + 'px', left: o.toLeft + 'px' }, { queue: false, duration: o.time }); },
					function () { _cover.stop().animate({ top: o.orgTop + 'px', left: o.orgLeft + 'px' }, { queue: false, duration: o.time }); }
				)
                return $(this)
            });
        },
        addOfficialTags: function (officialTO) {
            var options = {
                _this: $(this),
                tagBtnSel: '',
                tagIdAttr: '',
                appendBoxSel: '',
                seltTagsBoxSel: '',
                seltTagsBoxAttr: '',
                seltTagsBoxClass: 'selected-tags clearfix'
            }
            if (officialTO) { var o = $.extend(options, officialTO) }

            o._this.each(function () {
                var _tagBtns = $(o.tagBtnSel, $(this));
                var _appendBox = $(this).parents(o.appendBoxSel);
                var _seltTagsBox = $(o.seltTagsBoxSel, _appendBox);

                var _iptSeltOfficialTag = $('[node-name="iptOfficialTag"]', _seltTagsBox), _iptSeltCustomTag = $('[node-name="iptCustomTag"]', _seltTagsBox);
                var _seltTagsList = _seltTagsBox.children(':last');
                var _seltTags = _seltTagsList.children('[tagid]');

                if (_iptSeltOfficialTag.val() != '' && arrSeltTag['official'].length == 0) {
                    var arr_seltTag = _iptSeltOfficialTag.val().split('|')
                } else {
                    var arr_seltTag = arrSeltTag['official'];
                }

                _seltTags.each(function () {
                    var _seltTag = $(this);
                    var _deltBtn = _seltTag.children(':last');
                    _deltBtn.click(function () {
                        var tid = _seltTag.attr(o.tagIdAttr);
                        for (var i = 0; i < arr_seltTag.length; i++) {
                            if (arr_seltTag[i] == tid) {
                                arr_seltTag.splice(i, 1);
                                _seltTag.remove();
                                arrSeltTag['official'] = arr_seltTag;
                            }
                        }
                        _iptSeltOfficialTag.val(arrToStr(arr_seltTag, '|'));
                    })
                });

                _tagBtns.click(function () {
                    var _tagBtn = $(this);
                    var tagid = _tagBtn.attr(o.tagIdAttr), tagtxt = _tagBtn.text();

                    var value_seltOfficialTag = _iptSeltOfficialTag.val(), value_seltCustomTag = _iptSeltCustomTag.val();
                    if (value_seltOfficialTag.match(tagid) == null && value_seltCustomTag.match(tagtxt) == null) {
                        arr_seltTag.push(tagid);
                        _iptSeltOfficialTag.val(arrToStr(arr_seltTag, '|'));

                        _seltTagsList.append('<span tagid="' + tagid + '" class="tag"><em>' + tagtxt + '</em><em class="delt">X</em></span>');
                        var _newAddSeltTag = _seltTagsList.children(':last');
                        var _deltBtn = _newAddSeltTag.children(':last');
                        _deltBtn.click(function () {
                            var delt_tagid = _newAddSeltTag.attr(o.tagIdAttr);
                            for (var i = 0; i < arr_seltTag.length; i++) {
                                if (arr_seltTag[i] == delt_tagid) {
                                    arr_seltTag.splice(i, 1);
                                    _newAddSeltTag.remove();
                                    arrSeltTag['official'] = arr_seltTag;
                                }
                            }
                            _iptSeltOfficialTag.val(arrToStr(arr_seltTag, '|'));
                        });
                        arrSeltTag['official'] = arr_seltTag;
                    } else {
                        alert("无法添加！该标签已存在")
                    }
                })
                return $(this)
            });
        },
        addCustomTags: function (customTO) {
            var options = {
                _this: $(this),
                iptSel: '',
                addBtnSel: '',
                appendBoxSel: '',
                seltTagsBoxSel: '',
                seltTagsBoxAttr: '',
                checkUrl: '/Users/MaxCharLength',
                seltTagsBoxClass: 'selected-tags clearfix'
            }
            if (customTO) { var o = $.extend(options, customTO) }

            return o._this.each(function () {
                var _ipt = $(o.iptSel, $(this)), _addBtn = $(o.addBtnSel, $(this));
                var _appendBox = $(this).parents(o.appendBoxSel);
                var _seltTagsBox = $(o.seltTagsBoxSel, _appendBox);

                var _iptSeltCustomTag = $('[node-name="iptCustomTag"]', _seltTagsBox);
                var _seltTagsList = _seltTagsBox.children(':last');
                var _seltTags = _seltTagsList.children('span.tag').not('[tagid]');

                if (_iptSeltCustomTag.val() != '' && arrSeltTag['customer'].length == 0) {
                    var arr_addTag = _iptSeltCustomTag.val().split('|')
                } else {
                    var arr_addTag = arrSeltTag['customer'];
                }

                _seltTags.each(function () {
                    var _seltTag = $(this);
                    var _deltBtn = _seltTag.children(':last');
                    _deltBtn.click(function () {
                        var delt_tagtext = _seltTag.children('em:first').text();
                        for (var i = 0; i < arr_addTag.length; i++) {
                            if (arr_addTag[i] == delt_tagtext) {
                                arr_addTag.splice(i, 1);
                                _seltTag.remove();
                                arrSeltTag['customer'] = arr_addTag;
                            }
                        }
                        _iptSeltCustomTag.val(arrToStr(arr_addTag, '|'));
                    })
                });

                _addBtn.click(function () {
                    var ipt_val = _ipt.val();
                    var value_seltCustomTag = _iptSeltCustomTag.val();
                    if (ipt_val != '') {
                        $.ajax({
                            url: o.checkUrl,
                            data: { str: ipt_val },
                            type: "post",
                            success: function (result) {
                                if (result) {/*标签大于10个字节*/
                                    alert("自定义标签不能超过十个字节");
                                } else {
                                    /*判断是否已存在于被选定的官方标签中*/
                                    var _seltOfficialTag = _seltTagsList.children('[tagid]');
                                    var existed = false;
                                    _seltOfficialTag.each(function () {
                                        if ($(this).children('em:first').text() == ipt_val) existed = true;
                                    })
                                    /*end*/
                                    /*判断是否满足添加自定义标签的条件*/
                                    if (!existed && value_seltCustomTag.match(ipt_val) == null && arr_addTag.length < 5) {
                                        arr_addTag.push(ipt_val);
                                        _iptSeltCustomTag.val(arrToStr(arr_addTag, '|'));

                                        _seltTagsList.append('<span class="tag"><em>' + ipt_val + '</em><em class="delt">X</em></span>');
                                        var _newAddSeltTag = _seltTagsList.children(':last');
                                        var _deltBtn = _newAddSeltTag.children(':last');

                                        _deltBtn.click(function () {
                                            var delt_tagtext = _newAddSeltTag.children('em:first').text();
                                            for (var i = 0; i < arr_addTag.length; i++) {
                                                if (arr_addTag[i] == delt_tagtext) {
                                                    arr_addTag.splice(i, 1);
                                                    _newAddSeltTag.remove();
                                                    arrSeltTag['customer'] = arr_addTag;
                                                }
                                            }
                                            _iptSeltCustomTag.val(arrToStr(arr_addTag, '|'));
                                        });
                                        arrSeltTag['customer'] = arr_addTag;
                                    } else {
                                        alert("无法添加！自定义标签数量最多为5，且不能重复")
                                    }
                                }
                            }
                        })
                    }
                });
            })
        },
        menuLevel: function (menuO) { 
            var options = {
                mSonSel: '[node-name="menuSon"]',
                mSwitch: '[node-name="menuSwitch"]',
                closeSwitchClass: '',
                openSwitchClass: '',
                callback: function () { }
            }
            if (menuO) { var o = $.extend(options, menuO) }
            return $(this).each(function () {
                var _menuParent = $(this);
                var _menuSwitch = _menuParent.children(o.mSwitch);
                var _menuSon = _menuParent.children(o.mSonSel);
                if (_menuSon.has('.cur').size() > 0) {
                    _menuSon.show();
                    _menuSwitch.removeClass(o.closeSwitchClass + ' ' + o.openSwitchClass).addClass(o.openSwitchClass);
                }
                _menuSwitch.click(function () {
                    if (_menuSwitch.is('.' + o.closeSwitchClass)) {
                        _menuSwitch.removeClass(o.closeSwitchClass).addClass(o.openSwitchClass);
                        _menuSon.show();
                        o.callback();
                    } else if (_menuSwitch.is('.' + o.openSwitchClass)) {
                        _menuSwitch.removeClass(o.openSwitchClass).addClass(o.closeSwitchClass);
                        _menuSon.hide();
                        o.callback();
                    }
                })
            })
        },
        starRating: function (ratingO) {
            var options = {
                starSel: '[node-name="star"]',
                iptSel: '[node-name="ratingScore"]',
                starValAttr: 'index',
                initVal: 1,
                lightClass: '',
                grayClass: ''
            }
            if (ratingO) { var o = $.extend(options, ratingO) }

            function initStar(val, input, stars) {

                input.val(val);
                stars.removeClass(o.lightClass + " " + o.grayClass).addClass(o.grayClass)
                for (var i = 0; i < val; i++) {
                    stars.eq(i).removeClass(o.grayClass).addClass(o.lightClass)
                }
            }

            return $(this).each(function () {
                var _box = $(this);
                var _stars = $(o.starSel, _box);
                var _ipt = $(o.iptSel, _box);
                var cur_value = o.initVal;
                initStar(cur_value, _ipt, _stars);
                _box.mouseleave(function () {
                    initStar(cur_value, _ipt, _stars);
                });
                _stars.hover(
					function () {
					    var index = parseInt($(this).attr(o.starValAttr));
					    _stars.filter(':lt(' + index + ')').removeClass(o.lightClass + " " + o.grayClass).addClass(o.lightClass);
					    _stars.filter(':gt(' + (index - 1) + ')').removeClass(o.lightClass + " " + o.grayClass).addClass(o.grayClass);
					},
					function () {
					    var index = parseInt($(this).attr(o.starValAttr));
					    _stars.filter(':lt(' + index + ')').removeClass(o.lightClass + " " + o.grayClass).addClass(o.grayClass);
					}
				).click(function () {
				    var index = parseInt($(this).attr(o.starValAttr));
				    cur_value = index;
				    initStar(cur_value, _ipt, _stars);
				});
            })
        },
        photoScorll: function (doneOption) {
            var options = {
                _this: $(this),
                prevBtnSel: '',
                nextBtnSel: '',
                moveNodeSel: '',
                isResize: false,
                boxWidth: 0,
                timeout: 300
            }
            if (doneOption) { var o = $.extend(options, doneOption) }

            var _moveNode = $(o.moveNodeSel, o._this), _children = _moveNode.children();
            var totle_width = parseInt(_children.eq(0).width()) * _children.size();
            _moveNode.width(totle_width);

            var _prevBtn = $(o.prevBtnSel, o._this), _nextBtn = $(o.nextBtnSel, o._this);
            if (o.isResize) o.boxWidth = parseInt(o._this.width());
            if (o.boxWidth > totle_width) {
                _prevBtn.hide();
                _nextBtn.hide();
            }
            $(window).resize(function () {
                if (o.isResize) o.boxWidth = o._this.width();
                if (o.boxWidth > totle_width) {
                    _prevBtn.hide();
                    _nextBtn.hide();
                } else {
                    _prevBtn.show();
                    _nextBtn.show();
                }
            });

            _prevBtn.click(function () {
                if (o.isResize) o.boxWidth = parseInt(o._this.width());
                var left = parseInt(_moveNode.css('left'));
                var next_left = left + o.boxWidth;
                if (next_left > 0 || next_left == 0) {
                    next_left = 0;
                }
                _moveNode.animate({ left: next_left }, o.time)
            });
            _nextBtn.click(function () {
                if (o.isResize) o.boxWidth = o._this.width();
                var left = parseInt(_moveNode.css('left'));
                var next_left = left - o.boxWidth;
                if ((next_left + totle_width) > 0) {
                    _moveNode.animate({ left: next_left }, o.time)
                }
            })
        },
        bannerOpacity: function (bannerOption) {
            var options = {
                _this: $(this),
                btnsContainerClass: '',
                bannerContainerClass: '',
                bannerItemClass: '',
                curClass: 'cur',
                time: 0,
                animatetime: 0
            }
            if (bannerOption) { var o = $.extend(options, bannerOption); }

            var interval;
            var _bannerContainer = o._this.find('.' + o.bannerContainerClass);
            var container_height = parseInt(_bannerContainer.height());
            var _bannerItems = _bannerContainer.find('.' + o.bannerItemClass);
            initBanner(_bannerItems);
            interval = setInterval(singeShow, o.time);

            var _btnsContainer = o._this.find('.' + o.btnsContainerClass);
            var _btns = _btnsContainer.children();
            _btns.eq(0).addClass(o.curClass);

            _btns.each(function (i) {
                var _btn = $(this);
                var _banner = _bannerItems.filter('[index="' + i + '"]');
                _btn.bind('mouseover', function () {
					if(_btn.is('.'+o.curClass)) return;	 
                    if (_bannerContainer.has(':animated').size() > 0)
                        _bannerItems.stop();
                    if (interval)
                        clearInterval(interval);

                    var _curBannerItem = _bannerItems.filter('.' + o.curClass);
                    _btns.removeClass(o.curClass).eq(i).addClass(o.curClass);
                    _banner.addClass(o.curClass).css('top', 0).animate({
                        opacity: 1.0
                    }, o.animatetime, function () {
                        _bannerItems.not(':eq(' + i + ')').css({ 'opacity': 0, 'top': (0 - container_height) });
                    });
                    _curBannerItem.removeClass(o.curClass).animate({
                        opacity: 0
                    }, o.animatetime, function () {
                        interval = setInterval(singeShow, o.time);
                    });
                })
            })
            function singeShow() {
                var _curBannerItem = _bannerItems.filter('.' + o.curClass);
                var cur_index = parseInt(_curBannerItem.attr('index'));
                var next_index = (cur_index + 1) < _bannerItems.size() ? (cur_index + 1) : 0;
                var _nextBannerItem = _bannerItems.filter('[index="' + next_index + '"]');
                _btns.removeClass(o.curClass).eq(next_index).addClass(o.curClass)
                _nextBannerItem.stop().addClass(o.curClass).css('top', 0).animate({
                    opacity: 1.0
                }, o.animatetime, function () {
                    _bannerItems.not(':eq(' + next_index + ')').css({ 'opacity': 0, 'top': (0 - container_height) });
                });
                _curBannerItem.stop().removeClass(o.curClass).animate({
                    opacity: 0
                }, o.animatetime, function () {
                });
            }
            function initBanner(_items) {
                var size = _items.size();
                _items.each(function (i) {
                    var _item = $(this);
                    _item.attr('index', i).css({ 'position': 'absolute', 'top': 0 });
                    if (i == 0) {
                        _item.addClass(o.curClass).css('top', 0)
                    } else {
                        _item.css({ 'opacity': 0, 'top': (0 - container_height) });
                    }
                });
            }
        },
        idxAmouent: function (amouentO) {
            var options = {
                decreaseSel: '',
                increaseSel: '',
                iptSel: '',
                maxm: -1, /*为-1表示不设最高值*/
                minm: 1,
                callback: function () { }
            }
            if (amouentO) { $.extend(options, amouentO) }
            return $(this).each(function () {
                var _box = $(this);
                var o = options;
                var _decrease = $(o.decreaseSel, _box), _increase = $(o.increaseSel, _box);
                var _ipt = $(o.iptSel, _box);
                _decrease.click(function () {
                    var value = parseInt(_ipt.val());
                    var temp = value - 1;
                    if (temp < o.minm) {
                        temp = value
                    }
                    _ipt.val(temp);
                    o.callback();
                });
                _increase.click(function () {
                    var value = parseInt(_ipt.val());
                    var temp = value + 1;
                    if (o.maxm != -1) {
                        if (temp > o.maxm) {
                            temp = value
                        }
                    }
                    _ipt.val(temp);
                    o.callback();
                });
            })
        },
        changePreviewPic: function (preO) {
            var options = {
                previewId: '',
                seltClass: '',
                callback: function () { }
            }
            if (preO) { $.extend(options, preO) }
            return $(this).each(function () {
                var _target = $(this);
                var o = options;
				_target.bind({
					'click':function(){ 
						if (!_target.is('.' + o.seltClass)) {
							var _preview = $('#' + o.previewId);
							var src = _target.attr('prevsrc');
							_target.addClass(o.seltClass).siblings().removeClass(o.seltClass);
							if (_preview.is('img')) {
								_preview.attr('src', src)
							} else {
								_preview.children('img').attr('src', src)
							}
							o.callback()
						}
					},
					'mouseenter':function(){
						if (!_target.is('.' + o.seltClass)) {
							var _preview = $('#' + o.previewId);
							var src = _target.attr('prevsrc');
							_target.addClass(o.seltClass).siblings().removeClass(o.seltClass);
							if (_preview.is('img')) {
								_preview.attr('src', src)
							} else {
								_preview.children('img').attr('src', src)
							}
							o.callback()
						}
						
					} 
				}) 
            })
        },
        photoTabig: function (tabigO) {
            var options = {
                _this: $(this),
                boxSel: '',
                listSel: '',
                prevBtnSel: '[act="prevone"]',
                nextBtnSel: '[act="nextone"]',
                time: 400,
                isAuto: false,
                interval: 5000
            }
            if (tabigO) { var o = $.extend(options, tabigO) }

            var _box = $(o.boxSel, o._this), _list = $(o.listSel, o._this);
            var _prevBtn = $(o.prevBtnSel, o._this), _nextBtn = $(o.nextBtnSel, o._this);

            var _listItms = _list.children();
            var _firstItm = _list.children(':first'), _lastItm = _list.children(':last');
            _firstItm.clone().appendTo(_list);
            _lastItm.clone().prependTo(_list);
            _listItms = _list.children();

            var box_width = _box.width();
            var num = _listItms.size();
            var single_width = _firstItm.width();
            var total_width = single_width * num;
            var total_pages = Math.floor(total_width / box_width);
            var star_page = 2, cur_page = star_page, end_page = total_pages - 1;
            _list.css({ 'width': total_width, 'left': (0 - (star_page - 1) * box_width) });

            if (!(total_width > box_width)) {
                _prevBtn.hide();
                _nextBtn.hide();
            }

            if (o.isAuto)
                var interval_handle = setInterval(nextMove, o.interval);

            _nextBtn.click(function () {
                if (o.isAuto && interval_handle)
                    clearInterval(interval_handle);

                if (!_list.is(':animated')) {
                    nextMove();
                    if (o.isAuto) interval_handle = setInterval(nextMove, o.interval);
                }
            });
            _prevBtn.click(function () {
                if (o.isAuto && interval_handle)
                    clearInterval(interval_handle);
                if (!_list.is(':animated')) {
                    prevMove();
                    if (o.isAuto) interval_handle = setInterval(nextMove, o.interval);
                }
            });
            function nextMove() {
                if (cur_page < total_pages) {
                    var next_page = cur_page + 1;
                }
                var next_pos = 0 - (next_page - 1) * box_width;
                _list.animate({ left: next_pos }, o.time, function () {
                    if (next_page == total_pages) {
                        cur_page = star_page;
                        _list.css('left', (0 - (cur_page - 1) * box_width))
                    } else {
                        cur_page = next_page;
                    }
                });
            }
            function prevMove() {
                if (cur_page > 1) {
                    var next_page = cur_page - 1;
                }
                var next_pos = 0 - (next_page - 1) * box_width;
                _list.animate({ left: next_pos }, o.time, function () {
                    if (next_page < star_page) {
                        cur_page = end_page;
                        _list.css('left', (0 - (cur_page - 1) * box_width))
                    } else {
                        cur_page = next_page;
                    }
                });
            }
        },
		dropMenu:function(dmO){/*下拉菜单*/
			var options ={
				_box:$(this),
				switchSel:'',
				menuSel:'',
				openSwitchClass:'',
				time:300
			}
			if (dmO) { var _o = $.extend(options, dmO)}
			 
			var _switch = $(_o.switchSel,_o._box);			
			var _menu =  $(_o.menuSel,_o._box);
			if(_menu.size()==1){
				_o._box.bind({
					'mouseenter':function(){ 
						_switch.addClass(_o.openSwitchClass);
						_menu.stop().show().animate({opacity:1},_o.time) 
					},
					'mouseleave':function(){ 
						_switch.removeClass(_o.openSwitchClass); 
						_menu.stop().animate({opacity:0},_o.time*0.5,function(){_menu.hide()}) 
					}
				})
			}
		},
		tmpShoeModlScorll:function(doneOption){
			var options = {
				_this:$(this),
				prevBtnSel:'',
				nextBtnSel:'',
				moveNodeSel:'',
				boxWidth:0,
				timeout:0,
				intervaltime:0				
			}
			if(doneOption){ var o = $.extend(options,doneOption)}

			var _prevBtn = o._this.find(o.prevBtnSel),_nextBtn = o._this.find(o.nextBtnSel); 
			var _moveNode = o._this.find(o.moveNodeSel).eq(0);
			
			var _aMoveChild = _moveNode.children();
			var _firstChild = _moveNode.children(':first'),_lastChild = _moveNode.children(':last'); 
			 _firstChild.clone().appendTo(_moveNode);
			 _lastChild.clone().prependTo(_moveNode);
			 _aMoveChild = _moveNode.children();
			var totle_width = _aMoveChild.size()*_aMoveChild.eq(0).width();
			var totle_pages = Math.floor(totle_width/o.boxWidth);
			var star_page =2,cur_page = star_page,end_page = totle_pages-1; 
			_moveNode.css({'width':totle_width,'left':(0-(star_page-1)*o.boxWidth)});
			
			if(!(totle_width>o.boxWidth)){
				_prevBtn.hide();
				_nextBtn.hide();
			}
			
			var interval = setInterval(nextMove,o.intervaltime); 
			
			_nextBtn.click(function(){
				if(interval){
					clearInterval(interval)
				}
				if(!_moveNode.is(':animated')){ 
					nextMove(); 
					interval = setInterval(nextMove,o.intervaltime);
				}
			});
			_prevBtn.click(function(){
				if(interval){
					clearInterval(interval)
				}
				if(!_moveNode.is(':animated')){ 
					prevMove(); 
					interval = setInterval(nextMove,o.intervaltime);
				}
			});
			function nextMove(){
				if(cur_page<totle_pages){
					var next_page = cur_page+1;
				}
				var next_pos = 0-(next_page-1)*o.boxWidth;
				_moveNode.animate({left:next_pos},o.timeout,function(){
					if(next_page==totle_pages){
						cur_page = star_page;
						_moveNode.css('left',(0-(cur_page-1)*o.boxWidth))
					}else{
						cur_page = next_page;
					} 
				});				
			} 
			function prevMove(){
				if(cur_page>1){
					var next_page = cur_page-1;
				} 
				var next_pos = 0-(next_page-1)*o.boxWidth;
				_moveNode.animate({left:next_pos},o.timeout,function(){ 
					if(next_page<star_page){
						cur_page = end_page;
						_moveNode.css('left',(0-(cur_page-1)*o.boxWidth))
					}else{
						cur_page = next_page;
					}
					
				});				
			}
		}
    }); 
   
    /*头部购物车*/
    $.refreshMiniCart({
        getAjaxUrl: 'http://www.idx.com.cn/ShopCart/GetMyShopCarts',
        delAjaxUrl: 'http://www.idx.com.cn/ShopCart/DeleteMyShopCart'
    });
	/*头部快速搜索*/
	$('#site-top-search-input').bind({
		'focusin':function(){
			var _box = $(this).parents('[node-name="siteTopSearchBox"]');
			_box.addClass('searchActive') 
		},
		'focusout':function(){
			var _box = $(this).parents('[node-name="siteTopSearchBox"]');
			_box.removeClass('searchActive')
		} 
	});
	/*头部导航、我的爱定客等下拉菜单*/
	$('[node-name="dropMenuBox"]').each(function(i,elem){
		$(elem).dropMenu({
				switchSel:'[node-name="dropMenuTop"]',
				menuSel:'[node-name="dropMenuCont"]',
				openSwitchClass:'hover',
				time:300
			})
	}); 
})(jQuery)

/*网站文字 滚动公告 */
/*txtRoll(25,'rollBox','roll1','roll2');*/
 
//下拉框联动事件需要调用外部的方法定义
function getChange(id) { }
var isIE = (document.all) ? true : false; 
var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6); 
/*class 对象定义创建公用对象*/
var Class = {
	create: function() {
		return function() { this.initialize.apply(this, arguments); }
	}
} 
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
} 
var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}  

//js内部调用的全局域名配置
var GlobalConfig = {
    WWWURL: "http://www.idx.com.cn",
    PassportURL: "http://passprot.idx.com.cn"
}