var js = document.scripts;
js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/") + 1);

function getuuid() {
	"use strict";
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = "4";
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
	s[8] = s[13] = s[18] = s[23] = "-";
	var uuid = s.join("");
	return uuid
}
var tmpUuid = getuuid();
document.write("<script language=javascript src='" + js + "canvas-to-blob.min.js'></script>");
document.write("<script language=javascript src='" + js + "hidpi-canvas.min.js'></script>");
document.write("<script language=javascript src='" + js + "idxinfo.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "config.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "tools.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/ImageMaskPoint.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/ImageSetting.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/FontMaterials.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/ProductShot.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/Material.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/PureColor.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/ColorSet.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/ProductPic.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/Layer.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "bean/Product.js?id=" + tmpUuid + "'></script>");
document.write("<script language=javascript src='" + js + "ModelAssets.js?id=" + tmpUuid + "''></script>");
document.write("<script language=javascript src='" + js + "dmApi.js?id=" + tmpUuid + "''></script>");
var pureColorArr = new Array(0);
var fontMaterialsArr = new Array(0);
var imageSettingArr = new Array(0);
var colorSetArr = new Array(0);
var productShotArr = new Array(0);
var materialArr = new Array(0);
var nowLayer = "";
var nowProduct;
var nowMoveObject = null;
var isDoClear = false;
var isMove;
var isRebuildType3 = false;
var c;
var c_tmp;
var c_type1;
var c_ssd;
var c_type4;
var c_type3;
var c_tatoo;
var c_tatooShade;
var c_font;
var ctx;
var ctx_tmp;
var ctx_type1;
var ctx_ssd;
var ctx_type4;
var ctx_type3;
var ctx_tatoo;
var ctx_tatooShade;
var ctx_font;
var screenScale = 0.0;
var userId = "";
var isAnonymous = true;
var isSendError = false;
var refImgReturnClientStr = "";
var sendWorkId = "";
var isShotImgDone = false;
var isSendShotImgDone = false;
var isSendPreImgDone = false;
var isSendDataDone = false;
var isDoAddToCartDone = false;
var isLoading = false;
var ratio = 1;
var isMoreTatoo = false;
var workid_globe = "";

function setUserId(uId) {
	"use strict";
	userId = uId
}

function myDoSign(position, value, color, fontType) {
	"use strict";
	ctx_font.clearRect(0, 0, ctx_font.canvas.width, ctx_font.canvas.height);
	mySetSign(nowProduct, fontMaterialsArr, pureColorArr, position, value, color, fontType);
	updata_type2()
}

function drawTatoo(productTmp) {
	"use strict";
	if (productTmp !== null) {
		if (productTmp.parm === "1") {
			var changeScale = 1.0;
			if (browserPlatform === "PC") {
				changeScale = config.width / config.canvasNormalSize
			}
			var imgTatoo = new Image();
			if (!isIE) {
				if (isAnonymous) {
					imgTatoo.crossOrigin = "Anonymous"
				}
				imgTatoo.src = productTmp.tatooImgSrc;
				if (imgTatoo.complete) {
					ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
					if (productTmp.respectInsideOutsideFlip === "y") {
						ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
						ctx_tatoo.scale(-1, 1);
						ctx_tatoo.drawImage(imgTatoo, (ctx_tatoo.canvas.width * ratio - imgTatoo.width * productTmp.tatooScale * screenScale * changeScale - productTmp.tatooX * changeScale), productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale);
						ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
						ctx_tatoo.scale(-1, 1)
					} else {
						ctx_tatoo.drawImage(imgTatoo, productTmp.tatooX * changeScale, productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale)
					}
				}
			} else {
				if (productTmp.tatooImg !== null) {
					imgTatoo = productTmp.tatooImg;
					if (imgTatoo.complete) {
						ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
						if (productTmp.respectInsideOutsideFlip === "y") {
							ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
							ctx_tatoo.scale(-1, 1);
							ctx_tatoo.drawImage(imgTatoo, (ctx_tatoo.canvas.width * ratio - imgTatoo.width * productTmp.tatooScale * screenScale * changeScale - productTmp.tatooX * changeScale), productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale);
							ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
							ctx_tatoo.scale(-1, 1)
						} else {
							ctx_tatoo.drawImage(imgTatoo, productTmp.tatooX * changeScale, productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale)
						}
					}
				} else {
					var xhr = new XMLHttpRequest();
					xhr.onload = function() {
						var url = URL.createObjectURL(this.response);
						if (isAnonymous) {
							imgTatoo.crossOrigin = "Anonymous"
						}
						imgTatoo.src = url;
						if (imgTatoo.complete) {
							ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
							if (productTmp.respectInsideOutsideFlip === "y") {
								ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
								ctx_tatoo.scale(-1, 1);
								ctx_tatoo.drawImage(imgTatoo, (ctx_tatoo.canvas.width * ratio - imgTatoo.width * productTmp.tatooScale * screenScale * changeScale - productTmp.tatooX * changeScale), productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale);
								ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
								ctx_tatoo.scale(-1, 1)
							} else {
								ctx_tatoo.drawImage(imgTatoo, productTmp.tatooX * changeScale, productTmp.tatooY * changeScale, imgTatoo.width * productTmp.tatooScale * screenScale * changeScale, imgTatoo.height * productTmp.tatooScale * screenScale * changeScale)
							}
							URL.revokeObjectURL(url)
						}
					};
					xhr.open('GET', productTmp.tatooImgSrc, true);
					xhr.responseType = 'blob';
					xhr.send()
				}
			}
		}
	}
}

function Toast(msg, duration) {
	"use strict";
	duration = isNaN(duration) ? 3000 : duration;
	var m = document.createElement('div');
	m.innerHTML = msg;
	m.style.cssText = "width: 60%;min-width: 150px;opacity: 0.7;height: 30px;color: rgb(255, 255, 255);line-height: 30px;text-align: center;border-radius: 5px;position: fixed;top: 40%;left: 20%;z-index: 999999;background: rgb(0, 0, 0);font-size: 12px;";
	document.body.appendChild(m);
	setTimeout(function() {
		var d = 0.5;
		m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
		m.style.opacity = '0';
		setTimeout(function() {
			document.body.removeChild(m)
		}, d * 1000)
	}, duration)
}

function scale(value) {
	"use strict";
	if (nowMoveObject !== null) {
		var tempTatooX = nowMoveObject.tatooX - (nowMoveObject.tatooWidth * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooWidth * screenScale * nowMoveObject.tatooScale) / 2;
		var tempTatooY = nowMoveObject.tatooY - (nowMoveObject.tatooHeight * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooHeight * screenScale * nowMoveObject.tatooScale) / 2;
		if (nowProduct.CategoryType === CategoryType.SHOE || nowProduct.CategoryType === CategoryType.BOX || nowProduct.CategoryType === CategoryType.BAG || nowProduct.CategoryType === CategoryType.SWEATER) {
			if (tempTatooX > nowMoveObject.x || tempTatooY > nowMoveObject.y || ((tempTatooX + nowMoveObject.tatooWidth * screenScale * (nowMoveObject.tatooScale + value)) < nowMoveObject.x + nowMoveObject.width) || ((tempTatooY + nowMoveObject.tatooHeight * screenScale * (nowMoveObject.tatooScale + value)) < nowMoveObject.y + nowMoveObject.height)) {
				drawTatoo(nowMoveObject);
				if (nowMoveObject.tatooImgSrc !== "") {
					Toast("已到极限", 2)
				}
			} else {
				if (nowMoveObject.tatooScale + value > 0) {
					nowMoveObject.tatooX = nowMoveObject.tatooX - (nowMoveObject.tatooWidth * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooWidth * screenScale * nowMoveObject.tatooScale) / 2;
					nowMoveObject.tatooY = nowMoveObject.tatooY - (nowMoveObject.tatooHeight * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooHeight * screenScale * nowMoveObject.tatooScale) / 2;
					nowMoveObject.tatooScale = nowMoveObject.tatooScale + value;
					drawTatoo(nowMoveObject)
				}
			}
		} else {
			if (nowMoveObject.tatooScale + value > 0) {
				nowMoveObject.tatooX = nowMoveObject.tatooX - (nowMoveObject.tatooWidth * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooWidth * screenScale * nowMoveObject.tatooScale) / 2;
				nowMoveObject.tatooY = nowMoveObject.tatooY - (nowMoveObject.tatooHeight * screenScale * (nowMoveObject.tatooScale + value) - nowMoveObject.tatooHeight * screenScale * nowMoveObject.tatooScale) / 2;
				nowMoveObject.tatooScale = nowMoveObject.tatooScale + value;
				drawTatoo(nowMoveObject)
			}
		}
	}
}

function move(x, y) {
	"use strict";
	if (nowMoveObject !== null) {
		if (nowProduct.CategoryType === CategoryType.SHOE || nowProduct.CategoryType === CategoryType.BOX || nowProduct.CategoryType === CategoryType.BAG || nowProduct.CategoryType === CategoryType.SWEATER) {
			if (nowMoveObject.tatooX + x > nowMoveObject.x || nowMoveObject.tatooY + y > nowMoveObject.y || ((nowMoveObject.tatooX + x + nowMoveObject.tatooWidth * screenScale * nowMoveObject.tatooScale) < nowMoveObject.x + nowMoveObject.width) || ((nowMoveObject.tatooY + y + nowMoveObject.tatooHeight * screenScale * nowMoveObject.tatooScale) < nowMoveObject.y + nowMoveObject.height)) {
				drawTatoo(nowMoveObject);
				if (nowMoveObject.tatooImgSrc !== "") {
					Toast("已到极限", 2)
				}
			} else {
				nowMoveObject.tatooX = nowMoveObject.tatooX + x;
				nowMoveObject.tatooY = nowMoveObject.tatooY + y;
				drawTatoo(nowMoveObject)
			}
		} else {
			nowMoveObject.tatooX = nowMoveObject.tatooX + x;
			nowMoveObject.tatooY = nowMoveObject.tatooY + y;
			drawTatoo(nowMoveObject)
		}
	}
}

function changeLayer(setId) {
	"use strict";
	if (ctx === null || ctx === undefined) {
		return
	}
	var layerIdTmp = "";
	if (setId !== null && setId !== "") {
		layerIdTmp = getLayerIdBySetId(colorSetArr, setId);
		if (layerIdTmp === nowLayer) {
			return
		}
	}
	nowMoveObject = null;
	ctx_ssd.clearRect(0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
	ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
	ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
	ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
	ctx_tatooShade.clearRect(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
	ctx_font.clearRect(0, 0, ctx_font.canvas.width, ctx_font.canvas.height);
	if (setId !== null && setId !== "") {
		layerIdTmp = getLayerIdBySetId(colorSetArr, setId);
		if (layerIdTmp !== "" && layerIdTmp !== null) {
			showProduct(nowProduct, layerIdTmp);
			return
		}
	}
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		if (layerTmp.layerId === nowLayer) {
			var layerIndex = i;
			if (layerIndex === (nowProduct.layerList.length - 1)) {
				layerIndex = 0
			} else {
				layerIndex = layerIndex + 1
			}
			layerTmp = nowProduct.layerList[layerIndex];
			showProduct(nowProduct, layerTmp.layerId);
			break
		}
	}
}

function changeColor(sid, mid, cid) {
	"use strict";
	var type = "";
	isDoClear = true;
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
			var productTmp = layerTmp.productPicList[j];
			if (productTmp.setId === sid) {
				productTmp.colorId = cid;
				productTmp.materialId = mid;
				for (var k = 0; k < materialArr.length; k++) {
					var materialTmp = materialArr[k];
					if (productTmp.materialId === materialTmp.materialId) {
						if (materialTmp.type === "changeImg") {
							productTmp.parm = "1"
						} else {
							productTmp.parm = "0"
						}
						break
					}
				}
				if (layerTmp.layerId === nowLayer) {
					type = productTmp.type
				}
			}
		}
	}
	if (type !== "1" && type !== "4") {
		updata_type1();
		updata_type4()
	}
	if (type === "1") {
		updata_type1()
	}
	if (type === "4") {
		updata_type4()
	}
}

function setDefaultPos(productTmp) {
	"use strict";
	productTmp.tatooX = productTmp.x - (productTmp.tatooWidth * productTmp.tatooScale * screenScale - productTmp.width) / 2.0;
	productTmp.tatooY = productTmp.y - (productTmp.tatooHeight * productTmp.tatooScale * screenScale - productTmp.height) / 2.0
}

function setDefaultScale(productTmp) {
	"use strict";
	var imageScale = 1.0;
	var imageSettingTmp = getImageSettingTmp(imageSettingArr, productTmp.layerId);
	var changeScale = 1.0;
	if (browserPlatform === "PC") {
		changeScale = config.width / config.canvasNormalSize
	}
	if (imageSettingTmp.imageMaskPointList.length === 0) {
		imageScale = imageSettingTmp.clipRectWidth / imageSettingTmp.imgWidth
	} else {
		var width = 0.0;
		for (var i = 0; i < imageSettingTmp.imageMaskPointList.length; i++) {
			var imageMaskPointTmp = imageSettingTmp.imageMaskPointList[i];
			if (width < (imageMaskPointTmp.imgWidth * 1.0 + imageMaskPointTmp.x * 1.0)) {
				width = imageMaskPointTmp.imgWidth * 1.0 + imageMaskPointTmp.x * 1.0
			}
		}
		imageScale = imageSettingTmp.clipRectWidth / width
	}
	if (productTmp.tatooWidth < productTmp.tatooHeight) {
		productTmp.tatooScale = config.tatooNormalSize / productTmp.tatooWidth * imageScale;
		if (productTmp.tatooWidth * productTmp.tatooScale < (config.width / changeScale) * ratio) {
			productTmp.tatooScale = ((config.width / changeScale) * ratio / (productTmp.tatooWidth))
		}
	} else {
		productTmp.tatooScale = config.tatooNormalSize / productTmp.tatooHeight * imageScale;
		if (productTmp.tatooHeight * productTmp.tatooScale < (config.height / changeScale) * ratio) {
			productTmp.tatooScale = ((config.height / changeScale) * ratio / (productTmp.tatooHeight))
		}
	}
}

