// JavaScript Document
var femaleKindJson = null,maleKindJson = null;
 

(function ($) {
    /*************开始定制板块切换效果-start*****************/
    $.fn.extend({
        smartFloatBottom: function (floatO) {
            var options = {
                stopTop: 0,
                clientHeight: 0,
                setStopStyle: function () { },
                setFloatStyle: function () { },
                resizeWidth: function () { }
            }
            if (floatO) { var o = $.extend(options, floatO) }
            function repos() {
                if ($.browser.msie) {
                    scorll_top = document.documentElement.scrollTop;
                } else {
                    scorll_top = document.body.scrollTop;
                }
                if ((scorll_top + o.clientHeight) < o.stopTop) {
                    o.setFloatStyle();
                } else {
                    o.setStopStyle();
                }
            }
            if (($.browser.msie && $.browser.version > 6) || $.browser.safari || $.browser.opera || $.browser.mozilla) {
                repos();
                $(window).scroll(function () {
                    o.stopTop = $('[node-name="tabBox"]').position().top;
                    o.clientHeight = document.documentElement.clientHeight;
                    repos()
                }).resize(function () { o.resizeWidth(); });
            }

            return $(this)
        },
        smartFloatTop: function (floatO) {
            var options = {
                stopTop: 0,
                setStopStyle: function () { },
                setFloatStyle: function () { }
            }
            if (floatO) { var o = $.extend(options, floatO) }

            function repos() {
                if ($.browser.msie) {
                    scorll_top = document.documentElement.scrollTop;
                } else {
                    scorll_top = document.body.scrollTop;
                }
                if ((scorll_top) > o.stopTop) {
                    o.setFloatStyle();
                } else {
                    o.setStopStyle();
                }
            }
            if (($.browser.msie && $.browser.version > 6) || $.browser.safari || $.browser.opera || $.browser.mozilla) {
                repos();
                $(window).scroll(function () {
                    o.stopTop = $('.idx-customcommodity-details').position().top;
                    repos()
                });
            }
            return $(this)
        },
        toggleShowkind: function (kindO) {
            var options = {
                attr: '',
                gayWord: '-'
            }
            if (kindO) { var o = $.extend(options, kindO) }
            return $(this).each(function () {
                var _filter = $(this);
                var attr = _filter.attr(o.attr);
                var attr_arr = attr.split(o.gayWord);
                var _allKinds = $('[' + attr_arr[0] + ']');
                _filter.click(function () {
                    if (attr_arr[1] == '') {
                        _allKinds.show();
                    } else {
                        var selector = '[' + attr_arr[0] + '="' + attr_arr[1] + '"]';
                        _allKinds.not(selector).hide();
                        _allKinds.filter(selector).show()
                    }
                })
            })
        },
        tmpShoeModlScorll: function (doneOption) {
            var options = {
                _this: $(this),
                prevBtnSel: '',
                nextBtnSel: '',
                moveNodeSel: '',
                boxWidth: 0,
                timeout: 0,
                intervaltime: 0
            }
            if (doneOption) { var o = $.extend(options, doneOption) }

            var _prevBtn = o._this.find(o.prevBtnSel), _nextBtn = o._this.find(o.nextBtnSel);
            var _moveNode = o._this.find(o.moveNodeSel).eq(0);

            var _aMoveChild = _moveNode.children();
            var _firstChild = _moveNode.children(':first'), _lastChild = _moveNode.children(':last');
            _firstChild.clone().appendTo(_moveNode);
            _lastChild.clone().prependTo(_moveNode);
            _aMoveChild = _moveNode.children();
            var totle_width = _aMoveChild.size() * _aMoveChild.eq(0).width();
            var totle_pages = Math.floor(totle_width / o.boxWidth);
            var star_page = 2, cur_page = star_page, end_page = totle_pages - 1;
            _moveNode.css({ 'width': totle_width, 'left': (0 - (star_page - 1) * o.boxWidth) });

            if (!(totle_width > o.boxWidth)) {
                _prevBtn.hide();
                _nextBtn.hide();
            }

            var interval = setInterval(nextMove, o.intervaltime);

            _nextBtn.click(function () {
                if (interval) {
                    clearInterval(interval)
                }
                if (!_moveNode.is(':animated')) {
                    nextMove();
                    interval = setInterval(nextMove, o.intervaltime);
                }
            });
            _prevBtn.click(function () {
                if (interval) {
                    clearInterval(interval)
                }
                if (!_moveNode.is(':animated')) {
                    prevMove();
                    interval = setInterval(nextMove, o.intervaltime);
                }
            });
            function nextMove() {
                if (cur_page < totle_pages) {
                    var next_page = cur_page + 1;
                }
                var next_pos = 0 - (next_page - 1) * o.boxWidth;
                _moveNode.animate({ left: next_pos }, o.timeout, function () {
                    if (next_page == totle_pages) {
                        cur_page = star_page;
                        _moveNode.css('left', (0 - (cur_page - 1) * o.boxWidth))
                    } else {
                        cur_page = next_page;
                    }
                });
            }
            function prevMove() {
                if (cur_page > 1) {
                    var next_page = cur_page - 1;
                }
                var next_pos = 0 - (next_page - 1) * o.boxWidth;
                _moveNode.animate({ left: next_pos }, o.timeout, function () {
                    if (next_page < star_page) {
                        cur_page = end_page;
                        _moveNode.css('left', (0 - (cur_page - 1) * o.boxWidth))
                    } else {
                        cur_page = next_page;
                    }

                });
            }
        }
    });


	/*绑定鞋款鼠标上划效果*/
	$('[node-name="shoesKind"]').each(function(){
		$(this).hoverMoveCover({ 
			orgTop:parseInt($(this).height()),
			orgLeft:0,
			toTop:0,
			toLeft:0,
			time:200
		}); 
	});
    /*绑定步骤条浮动效果*/
/*
	$('#customizingStep2').smartFloatBottom({
	    stopTop: $('[node-name="tabBox"]').position().top,
	    clientHeight: document.documentElement.clientHeight,
	    setStopStyle: function () {
	        var width = $('#customizingStep2').parent().width();
	        $('#customizingStep2').css({ 'position': 'absolute', 'bottom': '0px', 'width': width }) 
	        if ($.browser.msie && $.browser.version < 8) {
	            $('#customizingStep2').css({ 'left': 0 })
	        }
	    },
	    setFloatStyle: function (elem) {
	        var width = $('#customizingStep2').parent().width();
	        $('#customizingStep2').css({ 'position': 'fixed', 'bottom': '0px', 'width': width }) 
	        if ($.browser.msie && $.browser.version == 7) {
	            var left = $('.idx-mainview').position().left + 240;
	            $('#customizingStep2').css({ 'left': left })
	        }
	    },
	    resizeWidth: function () {
	        var width = $('#customizingStep2').parent().width();
	        $('#customizingStep2').css({ 'position': 'absolute', 'bottom': '0px' })
	    }
	});
*/
	/*开始定制-猜你喜欢*/
	$('[node-name="tabBox"]').tab({
		tabMenuSel:'[node-name="tabmenus"]',
		tabBtns:'span',
		tabContsSel:'[node-name="tabcontent"]',
		mSelectedClass:'selt' 
	}); 
	/*开始定制-创意作品*/
	/*$('#inspirationBox').photoScorll({
		prevBtnSel:'[actarget="prevScorll"]',
		nextBtnSel:'[actarget="nextScorll"]',
		moveNodeSel:'ul',
		isResize:true,
		timeout:600
	});*/
 
	
	 
 
	/*$('#floatTabmenus').smartFloatTop({
		stopTop:$('.idx-customcommodity-details').position().top, 
		setStopStyle:function(){
			var _elem = $('#floatTabmenus');
			var width = _elem.parent().width();
			_elem.css({'position':'absolute','top':'0px','width':width}) 
			if($.browser.msie && $.browser.version<8){ 
				_elem.css({'left':0})
			} 	
		},
		setFloatStyle:function(elem){ 
			var _elem = $('#floatTabmenus');
			var width = _elem.parent().width();
			_elem.css({'position':'fixed','top':'50px','width':width}) 
			if($.browser.msie && $.browser.version==7){
				var left = $('.idx-mainview').position().left+240; 
				_elem.css({'left':left})
			} 	
		}
	});*/
	
	$('[node-name="maleBtn"],[node-name="femaleBtn"]').hover(
		function(){$(this).addClass('hover')},
		function(){$(this).removeClass('hover')}
	);
	
	/*知识库模板-模特图轮显*/
	/*if($('#idxKnledgbseModlScolBox').size()>0){
		$('#idxKnledgbseModlScolBox').tmpShoeModlScorll({
			prevBtnSel:'.prev-btn',
			nextBtnSel:'.next-btn',
			moveNodeSel:'#idxKnledgbseModlScolNode',
			boxWidth:425,
			timeout:500,
			intervaltime:3000
		});
	}*/
})(jQuery)