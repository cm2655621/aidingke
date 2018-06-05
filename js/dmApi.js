// JavaScript Document


/**
	demo说明 
	在index.html 入口函数
	Initialize("1194920","AA30202010","2",""); //参数 "1194920": 用户id(如果用户还没登入可以传递空字符串"") "AA30202010" : 产品编号 "2":产品类型 鞋类默认为2 "":作品编号 默认为空
	
*/



/*
	用户没有登录 调用该函数跳转到登录界面
*/
function dmGotoLogin() {
	"use strict";
	if (browserPlatform === "PC") { //判断设备//检测是否登录
		if (!idxbase.CheckLogin()) {
			idxbase.GotoLogin();
		}
	} else { //判断设备//检测是否登录
		messageBox.Confirm("没有登录，是否跳转到登录页面?", function () {
			location.href = "http://m.idx.com.cn/Members/Account/Login";
		}, function () {
			return;
		});
	}
}


/*
	商品保存完成后 调用该函数
	wrokCode:设计单号
*/
function dmGetWorkCode(workCode) {
	"use strict";
	console.log(workCode);
}