function changeCanvasSize(size) {
	"use strict";
	config.width = size;
	config.height = size;
	c.width = config.width;
	c.height = config.height;
	c_tmp.width = config.width;
	c_tmp.height = config.height;
	c_type1.width = config.width;
	c_type1.height = config.height;
	c_ssd.width = config.width;
	c_ssd.height = config.height;
	c_type4.width = config.width;
	c_type4.height = config.height;
	c_type3.width = config.width;
	c_type3.height = config.height;
	c_tatoo.width = config.width;
	c_tatoo.height = config.height;
	c_tatooShade.width = config.width;
	c_tatooShade.height = config.height;
	c_font.width = config.width;
	c_font.height = config.height;
	showProduct(nowProduct, nowLayer)
}

function ss_toggle() {
	"use strict";
	var toggle = $('#ss_toggle');
	var menu = $('#ss_menu');
	var rot;
	if (menu.attr("hidden") === "hidden") {
		menu.removeAttr("hidden");
		rot = -90;
		menu.css('transform', 'rotate(' + rot + 'deg)');
		menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
		$("#ss_toggle").data('rot', rot);
		$('#up_button').on('click', function(ev) {
			move(0, -5);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#down_button').on('click', function(ev) {
			move(0, 5);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#left_button').on('click', function(ev) {
			move(-5, 0);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#right_button').on('click', function(ev) {
			move(5, 0);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#big_button').on('click', function(ev) {
			scale(config.scaleStep);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#small_button').on('click', function(ev) {
			scale(-config.scaleStep);
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject)
		});
		$('#ss_toggle').on('click', function(ev) {
			rot = parseInt($(this).data('rot')) - 180;
			menu.css('transform', 'rotate(' + rot + 'deg)');
			menu.css('webkitTransform', 'rotate(' + rot + 'deg)');
			$(this).data('rot', rot);
			if ((((-rot) + 90) / 180) % 2 === 0) {
				setTimeout(function() {
					if ((((-rot) + 90) / 180) % 2 === 0) {
						$('#ss_menu').children().attr("hidden", "hidden")
					}
				}, 500)
			} else {
				$('#ss_menu').children().removeAttr("hidden")
			}
		})
	}
}
var testCount = 0;

function addtato(imgSrc, picId) {
	"use strict";
	var i = 0;
	var j = 0;
	var productTmp;
	var layerTmp;
	if (isMoreTatoo === true) {
		var isNowLayerCanEdit = false;
		for (i = 0; i < nowProduct.layerList.length; i++) {
			layerTmp = nowProduct.layerList[i];
			if (layerTmp.layerId === nowLayer) {
				for (j = 0; j < layerTmp.productPicList.length; j++) {
					productTmp = layerTmp.productPicList[j];
					if (productTmp.type === "3" && productTmp.layerId === productTmp.editLayerId) {
						isNowLayerCanEdit = true;
						break
					}
				}
				if (j === layerTmp.productPicList.length && isNowLayerCanEdit === false) {
					return
				}
			}
		}
	}
	isDoClear = true;
	ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
	for (i = 0; i < nowProduct.layerList.length; i++) {
		layerTmp = nowProduct.layerList[i];
		if (isMoreTatoo === true) {
			if (layerTmp.layerId === nowLayer) {
				for (j = layerTmp.productPicList.length - 1; j >= 0; j--) {
					productTmp = layerTmp.productPicList[j];
					if (productTmp.type === "3") {
						productTmp.parm = "1";
						productTmp.picId = picId;
						productTmp.isSetDefauleValue = false;
						productTmp.tatooImgSrc = imgSrc;
						setLinkObjectType3(nowProduct, productTmp, picId, imgSrc, false)
					}
				}
				break
			}
		} else {
			for (j = layerTmp.productPicList.length - 1; j >= 0; j--) {
				productTmp = layerTmp.productPicList[j];
				if (productTmp.type === "3") {
					productTmp.parm = "1";
					productTmp.picId = picId;
					productTmp.isSetDefauleValue = false;
					productTmp.tatooImgSrc = imgSrc
				}
			}
		}
	}
	if (nowProduct.CategoryType === CategoryType.SWEATER) {
		c_type3.removeAttribute("hidden")
	}
	updata_type3();
	ss_toggle()
}

function addtatoByWorkId(imgSrc, picId, productTmp, transformData) {
	"use strict";
	productTmp.parm = "1";
	productTmp.picId = picId;
	productTmp.isSetDefauleValue = true;
	productTmp.tatooImgSrc = imgSrc;
	var imgTatoo = new Image();
	if (!isIE) {
		if (isAnonymous) {
			imgTatoo.crossOrigin = "Anonymous"
		}
		imgTatoo.src = productTmp.tatooImgSrc
	} else {
		xhrTmp = new XMLHttpRequest();
		xhrTmp.onload = function() {
			urlTmp = URL.createObjectURL(this.response);
			if (isAnonymous) {
				imgTatoo.crossOrigin = "Anonymous"
			}
			imgTatoo.src = urlTmp;
			URL.revokeObjectURL(urlTmp)
		};
		xhrTmp.open('GET', productTmp.tatooImgSrc, true);
		xhrTmp.responseType = 'blob';
		xhrTmp.send()
	}
	if (imgTatoo.complete) {
		productTmp.tatooWidth = imgTatoo.width;
		productTmp.tatooHeight = imgTatoo.height;
		if (imgTatoo.width < imgTatoo.height) {
			productTmp.tatooScale = parseFloat(transformData.a) * (config.tatooNormalSize / imgTatoo.width)
		} else {
			productTmp.tatooScale = parseFloat(transformData.a) * (config.tatooNormalSize / imgTatoo.height)
		}
		productTmp.tatooX = parseFloat(transformData.tx) * screenScale;
		productTmp.tatooY = parseFloat(transformData.ty) * screenScale;
		setLinkObjectType3(nowProduct, productTmp, picId, imgSrc, true);
		isDoClear = true;
		ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
		updata_type3();
		ss_toggle();
		return
	}
	imgTatoo.onload = function() {
		productTmp.tatooWidth = imgTatoo.width;
		productTmp.tatooHeight = imgTatoo.height;
		if (imgTatoo.width < imgTatoo.height) {
			productTmp.tatooScale = parseFloat(transformData.a) * (config.tatooNormalSize / imgTatoo.width)
		} else {
			productTmp.tatooScale = parseFloat(transformData.a) * (config.tatooNormalSize / imgTatoo.height)
		}
		productTmp.tatooX = parseFloat(transformData.tx) * screenScale;
		productTmp.tatooY = parseFloat(transformData.ty) * screenScale;
		setLinkObjectType3(nowProduct, productTmp, picId, imgSrc, true);
		isDoClear = true;
		ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
		updata_type3();
		ss_toggle()
	}
}

function updata_type3() {
	"use strict";
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		if (layerTmp.layerId === nowLayer) {
			for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
				var productTmp = layerTmp.productPicList[j];
				if (productTmp.type === "3") {
					buildImg(productTmp)
				}
			}
		}
	}
}

function updata_type2() {
	"use strict";
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		if (layerTmp.layerId === nowLayer) {
			for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
				var productTmp = layerTmp.productPicList[j];
				if (productTmp.type === "2") {
					buildImg(productTmp)
				}
			}
		}
	}
}

function updata_type1() {
	"use strict";
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		if (layerTmp.layerId === nowLayer) {
			for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
				var productTmp = layerTmp.productPicList[j];
				if (productTmp.type === "1") {
					buildImg(productTmp)
				}
			}
		}
	}
}

function updata_type4() {
	"use strict";
	for (var i = 0; i < nowProduct.layerList.length; i++) {
		var layerTmp = nowProduct.layerList[i];
		if (layerTmp.layerId === nowLayer) {
			for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
				var productTmp = layerTmp.productPicList[j];
				if (productTmp.type === "4") {
					buildImg(productTmp)
				}
			}
		}
	}
}

function type_others(productTmp) {
	"use strict";
	if (productTmp.parm === "0") {
		var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		for (var i = 0; i < imgData.data.length; i += 4) {
			if (imgData.data[i + 3] !== 0) {
				var deep = 0;
				if (browser.versions.ios) {
					deep = 25.0
				}
				imgData.data[i] = imgData.data[i] + 175 - deep;
				imgData.data[i + 1] = imgData.data[i + 1] + 175 - deep;
				imgData.data[i + 2] = imgData.data[i + 2] + 175 - deep
			}
		}
		ctx_tmp.putImageData(imgData, 0, 0)
	}
}

function type1(productTmp, img) {
	"use strict";
	var i = 0;
	var colorStr = "255,255,255";
	for (i = 0; i < pureColorArr.length; i++) {
		var pureColorTmp = pureColorArr[i];
		if (pureColorTmp.colorId === productTmp.colorId) {
			colorStr = pureColorTmp.value;
			break
		}
	}
	var colorArr = colorStr.split(",");
	var r = parseInt(colorArr[0]);
	var g = parseInt(colorArr[1]);
	var b = parseInt(colorArr[2]);
	var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	for (i = 0; i < imgData.data.length; i += 4) {
		if (imgData.data[i + 3] !== 0) {
			var deep = 0;
			if (browser.versions.ios) {
				deep = 25
			}
			imgData.data[i] = imgData.data[i] - 80 + r - deep;
			imgData.data[i + 1] = imgData.data[i + 1] - 80 + g - deep;
			imgData.data[i + 2] = imgData.data[i + 2] - 80 + b - deep
		}
	}
	ctx_tmp.putImageData(imgData, 0, 0)
}

function type4(productTmp) {
	"use strict";
	if (productTmp.parm === "0") {
		var i = 0;
		var colorStr = "255,255,255";
		for (i = 0; i < pureColorArr.length; i++) {
			var pureColorTmp = pureColorArr[i];
			if (pureColorTmp.colorId === productTmp.colorId) {
				colorStr = pureColorTmp.value;
				break
			}
		}
		var colorArr = colorStr.split(",");
		var r = parseInt(colorArr[0]);
		var g = parseInt(colorArr[1]);
		var b = parseInt(colorArr[2]);
		var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		for (i = 0; i < imgData.data.length; i += 4) {
			if (imgData.data[i + 3] !== 0) {
				var deep = 0;
				if (browser.versions.ios) {
					deep = 25.0
				}
				imgData.data[i] = imgData.data[i] - 80 + r - deep;
				imgData.data[i + 1] = imgData.data[i + 1] - 80 + g - deep;
				imgData.data[i + 2] = imgData.data[i + 2] - 80 + b - deep
			}
		}
		ctx_tmp.putImageData(imgData, 0, 0)
	}
}

function type3(productTmp) {
	"use strict";
	var i = 0,
		j = 0;
	var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	var imgDataShade = ctx_tatooShade.getImageData(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
	if (!productTmp.isSetRect) {
		var x = ctx_tmp.canvas.width;
		var y = ctx_tmp.canvas.height;
		var width = 0;
		var height = 0;
		for (i = 0; i < ctx_tmp.canvas.height; i++) {
			for (j = 0; j < ctx_tmp.canvas.width; j++) {
				if (imgData.data[i * ctx_tmp.canvas.height * 4 + j * 4 + 3] === 255) {
					if (x > j) {
						x = j
					}
					if (y > i) {
						y = i
					}
					if (width < j) {
						width = j
					}
					if (height < i) {
						height = i
					}
				}
			}
		}
		productTmp.x = x;
		productTmp.y = y;
		productTmp.width = width - x;
		productTmp.height = height - y;
		productTmp.isSetRect = true
	}
	var colorStr = "255,255,255";
	if (productTmp.colorStr === null) {
		for (var k = 0; k < pureColorArr.length; k++) {
			var pureColorTmp = pureColorArr[k];
			if (pureColorTmp.colorId === productTmp.colorId) {
				colorStr = pureColorTmp.value;
				break
			}
		}
	} else {
		colorStr = productTmp.colorStr
	}
	var colorArr = colorStr.split(",");
	var r = parseInt(colorArr[0]);
	var g = parseInt(colorArr[1]);
	var b = parseInt(colorArr[2]);
	var deep = 0;
	if (productTmp.parm === "0") {
		for (i = 0; i < imgData.data.length; i += 4) {
			if (imgData.data[i + 3] !== 0) {
				deep = 0;
				if (browser.versions.ios) {
					deep = 25;
					if ((imgData.data[i] - 80.0 + r + imgData.data[i + 1] - 80.0 + g + imgData.data[i + 2] - 80.0 + b - deep * 3) >= 768.0) {
						deep = deep + 10
					}
				}
				if (nowProduct.CategoryType !== CategoryType.SWEATER) {
					imgData.data[i] = imgData.data[i] - 80 + r - deep;
					imgData.data[i + 1] = imgData.data[i + 1] - 80 + g - deep;
					imgData.data[i + 2] = imgData.data[i + 2] - 80 + b - deep
				}
			}
		}
	} else {
		var imgDataTatoo = ctx_tatoo.getImageData(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
		var alphaValue = 0;
		if (nowProduct.CategoryType === CategoryType.SWEATER) {
			alphaValue = 200
		} else {
			alphaValue = 0
		}
		for (i = 0; i < imgData.data.length; i += 4) {
			if (imgData.data[i + 3] !== 0) {
				if (nowProduct.CategoryType === CategoryType.SWEATER) {
					if (imgDataTatoo.data[i + 3] !== 0) {
						imgData.data[i] = imgDataTatoo.data[i];
						imgData.data[i + 1] = imgDataTatoo.data[i + 1];
						imgData.data[i + 2] = imgDataTatoo.data[i + 2];
						imgData.data[i + 3] = imgDataTatoo.data[i + 3]
					} else {
						imgData.data[i + 3] = 0
					}
				} else if (nowProduct.CategoryType === CategoryType.PILLOW || nowProduct.CategoryType === CategoryType.TOWELS) {
					if (imgDataTatoo.data[i + 3] >= 125) {
						imgData.data[i] = imgData.data[i] - 80 + imgDataTatoo.data[i] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3];
						imgData.data[i + 1] = imgData.data[i + 1] - 80 + imgDataTatoo.data[i + 1] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3];
						imgData.data[i + 2] = imgData.data[i + 2] - 80 + imgDataTatoo.data[i + 2] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3]
					} else {
						imgData.data[i] = imgData.data[i] - 80 + r;
						imgData.data[i + 1] = imgData.data[i + 1] - 80 + g;
						imgData.data[i + 2] = imgData.data[i + 2] - 80 + b
					}
				} else {
					if (imgDataTatoo.data[i + 3] >= 125) {
						imgData.data[i] = imgData.data[i] - 80 + imgDataTatoo.data[i] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3];
						imgData.data[i + 1] = imgData.data[i + 1] - 80 + imgDataTatoo.data[i + 1] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3];
						imgData.data[i + 2] = imgData.data[i + 2] - 80 + imgDataTatoo.data[i + 2] * (imgDataTatoo.data[i + 3] / 255) + 255 - imgDataTatoo.data[i + 3]
					} else {
						deep = 0;
						if (browser.versions.ios) {
							deep = 25;
							if ((imgData.data[i] - 80.0 + r + imgData.data[i + 1] - 80.0 + g + imgData.data[i + 2] - 80.0 + b - deep * 3) >= 768.0) {
								deep = deep + 10
							}
						}
						imgData.data[i] = imgData.data[i] - 80 + r - deep;
						imgData.data[i + 1] = imgData.data[i + 1] - 80 + g - deep;
						imgData.data[i + 2] = imgData.data[i + 2] - 80 + b - deep
					}
				}
				imgDataShade.data[i + 3] = 0
			} else {
				if (imgDataShade.data[i + 3] === 1) {
					imgDataShade.data[i] = 238;
					imgDataShade.data[i + 1] = 238;
					imgDataShade.data[i + 2] = 238;
					imgDataShade.data[i + 3] = 125
				}
			}
		}
	}
	ctx_tatooShade.putImageData(imgDataShade, 0, 0);
	ctx_tmp.putImageData(imgData, 0, 0)
}

