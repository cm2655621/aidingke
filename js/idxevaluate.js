//评价
var idxevaluate = {};
/*设置参数*/
idxevaluate.params = {
    productid: 0,
    workid: 0
};

//初始化
idxevaluate.init = function () {
    idxevaluate.pageInit();

    //查看用户评价
    $('[idx="showevaluate"]').bind("click", function () {
        idxevaluate.getEvaluate(idxevaluate.params.productid, idxevaluate.params.workid);
    });

    idxevaluate.getEvaluate();
}

idxevaluate.data = {
    jsondata: "",
    s1: 0, //实物与设计相同
    s2: 0, //产品实际的质量
    s3: 0, //商家发货的速度
    pageIndex: 1,
    pageSize: 10,
    pageCount: 0,
    recordCount: 0,
    pageHtml: "",
    EvaluationReply: "",
    EvaluationReplyTime: ""
};
//分页控件初始化
idxevaluate.pageInit = function () {
    /////////分页///////
    //首页
    //$("#gofirstpage").click(function () {
    //    if (idxevaluate.data.pageIndex <= 1)
    //        return false;
    //    idxevaluate.data.pageIndex = 1;
    //    idxevaluate.getEvaluate();
    //});
    //上一页
    $("#goprepage").click(function () {
        if (idxevaluate.data.pageIndex <= 1) {
            return false;
        }
        idxevaluate.data.pageIndex = idxevaluate.data.pageIndex - 1;
        idxevaluate.getEvaluate();
    });
    //跳转到某页
    //$("#pageBtn").click(function () {
    //    var num = 1
    //    if ($("#pageInput")[0].value != null && $("#pageInput")[0].value != "") {
    //        var aim = /^\d+$/;
    //        num = $("#pageInput")[0].value;
    //        if (num.match(aim)) {
    //            if (parseInt(num) <= 0) {
    //                alert("请输入正确的页码!");
    //                return false;
    //            }
    //            else if (parseInt(num) > parseInt(idxevaluate.data.pageCount)) {
    //                //alert("输入页书大于总页数!");
    //                return false;
    //            }
    //            else if (parseInt(num) == parseInt(idxevaluate.data.pageIndex)) {
    //                //alert("输入页等于当前页数!");
    //                return false;
    //            }
    //        }
    //        else {
    //            alert("请输入数字!");
    //            $("#pageInput")[0].value = idxevaluate.data.pageIndex;
    //            return false;
    //        }
    //    }
    //    else {
    //        alert("请输入数字!");
    //        $("#pageInput")[0].value = "";
    //        return false;
    //    }
    //    idxevaluate.data.pageIndex = num;
    //    idxevaluate.getEvaluate();
    //});
    //下一页
    $("#gonextpage").click(function () {
        if (parseInt(idxevaluate.data.pageIndex) >= parseInt(idxevaluate.data.pageCount)) {
            return false;
        }
        idxevaluate.data.pageIndex = parseInt(idxevaluate.data.pageIndex) + 1;
        idxevaluate.getEvaluate();
    });
    ////尾页
    //$("#goendpage").click(function () {
    //    if (parseInt(idxevaluate.data.pageIndex) >= parseInt(idxevaluate.data.pageCount)) {
    //        return false;
    //    }
    //    idxevaluate.data.pageIndex = $("#pagerCount").html();
    //    idxevaluate.getEvaluate();
    //});

    //查看评价用户
    $('[idx^="user-"]').live("mouseover", function () {
        var uid = $(this).attr("idx").split("-")[1];
        idxevaluate.getUser(uid);
    });

}
idxevaluate.SetPageStyle = function () {
    $("#pagerNum a").removeClass("on");
}
idxevaluate.bindPageHtml = function () {
    $("#pagerNum").html(idxevaluate.data.pageHtml);
    $("#pagerCount").html(idxevaluate.data.pageCount);
    $("#recordCount").html(idxevaluate.data.recordCount);

    //设置分页样式
    idxevaluate.SetPageStyle();
    $("#sortByStandings").hide();
    $("#pagerNum a:contains('" + idxevaluate.data.pageIndex + "')").addClass("on");
    //$("#pageInput")[0].value = idxevaluate.data.pageIndex;
    $("#pageIndex").html(idxevaluate.data.pageIndex);
}
//翻页方法
idxevaluate.setPageTo = function (pageindex) {
    if (pageindex == idxevaluate.data.pageIndex)
        return false;
    idxevaluate.data.pageIndex = pageindex;
    idxevaluate.getEvaluate();
}

