//lf
if (!!window.ActiveXObject || "ActiveXObject" in window) {
    // alert("即将切换成flash定制器");
    var hrf = window.location.href;
    var str = hrf.substr(34)
    location.href = "http://www.idx.com.cn/CustomizingFlash/" + str;

}
//  else if (navigator.userAgent.indexOf("Firefox") > -1) {
//     console.log("是火狐浏览器 这是addlf.js。里面的浏览器判断")
//     var hrf = window.location.href;
//     console.log(hrf.substr(34));
//     var str = hrf.substr(34)
//     location.href = "http://www.idx.com.cn/CustomizingFlash/" + str; 
// }
//获取链接中的鞋子编码


$(document).ready(function () {
    //预览图确认保存
    $(".save1,.eyeA").on("click", function () {
        if (userId === "" || userId === undefined || userId === null) {
            idxGotoLogin();
            return;
        }
        $(".save2").show(); //显示第一流程按钮
        $(".saveCar").hide(); //隐藏第二流程按钮
        $(".addToCarA").show(); //显示带workid加入购物车按钮
        $(".addToCar").hide(); //隐藏直接加入购物车按钮

    })
    $(".confirmph").on("click", function () {
        if (userId === "" || userId === undefined || userId === null) {
            idxGotoLogin();
            return;
        }
        $("#photoshop").hide();
        $(".saveSh").show();

    })
    //设计灵感保存
    $(".save2").on("click", function () {
        if (userId === "" || userId === undefined || userId === null) {
            idxGotoLogin();
            return;
        }
        $(".saveSh").hide();
        $(".confirmSh").show();


    })
    //点击加入购物车，显示选择尺码框
    $(".addC").on("click", function () {
        $(".confirmSh").hide();
        $(".shoeSi").show();
    })
    //直接加入购物车
    $(".addCar").on("click", function () {
        $(".save2").hide(); //隐藏保存按钮，显示加入购物车按钮
        $(".saveCar").show();
    })
    $(".saveCar").on("click", function () {
        $(".saveSh").hide();
        $(".shoeSi").show();
        $(".addToCarA").hide(); //隐藏带workid加入购物车按钮
        $(".addToCar").show(); //显示直接加入购物车按钮
    })

    // $(".addToCar,.addToCarA").on("click",function(){
    //     $(".shoeSi").hide();
    //     $(".ps-pagec").hide();
    //     $("#ps-pageA").show();
    //     $(".confirmSh").show();
    // })

    // //多品类-手机壳等
    // console.log(ccid);
    // if (ccid != 2) {
    //     $(".shscd select").append("<option>均码</option>");
    //     $(".saveCar,.addC").removeAttr("onclick");
    // }

    //鼠标移动显示部件名称
    $(".ctrPC").mouseover(function (e) {
        var xxl = $(".contp").offset().left;
        var xxt = $(".contp").offset().top;
        var xx = e.pageX; //取得浏览器窗口相对鼠标位置
        var yy = e.pageY;
        var xxQ = xx - 5 - xxl;
        var yyQ = yy - 25 - xxt;
        var $steptx = $(e.target).attr("data-name");
        var wint1 = "<a class='wint1' style=" + 'left:' + xxQ + 'px;' + 'top:' + yyQ + 'px' + ">" + $steptx + "</a>"
        $(".scroll-wrap").append(wint1);
    });
    $(".graffInfo").mouseout(function (e) {
        $(".wint1").remove();
    });
    //鼠标点击切换
    $(".addsp").on("click", function () {
        if ($(".addsp span").hasClass("borspA")) {
            $(".addsp span").removeClass("borspA").addClass("borsp");
            $(".selectPro").hide();
        } else {
            $(".addsp span").removeClass("borsp").addClass("borspA");
            $(".selectPro").show();
        }

    })

    // $(".spselect ul li").on("mouseover", function () {
    //     $(this).addClass("activesp").siblings().removeClass();
    // })

    // //鼠标移动显示大图
    // $(".detailsp div").mouseover(function () {
    //     var imgsr = $(this).find("img").attr("src");
    //     $(".pupsp").show();
    //     // console.log(imgsr);        
    //     $(".pupsp").find("img").attr("src", imgsr);
    // })
    // $(".detailsp div").mouseout(function () {
    //     $(".pupsp").hide();
    // })
    // var shadePro = "<div class='shadePro'><img src='http://static.idx.com.cn/www/m/zone/src/spirte/sTimg.gif'/></div>"
    // $(".contp").append(shadePro);

    // $(document).ajaxStart(function () {
    //     // $(".shadePro").show();
    //     console.log("ajax请求开始")
    // }).ajaxStop(function () {
    //     // $(".shadePro").hide();        
    //     console.log("ajax请求结束")
    // });
    //窗口全屏
    $(".fullscreen").click(function () {
        if ($(this).hasClass("judge")) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            $(this).removeClass("judge");
        } else {
            var docElm = document.documentElement;
            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            //FireFox  
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            //Chrome等  
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            //IE11
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            $(this).addClass("judge");
        }
    })
    //分享窗口
    var ndiv = "<div class='ndiv'><div class='ndiva' onclick=shareAs('qq')><span></span><a>QQ空间</a></div>" +
        "<div class='ndivc' onclick=shareAs('sina')><span></span><a>新浪微博</a></div>" +
        "<div class='ndivb' onclick=shareAs('qqweibo')><span></span><a>腾讯微博</a></div>";
    $(".spacePC").append(ndiv);

    $(".shareA,.ndiv").mouseover(function () {
        $(".ndiv").show();
    })
    $(".shareA,.ndiv").mouseout(function () {
        $(".ndiv").hide();
    })
    //涂鸦控制按钮
    var cusctrl = "<div id='ss_menu' hidden='hidden'>" +
        "<div id='up_button'></div>" +
        "<div id='left_button'></div>" +
        "<div id='right_button'></div>" +
        "<div id='down_button'></div>" +
        "<div id='big_button'></div>" +
        "<div id='small_button'></div>" +
        "<div class='menu'><div class='share' id='ss_toggle' data-rot='90'></div></div>" +
        +"</div>";
    $(".contp").append(cusctrl);
    //新增的多涂鸦按钮
    var colorful = "<div class='colorful' onclick='isMorePic()'>" +
        "<img src='http://static.idx.com.cn/www/m/zone/idx_h5/img/isMorePic.png' width='100%' height='100%'>" +
        "<span>多涂鸦</span></div>" + "<div class='flash' onclick='flash()'><img src='http://static.idx.com.cn/www/pc/custom/img/flash2.png'><span>切换到flash定制器</span></div>";
    $(".contp").append(colorful);

    $(".conf").click(function () {
        $(".confirmSh").hide();
    })
})

