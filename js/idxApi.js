// JavaScript Document

/**
	加载模型
	productId 产品id
	workid 作品id  没有作品id 传空字符
	categoryType 商品类型编号
*/
function idxLoadModel(productId, workid, categoryType) {
	"use strict";
	loadModel(productId, workid, categoryType);
}

/**
	添加涂鸦
	srcUrl 涂鸦URL
	picId 涂鸦id
*/
function idxAddtato(srcUrl, picId) {
	"use strict";
	addtato(srcUrl, picId);
}

/**
	颜色变化
	setId 步骤id
	matId 材质id
	colorId 颜色id
*/
function idxChangeColor(setId, matId, colorId) {
	"use strict";
	changeColor(setId, matId, colorId);
}

/**
	签名
	positon 签名位置 left or right
	value 签名内容
	colorId 颜色id
	fontId  签名的字体id XML里有定义
*/
function idxDoSign(positon, value, colorId, fontId) {
	"use strict";
	myDoSign(positon, value, colorId, fontId);
}

/**
	改变商品角度
	setId 步骤id 要跳转到该步骤所对应的角度才需要填入 
*/
function idxChangeLayer(setId) {
	"use strict";
	changeLayer(setId);
}

/**
	设置用户id
	userId 用户id
*/
function idxSetUserId(userId) {
	"use strict";
	setUserId(userId);
}

