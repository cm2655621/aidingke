// JavaScript Document

var nowProductCode = "";
var selname = "inpA";
var cidA = "";
var uid = ""; //userid
var ccid = "";
var wid = "";

function Initialize(userId, prodKey, category, workId, cid) {
	//判断是否是ie浏览器，
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		console.log("是ie浏览器")
	//	location.href = "http://www.idx.com.cn/CustomizingFlash/" + prodKey;
	} else  if(navigator.userAgent.indexOf("Firefox") > -1){
		console.log("是火狐浏览器")
	//	location.href = "http://www.idx.com.cn/CustomizingFlash/" + prodKey;		
	}

	uid = userId;
	ccid = category;
	wid = workId;
	if (cid == "1") { //判断是否是设计师
		cidA = cid;
	}
	var browser = { //初始化 判断设备
		versions: function () {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
				iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') === -1, //是否web应该程序，没有头部与底部
				weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
				qq: u.match(/\sQQ/i) === " qq" //是否QQ
			};
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};

	if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
		browserPlatform = "phone";
	} else {
		browserPlatform = "PC";
	}

	nowProductCode = prodKey;
	idxSetUserId(userId); //idxApi传入userid

	isLoading = true;
	//控制页面初始化
	pageInit(prodKey);
	//标题初始化
	pageHeadInit(prodKey, workId);
	//时间注册
	addAction();
	//加载模型
	var IntervalId_loadModel = setInterval(function () {
		if (isReadLoadModel) {
			clearInterval(IntervalId_loadModel);
			idxLoadModel(prodKey, workId, category);
		} else {
			return;
		}

	}, 300);

	

}