function shareAs(e) {
    // console.log(e, workid_globe);
    if (workid_globe) {
        location.href = "http://www.idx.com.cn/Share/WorkShare?site=" + e + "&workid=" + workid_globe;
    } else {
        alert("请先保存作品");
    }
}
//关闭窗口 lf
function closeA() {
    gogoBack();
    $(".shoeSi,.saveSh,.confirmSh,#photoshop").hide();
}
var z = 1;
//搜索图片
function searchPic(z) {
    $(".tuya-scroller").hide(); //隐藏官方图片
    $(".searchli").children().remove(); //移除上次搜索记录
    $(".searchli").removeClass("dn").addClass("db"); //显示搜索的图片
    var keyn = $(".searches").val();
    var keylen = document.getElementsByClassName("searches").length;
    if (keylen > 1) {
        for (var w = 0; w < keylen; w++) {
            var keynA = document.getElementsByClassName("searches")[w].value;
            console.log(keynA);
        }
    }
    // console.log(keyn);
    $.ajax({
        url: "http://pic.idx.com.cn/apiflash/flash?act=1531&Category=2&category_id_1=&category_id_2=&page_size=21&page=" + z + "&key=" + keyn,
        type: "get",
        dataType: "xml",
        success: function (data) {
            // console.log(data);
            var imgs = data.getElementsByTagName("image"),
                amount = data.getElementsByTagName("pages")[0].getAttribute("total"),
                seList = document.getElementById("searchli");
            // seList = document.getElementById("officialPic");
            for (var i = 0; i < imgs.length; i++) {
                var id = imgs[i].getAttribute("id"),
                    src = imgs[i].getAttribute("url"),
                    thumb = imgs[i].getAttribute("thumbUrl");
                var li = document.createElement("li");
                li.setAttribute("data-src", src);
                li.setAttribute("data-id", id);
                li.innerHTML = "<img src='" + thumb + "' />";
                $(".searchli").append(li);
            }
            // var inpv1 = document.getElementsByClassName("cuinp")[0].value;
            var inpv1 = $(".cuinp").val();
            $(".numD").text(inpv1 + "/" + amount);

            $("#searchli li").click(function () { //点击图片涂鸦
                $(this).addClass("selected").siblings().removeClass("selected");
                var seid = $(this).attr("data-id");
                var sesrc = $(this).attr("data-src");
                idxAddtato(sesrc, seid);
            })
            var arrL1 = {
                "z": z,
                "amount": amount,
                "c": ""
            };
            readyNL(arrL1, searchPic);

        },
        error: function () {
            console.log("图片获取失败");
        }
    });

}
//官方图片列表
var picLog = "";