/**
	保存作品
*/
function idxDoSave(appKey, LoveWorkId, idea, numSize, paramJson) {
	"use strict";

	if (userId === "" || userId === undefined || userId === null || userId === "0") {
		idxGotoLogin();
		return;
	}
	doSave(appKey, LoveWorkId, idea, numSize, paramJson);
}
/**
	保存作品 不传参数
*/
function idxDoSave2() {
	"use strict";

	if (userId === "" || userId === undefined || userId === null || userId === "0") {
		idxGotoLogin();
		return;
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

	doSave(APPKEY, '', ScribleInfo.idea, "1", paramJson1); //保存作品接口

}


/**
	添加购物车 有执行保存操作生成workid
*/
function idxDoAddToCart(appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1) {
	"use strict";
	if (userId === "" || userId === undefined || userId === null || userId === "0") {
		idxGotoLogin();
		return;
	}
	doAddToCart(appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1);
}

/**
	通过workid添加购物车 没有在执行保存操作
*/
function idxDoAddToCartByWorkId(workId, appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1) {
	"use strict";
	if (userId === "" || userId === undefined || userId === null || userId === "0") {
		idxGotoLogin();
		return;
	}

	doAddToCartByWorkId(workId, appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1);
}

/**
	创建预览图
*/
function idxMakePreShotImg() {
	"use strict";
	makePreShotImg();
}

/**
 * 接收预览图
 */
function idxGetShotImg(preArr) {
	"use strict";
	//判断设备 lf
	if (browserPlatform === "phone") {
		var php = document.getElementById("img-panel");

		for (var i = 0; i < preArr.length; i++) {
			var cid = document.getElementById(preArr[i]);
			var cvs = document.createElement("canvas");


			cvs.width = document.body.clientWidth / 1.5;
			cvs.height = cvs.width;
			cvs.setAttribute("class", "dn");
			cvs.setAttribute("style", "left: 0;right: 0;margin: auto;");

			cvs.style.position = "absolute";
			cvs.getContext("2d").drawImage(cid, 0, 0, cvs.width, cvs.height);
			php.appendChild(cvs);

			$("#img-panel canvas").eq(0).removeClass("dn").addClass("db");
			var str = "1/" + $("#img-panel canvas").length;
			$("#ps-page").text(str);
		}
	} else { //PC lf
		var php = document.getElementById("img-panel");

		var cid = document.getElementById(preArr[0]);
		var cvs = document.createElement("canvas");
		if (cid) { //判断是否返回预览图，不返回直接进行下一步
			cvs.width = cid.width * 0.90;
			cvs.height = cid.height * 0.90;
			cvs.style.display = "inline-block";
			cvs.getContext("2d").drawImage(cid, 0, 0, cvs.width, cvs.height);
			php.appendChild(cvs);
			//----------------------------
			$("#sasp").children().remove();
			var php2 = document.getElementById("sasp");
			var cid2 = document.getElementById(preArr[1]);
			var cvs2 = document.createElement("canvas");
			cvs2.width = cid2.width * 0.50;
			cvs2.height = cid2.height * 0.50;
			cvs2.style.display = "inline-block";
			cvs2.getContext("2d").drawImage(cid2, 0, 0, cvs2.width, cvs2.height);
			php2.appendChild(cvs2);
		} else {
			
			$("#photoshop").hide();
			$(".saveSh").show();
			$("#sasp").children().remove();
			var php2 = document.getElementById("sasp");
			var cid2 = document.getElementById(preArr[1]);
			var cvs2 = document.createElement("canvas");
			cvs2.width = cid2.width * 0.50;
			cvs2.height = cid2.height * 0.50;
			cvs2.style.display = "inline-block";
			cvs2.getContext("2d").drawImage(cid2, 0, 0, cvs2.width, cvs2.height);
			php2.appendChild(cvs2);
			
		}


	}
}

/**
 * 返回操作
 */
function idxGoBack() {
	"use strict";
	goBack();
}

/** 
 * 涂鸦遮罩
 */
function shadeAl() {
	"use strict";
	//Machine.shadeA();
	//console.log("涂鸦遮罩");


	$("#shade").css("display", "block");
	if ($("#shade").children().length == 1) {
		return;
	}
	$("#shade").prepend('<section id="await"><img src="http://static.idx.com.cn/www/m/zone/src/spirte/sTimg.gif"/></section>'); //插入一个遮罩标签     //增加代码   
}
/** 
 * 取消遮罩
 */
function shadeA2() {
	"use strict";
	//console.log("取消遮罩");
	//Machine.shadeB();

	$("#shade").css("display", "none");
}

function backInfo(data) {
	"use strict";
	if (browserPlatform === "phone") { //判断设备
		if (data === "保存成功") {
			location.href = "http://m.idx.com.cn"; //跳转到首页
		} else {
			location.href = "http://m.idx.com.cn/ShopCart/Index"; //跳转到购物车
		}
	} else {
		if (data === "保存成功") {
			$(".confirmSh").show();
			$(".ps-pagec").show();
			$("#ps-pageA").hide();

		} else {
			$(".shoeSi").hide();
			$(".confirmSh").show();;
			$(".coninfo").text("要不要买下来了呢，帮好友出出注意吧");
			$(".ps-pagec").hide();
			$("#ps-pageA").show();
			$(".addCA").click(function () {
				location.href = "http://www.idx.com.cn/ShopCart/Index"; //跳转到购物车
			});
			$(".adindex").click(function () {
				location.href = "http://www.idx.com.cn/Customize/Kind";
			})

		}
	}

}

/**
 * 添加购物车接口返回
 * 添加购物车成功or失败
 */
function idxBackInfo(data) {
	"use strict";
	if (Template === "idx") {
		backInfo(data);
	} else {

	}

}

/**
 * 上传图片
 */
function idxUpImg(obj) {
	"use strict";
	if (userId === "" || userId === undefined || userId === null || userId === "0") {
		idxGotoLogin();
		return;
	}
	upImg(obj);
}

/*
	展示预览页面
*/
function idxGoShowPreview() {
	"use strict";
	//先执行预览图的创建
	idxMakePreShotImg();

	$("#titleGoBack").data("control", "shut");

	//删除预览的canvas
	$("#photoshop .ps-img ul").empty();

	//定制器隐藏
	$("#ctl").addClass("dn");
	//预览界面展示
	$("#photoshop").show();
	var imgPanel = document.getElementById("img-panel");
	imgPanel.addEventListener("touchstart", startTo, false);
	imgPanel.addEventListener("touchend", endTo, false);
}

//弹出尺码选择框
function idxinitSizeOpt() {
	"use strict";

	if (browserPlatform === "phone") { //判断设备

		if (Template === "idx") {
			var $sizeLib = $("#size-lib"),
				$sizeOpt = $sizeLib.find(".size-opt"),
				$sizeUl = $sizeLib.find("ul");
			if ($sizeUl.attr("edit") == "n") {
				$.ajax({
					type: "get",
					url: IDX_INFO.getSize.replace("{productCode}", nowProduct.productId),
					dataType: "jsonp",
					jsonp: "callback",
					jsonpCallback: "load",
					success: function (data) {
						//console.log(data);
						var dataFound = data; //JSON.parse(data);

						var code = dataFound.Code;

						$sizeUl.attr("edit", "y");
						if (code == 0) {
							var sData = dataFound.Data;
							for (var i = 0; i < sData.length; i++) {
								var li = document.createElement("li"),
									si = sData[i];
								//添加尺码
								li.setAttribute("data-sizeCode", si.PSizeCode);
								li.setAttribute("data-sizeName", si.PSizeName);
								li.innerHTML = si.PSizeName;
								$sizeUl.append(li);
							}

							$(".size-opt ul li").first().addClass("active");
							$(".toBuyCar").removeClass("disable");

							// 加入购物车选尺码
							$(".size-opt ul li").on("touchstart", function () {
								if ($(this).hasClass("active")) {
									return;
								}
								$(this).addClass("active").siblings().removeClass("active");
								$(".toBuyCar").removeClass("disable");
							});


							$sizeOpt.removeClass("dn");
						}
						if (code == 999) {
							$(".toBuyCar").removeClass("disable");
						}
						$sizeLib.removeClass("dn");
					}
				});
			}
			if ($sizeUl.attr("edit") == "y") {
				$sizeLib.removeClass("dn");
			}
		} else {
			idxDoSave2();
		}
	} else { //PC
		var sel2 = document.getElementById("sele1");
		$("#sele1").children().remove();
		$.ajax({
			type: "get",
			url: IDX_INFO.getSize.replace("{productCode}", nowProduct.productId),
			dataType: "jsonp",
			jsonp: "callback",
			jsonpCallback: "load",
			success: function (data) {
				// console.log(data);
				var sData = data.Data;
				for (var i = 0; i < sData.length; i++) {
					var op = document.createElement("option"),
						si = sData[i];
					op.setAttribute("data-sizeCode", si.PSizeCode);
					op.setAttribute("data-sizeName", si.PSizeName);
					op.innerHTML = si.PSizeName;
					sel2.appendChild(op);
				}

			},
			error: function (err) {
				console.log(err);
			}
		})
	}

}

//跳转到登陆界面
function idxGotoLogin() {
	"use strict";
	dmGotoLogin();
}


//获取订单编号
function idxGetWorkCode(workCode) {
	"use strict";
	dmGetWorkCode(workCode);
}
//改变模型画布大小
function idxChangeCanvasSize(size) {
	"use strict";
	if (size == 800) {
		$("#myCanvasDiv canvas").css({
			"margin-left": "-46px",
			"margin-top": "-50px"
		});
	} else {
		$("#myCanvasDiv canvas").css("margin", "90px");
	}
	changeCanvasSize(size);
}