function addAction() {
	"use strict";
	// 加入购物车
	if (browserPlatform === "phone") { //判断设备

		$(".toBuyCar").on("touchstart", function () {
			var worknum = +$(".detail-countAmount").text(), //鞋子数量
				$sizeLi = $("#size-lib").find("ul li.active");
			var sizeName = "";
			var sizeCode = "";
			if ($sizeLi[0]) {
				sizeName = $sizeLi.data("sizename"); //鞋子真实尺码
				sizeCode = $sizeLi.data("sizecode"); //鞋子的尺码编号
			}

			var param4 = 1;
			if (Platform === "idx") {
				param4 = 1;
			} else if (Platform === "tm") {
				param4 = 3;
			} else if (Platform === "peek") {
				param4 = 12;
			}

			var paramJson1 = {
				"param1": nowProduct.productId,
				"param2": "",
				"param3": "",
				"param4": param4, //作品来源,1:主站 2:狼队 3:天猫 4:兵王 5:QQ彩贝 6:雅虎 7:新浪 8:卡当 1008:堆糖网 12:peek
				"param5": "",
				"param6": "",
				"param7": 'mobilephone', //终端类型：pc, mobilephone, pad
				"param8": "js+",
				"param9": "",
				"param10": ""
			};

			//idxApi-添加购物车
			idxDoAddToCart(APPKEY, "", ScribleInfo.idea, "1", paramJson1, "", sizeCode, sizeName, worknum, "");
		});
	} else { //PC
		// 加入购物车带workid
		$(".addToCarA").off('click').on('click', function () {
			var sizeName = "";
			var sizeCode = "";
			var worknum = parseInt($(".inp2").val()); //lf
			var $sizeLia = $("#sele1").val();
			var $sizeLiaA = $("#sele1").children();
			for (var i = 0; i < $sizeLiaA.length; i++) {
				if ($($sizeLiaA[i]).text() == $sizeLia) {
					sizeName = $($sizeLiaA[i]).data("sizename");
					sizeCode = $($sizeLiaA[i]).data("sizecode");
				}
			}
			// console.log(worknum, sizeName, sizeCode);
			var paramJson1 = {
				"param1": nowProduct.productId,
				"param2": "",
				"param3": "",
				"param4": 1, //作品来源,1:主站 2:狼队 3:天猫 4:兵王 5:QQ彩贝 6:雅虎 7:新浪 8:卡当 1008:堆糖网
				"param5": "",
				"param6": "",
				"param7": 'mobilephone', //终端类型：pc, mobilephone, pad
				"param8": "js+",
				"param9": "",
				"param10": ""
			};
			//idxApi-添加购物车
			idxDoAddToCartByWorkId(workid_globe, APPKEY, "", ScribleInfo.idea, "1", paramJson1, "", sizeCode, sizeName, worknum, "");

		});
		//加入购物车
		$(".addToCar").off('click').on('click', function () {
			var sizeName = "";
			var sizeCode = "";
			var worknum = parseInt($(".inp2").val()); //lf
			var $sizeLia = $("#sele1").val();
			var $sizeLiaA = $("#sele1").children();
			for (var i = 0; i < $sizeLiaA.length; i++) {
				if ($($sizeLiaA[i]).text() == $sizeLia) {
					sizeName = $($sizeLiaA[i]).data("sizename");
					sizeCode = $($sizeLiaA[i]).data("sizecode");
				}
			}
			// console.log(worknum, sizeName, sizeCode);
			var paramJson1 = {
				"param1": nowProduct.productId,
				"param2": "",
				"param3": "",
				"param4": 1, //作品来源,1:主站 2:狼队 3:天猫 4:兵王 5:QQ彩贝 6:雅虎 7:新浪 8:卡当 1008:堆糖网
				"param5": "",
				"param6": "",
				"param7": 'mobilephone', //终端类型：pc, mobilephone, pad
				"param8": "js+",
				"param9": "",
				"param10": ""
			};

			//idxApi-添加购物车
			idxDoAddToCart(APPKEY, "", ScribleInfo.idea, "1", paramJson1, "", sizeCode, sizeName, worknum, "");
		});
	}
	// 加入购物车计数器
	if (browserPlatform === "phone") { //判断设备

		$(".detail-countReduce").on("touchstart", function () {
			if ($(this).hasClass("disable")) {
				return;
			}
			var qn = ".detail-countAmount";
			var q = !!parseInt($(qn).text()) ? parseInt($(qn).text()) : 1;
			if (q > 1) {
				$(qn).text(q - 1);
				if (q - 1 == 1) {
					$(this).addClass("disable");
				}
			} else {
				return;
			}
		});
		$(".detail-countAdd").on("touchstart", function () {
			if ($(this).hasClass("disable")) {
				return;
			}
			$(".detail-countReduce").removeClass("disable");
			var qn = ".detail-countAmount";
			var q = !!parseInt($(qn).text()) ? parseInt($(qn).text()) : 1;
			$(".detail-countAmount").text(q + 1);
		});
	} else { //PC
		//lf
		$(".spa1").off("click").on("click", function () {
			var $inp2 = !!parseInt($(".inp2").val()) ? parseInt($(".inp2").val()) : 1;
			if ($inp2 >= 99) {
				$(".inp2").val(99);
				return;
			}
			$(".inp2").val($inp2 + 1);
		});
		$(".spa2").off("click").on("click", function () {
			var $inp2 = !!parseInt($(".inp2").val()) ? parseInt($(".inp2").val()) : 1;
			if ($inp2 <= 1) {
				$(".inp2").val(1);
				return;
			}
			$(".inp2").val($inp2 - 1);
		});
	}

	// 加入购物车关闭选择
	$(".size-head .icon").on("touchstart", function () {
		$("#size-lib").addClass("dn");
	});
}

/*
$(function () {
	//ccq
	//getVersion();//触发获取系统版本号
	//ccq
	isLoading = true;
	
	pageInit();
	
	pageHeadInit();
	
	//设置用户id
	idxSetUserId($.getUrlParam('userid'));
	
	addAction();
	
	
});
*/

function pageHeadInit(pc, workid) {
	//var pc = $.getUrlParam('productcode');
	if (pc === null) {
		pc = "";
	}

	//var workid = $.getUrlParam('workid');
	if (workid === null || workid === '' || workid === undefined) {
		workid = 0;
	}

	$.ajax({
		//ccq
		//url: "http://api.app.idx.com.cn/apiproduct/GetProductName?productCode=" + pc + "&workid=" + workid,
		url: IDX_INFO.getProductName.replace("{productCode}", pc).replace("{workid}", workid),
		type: "get",
		dataType: "json",
		//jsonp: "callback",
		//jsonpCallback: "getjson",
		success: function (json) {
			if (json.Code == "0") {
				if (browserPlatform === "phone") {
					$("#productname").html(json.Data.productname);
				} else {
					$(".shoeName").html(json.Data.productname);
					$(".shnae").val(json.Data.productname);
				}
				ScribleInfo.name = json.Data.productname;
			} else {
				console.log(json.Msg);
			}
		}
	});

}
var stepSwitcher = $("#J_StepSwitcher"),
	stepContent = $(".content-wrap"),
	sysPicArr = [];

