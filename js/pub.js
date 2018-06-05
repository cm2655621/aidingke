$(function() {
    //去掉详情页“喜欢"的后的（1）
    $(".likes").text("喜欢");
    // 搜索店铺还是商品
    $(".searchToggle").live("click", function() {
        $(".searchSth").addClass("searchToggle");
        $(this).removeClass("searchToggle");
    });
    // 搜索
    $(".headMagnifier").on("click", function() {
        var val = $("input[name='search']").val();
        if ($.trim(val).length > 0) {
            var urls = ["http://store.idx.com.cn/search/1.htm?k=*&kl=1", "http://www.idx.com.cn/search-0.htm?k=*&kl=1"];
            var type = $(".searchSth").index($(".searchToggle"));
            var escapeUrl = window.escape(val);
            location.href = urls[type].replace("*", escapeUrl);
        } else {
            alert("搜索条件不能为空！");
        }
    });
    $("input[name='search']").on("keydown", function(e) {
        if (event.keyCode == "13") {
            $(".headMagnifier").trigger("click");
        }
    });
    $(window).scroll(function() {
        var scroll = $(window).scrollTop(),
            topHeight = $(".header").height(),
            navHeight = $(".headNav").outerHeight();
        if (!$(".header").hasClass("fixed")) {
            if (scroll > navHeight) {
                $(".headTop, .headBody, .headNav").hide();
                $(".header").addClass("fixed").css("zIndex", 30).find(".headNav").addClass("load bold").slideDown();
                $(window).scrollTop(1);
                $(".contentWrap li").addClass("newItem");
            }
        } else {
            if (scroll == 0) {
                $(".header").removeClass("fixed").find(".headTop, .headBody").show();
                $(".headNav").removeClass("load bold");
                $(".contentWrap li").removeClass("newItem");

            }
        }
    });
    $(".navItem a").click(function() {
        $(".navItem a").css("color", "#000");
        $(this).css("color", "#ff6461");
    })

    // 返回顶部
    $(window).scroll(function() {
        var hkkk = $(this).scrollTop();
        //获得滚动条距top的高度
        //alert(h);
        if (hkkk > 2100) {
            $(".retop").show();
        } else {
            $(".retop").hide();
        };
    });
});

var idxPage = {
    myPaging: function(obj, count, pagecount, current) {
        var nc_off = true;
        var $n_a = obj.find(".n_a");
        var $n_b = obj.find(".n_b");
        var $n_c = obj.find(".n_c");
        var $pag_f = obj.find(".paging_f");
        var nb_h = Math.ceil(count / pagecount);
        var $pag_s = obj.find(".paging_s"); //上一页
        var $pag_d = obj.find(".paging_d"); //下一页  
        var $pag_ul = obj.find(".paging_f ul");
        var $pag_li = obj.find(".paging_f ul li");
        var na_html = $pag_d.siblings(".paging_n").find(".n_a").html();
        current({ page: 1, pagesize: nb_h });
        if (count == 0) {
            $n_a.html("").html(0);
            $n_b.html("").html(0);
            $pag_s.addClass("hid");
            $pag_s.unbind("click");
            $pag_d.unbind("click");
            $pag_f.height(0);
            $pag_f.find("ul").height(0);
        } else if (count < pagecount && count > 0) {
            $n_a.html("").html(1);
            $n_b.html("").html(1);
            $pag_s.addClass("hid");
            $pag_s.unbind("click");
            $pag_d.unbind("click");
            $pag_f.height(0);
            $pag_f.find("ul").height(0);
        } else if (count == pagecount) {
            $n_a.html("").html(1);
            $n_b.html("").html(1);
            $pag_s.addClass("hid");
            $pag_s.unbind("click");
            $pag_d.unbind("click");
            $pag_f.height(0);
            $pag_f.find("ul").height(0);
        } else {
            //确定<div class="paging_f>和ul的高度和页数
            if (nb_h < 8 && nb_h > 0) {
                var h7 = 34 * nb_h + 2;
                $n_a.html("").html(1);
                $n_b.html("").html(nb_h);
                $pag_f.height(h7);
                $pag_f.find("ul").height(h7);
            } else if (nb_h > 8) {
                $n_a.html("").html(1);
                $n_b.html("").html(nb_h);
                $pag_f.height(238);
                $pag_f.find("ul").height(238);
            }
            //弹出分页
            $n_c.click(function() {
                if (nc_off) {
                    $pag_f.removeClass("dnone");
                    nc_off = false;
                } else {
                    $pag_f.addClass("dnone");
                    nc_off = true;
                }
            });
            $pag_ul.empty();
            for (var i = 1; i < nb_h + 1; i++) {
                var ul_li = $("<li></li>");
                ul_li.html(i);
                $pag_ul.append(ul_li);
                //选择跳转到指定页数
                ul_li.click(function() {
                    var nb_html = $pag_d.siblings(".paging_n").find(".n_b").html();
                    var li_html = $(this).html();
                    var li_off = true;
                    $n_a.html("").html(li_html);
                    $pag_f.addClass("dnone");
                    nc_off = true;
                    if (li_html == 1) {
                        $pag_s.addClass("hid");
                        $pag_d.removeClass("hid");
                    } else if (li_html == nb_html) {
                        $pag_d.addClass("hid");
                        $pag_s.removeClass("hid");
                    } else {
                        $pag_d.removeClass("hid");
                        $pag_s.removeClass("hid");
                    }
                    current({ page: li_html, pagesize: nb_html });
                });
            };
            //下一页
            $pag_d.click(function() {
                var na_html = $pag_d.siblings(".paging_n").find(".n_a").html();
                var nb_html = $pag_d.siblings(".paging_n").find(".n_b").html();
                nc_off = true;
                na_html++;
                $pag_s.removeClass("hid");
                $pag_f.addClass("dnone");
                if (na_html == nb_html) {
                    $n_a.html(nb_html);
                    $pag_d.addClass("hid");
                } else {
                    $n_a.html(na_html);
                }
                current({ page: na_html, pagesize: nb_html });
            });
            //上一页
            $pag_s.click(function() {
                var na_html = $pag_d.siblings(".paging_n").find(".n_a").html();
                var nb_html = $pag_d.siblings(".paging_n").find(".n_b").html();
                nc_off = true;
                na_html--;
                $pag_f.addClass("dnone");
                if (na_html == 1) {
                    $pag_s.addClass("hid");
                    $pag_d.removeClass("hid");
                    $n_a.html(1);
                } else {
                    $n_a.html(na_html);
                    $pag_d.removeClass("hid");
                }
                current({ page: na_html, pagesize: nb_html });
            });
            return obj;
        }
    }
};