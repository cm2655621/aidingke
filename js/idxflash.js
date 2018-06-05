// JavaScript Document
var idxflash = {};
idxflash.swfobjectInit = false;

/*设置编辑器的参数*/
idxflash.params = {
    param4:"1",
    tmpParam1:"",
    tmpParam2:"",
    tmpParam3:"",
    tmpParam4:"",
    tmpParam5:"",
    tmpParam6:"",
    tmpParam7:"",
    tmpParam8:"",
    tmpParam9:"",
    tmpParam10:"",
    quality: "high",
    scale: "noscale",
    wmode: "transparent",
    bgcolor: "#F3F3F3", 
    allowScriptAccess: "always",
    allowFullScreen: "true"
};
idxflash.attributes = { id: "idx_shoe_designer", defaultuserid: "", defaultshoeid: "AA10301001", defaultworkid: "", configXml: "", languageXml: "", mainSwf: "",loadSwf:"",uploadImageSwf:"",userType:"", flashPlayerVersion: "10.0" };
idxflash.version = { designer: "9.0.6.8", loader: "0.2" };
idxflash.picture = {imgid:'',imgurl:''};/*涂鸦鞋图片参数*/


/** 页面中嵌入swf
container : 为装载flash的容器(必选),
userid : 用户id(可选),	
shoeid : 鞋款ID(可选),
workid : 作品ID(可选)	
*/
idxflash.embedSWF = function (containerid, userid, shoeid, workid) {
    idxflash.containerid = containerid;
    if (document.getElementById(idxflash.containerid)) {
        document.getElementById(idxflash.containerid).innerHTML = '<div class="text" style="text-align:center;"><h1>您需要安装Flash Player 10才可正常浏览。</h1><p><a href="http://www.adobe.com/go/getflashplayer">安装Flash Player</a></p><h3><a href="http://download.macromedia.com/pub/flashplayer/installers/archive/android/11.1.115.48/install_flash_player_ics.apk">安卓系统点此安装</a></h3></div>';
    }
    if (userid != undefined && userid != '') {
        idxflash.userid = userid;
    } else {
        idxflash.userid = idxflash.attributes.defaultuserid;
    }
    if (shoeid != undefined && shoeid != '') {
        idxflash.shoeid = shoeid;
    } else {
        idxflash.shoeid = idxflash.attributes.defaultshoeid;
    }
    if (workid != undefined && workid != '') {
        idxflash.workid = workid;
    } else {
        idxflash.workid = idxflash.attributes.defaultworkid;
    }
	var attrs = {
        id: idxflash.attributes.id,
        name: idxflash.attributes.id
    }
	
	jQuery.ajax({
		url:'http://static.idx.com.cn/flash/scripts/flashVersion.js?v='+Math.random(),
		type:'get',
		dataType:'script',
		success:function(json){
			var flashVars = {
				/* 额外参数:参数1：产品编号  参数2：购物车编号(修改购物车时)  参数3：订单从表主键（修改订单时） 参数4：作品来源（1:主站2：狼队3：天猫）*/
				param1: idxflash.shoeid,
				param2: "",
				param3: "",
				param4: idxflash.params.param4,
				param5: "1",
				param6: "",
				param7: "",
				param8: "",
				param9: "",
				param10: "",
                                tmpParam1:idxflash.params.tmpParam1,
				tmpParam2:idxflash.params.tmpParam2,
				tmpParam3:idxflash.params.tmpParam3,
				tmpParam4:idxflash.params.tmpParam4,
				tmpParam5:idxflash.params.tmpParam5,
				tmpParam6:idxflash.params.tmpParam6,
				tmpParam7:idxflash.params.tmpParam7,
				tmpParam8:idxflash.params.tmpParam8,
				tmpParam9:idxflash.params.tmpParam9,
				tmpParam10:idxflash.params.tmpParam10,
				imageId: idxflash.picture.imgid,
				imageUrl: idxflash.picture.imgurl,
				allowSave: true, /* 是否允许用户保存或者放入购物车*/
				uploadImageSwfUrl:idxflash.attributes.uploadImageSwf,/*上船图片地址*/
				userID: idxflash.userid, /* 用户ID。必须提供，但可空白（userID: ""）。*/
                                userType:idxflash.attributes.userType,
				shoeID: idxflash.shoeid, /* 鞋款ID。必须提供，且不可空白。*/
				embedMode: "idxflash",
				LoveWorkBtn: "false",
				LoveWorkId: "", /*情侣鞋作品编号*/
				workID: idxflash.workid, /*作品ID。必须提供，但可空白（workID: ""）。*/ 
				isMyWork: false,            /*指定的作品是否为用户本身的作品。若workID不为空，此参数必须传入false或者true。若workID为空则忽略此参数。*/ 
				configXml: idxflash.attributes.configXml + Math.random(), /* 指定设定档位置。若空白则默认 xml/config.xml*/
				languageXml: idxflash.attributes.languageXml + Math.random(), /* 文字設定檔位置。若空白则默认 xml/text/text_zh_cn.xml*/
				mainSwf: idxflash.attributes.mainSwf + flashVersion[0].idxOfficial//idxflash.version.designer /* 指定主swf路径与档名*/
			}  
			if (idxflash.swfobjectInit) {        
				swfobject.embedSWF(idxflash.attributes.loadSwf+"?v=" + idxflash.version.loader, idxflash.containerid, "100%", "100%", idxflash.attributes.flashPlayerVersion, "http://static.idx.com.cn/flash/scripts/expressInstall.swf", flashVars, idxflash.params, attrs);
				swfobject.registerObject(idxflash.attributes.id);
			}	
		}
	});
}