function pageInit(productcode) {
	var step_left = 0,
		currentStep,
		stepIndicator = stepSwitcher.find(".step-ind");

	//读取app数据并初始化
	//$.ajax({
	//    url: "http://api.app.idx.com.cn/apiproduct/GetAppFlashInfo?productCode=" + $.getUrlParam('productcode'),
	//    type: "get",
	//    dataType: "jsonp",
	//    jsonp: "callback",
	//    success: function (json) {
	//        Init(json);
	//    },
	//    error: function () {
	//        console.log("获取定制信息错误.");
	//    }
	//});
	ApiRequest({
		//ccq
		//path: '/apiproduct/GetAppFlashInfo?productCode='+ $.getUrlParam('productcode'),
		path: IDX_INFO.getAppFlashInfo.replace("{productCode}", productcode),
		jsonpCallback: 'getAppFlashInfo',
		// dataType:'json', 
		success: function (data) {
			if (data.Code === 0) {
				Init(data.Data);
				//PC新增图库左右翻页 lf
				if (browserPlatform === "PC") { //判断设备
					offPicList(); //初始化官方图片列表
					//图库一级列表
					$(".seoff").on("change", function () {
						$(".searches").val(""); //清空搜索框					
						$(".cuinp").val(1); //将计数框重置为1
						var selval = $(this).find("option:selected").val();
						var selid = $(this).find("option:selected").attr("data-id");
						var selind = $(this).find("option:selected").index();
						offpicl(selid, "", z);
						selpicl(selind);
					})
					//图库二级列表
					$(".seoffB").on("change", function () {
						$(".searches").val(""); //清空搜索框					
						$(".cuinp").val(1); //将计数框重置为1					
						var selval = $(this).find("option:selected").val();
						var selidB = $(this).find("option:selected").attr("data-id");
						var selind = $(this).find("option:selected").index();
						offpicl("", selidB, z);
					})
					//使用ENTER键进行搜索
					$(".searches").keyup(function () {
						$(".cuinp").val(1);
						if (event.keyCode == 13) {
							searchPic(1);
						}
					})
					if (cidA == "1") { //判断是否是设计师
						mypicA();
					}

					if ($(".custom-scroller").hasClass("tuya-scroller") == false) {
						// console.log($(".custom-scroller").hasClass("tuya-scroller"));
						// var checkLoginA = setInterval(function () {
						// 	if(userId){
						// 		clearInterval(checkLoginA);
						// 	}

						if (userId === "" || userId === undefined || userId === null) {
							idxGotoLogin();
							return;
						}

						// },1000)

					}
				};

			}
		}
	});

	stepContent.on("click", function (e) {
		var colorItem = $(e.target).closest(".color-list li");
		if (colorItem[0]) {
			var colorlist = colorItem.parent();
			data = JSON.parse($(e.target).closest(".prd-customise").attr("data-info"));
			colorlist.find("li").removeClass("selected");
			colorItem.addClass("selected");

			var setID = data.id,
				objType = data.type,
				texture = null,
				picType = null,
				picId = null,
				color = null;

			var material_data;
			if (objType == "1") {
				texture = color = "";
				var color_data = JSON.parse(colorItem.attr("data-color"));
				color = color_data.id;
				//ccq
				//changeColor(setID, objType, texture, picType, picId, color);
				material_data = JSON.parse(colorItem.attr("data-material"));
				texture = material_data.id;
				idxChangeColor(setID, texture, color);

			} else if (objType == "3") {
				material_data = JSON.parse(colorItem.attr("data-material"));
				texture = material_data.ImgUrl;
				picType = 'idxSys';
				picId = material_data.ImgID;
				color = '';
				//ccq
				//changeColor(setID, objType, texture, picType, picId, color);
				idxAddtato(texture, picId);
			} else if (objType == "4") {
				texture = color = "";
				material_data = JSON.parse(colorItem.attr("data-material"));
				texture = material_data.id;
				var color_data = JSON.parse(colorItem.attr("data-color"));
				color = color_data.id;
				// picType = 'idxSys';
				//picId = material_data.ImgID;
				//alert(colorItem.attr("data-color"));
				//ccq
				//changeColor(setID, objType, texture, picType, picId, color);
				idxChangeColor(setID, texture, color);
			}
		}


	});

	//----------------------------------------
	stepSwitcher.on("click", function (e) {
		var step = $(e.target).closest("li");
		if (step[0]) {
			var content = stepContent.find(".prd-customise").eq(step.index());
			stepSwitcher.find("li").removeClass("selected");
			step.addClass("selected");
			stepContent.find(".prd-customise").hide();
			content.show();
			//ccq
			//changeSet(step.attr("data-setid"));
			idxChangeLayer(step.attr("data-setid"));

			if (browserPlatform === "phone") { //判断设备 lf
				$(".content-wrap").find(".next,.prev").show();
				if (content.find(".xs-row").length >= 2) {
					$(".content-wrap").find(".prev").hide();
				} else {
					$(".content-wrap").find(".next,.prev").hide();
				}
				stepIndicator.html(step.attr("data-name"))
					.css({
						"display": "block",
						"left": step.offset().left,
						"marginLeft": (45 - stepIndicator.outerWidth()) / 2 + "px"
					});
				step_left = step[0].offsetLeft;
				currentStep = step;

				var scrollBody = content.find(".custom-scroller");
				scrollBody.each(function () {
					var body = $(this),
						scroller = body.data("scroller");
					if (!scroller) {
						scroller = new IScroll(this, {
							scrollX: true,
							snap: true,
							click: true
						});
						scroller.doScrollEnd = function (eobj) {
							checkPagePreNext(eobj.currentPage.pageX, (eobj.pages.length - 1));
						}
						if (body.hasClass("tuya-scroller")) {
							scroller.on("scrollEnd", function () {
								loadMaterialPage(this.currentPage.pageX, body.find(".xs-content"));
							});
						}

						if (body.hasClass("mypic-scroller")) {
							scroller.on("scrollEnd", function () {
								if (browserPlatform === "phone") {
									loadMyPicByPage(this.currentPage.pageX, body.find("#myPicContent"));
								} else {
									loadMyPicByPage(this.currentPage.pageX, body.find(".myPicContent"));
								}
							});
						}


						body.data("scroller", scroller);
					} else {
						scroller.refresh();
					}
				});
			}



			borderEvent();
		}
	});

	if (browserPlatform === "phone") { //判断设备 lf

		stepSwitcher.find(".prev").on("click", function () {
			moveStep("prev");
		});
		stepSwitcher.find(".next").on("click", function () {
			moveStep("next");
		});

		function moveStep(direction) {

			var scrollwrap = stepSwitcher.find(".scroll-wrap"),
				boxwidth = scrollwrap.width(),
				boxscrollleft = scrollwrap.prop("scrollLeft"),
				_long = 45,
				_step, _needScroll;

			if (currentStep[direction]().length == 0) return;
			if (direction == "prev") {
				_step = "-=" + _long;
				if (step_left - boxscrollleft - _long < 0) {
					_needScroll = true;
				}
			} else {
				_step = "+=" + _long;
				if (step_left - boxscrollleft + _long * 2 > boxwidth) {
					_needScroll = true;
				}
			}



			if (_needScroll) {
				stepIndicator.hide();
				scrollwrap.animate({
					"scrollLeft": _step
				}, 200, function () {
					currentStep[direction]().trigger("click");
				});
			} else {
				currentStep[direction]().trigger("click");
			}

			//$('#signatureContent').keyup(function () {                    
			//    signatureChange();
			//});


		}
	}
}