function type2(productTmp) {
	"use strict";
	var changeScale = 1.0;
	if (browserPlatform === "PC") {
		changeScale = config.width / config.canvasNormalSize
	}
	var posArr = productTmp.pos.split(",");
	var x = parseInt(posArr[0]);
	var y = parseInt(posArr[1]);
	var rZ = parseInt(productTmp.rotationZ);
	var scale = parseFloat(productTmp.signScale);
	var textWidthTmp = config.fontBoxWidth * scale;
	var textHeightTmp = config.fontBoxHeight * scale;
	var r = Math.sqrt((textWidthTmp / 2.0) * (textWidthTmp / 2.0) + (textHeightTmp / 2.0) * (textHeightTmp / 2.0));
	var angle = rZ + 90.0 + 90.0 - Math.asin((textWidthTmp / 2.0) / r) / Math.PI * 180.0;
	x = x + r * Math.sin(angle * Math.PI / 180.0);
	y = y + (0 - r * Math.cos(angle * Math.PI / 180.0));
	ctx_font.save();
	ctx_font.translate(x * screenScale / ratio * changeScale, y * screenScale / ratio * changeScale);
	ctx_font.font = productTmp.fontSize * changeScale + "px " + productTmp.fontType;
	ctx_font.textAlign = "center";
	ctx_font.rotate(rZ * Math.PI / 180);
	ctx_font.scale(scale * screenScale / ratio, scale * screenScale / ratio);
	ctx_font.fillStyle = productTmp.fontColor;
	ctx_font.fillText(productTmp.fontValue, 0, 0);
	ctx_font.restore()
}

