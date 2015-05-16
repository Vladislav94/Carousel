(function($){
$.fn.carousel = function(options){
	var opts = $.extend({
		sliderName: 'slider',
		sliderInner: 'slider-inner',
		slideName: '.slide',
		pagination: true,
		pagName: 'pagination',
		pagItem: 'pagination-item',
		controlsWrap: 'controls',
		arrows: true,
		arrowNext: 'next',
		arrowPrev: 'prev',
		visible: 3,
		speed: 500,
		loop: true,
		autoPlay: true,
		autoDelay: 2000,
		autoWidth: true
}, options);
 this.each(function(){
	var $its = $(this),
		slidesSize = $its.find(opts.slideName).size(),
		sliderW = 0,
		slideI = opts.visible,
		visibleSize = $its.find(opts.slideName+'.visible').size(),
		thisIndex = 0
	$its.find(opts.slideName).wrapAll('<div class="'+opts.sliderInner+'">'+'</div>');
	var sliderNameW = $its.find('.'+opts.sliderName).width();
	$its.find(opts.slideName).each(function(){
		sliderW += $(this).outerWidth(true);
	});
	$its.find('.'+opts.sliderInner).width(sliderW);
	if (opts.arrows === true || opts.pagination === true) {
		$its.find('.'+opts.sliderName).after('<div class="'+opts.controlsWrap+'"></div>');
	}
	if (opts.pagination === true) {
		$its.find('.'+opts.controlsWrap).append('<ul class="'+opts.pagName+'"'+'></ul>');
		for(var pagI = 0;pagI <= slidesSize-opts.visible;pagI++) {
			$its.find('.'+opts.pagName).append('<li class="'+opts.pagItem+'"></li>');
		}
	}
	$its.find('.'+opts.pagItem).eq(0).addClass('active');
	if (opts.arrows === true) {
		$its.find('.'+opts.controlsWrap).prepend('<button class="arrow' + ' ' + opts.arrowPrev+'"'+"></button>");
		$its.find('.'+opts.controlsWrap).append('<button class="arrow' + ' ' + opts.arrowNext+'"'+"></button>");
	}
	for(var visibleI = 0;visibleI <= opts.visible-1; ++visibleI) {
		$its.find(opts.slideName).eq(visibleI).addClass('visible');
	};
	$its.find('.'+opts.arrowNext).on('click', function(){
		if ($its.find('.'+opts.arrowNext).hasClass('animate')) {
			return
		};
		$(this).addClass('animate');
		setTimeout(function(){
			$its.find('.'+opts.arrowNext).removeClass('animate');
		},opts.speed);
		if (opts.loop === true) {
			if ($its.find(opts.slideName).eq(slidesSize-1).hasClass('visible')) {
				 return loopNext($its);
			}
		}
		slideNext($its);
		autoWidth($its);
	});

	function changeNext(that) {
		slideI++
		var whileI = slideI;
		var sliderVal = slideI-opts.visible;
		that.find(opts.slideName).removeClass('visible');
		while(whileI-- > sliderVal) {
			that.find(opts.slideName).eq(whileI).addClass('visible');
		}
		return slideI
	}
	function slideNext(that) {
		if (that.find(opts.slideName).eq(slidesSize-1).hasClass('visible')) {
			return
		};
		var sliderPos = parseInt($its.find('.'+opts.sliderInner).css('left'));
		animWidth = that.find(opts.slideName+'.visible').eq(0).outerWidth(true);
		that.find('.'+opts.sliderInner).animate({
			'left': sliderPos-animWidth
		},opts.speed);
		changeNext($its);
		pagActive($its);
		ifLastSlide($its);
	}
	function loopNext(that) {
		that.find('.'+opts.sliderInner).animate({
			'left': 0
		},opts.speed);
		slideI = opts.visible-1;
		changeNext($its);
		pagActive($its);
		autoWidth($its);
	}

	$its.find('.'+opts.arrowPrev).on('click', function(){
		if ($its.find('.'+opts.arrowPrev).hasClass('animate')) {
			return
		};
		$(this).addClass('animate');
		setTimeout(function(){
			$its.find('.'+opts.arrowPrev).removeClass('animate');
		},opts.speed);
		if (opts.loop === true) {
			if ($its.find(opts.slideName).eq(0).hasClass('visible')) {
				 return loopPrev($its);
			}
		}
		slidePrev($its);
		autoWidth($its);
	});
	function slidePrev(that) {
		if (that.find(opts.slideName).eq(0).hasClass('visible')) {
			return
		};
		var sliderPos = parseInt($its.find('.'+opts.sliderInner).css('left'));
		if (opts.autoWidth === false) {
			animWidth = that.find(opts.slideName+'.visible').eq(opts.visible-1).outerWidth(true);
			that.find('.'+opts.sliderInner).animate({
				'left': sliderPos+animWidth
			},opts.speed);
		}else if (opts.autoWidth === true) {
			animWidth = that.find(opts.slideName+'.visible').eq(0).prev().outerWidth(true);
			that.find('.'+opts.sliderInner).animate({
				'left': sliderPos+animWidth
			},opts.speed);
		};
		changePrev($its);
		pagActive($its);
		ifFirstSlide($its);
	}
	function changePrev(that) {
		slideI--
		var whileI = slideI;
		var sliderVal = slideI-opts.visible;
		that.find(opts.slideName).removeClass('visible');
		while(whileI-- > sliderVal) {
			that.find(opts.slideName).eq(whileI).addClass('visible');
		}
		return slideI
	}
	function loopPrev(that) {
		slideI = slidesSize+1;
		changePrev($its);
		pagActive($its);
		var loopVisibleW = 0;
		that.find(opts.slideName+'.visible').each(function(){
			loopVisibleW += $(this).outerWidth(true);
		});
		if (opts.autoWidth === true) {
			that.find('.'+opts.sliderInner).animate({
				'left': -sliderW+loopVisibleW
			},opts.speed);
		} else if (opts.autoWidth === false) {
			that.find('.'+opts.sliderInner).animate({
				'left': -sliderW+loopVisibleW+sliderNameW-loopVisibleW
			},opts.speed);

		};

		autoWidth($its);
	}
	$its.find('.'+opts.pagItem).on('click', function(){
		thisIndex = $(this).index();
		slideI = thisIndex+opts.visible+1
		changePrev($its);
		pagActive($its)
		pagAnimate($its,slideI);
		autoWidth($its);
		ifLastSlide($its);
		ifFirstSlide($its);
	});
	function pagActive(that) {
		that.find('.'+opts.pagItem).eq(slideI-opts.visible).addClass('active').siblings().removeClass('active');
	}
	function pagAnimate(that,active) {
		var posLeftPag = 0;
		var pagI = 0;
		while(pagI++ < active-opts.visible) {
			posLeftPag += that.find(opts.slideName).eq(pagI-1).outerWidth(true);
		}
		that.find('.'+opts.sliderInner).animate({
				'left': -posLeftPag
			},opts.speed);
	}
	autoWidth($its);
	function autoWidth(that) {
		if (opts.autoWidth === true) {
			var visibleW = 0;
			that.find(opts.slideName+'.visible').each(function(){
				visibleW += $(this).outerWidth(true);
			});
			that.find('.'+opts.sliderName).animate({
				'width': visibleW
			},opts.speed);
		}
	}
	function ifLastSlide(that) {
		if(opts.autoWidth === false) {
			if (that.find(opts.slideName).eq(slidesSize-1).hasClass('visible')) {
				that.find('.'+opts.sliderInner).animate({
					'left': -sliderW+sliderNameW
				},opts.speed/2);
			};
		};
	};
	function ifFirstSlide(that) {
		if(opts.autoWidth === false) {
			if (that.find(opts.slideName).eq(0).hasClass('visible')) {
				that.find('.'+opts.sliderInner).animate({
					'left': 0
				},opts.speed/2);
			};
		};
	}
	if (opts.autoPlay === true) {
		var autoInterval = setInterval(function(){
			if (opts.autoPlay === false) {
				return
			} else {
				if ($its.find(opts.slideName).eq(slidesSize-1).hasClass('visible')) {
					 return loopNext($its);
				}
				slideNext($its);
				autoWidth($its);
			}
		},opts.speed+opts.autoDelay);
		$its.mouseover(function(){
			opts.autoPlay = false;
		});
		$its.mouseleave(function(){
		  opts.autoPlay = true;
		});
	}
});
};
})(jQuery);