function Init(json, XScroll, Snap) {
	var titleHtml = "",
		bodyHtml = "";
	// console.log(json);

	var count = 0;
	for (var i = 0; i < json.length; i++) {
		if (browserPlatform === "phone") { //判断设备 lf
			var data = json[i];
			var step = '<li data-setid="' + data.id + '" data-name="' + data.name + '"></li>';
			titleHtml += step;
		} else {
			//判断步骤数量-定义高度
			var stepah = $(".ctrPC").height();
			var steph = stepah / json.length - 0.2;
			var data = json[i];
			var step = '<li style= "height:' + steph + 'px" data-setid="' + data.id + '" data-name="' + data.name + '"><span data-name=' + data.name + '></span></li>';
			titleHtml += step;
		}

		var tit = "",
			con = "";
		if (data.type == "1") { //颜色设置
			if (browserPlatform === "phone") { //lf				
				tit = "<a>" + ((data.Material != null && data.Material.length > 0) ? data.Material[0].name : "") + "</a>";
			} else {
				tit = "<a></a>";
			}
			con = '<div class="custom-scroller"><div class="xs-container"><div class="xs-content"><div class="xs-row"><ul class="color-list">';
			if (data.Material != null && data.Material.length > 0) {
				//ccq
				/*
				var colorData = data.Material[0].Color,
				count = 0;
				for (var j = 0; j < colorData.length; j++)
				{
					if (count > 0 && count % 10 == 0)
					{
						con += '</ul></div><div class="xs-row"><ul class="color-list">';
					}
					con += '<li data-color=' + JSON.stringify(colorData[j]) + ' style="background-color: #' + toHex(colorData[j].value) + ';"></li>';
					count++;
				}
				*/

				count = 0;
				$.each(data.Material, function (ei, ev) {
					$.each(ev.Color, function (eii, evv) {

						if (browserPlatform === "phone") { //lf
							if (count > 0 && count % 10 == 0) {
								con += '</ul></div><div class="xs-row"><ul class="color-list">';
							}
						}
						/*
						if (ev.type == "changeImg" && !ev.actionType)
						{
							var imgurl = createXmlPicUrl(nowProductCode,{ setID: ev.id, colorID: evv.id });
							con += '<li data-color=\'' + JSON.stringify(evv) + '\' data-material=\'' + JSON.stringify(ev) + '\' style="background-image:url(' + imgurl + ')")"></li>';
						}
						else
						*/
						{
							con += '<li data-color=\'' + JSON.stringify(evv) + '\' data-material=\'' + JSON.stringify(ev) + '\' style="background-color: #' + toHex(evv.value) + ';"></li>';
						}
						count++;
					});
				});

			}
			con += '</ul></div></div></div></div>';
		} else if (data.type == "2") { //换签名                   
			if (browserPlatform === "phone") { //lf
				var colorData = data.Material[0].Color,
					fontData = data.Material,
					colorHTML = "",
					fontHTML = "";

				for (var j = 0; j < colorData.length; j++) {
					colorHTML += '<li data-color=\'' + JSON.stringify(colorData[j]) + '\' style="background-color: #' + toHex(colorData[j].value) + ';" ' + (j == 0 ? 'class="selected"' : '') + ' onclick=\"selectColor(' + j + ')\" ></li>';
				}
				for (var j = 0; j < fontData.length; j++) {
					fontHTML += '<option data-font=\'' + JSON.stringify(fontData[j]) + '\'>' + fontData[j].name + '</option>';
				}
				localStorage.selectedId = 1;
				var signnum = (data.Signature != null ? data.Signature.length : 0);
				if (signnum == 1) {
					localStorage.selectedId = 3;
					tit = '<a class="selected" id="left_right_sign" onclick="changeSignature(3)">个性签名</a>';
					con = '<div class="customise-tabcon prd-sign" id="signbody"><a id="rightsign" onclick="setSign(2)"> </a>';
					var conn = '<div class="sign-item sign-color"><div class="t">选择颜色：</div><div class="c">' +
						'<ul class="color-list" id="color-list">' + colorHTML + '</ul>' +
						'</div></div><div class="sign-item sign-font"><div class="t">选择字体：</div><div class="c">' +
						'<select name="font" id="font" onchange="changeFont()">' + fontHTML + '</select>' +
						'</div></div><div class="sign-item sign-content"><div class="t">签　　名：</div><div class="c"><input name="content" type="text" id="signatureContent" onkeyup="signChange(this)"  onchange="signatureChange()" placeholder="请输入签名内容" maxlength="7"/></div></div><div class="sign-ps">PS：1.签名内容仅限英文字母与数字  2.鞋子签名字符不能超过7个</div>'
					con = con + conn + '</div>';
				} else {
					localStorage.selectedId = 1;
					tit = '<a class="selected" id="leftsign" onclick="changeSignature(1)">左脚签名</a><a id="rightsign" onclick="changeSignature(2)">右脚签名</a>';
					con = '<div class="customise-tabcon prd-sign" id="signbody">';
					var conn = '<div class="sign-item sign-color"><div class="t">选择颜色：</div><div class="c">' +
						'<ul class="color-list" id="color-list">' + colorHTML + '</ul>' +
						'</div></div><div class="sign-item sign-font"><div class="t">选择字体：</div><div class="c">' +
						'<select name="font" id="font" onchange="changeFont()">' + fontHTML + '</select>' +
						'</div></div><div class="sign-item sign-content"><div class="t">签　　名：</div><div class="c"><input name="content" type="text" id="signatureContent" onkeyup="signChange(this)"  onchange="signatureChange()" placeholder="请输入签名内容" maxlength="7"/></div></div><div class="sign-ps">PS：1.签名内容仅限英文字母与数字  2.鞋子签名字符不能超过7个</div>'
					con = con + conn + '</div>';
				}
				localStorage.leftSignature = conn;
				localStorage.rightSignature = conn;
			} else { //PC
				var colorData = data.Material[0].Color,
					fontData = data.Material,
					colorHTML = "",
					fontHTML = "";

				for (var j = 0; j < colorData.length; j++) {
					colorHTML += '<li data-color=\'' + JSON.stringify(colorData[j]) + '\' style="background-color: #' + toHex(colorData[j].value) + ';" ' + (j == 0 ? 'class="selected"' : '') + ' onclick=\"selectColor(' + j + ')\" ></li>';
				}
				for (var j = 0; j < fontData.length; j++) {
					fontHTML += '<option data-font=\'' + JSON.stringify(fontData[j]) + '\'>' + fontData[j].name + '</option>';
				}
				localStorage.selectedId = 1;
				var signnum = (data.Signature != null ? data.Signature.length : 0);
				if (signnum == 1) {
					localStorage.selectedId = 3;
					tit = '<a class="selected" id="left_right_sign" onclick="changeSignature(3)">个性签名</a>';
					con = '<div class="customise-tabcon prd-sign" id="signbody"><a id="rightsign" onclick="setSign(2)"> </a>';
					var conn = '<div class="sign-item sign-font sel1"><div class="t"></div><div class="c">' +
						'<select name="font" id="font" onchange="changeFont()">' + fontHTML + '</select>' +
						'</div></div><div class="sign-item sign-content"><div class="t"></div><div class="c"><input name="content" type="text" id="signatureContent" onkeyup="signChange(this)"  onchange="signatureChange()" placeholder="请输入签名内容" maxlength="7"/></div></div>' +
						'<div class="sign-item sign-color"><div class="t">签名颜色：</div><div class="c">' +
						'<ul class="color-list" id="color-list">' + colorHTML + '</ul></div></div>' +
						'<div class="sign-ps">1.签名内容仅限英文字母与数字 <br/>2.鞋子签名字符不能超过7个</div>'
					con = con + conn + '</div>';
				} else {
					localStorage.selectedId = 1;
					tit = '<span class="active4 for-pub" id="leftsign" onclick="changeSignature(1)">左脚签名</span><span class="for-pub" id="rightsign" onclick="changeSignature(2)">右脚签名</span>';
					con = '<div class="customise-tabcon prd-sign" id="signbody">';
					var conn = '<div class="sign-item sign-font sel1"><div class="t"></div><div class="c">' +
						'<select name="font" id="font" onchange="changeFont()">' + fontHTML + '</select>' +
						'</div></div><div class="sign-item sign-content"><div class="t"></div><div class="c"><input name="content" type="text" id="signatureContent" onkeyup="signChange(this)"  onchange="signatureChange()" placeholder="请输入签名内容" maxlength="7"/></div></div>' +
						'<div class="sign-item sign-color"><div class="t">签名颜色：</div><div class="c">' +
						'<ul class="color-list" id="color-list">' + colorHTML + '</ul></div></div>' +
						'<div class="sign-ps">1.签名内容仅限英文字母与数字<br/> 2.鞋子签名字符不能超过7个</div>'
					con = con + conn + '</div>';
				}
				localStorage.leftSignature = conn;
				localStorage.rightSignature = conn;
			}

		} else if (data.type == "3" || data.type == null) { //涂鸦
			if (browserPlatform === "phone") { //lf
				data.type = 3;
				var tuyaID = "tuya_" + data.id;
				tit = '<a id="doodle1"  class="selected" onclick="doodle(1)">官方图片</a><a  id="doodle2" onclick="doodle(2)">我的图片</a><a class="for-pub pic-upload"><input style ="color:transparent;width:72px;opacity:0; position:absolute;" type="file" id="fileElem"  accept="image/*" value ="上传图片"  onchange="idxUpImg(this)">上传图片</a>';
				con = '<div class="custom-scroller tuya-scroller" id="officialPic"><div class="xs-container"><div class="xs-content" id="' + tuyaID + '" ></div></div></div>';
				con = con + '<div class="custom-scroller mypic-scroller" id="myPic" style="dispaly:none"><div class="xs-container"><div class="xs-content" id="myPicContent" ></div></div></div>';
				//con = '<div id="doodle">' + con + '</div>';
				loadMaterialPage(0, "#" + tuyaID);
			} else { //PC 新增搜索图片div 
				data.type = 3;
				var tuyaID = "tuya_" + data.id;
				tit = '<div class="shadeM"></div><input class="inp1" id="inp1"  name=' + selname + ' type="radio" onclick="doodle(1)"><span id="doodle1"  class="selected" >官方图片</span><input id="inp2" class="inp21" name=' + selname + ' type="radio" onclick="doodle(2)"><span id="doodle2" >我的图片</span><input id="search" class="searches" type="text" placeholder="搜索图片"><span class="searchs" onClick="searchPic(z);"></span><select name="piccat" class="seoff" id="offA" onchange=""></select><select name="piccat" class="seoffB" id="offA1" onchange=""></select><span class="for-pub pic-upload"><div id="numD" class="numD"></div><div class="prev"></div><input class="cuinp" type="text" name="" id="" value="1"><span class="next"></span><input class="confirmp1" type="button" name="GO" id="" value="GO"><input style ="color:transparent;width:100px;height:41px;margin-left:-14px;opacity:0; position:absolute;" type="file" id="fileElem"  accept="image/*" value ="上传图片"  onchange="idxUpImg(this)">+上传图片</span>';
				con = '<div id="searchli" class="searchli dn"></div><div class="custom-scroller tuya-scroller" id="officialPic"><div class="xs-container"><div class="xs-content" id="' + tuyaID + '" ></div></div></div>';
				con = con + '<div class="custom-scroller mypic-scroller" id="myPic" style="dispaly:none"><div class="xs-container"><div class="xs-content myPicContent" id="myPicContent" ></div></div></div>';
				//con = '<div id="doodle">' + con + '</div>';
				loadMaterialPage(0, "#" + tuyaID);
			}
		} else if (data.type == "4") { //XML
			tit = "<a>" + ((data.Material != null && data.Material.length > 0) ? data.Material[0].name : "") + "</a>";
			con = '<div class="custom-scroller"><div class="xs-container"><div class="xs-content"><div class="xs-row"><ul class="color-list">';
			count = 0;
			$.each(data.Material, function (ei, ev) {
				$.each(ev.Color, function (eii, evv) {
					if (browserPlatform === "phone") { //lf
						if (count > 0 && count % 10 == 0) {
							con += '</ul></div><div class="xs-row"><ul class="color-list">';
						}
					}
					if (ev.type == "changeImg" && !ev.actionType) {
						var imgurl = createXmlPicUrl(nowProductCode, {
							setID: ev.id,
							colorID: evv.id
						});
						con += '<li data-color=\'' + JSON.stringify(evv) + '\' data-material=\'' + JSON.stringify(ev) + '\' style="background-image:url(' + imgurl + ')")"></li>';
					} else {
						con += '<li data-color=\'' + JSON.stringify(evv) + '\' data-material=\'' + JSON.stringify(ev) + '\' style="background-color: #' + toHex(evv.value) + ';"></li>';
					}
					count++;
				});
			});

			con += '</ul></div></div></div></div>';
		}

		bodyHtml += '<div data-info=\'' + JSON.stringify(data) + '\' class="prd-customise" style="display: none;">' +
			'<div class="customise-tit">' + tit + '</div>' +
			'<div class="customise-body">' + con + '</div></div>';
	}
	stepSwitcher.find(".scroll-wrap").append(titleHtml);
	stepContent.append(bodyHtml);

	if (browserPlatform === "phone") { //判断设备 lf

		//如果步骤项目太少，不显示左右箭头
		var scrollwrap = stepSwitcher.find(".scroll-wrap"),
			boxwidth = scrollwrap.width(),
			scrollWidth = scrollwrap.prop("scrollWidth");
		if (scrollWidth <= boxwidth) {
			stepSwitcher.find(".next,.prev").hide();
		}
	}

	stepSwitcher.find("li").eq(0).trigger("click"); //设置页面加载完默认选中第一个步骤

	// borderEvent();
}

