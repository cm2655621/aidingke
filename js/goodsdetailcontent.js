//ccq
/*
$(".ft-btn-details").on("click", function () {
    goodsdetailcontentReLoad("details.html", "productcode=" + $.getUrlParam('productcode'));
});
function moreWork() {
    goodsdetailcontentReLoad('goodslist.html', 'productCode=' + $.getUrlParam('productcode'));
}
*/
function goShowPreview() {
    var flag = checkLogin();
    if (flag == true)
        return false;
    showPreview();
}
function checkLogin() {
    var flag = !getLocalStorage();
    //验证是否登陆
    if (flag) {
        goodsdetailcontentReLoad('login.html', 'redirectUrlType=1&backtype=design');
    }
    return flag;
}

//签名切换
var arrSignature = [[]];
function changeSignature(val) {

    if (val == 1) {
        if (browserPlatform === "phone") { //lf                        
            $('#rightsign').removeClass('selected');
            $('#leftsign').addClass('selected');
        } else {
            $('#rightsign').removeClass('active4');
            $('#leftsign').addClass('active4');
        }
        if (localStorage.selectedId == 2) {
            localStorage.rightSignature = $('#signbody').html();
            $('#signbody').html(localStorage.leftSignature);
            localStorage.selectedId = 1;
        }
        if (localStorage.selectedId == 1) {
            localStorage.leftSignature = $('#signbody').html();
        }
        setSign(val);
    }
    else if (val == 2) {
        if (browserPlatform === "phone") { //lf            
            $('#leftsign').removeClass('selected');
            $('#rightsign').addClass('selected');
        } else {
            $('#leftsign').removeClass('active4');
            $('#rightsign').addClass('active4');
        }
        //左脚切换到右脚
        if (localStorage.selectedId == 1) {
            localStorage.leftSignature = $('#signbody').html();
            $('#signbody').html(localStorage.rightSignature);
            localStorage.selectedId = 2;
        }
        if (localStorage.selectedId == 2) {
            localStorage.rightSignature = $('#signbody').html();
        }
        setSign(val);
    } else {
        localStorage.selectedId = 3;
        setSign(val);
    }

}

localStorage.leftSignature = '';
localStorage.rightSignature = '';
localStorage.selectedId = 1;


//签名输入框变更
function signatureChange() {
    $('#signatureContent').attr("value", fiterOtherCt($('#signatureContent').val()))
    setSign(localStorage.selectedId);
}

//签名输入框变更
function signChange(obj) {
    obj.value = fiterOtherCt(obj.value);
    $('#signatureContent').attr("value", obj.value)
    setSign(localStorage.selectedId);
}

//字体变更
function changeFont() {
    var selectedValue = $('#font option:selected').val();

    $('#font option').each(function () {
        if (selectedValue == $(this).val()) {
            $(this).attr('selected', 'selected');
        }
        else {
            $(this).removeAttr('selected', 'selected');
        }
    });

    setSign(localStorage.selectedId);
}

//提交签名double
function setSign_Double() {
    setSign(1);
    //setSign(2);
    $("#rightsign").click();
}


//提交签名
function setSign(val) {
    var position = '';
    if (val == 1) {
        position = 'left';
    }
    if (val == 2) {
        position = 'right';
    }
    if (val == 3) {
        setSign_Double();
        return;
    }
    var color = $('#color-list li.selected').attr("data-color");
    if (!color) {
        color = '';
    }
    else {
        color = eval('(' + color + ')').id;
    }

    var font = $('#font option:selected').attr('data-font');
    //alert(font);
    var fontTypeId = '';
    if (!font) {
        font = '';
    }
    else {
        var efontType = eval('(' + font + ')');

        font = efontType.enName;
        fontTypeId = efontType.id;
    }
    //alert(font);
    var signcontent = $('#signatureContent').val();

    //alert(signcontent);
    //ccq
    //doSign(position, font, signcontent, color, fontTypeId);
    idxDoSign(position, signcontent, color, fontTypeId);
    setDesigned();
}

