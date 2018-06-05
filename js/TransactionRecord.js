var TransactionRecord = {};

TransactionRecord.Params = {
    ProductId: 0
};

TransactionRecord.Data = {
    jsondata: "",
    pageIndex: 1,
    pageSize: 10,
    pageCount: 0,
    recordCount: 0,
    pageHtml: ""
};

TransactionRecord.Init = function () {

    TransactionRecord.PageInit();

    //查看
    $('[idx="showevaluate"]').bind("click", function () {
        TransactionRecord.GetData(TransactionRecord.Params.ProductId);
    });

    TransactionRecord.GetData();

}

TransactionRecord.GetData = function () {
    var productId = TransactionRecord.Params.ProductId;

    $.ajax({
        url: "http://www.idx.com.cn/Order/GetTransactionRecord",
        type: "get",
        data: { ProductId: productId, pageIndex: TransactionRecord.Data.pageIndex, pageSize: TransactionRecord.Data.pageSize },
        cache: false,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonTransactionRecord",
        beforeSend: function () {
            $('[idx="TransactionRecord-List"]').html("<tr><td colspan=\"8\">数据加载中......</td></tr>");
        },
        success: function (data) {
            TransactionRecord.Data.jsondata = data;
            TransactionRecord.Data.pageCount = data.PageCount;
            TransactionRecord.Data.pageHtml = data.PageHtml;
            TransactionRecord.Data.recordCount = data.RecordCount;
            $('[data-idx="cjjl"]').html("(" + data.RecordCount + ")");
            $('[data-idx="cjj2"]').html(data.RecordCount);
            TransactionRecord.BindPageHtml();
            TransactionRecord.BbindHtml();
        },
        error: function (e) {
            TransactionRecord.Data.jsondata = e;
            alert(e);
        }
    });

}

TransactionRecord.BbindHtml = function () {

    if (TransactionRecord.Data.jsondata == null || TransactionRecord.Data.jsondata.TransactionRecordDetails == null) {
        //无数据
        $('[idx="TransactionRecord-List"]').html("<tr><td colspan=\"8\">--暂无数据--</td></tr>");
    }
    else {
        var array = TransactionRecord.Data.jsondata.TransactionRecordDetails;
        var temp = "<tr>\r\n" +
                 "   <td class=\"cell-align-l\">{a-1}<img src=\"{CommodityImg}\" />{a-2}</td>\r\n" +
                 "   <td class=\"cell-align-l\">\r\n" +
                 "       <p class=\"avast\">\r\n" +
                 "           <img src=\"{UserImg}\" />\r\n" +
                 "       </p>\r\n" +
                 "       <p class=\"name text-overflow\">{NickName}</p>\r\n" +
                 "   </td>\r\n" +
                 "   <td>￥{Price}</td>\r\n" +
                 "   <td>{Num}</td>\r\n" +
                 "   <td>{BuyTimes}</td>\r\n" +
                 "</tr>";
        var reg_CommodityUrl = new RegExp("{CommodityUrl}", "g");
        var reg_a_1 = new RegExp("{a-1}", "g");
        var reg_a_2 = new RegExp("{a-2}", "g");
        var reg_CommodityImg = new RegExp("{CommodityImg}", "g");
        var reg_UserImg = new RegExp("{UserImg}", "g");
        var reg_NickName = new RegExp("{NickName}", "g");
        var reg_Price = new RegExp("{Price}", "g");
        var reg_Num = new RegExp("{Num}", "g");
        var reg_BuyTimes = new RegExp("{BuyTimes}", "g");

        var html = "";

        for (var i = 0; i < array.length; i++) {
            var d = array[i];
            var imgurl;
            if (d.ImageUrl == null || d.ImageUrl == "" || d.ImageUrl == "null") {
                imgurl = "";
            }
            else {
                imgurl = d.ImageUrl;
            }
            //链接
            var a_1 = "";
            var a_2 = "";
            if (d.CommodityUrl == "" || d.CommodityUrl == "#") {
                a_1 = "";
                a_2 = "";
            }
            else {
                a_1 = "<a href=\"" + d.CommodityUrl + "\" class=\"work-pic\">";
                a_2 = "</a>";
            }

            html += temp
                .replace(reg_CommodityUrl, d.CommodityUrl)
                .replace(reg_a_1, a_1)
                .replace(reg_a_2, a_2)
                .replace(reg_CommodityImg, d.PictureUrl)
                .replace(reg_UserImg, imgurl)
                .replace(reg_NickName, d.NickName)
                .replace(reg_Price, d.Price)
                .replace(reg_Num, d.Number)
                .replace(reg_BuyTimes, d.BuyTime);
        }

        $('[idx="TransactionRecord-List"]').html(html);
    }
}



//分页控件初始化
TransactionRecord.PageInit = function () {
    /////////分页///////

    //上一页
    $("#goprepage-TransactionRecord").click(function () {
        if (TransactionRecord.Data.pageIndex <= 1) {
            return false;
        }
        TransactionRecord.Data.pageIndex = TransactionRecord.Data.pageIndex - 1;
        TransactionRecord.GetData();
    });

    //下一页
    $("#gonextpage-TransactionRecord").click(function () {
        if (parseInt(TransactionRecord.Data.pageIndex) >= parseInt(TransactionRecord.Data.pageCount)) {
            return false;
        }
        TransactionRecord.Data.pageIndex = parseInt(TransactionRecord.Data.pageIndex) + 1;
        TransactionRecord.GetData();
    });
}
TransactionRecord.SetPageStyle = function () {
    $("#pagerNum-TransactionRecord a").removeClass("on");
}
TransactionRecord.BindPageHtml = function () {
    $("#pagerNum-TransactionRecord").html(TransactionRecord.Data.pageHtml);
    $("#pagerCount-TransactionRecord").html(TransactionRecord.Data.pageCount);
    $("#recordCount-TransactionRecord").html(TransactionRecord.Data.recordCount);

    //设置分页样式
    TransactionRecord.SetPageStyle();
    $("#sortByStandings-TransactionRecord").hide();
    $("#pagerNum-TransactionRecord a:contains('" + TransactionRecord.Data.pageIndex + "')").addClass("on");
    $("#pageIndex-TransactionRecord").html(TransactionRecord.Data.pageIndex);
}
//翻页方法
TransactionRecord.SetPageTo = function (pageindex) {
    if (pageindex == TransactionRecord.Data.pageIndex)
        return false;
    TransactionRecord.Data.pageIndex = pageindex;
    TransactionRecord.GetData();
}