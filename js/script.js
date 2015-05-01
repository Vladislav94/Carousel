$(document).ready(function(){
	rangeSlider()
	$(window).resize(function(){
		rangeSlider();
	})
	function rangeSlider() {
		$('.slider-wrap .slider-inner').each(function(){
			var thisSlideW = $(this).find('.slide').outerWidth(true);
			var thisSlideSize = $(this).find('.slide').size();
			$(this).width(thisSlideW*thisSlideSize);
		});
		$('.range-slider').click(function(e){
			var rangeW = $(this).width();
			var slideW = $(this).parents('.slider-wrap').find('.slider').width();
			var offsetRengeX = $(this).offset().left
			var sliderW = $(this).parents('.slider-wrap').find('.slider-inner').width()-slideW;
			var cursorPos = e.pageX - offsetRengeX;
			var cursorProc = cursorPos*100;
			var posProc = cursorProc/rangeW;
			var sliderProc = sliderW/100;
			if (cursorPos > rangeW || cursorPos < 0) {
				return
			};
			$(this).find('.range-drag').animate({'left' : cursorPos}, 300);
			$(this).find('.range-track').animate({'width' : cursorPos}, 300);
			$(this).parents('.slider-wrap').find('.slider-inner').animate({
				'left' : -sliderProc*posProc
			}, 300);
		});

		$('.range-drag').mousedown(function(){
			$(this).parents('.slider-wrap').addClass('mouse-down');
			var rangeW = $(this).parent().width();
			var slideW = $(this).parents('.slider-wrap').find('.slider').width();
			console.log(slideW);
			var offsetRengeX = $(this).parent().offset().left
			var sliderW = $(this).parents('.slider-wrap').find('.slider-inner').width()-slideW;
			$(document).mousemove(function(e){
				var cursorPos = e.pageX - offsetRengeX;
				var cursorProc = cursorPos*100;
				var posProc = cursorProc/rangeW;
				var sliderProc = sliderW/100;
				if ( cursorPos > rangeW || cursorPos < 0) {
					return
				};
				$('.mouse-down').find('.range-drag').css({'left' : cursorPos}, 300);
				$('.mouse-down').find('.range-track').css({'width' : cursorPos}, 300);
				$('.mouse-down').find('.slider-inner').css({
					'left' : -sliderProc*posProc
				}, 300);
			});
			return false
		});
		$(document).mouseup(function(){
			$('.slider-wrap').removeClass('mouse-down');
		});
	}
});