function customizingflash() { }

//设计灵感
customizingflash.loadProductAfflatus = function (productid, productcode) {
    $.ajax({
        url: "http://www.idx.com.cn/Customizing/GetProductAfflatus",
        type: "get",
        data: { ProductId: productid, Productcode: productcode },
        cache: true,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonMiniCart",
        beforeSend: function () {
            $('#ProductAfflatus').html("数据加载中......");
        },
        success: function (data) {
            //alert(data);
            tempdata = data;
            var html = customizingflash.bindProductAfflatus(data);
            $('#ProductAfflatus').html(html);
            $('#ProductAfflatus').show();

            /*开始定制-创意作品*/
            $('#inspirationBox').photoScorll({
                prevBtnSel: '[actarget="prevScorll"]',
                nextBtnSel: '[actarget="nextScorll"]',
                moveNodeSel: 'ul',
                isResize: true,
                timeout: 600
            });
        },
        error: function (e) {
            $('#ProductAfflatus').hide();
            //alert(e);
        }
    });
}

customizingflash.bindProductAfflatus = function (array) {
    if (array == undefined || array == null || array == "" || array.length < 1)
        return "";

    var html = "";
    var reg_WorkLinkUrl = new RegExp("{WorkLinkUrl}", "g");
    var reg_WorkName = new RegExp("{WorkName}", "g");
    var reg_PictureUrl = new RegExp("{PictureUrl}", "g");
    var reg_li = new RegExp("{li}", "g");


    //var li_temp =
    //            "               <li>" +
    //            "                    <div class=\"shoes-kind-item\" node-name=\"shoesKind\">" +
    //            "                        <div class=\"shoes-bg shoes-img\">" +
    //            "                            <a href=\"{WorkLinkUrl}\">" +
    //            "                                <img src=\"{PictureUrl}\" alt=\"{WorkName}\" /></a></div>" +
    //            "                        <div class=\"shoes-detail\" node-name=\"cover\">" +
    //            "                            <p class=\"opacity-layer\">" +
    //            "                            </p>" +
    //            "                            <div class=\"details-cont\">" +
    //            "                                <a href=\"{WorkLinkUrl}\" title=\"{WorkName}\">" +
    //            "                                    <p class=\"name zn\">{WorkName}</p>" +
    //            "                                </a>" +
    //            "                            </div>" +
    //            "                        </div>" +
    //            "                    </div>" +
    //            "                </li>";

    var li_temp = "<li>" +
								"<div class=\"item idx-work-bg\">" +
								"	<a href=\"{WorkLinkUrl}\" title=\"{WorkName}\"><img src=\"{PictureUrl}\" alt=\"{WorkName}\"></a>" +
								"</div>" +
							"</li>";


    var temphtml = "";
    for (var i = 0; i < array.length; i++) {
        var d = array[i];
        temphtml += li_temp.replace(reg_WorkLinkUrl, d.WorkLinkUrl).replace(reg_WorkName, d.WorkName).replace(reg_PictureUrl, d.PictureUrl);
    }


    var temp = "<h3 class=\"inspiration-h\">设计灵感</h3>" +
				"<div class=\"idx-inspiration-box\" id=\"inspirationBox\"> <span class=\"move-btn prev-btn\" actarget=\"prevScorll\"><em class=\"opacity-layer\"></em><span class=\"s-icon\"></span></span>" +
					"<div class=\"inspiration-part\">" +
						"<ul class=\"inspiration-list\" style=\"width: 1272px;\">" +
						"{li}" +
						"</ul>" +
					"</div>" +
					"<span class=\"move-btn next-btn\" actarget=\"nextScorll\"><em class=\"opacity-layer\"></em><span class=\"s-icon\"></span></span> </div>";




    html = temp.replace(reg_li, temphtml);
    return html;

}

//猜你喜欢，最新爆款，第一次定制，一周总数
customizingflash.loadCustomizingPartial = function () {
    $.ajax({
        url: 'http://www.idx.com.cn/Customizing/CustomizingPartial',
        type: "GET",
        success: function (data) {
            $("#CustomizingPartial").html(data);

            $('[node-name="tabBox"]').tab({
                tabMenuSel: '[node-name="tabmenus"]',
                tabBtns: 'span',
                tabContsSel: '[node-name="tabcontent"]',
                mSelectedClass: 'selt'
            });
        }
    });
}