var cartDialog = dialog({ modal: true, zIndex: 100000, content: '正在提交数据，请稍候。。。' });


function changeElementState() {
    cartDialog.show();
}

//点击颜色
function selectColor(index) {
    $('#color-list li').removeClass('selected');
    $('#color-list li').eq(index).addClass('selected');
    setSign(localStorage.selectedId);
}

//设计完后标记状态为已设计
function setDesigned() {
    $('#scroll-wrap li.selected').addClass('designed');
}

//边界特殊处理
function borderEvent() {


    var curIndex = $('#scroll-wrap li').index($('#scroll-wrap li.selected'));
    var length = $('#scroll-wrap li').length;
    //如果是第一个步骤被选中隐藏prev的按钮
    if (curIndex == 0) {
        $('#J_StepSwitcher .prev').hide();
        $('#J_StepSwitcher .next').show();
    }
    //如果是最后一个步骤被选中隐藏next的按钮
    else if (curIndex == length - 1) {
        $('#J_StepSwitcher .next').hide();
        $('#J_StepSwitcher .prev').show();
    }
    else {
        $('#J_StepSwitcher .next').show();
        $('#J_StepSwitcher .prev').show();
    }
}

//生成类型为4的图片路径
//ccq
function createXmlPicUrl(productCode, options) {
    //var imgurl = 'https://static.idx.com.cn/flash/images/' + $.getUrlParam('productcode') + '/thumbnail/' + $.getUrlParam('productcode') + '_' + options.setID + '_' + options.colorID + '.jpg';
    var imgurl = IDX_INFO.imgUrl + productCode + '/thumbnail/' + productCode + '_' + options.setID + '_' + options.colorID + '.jpg';
    return imgurl;
}


//过滤其他字符
function fiterOtherCt(obj) {
    if (obj != null && obj != undefined) {
        reg = /[^A-Za-z0-9]+/;
        return obj.replace(reg, '');
    }
    return "";
}


function doodle(val) {

    if (val == 1) {
        $('#officialPic').show();
        if (browserPlatform === "phone") {
            $('#myPic').hide();
        } else {//有两个部位涂鸦时，遍历div将我的图片放在两个div里，实现切换

            $(".tuya-scroller").show();
            $(".mypic-scroller").hide();
            $(".shadeM").hide();
        }
        $('#doodle1').addClass('selected');
        $('#doodle2').removeClass('selected');
        $('#doodle3').removeClass('selected');
        //lf
        if (browserPlatform === "PC") { //判断设备
            $(".searchli").removeClass("db").addClass("dn");//显示搜索的图片
            $("#search").removeAttr("disabled");
            $(".searches").val("");//清空搜索框
            $(".cuinp").val(1);
        }
    }
    if (val == 2) {
        //ccq
		/*
		if (!getLocalStorage()) {
            goodsdetailcontentReLoad('login.html', 'redirectUrlType=1&backtype=design');
            return;
        }
		*/

        $('#officialPic').hide();
        if (browserPlatform === "phone") {
            $('#myPic').show();
        } else {      //lf 
            $(".tuya-scroller").hide();
            $(".mypic-scroller").show();
            $(".shadeM").show();
        }
        $(".mypic-scroller").show();
        $('#doodle1').removeClass('selected');
        $('#doodle2').addClass('selected');
        $('#doodle3').removeClass('selected');
        //lf
        if (browserPlatform === "PC") { //判断设备
            $(".searchli").removeClass("db").addClass("dn");//显示搜索的图片  
            $("#search").attr("disabled", "disabled");
            $(".cuinp").val(1);

        }
        if (browserPlatform === "phone") {
            loadMyPicByPage(0, '#myPicContent');
        } else {
            loadMyPicByPage(0, '.myPicContent');
        }
    }
    if (val == 3) {
        //ccq
		/*
		if (!getLocalStorage()) {
            goodsdetailcontentReLoad('login.html', 'redirectUrlType=1&backtype=design');
            return;
        }
		*/
        $('#doodle1').removeClass('selected');
        $('#doodle2').removeClass('selected');
        $('#doodle3').addClass('selected');
        //ccq
        //callPhotoActivity();
    }
}