//获取评价
idxevaluate.getEvaluate = function () {
    var pid = idxevaluate.params.productid;
    var wid = idxevaluate.params.workid;
    //alert("获取作品的评价");

    $.ajax({
        url: "/order/GetEvaluateInfo",
        type: "get",
        data: { productid: pid, workid: wid, pageIndex: idxevaluate.data.pageIndex, pageSize: idxevaluate.data.pageSize },
        cache: true,
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonIdxEvaluate",
        beforeSend: function () {
            $('[idx="Evaluate-List"]').html("数据加载中......");
        },
        success: function (data) {
            idxevaluate.data.jsondata = data;

            idxevaluate.data.pageCount = data.PageCount;
            idxevaluate.data.pageHtml = data.PageHtml;
            idxevaluate.data.recordCount = data.RecordCount;
            idxevaluate.data.s1 = data.S1;
            idxevaluate.data.s2 = data.S2;
            idxevaluate.data.s3 = data.S3;

            idxevaluate.data.EvaluationReply = data.EvaluationReply;
            idxevaluate.data.EvaluationReplyTime = data.EvaluationReplyTime;

            idxevaluate.bindPageHtml();
            //总评价数
            var evaluateCount = "(" + idxevaluate.data.recordCount + ")";
             if (idxevaluate.data.recordCount == 0) {
                var $commont = $("#commontAllCount");
                if ($commont != undefined) {
                    $commont.html("暂无评价");
                }
            }
            //alert(evaluateCount);
            $('[data-idx="showevaluate-recordcount"]').html(evaluateCount);
            $('[data-idx="showevaluate-recordcount-2"]').html(idxevaluate.data.recordCount);
            //总评得分
            $('[data-idx="s1"]').html(idxevaluate.bindStar(idxevaluate.data.s1));
            $('[data-idx="s2"]').html(idxevaluate.bindStar(idxevaluate.data.s2));
            $('[data-idx="s3"]').html(idxevaluate.bindStar(idxevaluate.data.s3));
            //评价详细
            idxevaluate.bindEvaluateHtml(data.ProductWorkEvaluates);
        },
        error: function (e) {
            //alert(e);
        }
    });

}

idxevaluate.bindStar = function (num) {
    var html = "";
    for (var i = 0; i < 5; i++) {
        if (i < num)
            html += '<span class="s-icon star light-star"></span>'
        else
            html += '<span class="s-icon star gay-star"></span>'
    }
    return html;
}

idxevaluate.bindEvaluateHtml = function (array) {
    var reg_PictureUrl = new RegExp("{PictureUrl}", "g");
    var reg_WorkLink = new RegExp("{WorkLink}", "g");
    var reg_NickName = new RegExp("{NickName}", "g");
    var reg_EvaluateDate = new RegExp("{EvaluateDate}", "g");
    var reg_EvaluateContext = new RegExp("{EvaluateContext}", "g");
    var reg_Tags = new RegExp("{Tags}", "g");
    var reg_photos_div = new RegExp("{photos-div}", "g");

    var reg_userid = new RegExp("{userid}", "g");
    var reg_comment = new RegExp("{Comment}", "g");


    var temp = $('[idx="Evaluate-Temp"]').html(); //模版

    var html = "";
    for (var i = 0; i < array.length; i++) {
        var d = array[i];
        html += temp.replace(reg_PictureUrl, d.PictureUrl).replace(reg_WorkLink, d.WorkUrl).replace(reg_NickName, d.NickName).replace(reg_EvaluateDate, d.EvaluationTime).replace(reg_Tags, idxevaluate.getTagsLi(d.EvaluationTagName)).replace(reg_photos_div, idxevaluate.getPhotos(d.SharePictureUrl1, d.SharePictureUrl2, d.SharePictureUrl3, d.SharePictureUrl4, d.SharePictureUrl5)).replace(reg_EvaluateContext, d.WorkEvaluation).replace(reg_userid, d.UserId).replace(reg_comment, idxevaluate.getComment(d.EvaluationReply, d.EvaluationReplyTime));
    }

    $('[idx="Evaluate-List"]').html(html);
}
////晒单
//idxevaluate.getPhotos = function (p1, p2, p3, p4, p5) {
//    var html = "";
//    if (p1 != undefined && p1 != null && p1 != "" && p1 != "-1") {
//        html += ' <a class="comment-upload-pic" href="' + p1 + '"><img src="' + p1 + '" alt="图片" /></a>';
//    }
//    if (p2 != undefined && p2 != null && p2 != "" && p2 != "-1") {
//        html += ' <a class="comment-upload-pic" href="' + p2 + '"><img src="' + p2 + '" alt="图片" /></a>';
//    }
//    if (p3 != undefined && p3 != null && p3 != "" && p3 != "-1") {
//        html += ' <a class="comment-upload-pic" href="' + p3 + '"><img src="' + p3 + '" alt="图片" /></a>';
//    }
//    if (p4 != undefined && p4 != null && p4 != "" && p4 != "-1") {
//        html += ' <a class="comment-upload-pic" href="' + p4 + '"><img src="' + p4 + '" alt="图片" /></a>';
//    }
//    if (p5 != undefined && p5 != null && p5 != "" && p5 != "-1") {
//        html += ' <a class="comment-upload-pic" href="' + p5 + '"><img src="' + p5 + '" alt="图片" /></a>';
//    }
//    if (html != '' && html.length > 0) {
//        var reg_photos = new RegExp("{photos}", "g");
//        var temp = $('[idx="Photos-Temp"]').html(); //模版
//        var result = temp.replace(reg_photos, html);
//        return result;
//    }
//    else {
//        return '';
//    }
//}
idxevaluate.getPhotos = function (p1, p2, p3, p4, p5) {
    var html = "";
    if (p1 != undefined && p1 != null && p1 != "" && p1 != "-1") {
        html += ' <a href="javascript:;"><img src="' + p1 + '" alt="图片" /></a>';
    }
    if (p2 != undefined && p2 != null && p2 != "" && p2 != "-1") {
        html += ' <a href="javascript:;"><img src="' + p2 + '" alt="图片" /></a>';
    }
    if (p3 != undefined && p3 != null && p3 != "" && p3 != "-1") {
        html += ' <a href="javascript:;"><img src="' + p3 + '" alt="图片" /></a>';
    }
    if (p4 != undefined && p4 != null && p4 != "" && p4 != "-1") {
        html += ' <a href="javascript:;"><img src="' + p4 + '" alt="图片" /></a>';
    }
    if (p5 != undefined && p5 != null && p5 != "" && p5 != "-1") {
        html += ' <a href="javascript:;"><img src="' + p5 + '" alt="图片" /></a>';
    }
    if (html != '' && html.length > 0) {
        var reg_photos = new RegExp("{photos}", "g");
        var temp = $('[idx="Photos-Temp"]').html(); //模版
        var result = temp.replace(reg_photos, html);
        return result;
    }
    else {
        return '';
    }
}
//获取官方回复解释
idxevaluate.getComment = function (EvaluationReply, EvaluationReplyTime) {
    if (EvaluationReply == '' || EvaluationReply.length < 1)
        return '';

    var reg_comment_context = new RegExp("{Comment-Context}", "g");
    var temp = $('[idx="Comment-Temp"]').html(); //模版
    return temp.replace(reg_comment_context, EvaluationReply);
}