function offPicList() {
    // jQuery.support.cors = true;
    $.ajax({
        url: "http://pic.idx.com.cn/apiflash/flash?act=1521&Category=2&type=idx&r=4509184.313938022",
        type: "get",
        dataType: "xml",
        success: function (data) {
            // console.log(data);
            var opt1 = data.getElementsByTagName("root")[0].children; //取得root下第一层子节点
            // console.log(opt1);

            var offA = document.getElementsByClassName("seoff");
            picLog = opt1;
            for (var i = 0; i < opt1.length; i++) {
                var option1 = document.createElement("option"),
                    optN = opt1[i].getAttribute("name"),
                    optId = opt1[i].getAttribute("id");
                option1.setAttribute("data-id", optId);
                // option1.setAttribute("data-name", optN);
                option1.innerHTML = optN;
                $(".seoff").append(option1);
            }
        },
        error: function () {
            console.log("官方图片列表获取失败");
        }

    })

}
//遍历出官方图库二级列表
function selpicl(r) {
    $(".seoffB").children().remove();
    var offB = document.getElementsByClassName("seoffB");
    var opt2 = picLog[r].children;

    for (var e = 0; e < opt2.length; e++) {
        var optionB = document.createElement("option");
        var optbN = opt2[e].getAttribute("name");
        var optbid = opt2[e].getAttribute("id");
        optionB.setAttribute("data-id", optbid);
        optionB.innerHTML = optbN;
        $(".seoffB").append(optionB);
    }

}


//遍历出分类图库列表
function offpicl(x, y, z) {
    // console.log("x=" + x, "y=" + y, "z=" + z);
    $(".tuya-scroller").hide(); //隐藏官方图片
    $(".searchli").children().remove(); //移除上次搜索记录
    $(".searchli").removeClass("dn").addClass("db"); //显示搜索的图片
    $.ajax({
        url: "http://pic.idx.com.cn/apiflash/flash?act=1531&Category=2&category_id_1=" + x + "&category_id_2=" + y + "&page_size=21&page=" + z + "&key=&appKey=&r=8383934.302255511",
        type: "get",
        dataType: "xml",
        async: false,
        success: function (data) {
            // console.log(data);
            var imgs = data.getElementsByTagName("image"),
                amount = data.getElementsByTagName("pages")[0].getAttribute("total"),
                seList = document.getElementsByClassName("searchli");
            for (var i = 0; i < imgs.length; i++) {
                var id = imgs[i].getAttribute("id"),
                    src = imgs[i].getAttribute("url"),
                    thumb = imgs[i].getAttribute("thumbUrl");
                var li = document.createElement("li");
                li.setAttribute("data-src", src);
                li.setAttribute("data-id", id);
                li.innerHTML = "<img src='" + thumb + "' />";
                $(".searchli").append(li);
            }
            // var inpv1 = document.getElementsByClassName("cuinp")[0].value;
            var inpv1 = $(".cuinp").val();
            $(".numD").text(inpv1 + "/" + amount);


            $("#searchli li").click(function () { //点击图片涂鸦
                $(this).addClass("selected").siblings().removeClass("selected");
                var seid = $(this).attr("data-id");
                var sesrc = $(this).attr("data-src");
                idxAddtato(sesrc, seid);
            })
            var arrL = {
                "x": x,
                "y": y,
                "z": z,
                "amount": amount
            };
            readyNL(arrL, offpicl);

        },
        error: function () {
            console.log("图片加载失败");
        }
    })
}
//public公共翻页
function readyNL(arrL, funcList) {

    var arrLN = Object.keys(arrL);
    var inpv = parseInt($(".cuinp").val());
    $(".next").off("click").on("click", function () {
        $(".prev").css("border-right", "7px solid #555");
        if (inpv < arrL.amount) {
            inpv += 1;
            $(".cuinp").val(inpv);
        } else if (inpv == arrL.amount) {
            $(this).off("click").css("border-left", "7px solid #bbb");
            return;
        }
        $(".numD").text(inpv + "/" + arrL.amount);
        // console.log(inpv, arrL.amount)
        // console.log(arrL.x, arrL.y, inpv, arrL.container, arrL.body);
        switch (arrLN.length) {
            case 3:
                searchPic(inpv);
                break;
            case 4:
                offpicl(arrL.x, arrL.y, inpv, arrL.container);
                break;
            case 5:
                loadMaterialPage(inpv, arrL.body);
                break;
            default:
                loadMyPicByPage(inpv, arrL.container);
        }
    })
    $(".prev").off("click").on("click", function () {
        $(".next").css("border-left", "7px solid #555");
        if (inpv > 0) {
            inpv -= 1;
            $(".cuinp").val(inpv);
        } else if (inpv == 0) {
            $(this).off("click").css("border-right", "7px solid #bbb");
            return;
        }
        $(".numD").text(inpv + "/" + arrL.amount);
        switch (arrLN.length) {
            case 3:
                searchPic(inpv);
                break;
            case 4:
                offpicl(arrL.x, arrL.y, inpv, arrL.container);
                break;
            case 5:
                loadMaterialPage(inpv, arrL.body);
                break;
            default:
                loadMyPicByPage(inpv, arrL.container);
        }

    })
    $(".confirmp1").off("click").on("click", function () {
        var inpv1 = parseInt($(".cuinp").val());
        $(".numD").text(inpv1 + "/" + arrL.amount);
        switch (arrLN.length) {
            case 3:
                searchPic(inpv1);
                break;
            case 4:
                offpicl(arrL.x, arrL.y, inpv1, arrL.container);
                break;
            case 5:
                loadMaterialPage(inpv1, arrL.body);
                break;
            default:
                loadMyPicByPage(inpv1, arrL.container);
        }

    })
}
//调用选择产品接口-一级列表
function selectProA() {
    $.ajax({
        url: "http://www.idx.com.cn/ApiProduct/Kind?r=6738132.149912417",
        type: "get",
        dataType: "xml",
        success: function (data) {
            // console.log(data);
            var cateUL = document.getElementsByClassName("spselect")[0].getElementsByTagName("ul")[0];
            $(".spselect ul").children().remove();
            var cateA = data.getElementsByTagName("List")[0].children;
            for (var e = 0; e < cateA.length; e++) {
                var chdiv = cateA[e].getElementsByTagName("Text")[0].innerHTML;
                var chdivd = cateA[e].getElementsByTagName("Value")[0].innerHTML;
                var cateLI = document.createElement("li");
                var cateldiv = document.createElement("div");
                var cateldiv2 = document.createElement("p");
                cateLI.id = chdivd;
                cateldiv.innerHTML = chdiv;
                cateldiv2.className = "detailsp";
                cateLI.appendChild(cateldiv);
                cateLI.appendChild(cateldiv2);
                cateUL.appendChild(cateLI);
            }

            //鼠标划过左侧列表添加class
            $(".spselect ul li div").on("mouseover", function () {
                $(this).parent().addClass("activesp").siblings().removeClass();
                var qqrt = $(this).parent().attr("id");
                selectProA1(qqrt);
            })
        },
        error: function () {
            console.log("调用选择产品失败");
        }
    })
}