var myPicArr = [];

function loadMyPicByPage(page, container) {
    if (browserPlatform === "PC") { //lf				
        $(".myPicContent").children().remove();
        // $(".prev,.next").off("click");
    }
    var d = myPicArr[page];

    if (d == "loading") return;

    if (typeof d === "object") {
        if (browserPlatform === "phone") { //lf
            loadMyPicCallback(page, d, $(container));
        } else {
            loadMyPicCallback(page, d, $(".myPicContent"));
        }
    } else {
        d = "loading";
        var p = parseInt(page) + 1;
        //ccq
        //var app_version = sysVersion.appVersion;

        if (userId === "" || userId === undefined || userId === null) {
            idxGotoLogin();
            return;
        }
        if (browserPlatform === "phone") { //lf
            ApiRequest({
                //ccq
                //path: '/apiflash/GetUserImageList?userId=' + getLocalStorage() + '&page_size=10&page=' + p,// + "&app_version=" + app_version,
                path: IDX_INFO.getUserImageList.replace("{userId}", userId).replace("{page_size}", "10").replace("{page}", p),
                jsonpCallback: 'getUserImageList',
                dataType: 'jsonp',
                success: function (data) {
                    // console.log(data);
                    var html = '';
                    if (data.Code == 0) {
                        loadMyPicCallback(page, data.Data, $(container));
                    }
                    if (data.Code == 999) {
                    }
                }
            });
        } else {
            ApiRequest({
                //ccq
                //path: '/apiflash/GetUserImageList?userId=' + getLocalStorage() + '&page_size=10&page=' + p,// + "&app_version=" + app_version,
                path: IDX_INFO.getUserImageList.replace("{userId}", userId).replace("{page_size}", "21").replace("{page}", p),
                jsonpCallback: 'getUserImageList',
                dataType: 'jsonp',
                success: function (data) {
                    // console.log(data);
                    var amount = data.Data.pageCount - 1;
                    // var inpv1 = $(".cuinp").val();
                    var inpv1 = document.getElementsByClassName("cuinp")[0].value;
                    $(".numD").text(inpv1 + "/" + amount);

                    var html = '';
                    if (data.Code == 0) {
                        loadMyPicCallback(page, data.Data, $(".myPicContent"));
                    }
                    if (data.Code == 999) {
                    }
                    //我的图片翻页
                    var arrL2 = { "amount": amount, "container": container }
                    readyNL(arrL2, loadMyPicByPage)
                    $(".inp21").click(function () {
                        var inpv1 = document.getElementsByClassName("cuinp")[0].value;
                        $(".numD").text(inpv1 + "/" + amount);
                        readyNL(arrL2, loadMyPicByPage)
                        loadMyPicByPage(0, $(".myPicContent"));
                    })
                    mousepic();
                }
            });
        }

    }
}


function loadMyPicCallback(page, data, container) {
    // console.log(container);
    var row = container.find(".xs-row[data-page=" + page + "]"),
        list = renderMaterialList(page, data.ImgList);
    if (row.length > 0) {
        row.replaceWith(list);
    } else {
        container.append(list);
    }

    myPicArr[page] = data;
    if (page < data.pageCount) {
        if (container.find(".xs-row[data-page=" + (page + 1) + "]").length == 0) {
            container.append('<div data-page="' + (page + 1) + '" class="xs-row"></div>');
        }
    } else {
        myPicArr[page] = "loading";
    }
    var scroller = container.closest(".custom-scroller").data("scroller");
    if (scroller) {
        scroller.refresh();
    }
}