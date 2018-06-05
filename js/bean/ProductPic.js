// JavaScript Document

function ProductPic()
{
	"use strict";
	this.productId = "";
	this.layerId = "";
	this.objectId = "";
	
	this.materialId = "";
	this.type = "";
	this.setId = "";
	this.colorId = "";
	
	this.respectInsideOutsideFlip = "";
	
	this.editLayerId = "";
	this.sourceLayerId = "";
	this.sourceObjId = "";
	
	this.shiftX = "";
	this.shiftY = "";
	
	this.sendToServer = "";
	this.disabled = "";
	this.mode = "";
	
	this.position = "";
	this.rotationZ = "";
	this.rotationX = "";
	this.rotationY = "";
	this.signScale = "";
	this.pos = "";
	
	this.parm ="0";
	
	this.tatooImg = null;
	this.tatooImgSrc ="";
	this.tatooImgOldSrc = "";
	this.picId ="";
	this.objectImg = null;
	
	this.tatooX = 0;  //涂鸦x位置
	this.tatooY = 0;  //涂鸦y位置
	this.tatooScale = 1.0;//涂鸦缩放
	this.tatooWidth = 0;//涂鸦原始尺寸 width
	this.tatooHeight = 0; //涂鸦原始尺寸 height
	this.isSetDefauleValue = false;//是否设定原始参数
	this.colorStr = null;//设置涂鸦部件的非涂鸦时候的颜色
	
	this.fontValue=""; //签名的内容
	this.fontType=""; //签名的字体
	this.fontColor=""; //签名的颜色
	this.fontColorId=""; //签名的ID
	this.fontSize=0; //签名的字体大小
	
	this.x=0; //部件x坐标
	this.y=0; //部件y坐标
	this.width=0; //部件宽
	this.height=0; //部件高
	this.isSetRect = false;//是否设定部件尺寸
	
	this.isDone = false; //是否加载完成 用于预览图
	this.isLoading = false; //是否正在加载图片
	
}
