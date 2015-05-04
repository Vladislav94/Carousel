(function($){
	$.fn.rangePlugin = function(options){
	 	var opts = $.extend({
	 		sliderName: '.slider',
	 		sliderInner: '.slider-inner',
	 		slideName: '.slide',
	 		rangeWrap: '.range-slider',
	 		rangeTrack: '.range-track',
	 		rangeDrag: '.range-drag'
		}, options);
		$(opts.sliderInner).each(function(){
			var thisSlideW = $(this).find(opts.slideName).outerWidth(true);
			var thisSlideSize = $(this).find(opts.slideName).size();
			$(this).width(thisSlideW*thisSlideSize);
			console.log(thisSlideW)
		});
		$(opts.rangeWrap).click(function(e){
			var rangeW = $(this).width();
			var sliderW = $(this).prev().width();
			var offsetRangeX = $(this).offset().left
			var slideInnerW = $(this).prev().find(opts.sliderInner).width()-sliderW;
			var cursorPos = e.pageX - offsetRangeX;
			var cursorProc = cursorPos*100;
			var posProc = cursorProc/rangeW;
			var sliderProc = slideInnerW/100;
			if (cursorPos > rangeW || cursorPos < 0) {
				return
			};
			$(this).find(opts.rangeDrag).animate({'left' : cursorPos}, 300);
			$(this).find(opts.rangeTrack).animate({'width' : cursorPos}, 300);
			$(this).prev().find(opts.sliderInner).animate({
				'left' : -sliderProc*posProc
			}, 300);
		});
		$(this).find(opts.rangeWrap).mousedown(function(){
			$(this).prev().addClass('mouse-down');
			var rangeW = $(this).width();
			var sliderW = $(this).prev().width();
			var offsetRangeX = $(this).offset().left
			var slideInnerW = $(this).prev().find(opts.sliderInner).width()-sliderW;
			var sliderProc = slideInnerW/100;
			$('.mouse-down').parent().mousemove(function(e){
				var cursorPos = e.pageX - offsetRangeX;
				var cursorProc = cursorPos*100;
				var posProc = cursorProc/rangeW;
				if ( cursorPos > rangeW || cursorPos < 0) {
					return
				};
				$('.mouse-down').next().find(opts.rangeDrag).css({'left' : cursorPos}, 300);
				$('.mouse-down').next().find(opts.rangeTrack).css({'width' : cursorPos}, 300);
				$('.mouse-down').find(opts.sliderInner).css({
					'left' : -sliderProc*posProc
				}, 300);
			});
			return false
		});
		$(document).mouseup(function(){
			$(opts.sliderName).removeClass('mouse-down');
		});
	};
})(jQuery);