idxevaluate.getTagsLi = function (tags) {
    if (tags == undefined || tags == null || tags == "")
        return "";
    var array = tags.split('|');
    if (array.length < 1)
        return "";
    var html = "";
    for (var i = 0; i < array.length; i++) {
        html += "<span class=\"evaluate-tag\">" + array[i] + "</span>";
    }
    return html;
}
//获取用户信息
idxevaluate.getUser = function (uid) {
    if (uid != undefined && uid != null && uid > 0) {

        var userdiv = $('[idx="show-user-' + uid + '"]');
        var html_temp = $('[idx="EUser-Temp"]').html();

        $.ajax({
            url: "/order/GetEvaluateUserViewByUserId?userid=" + uid,
            type: "get",
            cache: true,
            async: false,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "jsonMiniCart",
            beforeSend: function () {
                userdiv.html("数据加载中......");
            },
            success: function (data) {
                if (data != undefined && data != null && data != "") {
                    var json = data;

                    var reg_NickName = new RegExp("{NickName}", "g");
                    var reg_UserImgSrc = new RegExp("{UserImgSrc}", "g");
                    var reg_Province = new RegExp("{Province}", "g");
                    var reg_City = new RegExp("{City}", "g");
                    var reg_WorkCount = new RegExp("{WorkCount}", "g");
                    var reg_ImgCount = new RegExp("{ImgCount}", "g");
                    var reg_FansCount = new RegExp("{FansCount}", "g");
                    var reg_AttentionCount = new RegExp("{AttentionCount}", "g");
                    var reg_Introduction = new RegExp("{Introduction}", "g");

                    var html = html_temp.replace(reg_NickName, json.NickName).replace(reg_UserImgSrc, json.UserImgSrc).replace(reg_Province, json.Province).replace(reg_City, json.City).replace(reg_WorkCount, json.WorkCount).replace(reg_ImgCount, json.ImgCount).replace(reg_FansCount, json.FansCount).replace(reg_AttentionCount, json.AttentionCount).replace(reg_Introduction, json.Introduction);

                    userdiv.html(html);
                }
            },
            error: function (e) {
                //alert("获取用户信息异常" + e);
            }
        });
    }
}
function stringToJSON(obj) {
    return eval('(' + obj + ')');
}