function selectProA1(q) {
    $.ajax({
        url: "http://www.idx.com.cn/ApiProduct/KindData?SpId=" + q,
        type: "get",
        dataType: "xml",
        success: function (data) {
            // console.log(data);
            $(".detailsp").children().remove();
            var cateBli = document.getElementById(q);
            var cateBdiv = cateBli.getElementsByClassName("detailsp")[0];
            var cateBLI = data.getElementsByTagName("ArrayOfCategoryKindProduct")[0].children;
            for (var r = 0; r < cateBLI.length; r++) {
                var cateBdivch = document.createElement("div");
                var cateBimg = document.createElement("img");
                var cateBspan = document.createElement("span");
                var cateBimgsrc = cateBLI[r].getElementsByTagName("NSImageUrl")[0].innerHTML;
                var cateBimgsrcS = cateBLI[r].getElementsByTagName("SImageUrl")[0].innerHTML;
                var cateBspante = cateBLI[r].getElementsByTagName("Price")[0].innerHTML;
                var cateBcode = cateBLI[r].getElementsByTagName("ProductCode")[0].innerHTML;

                var tspa = cateBLI[r].getElementsByTagName("ProductChName")[0].innerHTML;
                var tspc = cateBLI[r].getElementsByTagName("CommentNum")[0].innerHTML;
                var tspd = cateBLI[r].getElementsByTagName("SaleNum")[0].innerHTML;
                cateBdivch.setAttribute("data-name", tspa);
                cateBdivch.setAttribute("data-comment", tspc);
                cateBdivch.setAttribute("data-sale", tspd);
                cateBdivch.setAttribute("data-src", cateBimgsrc);
                cateBdivch.setAttribute("data-code", cateBcode);

                cateBimg.setAttribute("src", cateBimgsrcS);
                cateBspan.innerHTML = cateBspante;
                cateBdivch.appendChild(cateBimg);
                cateBdivch.appendChild(cateBspan);
                cateBdiv.appendChild(cateBdivch);

            }

            //鼠标移动显示大图
            $(".detailsp div").mouseover(function () {
                var imgsr = $(this).attr("data-src");

                var tspaA = $(this).attr("data-name");
                var tspbA = $(this).find("span").text();
                var tspcA = $(this).attr("data-comment");
                var tspdA = $(this).attr("data-sale");
                // console.log(tspaA,tspbA,tspcA,tspdA);
                $(".pupsp").find("img").attr("src", imgsr);
                $(".tspa").text(tspaA);
                $(".tspb").text(tspbA);
                $(".tspc a").text(tspcA);
                $(".tspd a").text(tspdA);

                $(".pupsp").show();
            })
            $(".detailsp div").mouseout(function () {
                $(".pupsp").hide();
            })
            //点击载入新的产品
            $(".detailsp div").on('click', function () {
                $(".content-wrap").children().remove();
                $(".scroll-wrap").children().remove();

                var catecode = $(this).attr("data-code");
                console.log(uid, catecode, ccid, wid);
                Initialize(uid, catecode, ccid, wid);


                $(".addsp span").removeClass("borspA").addClass("borsp");
                $(".selectPro").hide();

            })
        },
        error: function () {
            console.log("调用选择产品失败");
        }
    })
}