function rebuildType3(productTmp) {
	"use strict";
	if (productTmp !== null) {
		var i = 0;
		ctx_tmp.drawImage(productTmp.objectImg, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
		if (productTmp.parm === "0") {
			var colorStr = "255,255,255";
			if (productTmp.colorStr === null) {
				for (var k = 0; k < pureColorArr.length; k++) {
					var pureColorTmp = pureColorArr[k];
					if (pureColorTmp.colorId === productTmp.colorId) {
						colorStr = pureColorTmp.value;
						break
					}
				}
			} else {
				colorStr = productTmp.colorStr
			}
			var colorArr = colorStr.split(",");
			var r = parseInt(colorArr[0]);
			var g = parseInt(colorArr[1]);
			var b = parseInt(colorArr[2]);
			for (i = 0; i < imgData.data.length; i += 4) {
				if (imgData.data[i + 3] !== 0) {
					var deep = 0;
					if (browser.versions.ios) {
						deep = 25;
						if ((imgData.data[i] - 80.0 + r + imgData.data[i + 1] - 80.0 + g + imgData.data[i + 2] - 80.0 + b - deep * 3) >= 768.0) {
							deep = deep + 10
						}
					}
					if (nowProduct.CategoryType !== CategoryType.SWEATER) {
						imgData.data[i] = imgData.data[i] - 80 + r - deep;
						imgData.data[i + 1] = imgData.data[i + 1] - 80 + g - deep;
						imgData.data[i + 2] = imgData.data[i + 2] - 80 + b - deep
					}
				}
			}
			ctx_tmp.putImageData(imgData, 0, 0);
			ctx_type3.drawImage(c_tmp, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
			ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height)
		} else {
			var imgData_type3 = ctx_type3.getImageData(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
			for (i = 0; i < imgData.data.length; i += 4) {
				if (imgData.data[i + 3] !== 0) {
					imgData_type3.data[i] = 255;
					imgData_type3.data[i + 1] = 255;
					imgData_type3.data[i + 2] = 255;
					if (nowProduct.CategoryType !== CategoryType.SWEATER && nowProduct.CategoryType !== CategoryType.PILLOW && nowProduct.CategoryType !== CategoryType.TOWELS) {
						imgData_type3.data[i + 3] = 255
					} else {
						imgData_type3.data[i + 3] = 0
					}
				}
			}
			ctx_type3.putImageData(imgData_type3, 0, 0)
		}
	}
}

function buildImg(productTmp) {
	"use strict";
	var img = new Image();
	if (productTmp !== null) {
		productTmp.isLoading = true;
		if (productTmp.type === "1") {
			if (!isIE) {
				if (isAnonymous) {
					img.crossOrigin = "Anonymous"
				}
				img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1");
				productTmp.objectImg = img;
				if (img.complete) {
					if (isDoClear) {
						ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
						isDoClear = false
					}
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					type1(productTmp, img);
					ctx_type1.drawImage(c_tmp, 0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false;
					return
				}
				img.onload = function() {
					if (isDoClear) {
						ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
						isDoClear = false
					}
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					type1(productTmp, img);
					ctx_type1.drawImage(c_tmp, 0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false
				}
			} else {
				var xhr_type1 = new XMLHttpRequest();
				xhr_type1.onload = function() {
					var url = URL.createObjectURL(this.response);
					if (isAnonymous) {
						img.crossOrigin = "*"
					}
					img.src = url;
					productTmp.objectImg = img;
					if (img.complete) {
						if (isDoClear) {
							ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
							isDoClear = false
						}
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type1(productTmp, img);
						ctx_type1.drawImage(c_tmp, 0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false;
						URL.revokeObjectURL(url);
						return
					}
					img.onload = function() {
						if (isDoClear) {
							ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
							isDoClear = false
						}
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type1(productTmp, img);
						ctx_type1.drawImage(c_tmp, 0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false;
						URL.revokeObjectURL(url)
					}
				};
				xhr_type1.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true);
				xhr_type1.responseType = 'blob';
				xhr_type1.send()
			}
		} else if (productTmp.type === "4") {
			if (!isIE) {
				if (isAnonymous) {
					img.crossOrigin = "Anonymous"
				}
				if (productTmp.parm === "1") {
					img.src = IDX_INFO.productModelXml_Type4.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{cId}", productTmp.colorId).replace("{sId}", "S1")
				} else {
					img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1")
				}
				productTmp.objectImg = img;
				if (img.complete) {
					if (isDoClear) {
						ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
						isDoClear = false
					}
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					type4(productTmp, img);
					ctx_type4.drawImage(c_tmp, 0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false;
					return
				}
				img.onload = function() {
					if (isDoClear) {
						ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
						isDoClear = false
					}
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					type4(productTmp, img);
					ctx_type4.drawImage(c_tmp, 0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false
				}
			} else {
				var xhr_type4 = new XMLHttpRequest();
				xhr_type4.onload = function() {
					var url = URL.createObjectURL(this.response);
					if (isAnonymous) {
						img.crossOrigin = "*"
					}
					img.src = url;
					productTmp.objectImg = img;
					if (img.complete) {
						if (isDoClear) {
							ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
							isDoClear = false
						}
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type4(productTmp, img);
						ctx_type4.drawImage(c_tmp, 0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false;
						URL.revokeObjectURL(url);
						return
					}
					img.onload = function() {
						if (isDoClear) {
							ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
							isDoClear = false
						}
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type4(productTmp, img);
						ctx_type4.drawImage(c_tmp, 0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false;
						URL.revokeObjectURL(url)
					}
				};
				if (productTmp.parm === "1") {
					xhr_type4.open('GET', IDX_INFO.productModelXml_Type4.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{cId}", productTmp.colorId).replace("{sId}", "S1"), true)
				} else {
					xhr_type4.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true)
				}
				xhr_type4.responseType = 'blob';
				xhr_type4.send()
			}
		} else if (productTmp.type === "3") {
			var xhrTmp = null;
			var urlTmp = null;
			if (productTmp.layerId === productTmp.editLayerId) {
				nowMoveObject = productTmp
			}
			if (productTmp.objectImg !== null) {
				img = productTmp.objectImg;
				if (!productTmp.objectImg.complete) {
					if (!isIE) {
						if (isAnonymous) {
							img.crossOrigin = "Anonymous"
						}
						img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1");
						productTmp.objectImg = img
					} else {
						xhrTmp = new XMLHttpRequest();
						xhrTmp.onload = function() {
							urlTmp = URL.createObjectURL(this.response);
							if (isAnonymous) {
								img.crossOrigin = "Anonymous"
							}
							img.src = urlTmp;
							productTmp.objectImg = img;
							URL.revokeObjectURL(urlTmp)
						};
						xhrTmp.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true);
						xhrTmp.responseType = 'blob';
						xhrTmp.send()
					}
				}
			} else {
				if (!isIE) {
					if (isAnonymous) {
						img.crossOrigin = "Anonymous"
					}
					img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1");
					productTmp.objectImg = img
				} else {
					xhrTmp = new XMLHttpRequest();
					xhrTmp.onload = function() {
						urlTmp = URL.createObjectURL(this.response);
						if (isAnonymous) {
							img.crossOrigin = "Anonymous"
						}
						img.src = urlTmp;
						productTmp.objectImg = img;
						URL.revokeObjectURL(urlTmp)
					};
					xhrTmp.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true);
					xhrTmp.responseType = 'blob';
					xhrTmp.send()
				}
			}
			if (productTmp.parm === "1") {
				var imgTatoo = new Image();
				var imgTatoo_x = 0;
				var imgTatoo_y = 0;
				var isNeedRespectInsideOutsideFlip = true;
				if (productTmp.tatooImg !== null) {
					imgTatoo = productTmp.tatooImg;
					if (!productTmp.tatooImg.complete) {
						if (!isIE) {
							if (isAnonymous) {
								imgTatoo.crossOrigin = "Anonymous"
							}
							imgTatoo.src = productTmp.tatooImgSrc;
							productTmp.tatooImg = imgTatoo;
							productTmp.tatooImgOldSrc = productTmp.tatooImgSrc
						} else {
							xhrTmp = new XMLHttpRequest();
							xhrTmp.onload = function() {
								urlTmp = URL.createObjectURL(this.response);
								if (isAnonymous) {
									imgTatoo.crossOrigin = "Anonymous"
								}
								imgTatoo.src = urlTmp;
								productTmp.tatooImg = imgTatoo;
								productTmp.tatooImgOldSrc = productTmp.tatooImgSrc;
								URL.revokeObjectURL(urlTmp)
							};
							xhrTmp.open('GET', productTmp.tatooImgSrc, true);
							xhrTmp.responseType = 'blob';
							xhrTmp.send()
						}
					} else if (productTmp.tatooImgSrc !== productTmp.tatooImgOldSrc) {
						productTmp.tatooImgOldSrc = productTmp.tatooImgSrc;
						if (!isIE) {
							if (isAnonymous) {
								imgTatoo.crossOrigin = "Anonymous"
							}
							imgTatoo.src = productTmp.tatooImgSrc;
							productTmp.tatooImg = imgTatoo
						} else {
							xhrTmp = new XMLHttpRequest();
							xhrTmp.onload = function() {
								urlTmp = URL.createObjectURL(this.response);
								if (isAnonymous) {
									imgTatoo.crossOrigin = "Anonymous"
								}
								imgTatoo.src = urlTmp;
								productTmp.tatooImg = imgTatoo;
								URL.revokeObjectURL(urlTmp)
							};
							xhrTmp.open('GET', productTmp.tatooImgSrc, true);
							xhrTmp.responseType = 'blob';
							xhrTmp.send()
						}
					}
				} else {
					if (!isIE) {
						if (isAnonymous) {
							imgTatoo.crossOrigin = "Anonymous"
						}
						imgTatoo.src = productTmp.tatooImgSrc;
						productTmp.tatooImg = imgTatoo
					} else {
						xhrTmp = new XMLHttpRequest();
						xhrTmp.onload = function() {
							urlTmp = URL.createObjectURL(this.response);
							if (isAnonymous) {
								imgTatoo.crossOrigin = "Anonymous"
							}
							imgTatoo.src = urlTmp;
							productTmp.tatooImg = imgTatoo;
							URL.revokeObjectURL(urlTmp)
						};
						xhrTmp.open('GET', productTmp.tatooImgSrc, true);
						xhrTmp.responseType = 'blob';
						xhrTmp.send()
					}
				}
				imgTatoo.onerror = function() {
					console.log("imgTatoo.onerror");
					buildImg(productTmp)
				};
				var changeScale = 1.0;
				if (browserPlatform === "PC") {
					changeScale = config.width / config.canvasNormalSize
				}
				if (imgTatoo.complete && img.complete) {
					if (!productTmp.isSetDefauleValue && productTmp.editLayerId === productTmp.layerId) {
						productTmp.tatooWidth = imgTatoo.width;
						productTmp.tatooHeight = imgTatoo.height;
						setDefaultScale(productTmp);
						setDefaultPos(productTmp);
						productTmp.isSetDefauleValue = true
					}
					isNeedRespectInsideOutsideFlip = true;
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					if (productTmp.respectInsideOutsideFlip === "y") {
						imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * productTmp.tatooScale * screenScale * changeScale - productTmp.tatooX * changeScale;
						imgTatoo_y = productTmp.tatooY * changeScale
					} else {
						imgTatoo_x = productTmp.tatooX * changeScale;
						imgTatoo_y = productTmp.tatooY * changeScale
					}
					if (productTmp.editLayerId !== productTmp.layerId) {
						var linkObject = getLinkObject(nowProduct, productTmp);
						if (linkObject.isSetRect) {
							productTmp.tatooScale = linkObject.tatooScale;
							if (productTmp.respectInsideOutsideFlip === "y") {
								imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * screenScale * linkObject.tatooScale * changeScale - ((productTmp.x + productTmp.width) - (linkObject.x + linkObject.width) + linkObject.tatooX) * changeScale
							} else {
								imgTatoo_x = (productTmp.x - linkObject.x + linkObject.tatooX) * changeScale
							}
							if (productTmp.mode === "clone") {
								var linkCloneObject = getLinkCloneObject(nowProduct, productTmp);
								if (linkCloneObject.respectInsideOutsideFlip === "y") {
									imgTatoo_x = ctx_tatoo.canvas.width - (((linkCloneObject.x + linkCloneObject.width) - (linkObject.x + linkObject.width) + linkObject.tatooX)) * changeScale - imgTatoo.width * linkObject.tatooScale * screenScale * changeScale;
									isNeedRespectInsideOutsideFlip = false
								} else {
									imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * screenScale * linkObject.tatooScale * changeScale + (((linkCloneObject.x - linkObject.x + linkObject.tatooX) * changeScale + imgTatoo.width * screenScale * linkObject.tatooScale * changeScale) - ctx_tatoo.canvas.width)
								}
							}
							imgTatoo_y = (productTmp.y - linkObject.y + linkObject.tatooY) * changeScale
						}
					}
					if (productTmp.respectInsideOutsideFlip === "y" && isNeedRespectInsideOutsideFlip) {
						ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
						ctx_tatoo.scale(-1, 1);
						ctx_tatoo.drawImage(imgTatoo, imgTatoo_x, imgTatoo_y, imgTatoo.width * screenScale * productTmp.tatooScale * changeScale, imgTatoo.height * screenScale * productTmp.tatooScale * changeScale);
						ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
						ctx_tatoo.scale(-1, 1)
					} else {
						ctx_tatoo.drawImage(imgTatoo, imgTatoo_x, imgTatoo_y, imgTatoo.width * screenScale * productTmp.tatooScale * changeScale, imgTatoo.height * screenScale * productTmp.tatooScale * changeScale)
					}
					type3(productTmp);
					ctx_type3.drawImage(c_tmp, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false;
					return
				} else {
					var IntervalId_showTatoo = setInterval(function() {
						if (imgTatoo.complete && img.complete) {
							clearInterval(IntervalId_showTatoo);
							if (!productTmp.isSetDefauleValue && productTmp.editLayerId === productTmp.layerId) {
								productTmp.tatooWidth = imgTatoo.width;
								productTmp.tatooHeight = imgTatoo.height;
								setDefaultScale(productTmp);
								setDefaultPos(productTmp);
								productTmp.isSetDefauleValue = true
							}
							isNeedRespectInsideOutsideFlip = true;
							ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							if (productTmp.respectInsideOutsideFlip === "y") {
								imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * productTmp.tatooScale * screenScale * changeScale - productTmp.tatooX * changeScale;
								imgTatoo_y = productTmp.tatooY * changeScale
							} else {
								imgTatoo_x = productTmp.tatooX * changeScale;
								imgTatoo_y = productTmp.tatooY * changeScale
							}
							if (productTmp.editLayerId !== productTmp.layerId) {
								var linkObject = getLinkObject(nowProduct, productTmp);
								if (linkObject.isSetRect) {
									productTmp.tatooScale = linkObject.tatooScale;
									if (productTmp.respectInsideOutsideFlip === "y") {
										imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * screenScale * linkObject.tatooScale * changeScale - ((productTmp.x + productTmp.width) - (linkObject.x + linkObject.width) + linkObject.tatooX) * changeScale
									} else {
										imgTatoo_x = (productTmp.x - linkObject.x + linkObject.tatooX) * changeScale
									}
									if (productTmp.mode === "clone") {
										var linkCloneObject = getLinkCloneObject(nowProduct, productTmp);
										if (linkCloneObject.respectInsideOutsideFlip === "y") {
											imgTatoo_x = ctx_tatoo.canvas.width - (((linkCloneObject.x + linkCloneObject.width) - (linkObject.x + linkObject.width) + linkObject.tatooX)) * changeScale - imgTatoo.width * linkObject.tatooScale * screenScale * changeScale;
											isNeedRespectInsideOutsideFlip = false
										} else {
											imgTatoo_x = ctx_tatoo.canvas.width * ratio - imgTatoo.width * screenScale * linkObject.tatooScale * changeScale + (((linkCloneObject.x - linkObject.x + linkObject.tatooX) * changeScale + imgTatoo.width * screenScale * linkObject.tatooScale * changeScale) - ctx_tatoo.canvas.width)
										}
									}
									imgTatoo_y = (productTmp.y - linkObject.y + linkObject.tatooY) * changeScale
								}
							}
							if (productTmp.respectInsideOutsideFlip === "y" && isNeedRespectInsideOutsideFlip) {
								ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
								ctx_tatoo.scale(-1, 1);
								ctx_tatoo.drawImage(imgTatoo, imgTatoo_x, imgTatoo_y, imgTatoo.width * screenScale * productTmp.tatooScale * changeScale, imgTatoo.height * screenScale * productTmp.tatooScale * changeScale);
								ctx_tatoo.translate(ctx_tatoo.canvas.width, 0);
								ctx_tatoo.scale(-1, 1)
							} else {
								ctx_tatoo.drawImage(imgTatoo, imgTatoo_x, imgTatoo_y, imgTatoo.width * screenScale * productTmp.tatooScale * changeScale, imgTatoo.height * screenScale * productTmp.tatooScale * changeScale)
							}
							type3(productTmp);
							ctx_type3.drawImage(c_tmp, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
							ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
							productTmp.isDone = true;
							productTmp.isLoading = false
						} else {
							return
						}
					}, 300)
				}
			} else {
				if (img.complete) {
					if (isDoClear) {
						ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
						isDoClear = false
					}
					ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					type3(productTmp, img);
					ctx_type3.drawImage(c_tmp, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
					ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
					productTmp.isDone = true;
					productTmp.isLoading = false;
					return
				} else {
					var IntervalId_showTatooObject = setInterval(function() {
						if (img.complete) {
							clearInterval(IntervalId_showTatooObject);
							if (isDoClear) {
								ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
								isDoClear = false
							}
							ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							type3(productTmp, img);
							ctx_type3.drawImage(c_tmp, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
							ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							productTmp.isDone = true;
							productTmp.isLoading = false
						} else {
							return
						}
					}, 300)
				}
			}
		} else {
			if (productTmp.type !== "2") {
				if (!isIE) {
					if (isAnonymous) {
						img.crossOrigin = "Anonymous"
					}
					img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1");
					productTmp.objectImg = img;
					if (img.complete) {
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type_others(productTmp);
						if (productTmp.setId === "SXD" || productTmp.setId === "SSD" || productTmp.setId === "SLB" || productTmp.setId === "SDM" || productTmp.setId === "SGB") {
							ctx_ssd.drawImage(c_tmp, 0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height)
						} else {
							ctx.drawImage(c_tmp, 0, 0, ctx.canvas.width, ctx.canvas.height)
						}
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false;
						return
					}
					img.onload = function() {
						ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						type_others(productTmp);
						if (productTmp.setId === "SXD" || productTmp.setId === "SSD" || productTmp.setId === "SLB" || productTmp.setId === "SDM" || productTmp.setId === "SGB") {
							ctx_ssd.drawImage(c_tmp, 0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height)
						} else {
							ctx.drawImage(c_tmp, 0, 0, ctx.canvas.width, ctx.canvas.height)
						}
						ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
						productTmp.isDone = true;
						productTmp.isLoading = false
					}
				} else {
					var xhr_type0 = new XMLHttpRequest();
					xhr_type0.onload = function() {
						var url = URL.createObjectURL(this.response);
						if (isAnonymous) {
							img.crossOrigin = "*"
						}
						img.src = url;
						productTmp.objectImg = img;
						if (img.complete) {
							ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							type_others(productTmp);
							if (productTmp.setId === "SXD" || productTmp.setId === "SSD" || productTmp.setId === "SLB" || productTmp.setId === "SDM" || productTmp.setId === "SGB") {
								ctx_ssd.drawImage(c_tmp, 0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height)
							} else {
								ctx.drawImage(c_tmp, 0, 0, ctx.canvas.width, ctx.canvas.height)
							}
							ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							productTmp.isDone = true;
							productTmp.isLoading = false;
							URL.revokeObjectURL(url);
							return
						}
						img.onload = function() {
							ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							type_others(productTmp);
							if (productTmp.setId === "SXD" || productTmp.setId === "SSD" || productTmp.setId === "SLB" || productTmp.setId === "SDM" || productTmp.setId === "SGB") {
								ctx_ssd.drawImage(c_tmp, 0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height)
							} else {
								ctx.drawImage(c_tmp, 0, 0, ctx.canvas.width, ctx.canvas.height)
							}
							ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
							productTmp.isDone = true;
							productTmp.isLoading = false;
							URL.revokeObjectURL(url)
						}
					};
					xhr_type0.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true);
					xhr_type0.responseType = 'blob';
					xhr_type0.send()
				}
			} else {
				type2(productTmp);
				productTmp.isDone = true;
				productTmp.isLoading = false
			}
		}
	}
}

function getImagePointImg(productId, imageMaskPointTmp, position) {
	"use strict";
	var img = new Image();
	if (!isIE) {
		if (isAnonymous) {
			img.crossOrigin = "Anonymous"
		}
		img.src = IDX_INFO.productModelXml_ImageSetting.replace("{pId}", productId).replace("{pId}", productId).replace("{position}", position);
		if (img.complete) {
			imageMaskPointTmp.imgWidth = img.width;
			imageMaskPointTmp.imgHeight = img.height;
			return
		}
		img.onload = function() {
			imageMaskPointTmp.imgWidth = img.width;
			imageMaskPointTmp.imgHeight = img.height
		}
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var url = URL.createObjectURL(this.response);
			if (isAnonymous) {
				img.crossOrigin = "*"
			}
			img.src = url;
			if (img.complete) {
				imageMaskPointTmp.imgWidth = img.width;
				imageMaskPointTmp.imgHeight = img.height;
				URL.revokeObjectURL(url);
				return
			}
			img.onload = function() {
				imageMaskPointTmp.imgWidth = img.width;
				imageMaskPointTmp.imgHeight = img.height;
				URL.revokeObjectURL(url)
			}
		};
		xhr.open('GET', IDX_INFO.productModelXml_ImageSetting.replace("{pId}", productId).replace("{pId}", productId).replace("{position}", position), true);
		xhr.responseType = 'blob';
		xhr.send()
	}
}

function getImageSettingImg(product, imageSettingTmp) {
	"use strict";
	var img = new Image();
	var position = "";
	if (imageSettingTmp.name === "outsideLayer") {
		position = "OUTSIDE"
	} else if (imageSettingTmp.name === "insideLayer") {
		position = "INSIDE"
	} else if (imageSettingTmp.name === "leftOutsideLayer") {
		position = "OUTSIDE"
	} else if (imageSettingTmp.name === "leftInsideLayer") {
		position = "INSIDE"
	} else if (imageSettingTmp.name === "frontLayer") {
		position = "FRONT"
	} else if (imageSettingTmp.name === "backLayer") {
		position = "BACK"
	}
	if (imageSettingTmp.imageMaskPointList.length === 0) {
		if (!isIE) {
			if (isAnonymous) {
				img.crossOrigin = "Anonymous"
			}
			img.src = IDX_INFO.productModelXml_ImageSetting.replace("{pId}", product.productId).replace("{pId}", product.productId).replace("{position}", position);
			if (img.complete) {
				imageSettingTmp.imgWidth = img.width;
				imageSettingTmp.imgHeight = img.height;
				return
			}
			img.onload = function() {
				imageSettingTmp.imgWidth = img.width;
				imageSettingTmp.imgHeight = img.height
			}
		} else {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var url = URL.createObjectURL(this.response);
				if (isAnonymous) {
					img.crossOrigin = "*"
				}
				img.src = url;
				if (img.complete) {
					imageSettingTmp.imgWidth = img.width;
					imageSettingTmp.imgHeight = img.height;
					URL.revokeObjectURL(url);
					return
				}
				img.onload = function() {
					imageSettingTmp.imgWidth = img.width;
					imageSettingTmp.imgHeight = img.height;
					URL.revokeObjectURL(url)
				}
			};
			xhr.open('GET', IDX_INFO.productModelXml_ImageSetting.replace("{pId}", product.productId).replace("{pId}", product.productId).replace("{position}", position), true);
			xhr.responseType = 'blob';
			xhr.send()
		}
	} else {
		var imageMaskPointTmp;
		if (imageSettingTmp.imageMaskPointList.length === 1) {
			imageMaskPointTmp = imageSettingTmp.imageMaskPointList[0];
			getImagePointImg(product.productId, imageMaskPointTmp, position)
		} else {
			for (var i = 0; i < imageSettingTmp.imageMaskPointList.length; i++) {
				imageMaskPointTmp = imageSettingTmp.imageMaskPointList[i];
				getImagePointImg(product.productId, imageMaskPointTmp, position + "_" + (i + 1).toString())
			}
		}
	}
}

function setImageSettingData(product) {
	"use strict";
	for (var i = 0; i < imageSettingArr.length; i++) {
		var imageSettingTmp = imageSettingArr[i];
		getImageSettingImg(product, imageSettingTmp)
	}
}

function setRectValue(productTmp) {
	"use strict";
	var i = 0,
		j = 0;
	var imgData = ctx_tmp.getImageData(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	if (!productTmp.isSetRect) {
		var x = ctx_tmp.canvas.width;
		var y = ctx_tmp.canvas.height;
		var width = 0;
		var height = 0;
		for (i = 0; i < ctx_tmp.canvas.height; i++) {
			for (j = 0; j < ctx_tmp.canvas.width; j++) {
				if (imgData.data[i * ctx_tmp.canvas.height * 4 + j * 4 + 3] === 255) {
					if (x > j) {
						x = j
					}
					if (y > i) {
						y = i
					}
					if (width < j) {
						width = j
					}
					if (height < i) {
						height = i
					}
				}
			}
		}
		productTmp.x = x;
		productTmp.y = y;
		productTmp.width = width - x;
		productTmp.height = height - y;
		productTmp.isSetRect = true
	}
}

function setRectImg(productTmp) {
	"use strict";
	productTmp.isLoading = true;
	var img = new Image();
	if (!isIE) {
		if (isAnonymous) {
			img.crossOrigin = "Anonymous"
		}
		img.src = IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1");
		productTmp.objectImg = img;
		if (img.complete) {
			ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
			setRectValue(productTmp);
			ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
			productTmp.isLoading = false;
			return
		}
		img.onload = function() {
			ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
			setRectValue(productTmp);
			ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
			productTmp.isLoading = false
		}
	} else {
		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var url = URL.createObjectURL(this.response);
			if (isAnonymous) {
				img.crossOrigin = "*"
			}
			img.src = url;
			productTmp.objectImg = img;
			if (img.complete) {
				ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
				setRectValue(productTmp);
				ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
				productTmp.isLoading = false;
				URL.revokeObjectURL(url);
				return
			}
			img.onload = function() {
				ctx_tmp.drawImage(img, 0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
				setRectValue(productTmp);
				ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
				productTmp.isLoading = false;
				URL.revokeObjectURL(url)
			}
		};
		xhr.open('GET', IDX_INFO.productModelXml.replace("{pId}", productTmp.productId).replace("{pId}", productTmp.productId).replace("{lId}", productTmp.layerId).replace("{oId}", productTmp.objectId).replace("{mId}", productTmp.materialId).replace("{sId}", "S1"), true);
		xhr.responseType = 'blob';
		xhr.send()
	}
}
var isSetRectDone = false;

function setRect(product) {
	"use strict";
	isSetRectDone = false;
	for (var i = 0; i < product.layerList.length; i++) {
		var layerTmp = product.layerList[i];
		for (var j = layerTmp.productPicList.length - 1; j >= 0; j--) {
			var productTmp = layerTmp.productPicList[j];
			if (productTmp.type === "3") {
				setRectImg(productTmp)
			}
		}
	}
	var IntervalId_setRectImg = setInterval(function() {
		if (selectIsIdle(nowProduct)) {
			isSetRectDone = true;
			clearInterval(IntervalId_setRectImg)
		} else {
			return
		}
	}, 300)
}

function showProduct(product, layerId) {
	"use strict";
	var i = 0;
	var IntervalId_showProduct = setInterval(function() {
		if (!selectIsIdle(product)) {
			return
		} else {
			clearInterval(IntervalId_showProduct);
			ctx_ssd.clearRect(0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height);
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
			ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
			ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
			ctx_tatooShade.clearRect(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
			ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
			ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
			ctx_font.clearRect(0, 0, ctx_font.canvas.width, ctx_font.canvas.height);
			var imgDataShade = ctx_tatooShade.getImageData(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
			for (i = 0; i < imgDataShade.data.length; i += 4) {
				imgDataShade.data[i] = 238;
				imgDataShade.data[i + 1] = 238;
				imgDataShade.data[i + 2] = 238;
				imgDataShade.data[i + 3] = 1
			}
			ctx_tatooShade.putImageData(imgDataShade, 0, 0);
			for (i = 0; i < product.layerList.length; i++) {
				var layerTmp = product.layerList[i];
				if (layerTmp.layerId === layerId) {
					nowLayer = layerId;
					var productTmp;
					var j;
					for (j = 0; j < layerTmp.productPicList.length; j++) {
						productTmp = layerTmp.productPicList[j];
						buildImg(productTmp)
					}
				}
			}
		}
	}, 300)
}

function windowToCanvas(x, y) {
	"use strict";
	var box = c_tatoo.getBoundingClientRect();
	return {
		'x': x - box.left,
		'y': y - box.top
	}
}
var scaleTmp = 0.0;

function touch(event) {
	"use strict";
	event = event || window.event;
	var touch1, touch2;
	var fingers = 1;
	var startX = 0.0;
	var endX = 0.0;
	if (event.touches !== null) {
		fingers = event.touches.length;
		if (fingers === 2) {
			touch1 = event.touches[0];
			touch2 = event.touches[1];
			touch2 = event.touches[1]
		}
	}
	switch (event.type) {
	case "touchstart":
		if (!isLoading) {
			if (fingers === 2) {
				startX = Math.abs(touch1.clientX - touch2.clientX)
			}
			isMove = true;
			isRebuildType3 = true;
			isFirstputDown = true
		}
		break;
	case "touchend":
		isMove = false;
		if (!isLoading) {
			buildImg(nowMoveObject)
		}
		break;
	case "touchmove":
		if (!isLoading) {
			if (isMove) {
				if (isRebuildType3) {
					rebuildType3(nowMoveObject);
					isRebuildType3 = false
				}
				if (fingers === 2) {
					endX = Math.abs(touch1.pageX - touch2.pageX);
					if ((endX - startX) > scaleTmp) {
						scale(config.scaleStep)
					} else if ((endX - startX) < scaleTmp) {
						scale(-config.scaleStep)
					}
					scaleTmp = endX - startX
				} else {
					var box = windowToCanvas(event.touches[0].clientX, event.touches[0].clientY);
					if (isFirstputDown) {
						clientX_old = box.x;
						clientY_old = box.y;
						isFirstputDown = false;
						move(0, 0)
					} else {
						move(box.x - clientX_old, box.y - clientY_old);
						clientX_old = box.x;
						clientY_old = box.y
					}
				}
			}
		}
		break
	}
}

function loadFont(font) {
	"use strict";
	var span = document.createElement("span");
	span.innerHTML = "123abc!@#";
	span.setAttribute("style", "position: absolute;top: -9999px;left: -9999px;");
	span.style.visibility = "hidden";
	span.style.fontSize = "20px";
	span.style.fontFamily = font;
	document.body.appendChild(span)
}

function isIE_fun() {
	"use strict";
	if ( !! window.ActiveXObject || "ActiveXObject" in window) {
		return true
	} else {
		return false
	}
}
var isIE = false;
var topValue = 0;
var browserPlatform = "PC";
var isReadLoadModel = false;
var browser;
window.onload = function() {
	"use strict";
	if (Template === "dm") {
		$(".ft-btn-save").parent().remove();
		$("#doSave").remove();
		$("#doSaveAdd").css("width", "100%")
	}
	browser = {
		versions: function() {
			var u = navigator.userAgent,
				app = navigator.appVersion;
			return {
				trident: u.indexOf('Trident') > -1,
				presto: u.indexOf('Presto') > -1,
				webKit: u.indexOf('AppleWebKit') > -1,
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
				mobile: !! u.match(/AppleWebKit.*Mobile.*/),
				ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
				iPhone: u.indexOf('iPhone') > -1,
				iPad: u.indexOf('iPad') > -1,
				webApp: u.indexOf('Safari') === -1,
				weixin: u.indexOf('MicroMessenger') > -1,
				qq: u.match(/\sQQ/i) === " qq"
			}
		}(),
		language: (navigator.browserLanguage || navigator.language).toLowerCase()
	};
	var fontType = "";
	if (window.navigator.userAgent.indexOf('compatible') !== -1) {
		fontType = "eot"
	}
	if (window.navigator.userAgent.indexOf('AppleWebKit') !== -1) {
		fontType = "TTF"
	}
	if (isIE_fun()) {
		fontType = "eot";
		console.log("IE");
		isIE = true
	} else {
		fontType = "TTF";
		console.log("Other WEB");
		isIE = false
	}
	var newStyle = document.createElement('style');
	newStyle.appendChild(document.createTextNode("@font-face {font-family: 'F002';src: url('http://static.idx.com.cn/www/pc/custom/fonts/HARLOWSI." + fontType + "');}"));
	document.head.appendChild(newStyle);
	newStyle = document.createElement('style');
	newStyle.appendChild(document.createTextNode("@font-face {font-family: 'F001';src: url('http://static.idx.com.cn/www/pc/custom/fonts/OCRAEXT." + fontType + "');}"));
	document.head.appendChild(newStyle);
	newStyle = document.createElement('style');
	newStyle.appendChild(document.createTextNode("@font-face {font-family: 'F004';src: url('http://static.idx.com.cn/www/pc/custom/fonts/MTCORSVA." + fontType + "');}"));
	document.head.appendChild(newStyle);
	newStyle = document.createElement('style');
	newStyle.appendChild(document.createTextNode("@font-face {font-family: 'F003';src: url('http://static.idx.com.cn/www/pc/custom/fonts/Segoe Script." + fontType + "');}"));
	document.head.appendChild(newStyle);
	loadFont("F001");
	loadFont("F002");
	loadFont("F003");
	loadFont("F004");
	c = document.getElementById("myCanvas");
	c_tmp = document.getElementById("myCanvas_tmp");
	c_type1 = document.getElementById("myCanvas_type1");
	c_ssd = document.getElementById("myCanvas_ssd");
	c_type4 = document.getElementById("myCanvas_type4");
	c_type3 = document.getElementById("myCanvas_type3");
	c_tatoo = document.getElementById("myCanvas_tatoo");
	c_tatooShade = document.getElementById("myCanvas_tatooShade");
	c_font = document.getElementById("myCanvas_font");
	var IntervalId_shade = setInterval(function() {
		if (!selectIsIdle(nowProduct) || isLoading) {
			shadeAl()
		} else {
			shadeA2()
		}
	}, 300);
	isReadLoadModel = true
};

function setWorkId(product, workId) {
	"use strict";
	if (workId !== '' && workId !== null) {
		if (Template === "idx") {
			$.ajax({
				url: IDX_INFO.workIdUrl.replace("{workId}", workId).replace("{uuid}", getuuid()).replace("{userid}", "0"),
				dataType: 'xml',
				async: true,
				error: function() {
					alert("加载XML出错")
				},
				success: function(xml) {
					$.ajax({
						url: IDX_INFO.workIdUrl.replace("{workId}", workId).replace("{uuid}", getuuid()).replace("{userid}", $(xml).find("Author").attr("id")),
						dataType: 'xml',
						async: true,
						error: function() {
							alert("加载XML出错")
						},
						success: function(xml) {
							product.workId = workId;
							$(xml).find("ColorSet").children("Set").each(function() {
								changeColor($(this).attr("id"), $(this).attr("matID"), $(this).attr("colorID"))
							});
							$(xml).find("root").children("Signature").each(function() {
								if ($(this).attr("position"), $(this).attr("value") != null && $(this).attr("position"), $(this).attr("value") != undefined) {
									myDoSign($(this).attr("position"), $(this).attr("value"), $(this).attr("colorID"), $(this).attr("matID"))
								}
							});
							$(xml).find("ImageSetting").children("Image").each(function() {
								var imageId = $(this).attr("id");
								var url = $(this).attr("url");
								var layerId = $(this).attr("layerId");
								var transform = $(this).attr("transform");
								var productTmp = findObject3ByLayerId(product, layerId);
								var transformData = stringToValue(transform);
								addtatoByWorkId(url, imageId, productTmp, transformData)
							})
						}
					})
				}
			})
		} else {}
	}
}
var clientX_old;
var clientY_old;
var isFirstputDown = false;

function loadModelFromUrl() {
	"use strict";
	messageBox.Confirm("是否重置?", function() {
		loadModel(nowProduct.productId, nowProduct.workId, nowProduct.CategoryType)
	}, function() {})
}

function loadModel(productId, workId, categoryType) {
	"use strict";
	isLoading = true;
	if (categoryType === CategoryType.PILLOW || categoryType === CategoryType.TOWELS) {
		isMoreTatoo = true
	} else {
		isMoreTatoo = false
	}
	console.log("categoryType:" + categoryType);
	if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
		browserPlatform = "phone";
		if (document.body.clientWidth > 1000) {
			config.width = config.canvasNormalSize
		} else if (document.body.clientWidth < 520) {
			config.width = document.body.clientWidth * 0.65
		} else {
			config.width = config.canvasNormalSize * 0.65
		}
		config.height = config.width;
		topValue = document.documentElement.clientHeight * 0.42 / 2 - config.height / 2 + document.documentElement.clientHeight * 0.08;
		c.setAttribute("style", "top:" + topValue + "px;z-index:-1");
		c_tmp.setAttribute("style", "top:" + topValue + "px;z-index:-1");
		if (categoryType === CategoryType.SWEATER || categoryType === CategoryType.PILLOW || categoryType === CategoryType.TOWELS) {
			c_type1.setAttribute("style", "top:" + topValue + "px;z-index:-1");
			c_type4.setAttribute("style", "top:" + topValue + "px;z-index:-1")
		} else {
			c_type1.setAttribute("style", "top:" + topValue + "px;z-index:0");
			c_type4.setAttribute("style", "top:" + topValue + "px;z-index:0")
		}
		c_ssd.setAttribute("style", "top:" + topValue + "px;z-index:-1");
		if (categoryType === CategoryType.BAG) {
			c_type3.setAttribute("style", "top:" + topValue + "px;z-index:-1")
		} else {
			c_type3.setAttribute("style", "top:" + topValue + "px;z-index:0")
		}
		c_tatoo.setAttribute("style", "top:" + topValue + "px;z-index:0;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;");
		c_tatooShade.setAttribute("style", "top:" + topValue + "px;z-index:0;");
		c_tatooShade.setAttribute("hidden", "hidden");
		c_font.setAttribute("style", "top:" + topValue + "px;z-index:0");
	} else {
		browserPlatform = "PC";
		c.setAttribute("style", "z-index:-1;");
		c_tmp.setAttribute("style", "z-index:-1;");
		if (categoryType === CategoryType.SWEATER || categoryType === CategoryType.PILLOW || categoryType === CategoryType.TOWELS) {
			c_type1.setAttribute("style", "z-index:-1");
			c_type4.setAttribute("style", "z-index:-1");
		} else {
			c_type1.setAttribute("style", "z-index:0");
			c_type4.setAttribute("style", "z-index:0");
		}
		c_ssd.setAttribute("style", "z-index:-1;");
		if (categoryType === CategoryType.BAG) {
			c_type3.setAttribute("style", "z-index:-1");
		} else {
			c_type3.setAttribute("style", "z-index:0");
		}
		c_tatoo.setAttribute("style", "z-index:0;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity: 0.5;opacity: 0.5;");
		c_tatooShade.setAttribute("style", "z-index:0;");
		c_tatooShade.setAttribute("hidden", "hidden");
		c_font.setAttribute("style", "z-index:0;");
	}
	c.width = config.width;
	c.height = config.height;
	c_tmp.width = config.width;
	c_tmp.height = config.height;
	c_type1.width = config.width;
	c_type1.height = config.height;
	c_ssd.width = config.width;
	c_ssd.height = config.height;
	c_type4.width = config.width;
	c_type4.height = config.height;
	c_type3.width = config.width;
	c_type3.height = config.height;
	c_tatoo.width = config.width;
	c_tatoo.height = config.height;
	c_tatooShade.width = config.width;
	c_tatooShade.height = config.height;
	c_font.width = config.width;
	c_font.height = config.height;
	ctx_ssd = c_ssd.getContext("2d");
	ctx = c.getContext("2d");
	ctx_tmp = c_tmp.getContext("2d");
	ctx_type1 = c_type1.getContext("2d");
	ctx_type4 = c_type4.getContext("2d");
	ctx_type3 = c_type3.getContext("2d");
	ctx_tatoo = c_tatoo.getContext("2d");
	ctx_tatooShade = c_tatooShade.getContext("2d");
	ctx_font = c_font.getContext("2d");
	var getPixelRatio = function(context) {
			var backingStore = context.backingStorePixelRatio || context.webkitBackingStorePixelRatio || context.mozBackingStorePixelRatio || context.msBackingStorePixelRatio || context.oBackingStorePixelRatio || context.backingStorePixelRatio || 1;
			return (window.devicePixelRatio || 1) / backingStore;
		};
	ratio = getPixelRatio(ctx);
	screenScale = ((config.width) / (config.canvasNormalSize)) * ratio;
	if (categoryType === CategoryType.SWEATER) {
		c_type3.setAttribute("hidden", "hidden");
	}
	nowMoveObject = null;
	pureColorArr = null;
	fontMaterialsArr = null;
	imageSettingArr = null;
	colorSetArr = null;
	productShotArr = null;
	materialArr = null;
	pureColorArr = new Array(0);
	fontMaterialsArr = new Array(0);
	imageSettingArr = new Array(0);
	colorSetArr = new Array(0);
	productShotArr = new Array(0);
	materialArr = new Array(0);
	c_font.addEventListener('touchstart', touch, false);
	c_font.addEventListener('touchmove', touch, false);
	c_font.addEventListener('touchend', touch, false);
	if (browser.versions.mobile || browser.versions.android || browser.versions.ios) {
		document.addEventListener('touchmove', function(evt) {
			evt.preventDefault();
		});
		document.body.style.overflow = 'hidden';
	}
	ctx_ssd.clearRect(0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height);
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	ctx_tmp.clearRect(0, 0, ctx_tmp.canvas.width, ctx_tmp.canvas.height);
	ctx_type1.clearRect(0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
	ctx_type4.clearRect(0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
	ctx_type3.clearRect(0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
	ctx_tatoo.clearRect(0, 0, ctx_tatoo.canvas.width, ctx_tatoo.canvas.height);
	ctx_tatooShade.clearRect(0, 0, ctx_tatooShade.canvas.width, ctx_tatooShade.canvas.height);
	ctx_font.clearRect(0, 0, ctx_font.canvas.width, ctx_font.canvas.height);
	isMove = false;
	c_font.onmousedown = function(e) {
		if (!isLoading) {
			isRebuildType3 = true;
			isMove = true;
			isFirstputDown = true;
		}
	};
	c_font.onmouseup = function(e) {
		if (!isLoading) {
			isMove = false;
			buildImg(nowMoveObject);
			clientX_old = 0;
			clientY_old = 0;
		}
	};
	c_font.onmouseover = function() {
		window.onmousewheel = function() {
			return false;
		};
	};
	c_font.onmouseout = function(e) {
		if (!isLoading) {
			isMove = false;
			buildImg(nowMoveObject);
			clientX_old = 0;
			clientY_old = 0;
		}
		window.onmousewheel = function() {
			return true;
		};
	};
	c_font.onmousemove = function(e) {
		if (!isLoading) {
			if (isMove) {
				if (isRebuildType3) {
					rebuildType3(nowMoveObject);
					isRebuildType3 = false;
				}
				var box = windowToCanvas(e.clientX, e.clientY);
				if (isFirstputDown) {
					clientX_old = box.x;
					clientY_old = box.y;
					isFirstputDown = false;
					move(0, 0);
				} else {
					move(box.x - clientX_old, box.y - clientY_old);
					clientX_old = box.x;
					clientY_old = box.y;
				}
			}
		}
	};
	c_font.onmousewheel = function(e) {
		if (!isLoading) {
			if (e.wheelDelta > 0) {
				scale(config.scaleStep);
			} else {
				scale(-config.scaleStep);
			}
			rebuildType3(nowMoveObject);
			buildImg(nowMoveObject);
		}
	};
	var product = new Product();
	nowProduct = product;
	product.CategoryType = categoryType;
	product.productId = productId;
	$.ajax({
		url: IDX_INFO.productConfigXml.replace("{pId}", productId),
		dataType: 'xml',
		type: 'get',
		async: true,
		error: function() {
			alert("加载XML出错");
		},
		success: function(xml) {
			$(xml).find("Colors").children("Color").each(function() {
				var pureColor = new PureColor();
				pureColor.colorId = $(this).attr("id");
				pureColor.name = $(this).attr("name");
				pureColor.value = $(this).attr("value");
				pureColorArr.push(pureColor);
			});
			$(xml).find("Materials").children("Material").each(function() {
				var material = new Material();
				material.materialId = $(this).attr("id");
				material.name = $(this).attr("name");
				material.type = $(this).attr("type");
				material.actionType = $(this).attr("actionType");
				materialArr.push(material);
			});
			$(xml).find("FontMaterials").children("Material").each(function() {
				var fontMaterials = new FontMaterials();
				fontMaterials.id = $(this).attr("id");
				fontMaterials.name = $(this).attr("name");
				fontMaterials.size = parseInt($(this).attr("size"));
				fontMaterialsArr.push(fontMaterials);
			});
			$(xml).find("ColorSet").children("Set").each(function() {
				var colorSet = new ColorSet();
				colorSet.setId = $(this).attr("id");
				colorSet.name = $(this).attr("name");
				colorSet.matID = $(this).attr("matID");
				colorSet.colorID = $(this).attr("colorID");
				colorSet.stepID = $(this).attr("stepID");
				colorSet.layerID = $(this).attr("layerID");
				colorSetArr.push(colorSet);
			});
			$(xml).find("ProductShot").children("Item").each(function() {
				var productShot = new ProductShot();
				productShot.width = $(this).attr("width");
				productShot.height = $(this).attr("height");
				$(this).children("Layer").each(function() {
					productShot.layerId = $(this).attr("id");
					productShot.scale = $(this).attr("scale");
					productShot.x = $(this).attr("x");
					productShot.y = $(this).attr("y");
				});
				productShotArr.push(productShot);
			});
			$(xml).find("ImageSetting").children().each(function() {
				var imageSetting = new ImageSetting();
				imageSetting.id = $(this).attr("id");
				imageSetting.name = this.nodeName;
				imageSetting.clipRectX = $(this).children("clipRect").attr("x");
				imageSetting.clipRectY = $(this).children("clipRect").attr("y");
				imageSetting.clipRectWidth = $(this).children("clipRect").attr("width");
				imageSetting.clipRectHeight = $(this).children("clipRect").attr("height");
				$(this).children("ImageMaskPoint").each(function() {
					var imageMaskPoint = new ImageMaskPoint();
					imageMaskPoint.x = $(this).attr("x");
					imageMaskPoint.y = $(this).attr("y");
					imageSetting.imageMaskPointList.push(imageMaskPoint);
				});
				imageSettingArr.push(imageSetting);
			});
			$(xml).find("Shoe").children("Layer").each(function() {
				var layer = new Layer();
				layer.layerId = $(this).attr("id");
				layer.inRotation = $(this).attr("inRotation");
				$(this).children("Object").each(function() {
					var productPic = new ProductPic();
					productPic.isSetRect = false;
					productPic.productId = productId;
					productPic.layerId = layer.layerId;
					productPic.objectId = $(this).attr("id");
					productPic.type = $(this).attr("type");
					productPic.setId = $(this).attr("setID");
					productPic.respectInsideOutsideFlip = $(this).attr("respectInsideOutsideFlip");
					if (productPic.respectInsideOutsideFlip === undefined) {
						productPic.respectInsideOutsideFlip = "";
					}
					productPic.sourceLayerId = $(this).attr("sourceLayerId");
					productPic.editLayerId = $(this).attr("editLayerID");
					if (productPic.sourceLayerId === undefined) {
						productPic.sourceLayerId = productPic.editLayerId;
					}
					if (productPic.editLayerId === undefined) {
						productPic.editLayerId = productPic.sourceLayerId;
					}
					if (productPic.type === "3" && productPic.editLayerId === undefined) {
						productPic.editLayerId = layer.layerId;
						productPic.sourceLayerId = layer.layerId;
					}
					productPic.sourceObjId = $(this).attr("sourceObjId");
					productPic.shiftX = $(this).attr("shiftX");
					productPic.shiftY = $(this).attr("shiftY");
					productPic.disabled = $(this).attr("disabled");
					productPic.sendToServer = $(this).attr("sendToServer");
					productPic.mode = $(this).attr("mode");
					if (productPic.type === "2") {
						productPic.position = $(this).attr("position");
						productPic.rotationZ = $(this).attr("rotationZ");
						productPic.rotationX = $(this).attr("rotationX");
						productPic.rotationY = $(this).attr("rotationY");
						productPic.signScale = $(this).attr("scale");
						productPic.pos = $(this).attr("pos");
					}
					productPic.materialId = $(xml).find("ColorSet Set[id='" + productPic.setId + "']").attr("matID");
					productPic.colorId = $(xml).find("ColorSet Set[id='" + productPic.setId + "']").attr("colorID");
					var stepID = $(xml).find("ColorSet Set[id='" + productPic.setId + "']").attr("stepID");
					if (productPic.colorId !== undefined && stepID !== undefined) {
						if (productPic.colorId === "" && stepID !== "") {
							productPic.colorId = $(xml).find("ColorSet Set[id='" + productPic.setId + "']").children("Material[id='" + productPic.materialId + "']").children("Color:first").attr("id");
						}
					}
					if (productPic.setId === "SXD" || productPic.setId === "SSD" || productPic.setId === "SLB" || productPic.setId === "SDM" || productPic.setId === "SGB") {
						productPic.parm = "1";
					}
					if (productPic.type === "0") {
						if (productPic.colorId === "") {
							productPic.parm = "1";
						} else {
							productPic.parm = "0";
						}
					}
					if (productPic.type === "4") {
						for (var i = 0; i < materialArr.length; i++) {
							var materialTmp = materialArr[i];
							if (productPic.materialId === materialTmp.materialId) {
								if (materialTmp.type === "changeImg") {
									productPic.parm = "1";
								}
								break;
							}
						}
					}
					layer.productPicList.push(productPic);
				});
				product.layerList.push(layer);
			});
			setRect(product);
			var IntervalId_setRect = setInterval(function() {
				if (isSetRectDone) {
					clearInterval(IntervalId_setRect);
					setImageSettingData(product);
					showProduct(product, $(xml).find("Shoe").attr("layerID"));
					setWorkId(product, workId);
					isLoading = false;
				} else {
					return;
				}
			}, 300);
		}
	});
}

function makePreShotImg() {
	"use strict";
	isLoading = true;
	isShotImgDone = false;
	if (browserPlatform === "PC") {
		if (config.width !== config.canvasNormalSize) {
			config.width = config.canvasNormalSize;
			config.height = config.canvasNormalSize;
			c.width = config.width;
			c.height = config.height;
			c_tmp.width = config.width;
			c_tmp.height = config.height;
			c_type1.width = config.width;
			c_type1.height = config.height;
			c_ssd.width = config.width;
			c_ssd.height = config.height;
			c_type4.width = config.width;
			c_type4.height = config.height;
			c_type3.width = config.width;
			c_type3.height = config.height;
			c_tatoo.width = config.width;
			c_tatoo.height = config.height;
			c_tatooShade.width = config.width;
			c_tatooShade.height = config.height;
			c_font.width = config.width;
			c_font.height = config.height;
			showProduct(nowProduct, nowLayer);
		}
	}
	var IntervalId_shade = setInterval(function() {
		if (!selectIsIdle(nowProduct)) {
			return;
		} else {
			clearInterval(IntervalId_shade);
			var myCanvasDiv = document.getElementById("myCanvasDiv");
			var c_bak = document.createElement("canvas");
			c_bak.setAttribute("id", "c_bak");
			if (browserPlatform === "phone") {
				c_bak.setAttribute("style", "position: absolute;left: 0;right: 0;margin: auto;top:" + topValue + "px;");
			} else {
				c_bak.setAttribute("style", "position: absolute;left: 0;right: 0;margin: auto;");
			}
			myCanvasDiv.appendChild(c_bak);
			var c_nowLayer = document.createElement("canvas");
			c_nowLayer.setAttribute("id", "c_nowLayer");
			if (browserPlatform === "phone") {
				c_nowLayer.setAttribute("style", "position: absolute;left: 0;right: 0;margin: auto;top:" + topValue + "px;");
			} else {
				c_nowLayer.setAttribute("style", "position: absolute;left: 0;right: 0;margin: auto;");
			}
			myCanvasDiv.appendChild(c_nowLayer);
			c_bak.width = config.width;
			c_bak.height = config.height;
			c_nowLayer.width = config.width;
			c_nowLayer.height = config.height;
			var ctx_bak = c_bak.getContext("2d");
			var ctx_nowLayer = c_nowLayer.getContext("2d");
			ctx_bak.fillStyle = "#fff";
			ctx_bak.fillRect(0, 0, c_bak.width, c_bak.height);
			ctx_nowLayer.drawImage(c_ssd, 0, 0, ctx_ssd.canvas.width, ctx_ssd.canvas.height);
			ctx_nowLayer.drawImage(c, 0, 0, ctx.canvas.width, ctx.canvas.height);
			ctx_nowLayer.drawImage(c_type1, 0, 0, ctx_type1.canvas.width, ctx_type1.canvas.height);
			ctx_nowLayer.drawImage(c_type4, 0, 0, ctx_type4.canvas.width, ctx_type4.canvas.height);
			ctx_nowLayer.drawImage(c_type3, 0, 0, ctx_type3.canvas.width, ctx_type3.canvas.height);
			ctx_nowLayer.drawImage(c_font, 0, 0, ctx_font.canvas.width, ctx_font.canvas.height);
			reSetIsDone(nowProduct);
			var i = 0;
			var isPreImgDone = true;
			if (imageSettingArr.length !== 0) {
				var c_pre;
				var ctx_pre;
				var c_preTmp = document.getElementById("c_pre");
				if (c_preTmp === undefined || c_preTmp === null) {
					c_pre = document.createElement("canvas");
					c_pre.width = config.preWidth * imageSettingArr.length / ratio;
					c_pre.height = config.preHeight * 2 / ratio;
					c_pre.setAttribute("id", "c_pre");
					c_pre.setAttribute("style", "position: absolute;top: -9999px;left: -9999px;");
					myCanvasDiv.appendChild(c_pre);
					ctx_pre = c_pre.getContext("2d");
				} else {
					c_pre = c_preTmp;
					c_pre.width = config.preWidth * imageSettingArr.length / ratio;
					c_pre.height = config.preHeight * 2 / ratio;
					ctx_pre = c_pre.getContext("2d");
					ctx_pre.clearRect(0, 0, ctx_pre.canvas.width, ctx_pre.canvas.height);
				}
				isPreImgDone = false;
				var imageSettingTmp = imageSettingArr[i];
				showProduct(nowProduct, imageSettingTmp.id);
				var IntervalId = setInterval(function() {
					if (!selectIsDone(nowProduct, imageSettingTmp.id)) {
						return;
					} else {
						if (nowProduct.CategoryType === CategoryType.BAG) {
							ctx_pre.drawImage(c_type3, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_ssd, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type1, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type4, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_font, i * config.preWidth, 0, config.preWidth, config.preHeight);
						} else {
							ctx_pre.drawImage(c_ssd, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type1, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type4, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type3, i * config.preWidth, 0, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_font, i * config.preWidth, 0, config.preWidth, config.preHeight);
						}
						if (nowProduct.CategoryType === CategoryType.SHOE) {
							ctx_pre.save();
							ctx_pre.translate(c_pre.width, 0);
							ctx_pre.scale(-1, 1);
							ctx_pre.drawImage(c_ssd, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type1, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type4, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_type3, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.drawImage(c_font, c_pre.width * ratio - config.preWidth - i * config.preWidth, config.preHeight, config.preWidth, config.preHeight);
							ctx_pre.restore();
						}
						i++;
						if (i === imageSettingArr.length) {
							clearInterval(IntervalId);
							isPreImgDone = true;
							return;
						}
						imageSettingTmp = imageSettingArr[i];
						showProduct(nowProduct, imageSettingTmp.id);
					}
				}, 100);
			}
			var IntervalId_shot = setInterval(function() {
				if (isPreImgDone) {
					clearInterval(IntervalId_shot);
					i = 0;
					reSetIsDone(nowProduct);
					var productShotTmp = productShotArr[i];
					showProduct(nowProduct, productShotTmp.layerId);
					var IntervalId_shotImg = setInterval(function() {
						if (!selectIsDone(nowProduct, productShotTmp.layerId)) {
							return;
						} else {
							var c_shot;
							var ctx_shot;
							var c_shotTmp = document.getElementById("c_shot_" + i);
							if (c_shotTmp === undefined || c_shotTmp === null) {
								c_shot = document.createElement("canvas");
								c_shot.width = parseInt(productShotTmp.width) / ratio;
								c_shot.height = parseInt(productShotTmp.height) / ratio;
								c_shot.setAttribute("id", "c_shot_" + i);
								c_shot.setAttribute("style", "position: absolute;top: -9999px;left: -9999px;");
								myCanvasDiv.appendChild(c_shot);
								ctx_shot = c_shot.getContext("2d");
							} else {
								c_shot = c_shotTmp;
								c_shot.width = parseInt(productShotTmp.width) / ratio;
								c_shot.height = parseInt(productShotTmp.height) / ratio;
								ctx_shot = c_shot.getContext("2d");
								ctx_shot.clearRect(0, 0, ctx_shot.canvas.width, ctx_shot.canvas.height);
							}
							if (nowProduct.CategoryType === CategoryType.BAG) {
								ctx_shot.drawImage(c_type3, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_ssd, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_type1, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_type4, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_font, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
							} else {
								ctx_shot.drawImage(c_ssd, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_type1, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_type4, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_type3, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
								ctx_shot.drawImage(c_font, parseInt(productShotTmp.x), parseInt(productShotTmp.y), c_shot.width * parseFloat(productShotTmp.scale), c_shot.height * parseFloat(productShotTmp.scale));
							}
							i++;
							if (i === productShotArr.length) {
								clearInterval(IntervalId_shotImg);
								var preArr = new Array(0);
								if (browserPlatform === "phone") {
									for (var j = 0; j < productShotArr.length; j++) {
										preArr.push("c_shot_" + j);
									}
									idxGetShotImg(preArr);
								} else {
									preArr.push("c_pre");
									preArr.push("c_shot_0");
									idxGetShotImg(preArr);
								}
								isLoading = false;
								isShotImgDone = true;
								return;
							}
							productShotTmp = productShotArr[i];
							showProduct(nowProduct, productShotTmp.layerId);
						}
					}, 100);
				} else {
					return;
				}
			}, 100);
		}
	}, 300);
}

function convertBase64UrlToBlob(dataurl) {
	"use strict";
	var data = window.dataURLtoBlob && window.dataURLtoBlob(dataurl);
	return data;
}

function sendPreShotImg(id) {
	"use strict";
	isSendError = false;
	isSendShotImgDone = false;
	isSendPreImgDone = false;
	isLoading = true;
	var IntervalId_sendPreImg = setInterval(function() {
		if (isShotImgDone) {
			if (isSendError) {
				isSendPreImgDone = true;
				isSendShotImgDone = true;
				isLoading = false;
				clearInterval(IntervalId_sendPreImg);
				return;
			}
			var myCanvasDiv = document.getElementById("myCanvasDiv");
			var c_bak = document.getElementById("c_bak");
			var c_nowLayer = document.getElementById("c_nowLayer");
			if (c_bak !== null && c_bak !== undefined) {
				myCanvasDiv.removeChild(c_bak);
			}
			if (c_nowLayer !== null && c_nowLayer !== undefined) {
				myCanvasDiv.removeChild(c_nowLayer);
			}
			if (imageSettingArr.length !== 0) {
				var c_pre = document.getElementById("c_pre");
				var upPreUrl = "";
				if (Template === "idx") {
					upPreUrl = IDX_INFO.upProductPreImageUrl.replace("{uuid}", id);
				} else {
					upPreUrl = IDX_INFO.upProductPreImageUrl_dm.replace("{uuid}", id);
				}
				$.ajax({
					url: upPreUrl,
					type: "POST",
					data: convertBase64UrlToBlob(c_pre.toDataURL("image/png")),
					async: false,
					processData: false,
					contentType: "application/x-www-form-urlencoded",
					error: function() {
						alert("图片上传失败");
						$(c_pre).remove();
						isSendPreImgDone = true;
						isSendError = true;
						isLoading = false;
					},
					success: function(result) {
						refImgReturnClientStr = $(result).find("ReturnClientStr").text();
						$(c_pre).remove();
						isSendPreImgDone = true;
						isLoading = false;
					}
				});
			} else {
				isSendPreImgDone = true;
			}
			isLoading = true;
			for (var i = 0; i < productShotArr.length; i++) {
				if (isSendError) {
					isSendShotImgDone = true;
					break;
				}
				var productShotTmp = productShotArr[i];
				var counter = 0;
				if (i < productShotArr.length - 1) {
					counter = i;
				} else {
					counter = 999;
				}
				var c_shot = document.getElementById("c_shot_" + i);
				var upShotUrl = "";
				if (Template === "idx") {
					upShotUrl = IDX_INFO.upProductShotImageUrl.replace("{uuid}", id).replace("{counter}", counter);
				} else {
					upShotUrl = IDX_INFO.upProductShotImageUrl_dm.replace("{uuid}", id).replace("{counter}", counter);
				}
				$.ajax({
					url: upShotUrl,
					type: "POST",
					data: convertBase64UrlToBlob(c_shot.toDataURL("image/png")),
					async: false,
					processData: false,
					contentType: "application/x-www-form-urlencoded",
					error: function() {
						alert("图片上传失败");
						if (counter === 999) {
							for (var j = 0; j < productShotArr.length; j++) {
								var c_shot_tmp = document.getElementById("c_shot_" + j);
								$(c_shot_tmp).remove();
							}
							isSendShotImgDone = true;
						}
						isSendError = true;
						isLoading = false;
					},
					success: function(result) {
						console.log(i);
						productShotTmp.returnClientStr = $(result).find("ReturnClientStr").text();
						if (counter === 999) {
							for (var j = 0; j < productShotArr.length; j++) {
								var c_shot_tmp = document.getElementById("c_shot_" + j);
								$(c_shot_tmp).remove();
							}
							isSendShotImgDone = true;
							isLoading = false;
						}
					}
				});
			}
			clearInterval(IntervalId_sendPreImg);
		} else {
			return;
		}
	}, 300);
}

function putFormData(form, name, value) {
	"use strict";
	var input = document.createElement("input");
	input.setAttribute("name", name);
	input.setAttribute("type", "hidden");
	input.setAttribute("value", value);
	form.appendChild(input);
}

function sendData(id, appKey, LoveWorkId, idea, saveMode, numSize, paramJson, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1) {
	"use strict";
	isSendDataDone = false;
	sendWorkId = "";
	isLoading = true;
	var upDataUrl = "";
	var IntervalId_sendData = setInterval(function() {
		if (isSendShotImgDone && isSendPreImgDone) {
			if (isSendError) {
				isSendDataDone = true;
				isLoading = false;
				clearInterval(IntervalId_sendData);
				return;
			}
			if (Template === "idx") {
				upDataUrl = IDX_INFO.upDataUrl.replace("{uuid}", id);
			} else {
				upDataUrl = IDX_INFO.upDataUrl_dm.replace("{uuid}", id).replace("{user_id}", userId);
			}
			clearInterval(IntervalId_sendData);
			var form = document.createElement("form");
			document.body.appendChild(form);
			form.method = 'post';
			form.action = upDataUrl;
			putFormData(form, "id", id);
			putFormData(form, "userid", userId);
			putFormData(form, "Category", nowProduct.CategoryType);
			putFormData(form, "appKey", appKey);
			putFormData(form, "workID", nowProduct.workId);
			putFormData(form, "UpdateWorkId", "");
			putFormData(form, "shoeTags", "");
			putFormData(form, "overwrite", "y");
			putFormData(form, "LoveWorkId", LoveWorkId);
			putFormData(form, "OrderWorkId", "");
			putFormData(form, "idea", idea);
			putFormData(form, "saveMode", saveMode);
			putFormData(form, "ToolVer", "V2.5.9.30");
			putFormData(form, "CraftID_1", "");
			putFormData(form, "numSize", numSize);
			putFormData(form, "param1", paramJson.param1);
			putFormData(form, "param2", paramJson.param2);
			putFormData(form, "param3", paramJson.param3);
			putFormData(form, "param4", paramJson.param4);
			putFormData(form, "param5", paramJson.param5);
			putFormData(form, "param6", paramJson.param6);
			putFormData(form, "param7", paramJson.param7);
			putFormData(form, "param8", paramJson.param8);
			putFormData(form, "param9", paramJson.param9);
			putFormData(form, "param10", paramJson.param10);
			var i = 0;
			for (i = 0; i < productShotArr.length; i++) {
				var productShotTmp = productShotArr[i];
				putFormData(form, "flashsubmitworkimgs_" + i, productShotTmp.returnClientStr);
			}
			if (imageSettingArr.length > 0) {
				putFormData(form, "flashsubmitworkimgs_" + productShotArr.length, refImgReturnClientStr);
			}
			var tempArr = new Array(0);
			var ObjNum = 0;
			for (i = 0; i < nowProduct.layerList.length; i++) {
				var layerTmp = nowProduct.layerList[i];
				for (var j = 0; j < layerTmp.productPicList.length; j++) {
					var objectTmp = layerTmp.productPicList[j];
					if (objectTmp.type === "3" || objectTmp.type === "1" || objectTmp.type === "4") {
						if (objectTmp.sendToServer !== "n") {
							var isIn = false;
							for (var k = 0; k < tempArr.length; k++) {
								if (tempArr[k] === objectTmp.objectId) {
									isIn = true;
									break;
								}
							}
							if (!isIn) {
								tempArr.push(objectTmp.objectId);
								ObjNum++;
								putFormData(form, "objID_" + ObjNum, objectTmp.objectId);
								putFormData(form, "matID_" + ObjNum, objectTmp.materialId);
								putFormData(form, "colorID_" + ObjNum, objectTmp.colorId);
								putFormData(form, "setID_" + ObjNum, objectTmp.setId);
							}
						}
					} else if (objectTmp.type === "2") {
						var signNum = 1;
						if (objectTmp.position === "right") {
							signNum = 2;
						} else {
							signNum = 1;
						}
						putFormData(form, "signatureSetID_" + signNum, objectTmp.setId);
						putFormData(form, "signatureMatID_" + signNum, objectTmp.fontType);
						putFormData(form, "signatureText_" + signNum, objectTmp.fontValue);
						putFormData(form, "signaturePosition_" + signNum, objectTmp.position);
						putFormData(form, "signatureColorID_" + signNum, objectTmp.fontColorId);
						if (isSingleSign(colorSetArr)) {
							if (objectTmp.position === "right") {
								signNum = 1;
							} else {
								signNum = 2;
							}
							putFormData(form, "signatureSetID_" + signNum, objectTmp.setId);
							putFormData(form, "signatureMatID_" + signNum, objectTmp.fontType);
							putFormData(form, "signatureText_" + signNum, objectTmp.fontValue);
							if (objectTmp.position === "right") {
								putFormData(form, "signaturePosition_" + signNum, "left");
							} else {
								putFormData(form, "signaturePosition_" + signNum, "right");
							}
							putFormData(form, "signatureColorID_" + signNum, objectTmp.fontColorId);
						}
					}
				}
			}
			putFormData(form, "numObj", ObjNum);
			tempArr = null;
			if (saveMode === DataSenderAction.ADD_TO_CART) {
				putFormData(form, "sizeID_1", sizeID_1);
				putFormData(form, "sizeSize_1", sizeSize_1);
				putFormData(form, "sizeQuantity_1", sizeQuantity_1);
				putFormData(form, "USPId_1", USPId_1);
				putFormData(form, "sizeType_1", "ShoeSizeType_CN");
				putFormData(form, "sizeType_1", "MEN");
			}
			putFormData(form, "imageSeniorEditor", "0");
			putFormData(form, "insideOutsideFlipImage", "y");
			putFormData(form, "flipImage", "y");
			for (i = 0; i < imageSettingArr.length; i++) {
				var imageSettingTmp = imageSettingArr[i];
				putFormData(form, "transformLayerId_" + (i + 1), imageSettingTmp.id);
				var objectTatoTmp = findObject3ByLayerId(nowProduct, imageSettingTmp.id);
				var aVal = 0.0;
				var dVal = 0.0;
				var txVal = 0.0;
				var tyVal = 0.0;
				putFormData(form, "imageId_" + (i + 1), objectTatoTmp.picId);
				if (objectTatoTmp.tatooWidth < objectTatoTmp.tatooHeight) {
					aVal = (objectTatoTmp.tatooScale / (config.tatooNormalSize / objectTatoTmp.tatooWidth));
				} else {
					aVal = (objectTatoTmp.tatooScale / (config.tatooNormalSize / objectTatoTmp.tatooHeight));
				}
				dVal = aVal;
				txVal = (objectTatoTmp.tatooX / screenScale);
				tyVal = (objectTatoTmp.tatooY / screenScale);
				putFormData(form, "transformData_" + (i + 1), TransformDataValueToString(aVal, dVal, txVal, tyVal));
			}
			$.ajax({
				type: "POST",
				url: upDataUrl,
				data: $(form).serialize(),
				contentType: "application/x-www-form-urlencoded",
				dataType: "xml",
				async: false,
				success: function(res) {
					console.log("保存完成");
					$(form).remove();
					if (Template === "idx") {
						sendWorkId = $(res).find("message").text();
						workid_globe = sendWorkId;
						isSendDataDone = true;
						isLoading = false;
						idxBackInfo("保存成功");
					} else {
						sendWorkId = $(res).find("message").text();
						idxGetWorkCode(sendWorkId);
						isSendDataDone = true;
						isLoading = false;
						idxBackInfo("保存成功");
					}
				},
				error: function(err) {
					$(form).remove();
					isSendDataDone = true;
					isSendError = true;
					isLoading = false;
					alert("保存失败!");
				}
			});
		} else {
			return;
		}
	}, 300);
}

function upImgData(image) {
	"use strict";
	isLoading = true;
	var c_pre;
	var ctx_pre;
	var c_preTmp = document.getElementById("c_pre_user");
	if (c_preTmp === undefined || c_preTmp === null) {
		c_pre = document.createElement("canvas");
		if (image.width < image.height) {
			c_pre.width = config.tatooNormalSize / ratio;
			c_pre.height = image.height * (config.tatooNormalSize / image.width) / ratio;
		} else {
			c_pre.height = config.tatooNormalSize / ratio;
			c_pre.width = image.width * (config.tatooNormalSize / image.height) / ratio;
		}
		c_pre.setAttribute("id", "c_pre_user");
		c_pre.setAttribute("style", "position: absolute;top: -9999px;left: -9999px;");
		myCanvasDiv.appendChild(c_pre);
		ctx_pre = c_pre.getContext("2d");
	} else {
		c_pre = c_preTmp;
		if (image.width < image.height) {
			c_pre.width = config.tatooNormalSize / ratio;
			c_pre.height = image.height * (config.tatooNormalSize / image.width) / ratio;
		} else {
			c_pre.height = config.tatooNormalSize / ratio;
			c_pre.width = image.width * (config.tatooNormalSize / image.height) / ratio;
		}
		ctx_pre = c_pre.getContext("2d");
		ctx_pre.clearRect(0, 0, ctx_pre.canvas.width, ctx_pre.canvas.height);
	}
	ctx_pre.drawImage(image, 0, 0, ctx_pre.canvas.width, ctx_pre.canvas.height);
	$.ajax({
		url: IDX_INFO.uploadImageUrl.replace("{userid}", userId).replace("{imgextension}", "png").replace("{imgname}", getuuid()),
		type: "POST",
		data: convertBase64UrlToBlob(c_pre.toDataURL("image/png")),
		contentType: "application/x-www-form-urlencoded",
		async: true,
		processData: false,
		dataType: "json",
		error: function(res) {
			$(c_pre).remove();
			console.log(res);
			isLoading = false;
			alert("上传图片失败!");
		},
		success: function(result) {
			$(c_pre).remove();
			console.log(result);
			isLoading = false;
			addtato(result.Data.url.replace("https", "http"), result.Data.materialId);
		}
	});
}

function upImg(obj) {
	"use strict";
	isLoading = true;
	window.URL = window.URL || window.webkitURL;
	var files = obj.files;
	var img = new Image();
	try {
		if (window.URL) {
			img.src = window.URL.createObjectURL(files[0]);
			img.onload = function(e) {
				upImgData(img);
			};
		} else if (window.FileReader) {
			var reader = new FileReader();
			reader.readAsDataURL(files[0]);
			reader.onload = function(e) {
				img.src = this.result;
				img.onload = function() {
					upImgData(img);
				};
			};
		} else {
			obj.select();
			obj.blur();
			var nfile = document.selection.createRange().text;
			document.selection.empty();
			img.src = nfile;
			img.onload = function() {
				upImgData(img);
			};
		}
	} catch (err) {
		console.log(err);
		isLoading = false;
	}
}

function doSave(appKey, LoveWorkId, idea, numSize, paramJson) {
	"use strict";
	var id = getuuid();
	sendPreShotImg(id);
	sendData(id, appKey, LoveWorkId, idea, DataSenderAction.SAVE_TO_LIBRARY, numSize, paramJson, "", "", "", "");
}

function doAddToCart(appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1) {
	"use strict";
	isDoAddToCartDone = false;
	isLoading = true;
	var id = getuuid();
	sendPreShotImg(id);
	sendData(id, appKey, LoveWorkId, idea, DataSenderAction.SAVE_TO_LIBRARY, numSize, paramJson, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1);
	var IntervalId_addToCart = setInterval(function() {
		if (isSendDataDone) {
			if (isSendError) {
				isDoAddToCartDone = true;
				isLoading = false;
				clearInterval(IntervalId_addToCart);
				return;
			}
			clearInterval(IntervalId_addToCart);
			if (sendWorkId !== "") {
				var form = document.createElement("form");
				document.body.appendChild(form);
				form.method = 'POST';
				form.action = IDX_INFO.addToShopCartUrl.replace("{user_id}", userId);
				putFormData(form, "WorkId", sendWorkId);
				putFormData(form, "WorkNum", sizeQuantity_1);
				putFormData(form, "CategoryId", nowProduct.CategoryType);
				putFormData(form, "Size", sizeSize_1);
				putFormData(form, "SizeCode", sizeID_1);
				putFormData(form, "Sex", sex);
				$.ajax({
					type: "POST",
					url: IDX_INFO.addToShopCartUrl.replace("{user_id}", userId),
					data: $(form).serialize(),
					contentType: "application/x-www-form-urlencoded",
					dataType: "json",
					async: false,
					success: function(res) {
						$(form).remove();
						isDoAddToCartDone = true;
						isLoading = false;
						idxBackInfo("加入购物车成功");
					},
					error: function(err) {
						isSendError = true;
						console.log(err);
						$(form).remove();
						isDoAddToCartDone = true;
						isLoading = false;
						alert("加入购物车失败!");
					}
				});
			} else {
				isDoAddToCartDone = true;
				isLoading = false;
			}
		} else {
			return;
		}
	}, 300);
}

function doAddToCartByWorkId(workId, appKey, LoveWorkId, idea, numSize, paramJson, sex, sizeID_1, sizeSize_1, sizeQuantity_1, USPId_1) {
	"use strict";
	isDoAddToCartDone = false;
	isSendError = false;
	isLoading = true;
	if (workId !== "") {
		var form = document.createElement("form");
		document.body.appendChild(form);
		form.method = 'post';
		form.action = IDX_INFO.addToShopCartUrl.replace("{user_id}", userId);
		putFormData(form, "WorkId", workId);
		putFormData(form, "WorkNum", sizeQuantity_1);
		putFormData(form, "CategoryId", nowProduct.CategoryType);
		putFormData(form, "Size", sizeSize_1);
		putFormData(form, "SizeCode", sizeID_1);
		putFormData(form, "Sex", sex);
		$.ajax({
			type: "POST",
			url: IDX_INFO.addToShopCartUrl.replace("{user_id}", userId),
			data: $(form).serialize(),
			contentType: "application/x-www-form-urlencoded",
			dataType: "json",
			async: false,
			success: function(res) {
				$(form).remove();
				isDoAddToCartDone = true;
				isLoading = false;
				idxBackInfo("加入购物车成功");
			},
			error: function(err) {
				isSendError = true;
				alert("加入购物车失败!");
				$(form).remove();
				isDoAddToCartDone = true;
				isLoading = false;
			}
		});
	} else {
		isDoAddToCartDone = true;
		isLoading = false;
	}
}

function goBack() {
	"use strict";
	var myCanvasDiv = document.getElementById("myCanvasDiv");
	var c_bak = document.getElementById("c_bak");
	var c_nowLayer = document.getElementById("c_nowLayer");
	if (c_bak !== undefined && c_bak !== null) {
		myCanvasDiv.removeChild(c_bak);
	}
	if (c_nowLayer !== undefined && c_bak !== null) {
		myCanvasDiv.removeChild(c_nowLayer);
	}
}

function gogoBack() {
	"use strict";
	idxGoBack();
	var control = $("#titleGoBack").data("control");
	if (control === "back") {
		if (history.length > 0) {
			history.back();
			return;
		}
	}
	if (control === "shut") {
		$("#titleGoBack").data("control", "back");
		var imgPanel = document.getElementById("img-panel");
		imgPanel.removeEventListener("touchstart", startTo, false);
		imgPanel.removeEventListener("touchend", endTo, false);
		$("#photoshop").addClass("dn");
		$("#ctl").removeClass("dn");
		$("#size-lib").addClass("dn");
	}
}
var GesInfo = {
	ts: [],
	l: null,
	t: null,
	w: null,
	h: null,
	b: true,
	c: 0,
	tw: null
};

function startTo(e) {
	"use strict";
	e.preventDefault();
	GesInfo.tw = e.touches[0];
}

function endTo(e) {
	"use strict";
	e.preventDefault();
	var gm = e.changedTouches[0];
	var page = document.getElementById("ps-page");
	var len = $("#img-panel canvas").length,
		i = $("#img-panel .db").index();
	if (i > 0) {
		if (gm.pageX - GesInfo.tw.pageX > 50) {
			$("#img-panel .db").removeClass("db").addClass("dn").prev().removeClass("dn").addClass("db");
			page.innerHTML = i + "/" + len;
		}
	}
	if (i < len - 1) {
		if (gm.pageX - GesInfo.tw.pageX < -50) {
			$("#img-panel .db").removeClass("db").addClass("dn").next().removeClass("dn").addClass("db");
			page.innerHTML = (i + 2) + "/" + len;
		}
	}
}

function isMorePic() {
	"use strict";
	messageBox.Confirm("是否使用多涂鸦?", function() {
		isMoreTatoo = true
	}, function() {
		isMoreTatoo = false
	})
}