function loadMaterialPage(page, container) {
	if (browserPlatform === "PC") { //lf				
		$(".tuya-scroller .xs-content").children().remove();
	}
	var d = sysPicArr[page];
	if (d == "loading") return;

	// if (typeof d === "object") {
	// 	if (browserPlatform === "phone") { //lf			
	// 		loadCallback(page, d, $(container));
	// 	} else {
	// 		loadCallback(page, d, $(".tuya-scroller .xs-content"));
	// 	}
	// } else {

	d = "loading";

	var p = parseInt(page) + 1;
	//ccq
	//var app_version = sysVersion.appVersion;
	if (browserPlatform === "phone") { //lf

		ApiRequest({
			//ccq
			//path: 'http://api.app.idx.com.cn/apiflash/GetMaterialList?page_size=10&page=' + p,// + "&app_version=" + app_version,
			path: IDX_INFO.getMaterialList.replace("{page_size}", "10").replace("{page}", p),
			jsonpCallback: 'getMaterialList',
			dataType: 'json',
			success: function (data) {
				if (data.Code === 0) {
					loadCallback(page, data.Data, $(container));
				}
			}
		});
	} else {
		ApiRequest({
			//ccq
			//path: 'http://api.app.idx.com.cn/apiflash/GetMaterialList?page_size=10&page=' + p,// + "&app_version=" + app_version,
			path: IDX_INFO.getMaterialList.replace("{page_size}", "21").replace("{page}", p),
			jsonpCallback: 'getMaterialList',
			dataType: 'json',
			success: function (data) {
				// console.log(data);
				var amountIn = data.Data.pageCount;
				var inpv1 = $(".cuinp").val();
				$(".numD").text(inpv1 + "/" + amountIn);
				if (data.Code === 0) {
					loadCallback(page, data.Data, $(container));
				}
				var selnum1 = document.getElementsByClassName("inp1").length;
				if (selnum1 > 1) {
					for (var e = 1; e < selnum1; e++) {
						document.getElementsByClassName("inp1")[e].setAttribute("name", "se1num1" + e);
						document.getElementsByClassName("inp21")[e].setAttribute("name", "se1num1" + e);
					}
				}
				$(".inp1").attr("checked", "checked");
				var bodyIn = $(".customise-body .tuya-scroller .xs-content");
				var arrL3 = {
					"body": bodyIn,
					"amount": amountIn,
					"r": "",
					"t": "",
					"y": ""
				};
				readyNL(arrL3, loadMaterialPage);
				mousepic();



				$(".inp1").off("click").on("click", function () {
					var inpv1 = $(".cuinp").val();
					$(".numD").text(inpv1 + "/" + amountIn);
					$(".tuya-scroller .xs-content").children().remove();
					loadMaterialPage(0, $(".tuya-scroller .xs-content"));
					readyNL(arrL3, loadMaterialPage);
				})
			}
		});
	}
	/*$.ajax({
		url: "http://api.app.idx.com.cn/apiflash/GetMaterialList?page_size=10&page=" + p,
		dataType: "jsonp",
		jsonp: "callback",
		success: function (data) {
			if (data.Code == 0) {
				loadCallback(page, data.Data, $(container));
			}
		},
		error: function () {
			console.log("调用图片列表发生错误.");
		}
	});*/

	// }
}
//切换图片内容左右箭头提示
function checkPagePreNext(currpage, pagecount) {
	$(".content-wrap").find(".next,.prev").show();
	if (browserPlatform === "phone") { //判断设备 lf

		if (0 <= currpage <= pagecount) {
			if (currpage <= 0)
				$(".content-wrap").find(".prev").hide();
			else
				$(".content-wrap").find(".prev").show();
			if (currpage >= pagecount)
				$(".content-wrap").find(".next").hide();
			else
				$(".content-wrap").find(".next").show();
		}
	}
}