//鼠标滑动生成大图
function mousepic() {
    $(".tuya-scroller li").on("mouseover", function (e) { //涂鸦图片
        var dataMat = $(this).attr("data-material");
        var dmn = JSON.parse(dataMat);
        var xxl = $(".contp").offset().left;
        var xxt = $(".contp").offset().top;
        var xx = e.pageX; //取得浏览器窗口相对鼠标位置
        var yy = e.pageY;
        var xxQ = xx - 5 - xxl;
        var yyQ = yy - 25 - xxt;
        var wint1 = "<a class='wint1' style=" + 'left:' + xxQ + 'px;' + 'top:' + yyQ + 'px' + ">" + dmn.ImgName + "</a>"

        //有图片的情况

        // var winpic = "<div class='winpic'><img src=" + dmn.ImgUrl + "></div>"
        // $(".contp").append(winpic);
        $(".scroll-wrap").append(wint1);

    })
    // $(".mypic-scroller li").on("mouseover", function (e) {//我的图片
    //     var dataMat = $(this).attr("data-material");
    //     var dmn = JSON.parse(dataMat);
    //     //有图片的情况
    //     var winpic = "<div class='winpic'><img src=" + dmn.ImgUrl + "></div>"
    //     $(".contp").append(winpic);
    // })
    $(".custom-scroller li").on("mouseover", function (e) { //色块
        if ($(this).attr("data-color")) { //判断只有颜色的情况
            var dataMat = $(this).attr("data-material");
            var dmn = JSON.parse(dataMat);
            var xxl = $(".contp").offset().left;
            var xxt = $(".contp").offset().top;
            var xx = e.pageX; //取得浏览器窗口相对鼠标位置
            var yy = e.pageY;
            var xxQ = xx - xxl;
            var yyQ = yy + 5 - xxt;
            // var wint1 = "<a class='wint1' style=" + 'left:' + xxQ + 'px;' + 'top:' + yyQ + 'px' + ">" + dmn.ImgName + "</a>"

            dmn.ImgName = JSON.parse($(this).attr("data-color")).name;
            dmn.material = JSON.parse($(this).attr("data-material")).name;
            var wint1 = "<a class='wint1' style=" + 'left:' + xxQ + 'px;' + 'top:' + yyQ + 'px' + ">" + dmn.ImgName + "/" + dmn.material + "</a>"
        }
        $(".scroll-wrap").append(wint1);
    })
    $(".graffInfo").mouseout(function (e) {
        $(".wint1").remove();
    });
    $(".contp").mouseout(function (e) {
        $(".winpic").remove();
    });
}

//判断是设计师登录—隐藏掉官方图片显示我的图片
function mypicA() {
    doodle(2);
    $(".tuya-scroller,.inp1,.inp21").hide();
    $("#doodle1").css("color", "#ccc");
    $(".mypic-scroller").show();
    $(".release").show();
    $(".conf").hide();
}
//执行发布商品
function release() {
    console.log(workid_globe)
    location.href = "http://store.idx.com.cn/Commodity/AddCommodity?workid=" + workid_globe;
}
//切换到flash定制器
function flash() {
    location.href = "http://www.idx.com.cn/CustomizingFlash/" + nowProductCode;
    console.log("是否切换到flash定制器");
}