/*返回flash 对象*/
idxflash.getSwf = function (id) {
    if (!id) {
        id = idxflash.attributes.id
    }
    return document.getElementById(id);
}

/*通知flash变更作品（鞋款不变）*/
idxflash.changeWork = function (workid, allowSave) {
    idxflash.getSwf().callback_changeWorkId(workId, allowSave);
}

/*通知flash变更鞋款（空白作品）*/
idxflash.changeShoe = function (shoeid) {
    idxflash.getSwf().callback_changeShoeId(shoeid);
}

/*通知flash同时变更鞋款和作品*/
idxflash.changeShoeAndWork = function (shoeid, workid, AllowSave) {
    idxflash.getSwf().callback_changeShoeIdWorkId(shoeid, workid, AllowSave);
}
/*再次传入UserID*/
idxflash.setUserId = function (userID) {
    idxflash.getSwf().callback_loginResult("200", userID);
}

/*通知flash用户登入结果*/
idxflash.loginResult = function (status, userId) {}

idxflash.Callback_loginResult = function () {
    var userid = idxbase.GetCurrentUserId();
    idxflash.setUserId(userid);
}

/*flash需要用户登录时flash调用该方法*/
idxflash.showWin = function (userid, imgid) {
    if (!idxbase.CheckLogin()) {
        idxbase.Delegate.AddF(idxflash.Callback_loginResult);
        idxbase.GotoLogin();
    }
    else {
        idxflash.Callback_loginResult();
    }
}


/*作品保存成功时flash调用该方法*/
idxflash.shoeSaved = function (shoeid, workid) {}

/*flash鞋款载入完成时flash调用该方法*/
idxflash.shoeComplete = function (shoeid, workid) {}

/*flash开始载入鞋款时flash调用该方法*/
idxflash.shoeInit = function (shoeid, workid) {}

idxflash.openlink = function (url) {
    // alert(url)
    if (url == undefined || url == null || url == "")
        url = "/ShopCart";
    window.open(url);
}
idxflash.rd = function (opId, ptId, pid, step, cid, pcode, ucode, uid, timespan, remark, sourceid) {
    try {
        if (opId && ucode) {
            $.ajax({
                url: 'http://pic.idx.com.cn/ApiFlash/Flash',
                dataType: "jsonp",
                type: "GET",
                data: "act=1801&opId=" + opId + "&ptId=" + ptId + "&pid=" + pid + "&step=" + step + "&cid=" + cid + "&pcode=" + pcode + "&ucode=" + ucode + "&uid=" + uid + "&timespan=" + timespan + "&remark=" + remark + "&sourceid=" + sourceid
            });
        }
    } catch (e) { }
}

function JsLoader() {
    this.load = function (url) {
        //获取所有的<script>标记
        var ss = document.getElementsByTagName("script");
        //判断指定的文件是否已经包含，如果已包含则触发onsuccess事件并返回
        for (i = 0; i < ss.length; i++) {
            if (ss[i].src && ss[i].src.indexOf(url) != -1) {
                this.onsuccess();
                return;
            }
        }
        //创建script结点,并将其属性设为外联JavaScript文件
        s = document.createElement("script");
        s.type = "text/javascript";
        s.src = url;
        //获取head结点，并将<script>插入到其中
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(s);

        //获取自身的引用
        var self = this;
        //对于IE浏览器，使用readystatechange事件判断是否载入成功
        //对于其他浏览器，使用onload事件判断载入是否成功
        s.onload = s.onreadystatechange = function () {
            //在此函数中this指针指的是s结点对象，而不是JsLoader实例,
            //所以必须用self来调用onsuccess事件，下同。
            if (this.readyState && this.readyState == "loading") return;
            self.onsuccess();
        }
        s.onerror = function () {
            head.removeChild(s);
            self.onfailure();
        }
    }
}
/*jsLoader使用方法*/
var jsLoader = new JsLoader();
jsLoader.onsuccess = function () {
    idxflash.swfobjectInit = true;
    /*if (idxflash.containerid) {
        idxflash.embedSWF(idxflash.containerid);
    }*/
}
jsLoader.onfailure = function () { }
jsLoader.load("http://static.idx.com.cn/flash/scripts/swfobject.js");