function loadCallback(page, data, container) {
	var row = container.find(".xs-row[data-page=" + page + "]"),
		list = renderMaterialList(page, data.ImgList);
	if (row.length > 0) {
		row.replaceWith(list);
	} else {
		container.append(list);
	}

	sysPicArr[page] = data;
	if (page < data.pageCount) {
		if (container.find(".xs-row[data-page=" + (page + 1) + "]").length == 0) {
			container.append('<div data-page="' + (page + 1) + '" class="xs-row"><div class="loader">Loading...</div></div>');
		}
	} else {
		sysPicArr[page] = "loading";
	}
	var scroller = container.closest(".custom-scroller").data("scroller");
	if (scroller) {
		scroller.refresh();
	}
	checkPagePreNext(page, data.pageCount);
}

function renderMaterialList(page, data) {


	var con = '<div data-page="' + page + '" class="xs-row"><ul class="color-list">';
	for (var j = 0; j < data.length; j++) {

		con += '<li data-material=\'' + JSON.stringify(data[j]) + '\' style="background-image:url(' + data[j].ThumbUrl + ')")"></li>';
	}
	con += '</ul></div>';


	return con;
}

function toHex(value) {
	var c = [];
	if (value) {
		$.each(value.split(","), function (i, v) {
			v = parseInt(v).toString(16);
			if (v.length < 2) {
				v = "0" + v;
			}
			c.push(v);
		});
	}
	return c.join("");
}