(function($){

	 $.fn.mySlider = function(options){
	 	var opts = $.extend({
	 		sliderName: '.slider',
	 		slides: '.slides',
	       	slideName: '.slide',
	       	prevItem: 'prev-item',
	       	time: 1000,
	       	activeItem: 'active',
	       	next: '.btn-next',
	       	prev: '.btn-prev',
	       	autoDelay: 3000,
	       	auto: true,
	       	pagination: '.pagination',
	       	paginationItem: 'li',
	       	carousel: true,
	       	effect: 'slide'
		}, options);
	 	var i = 1;
		var slidesSize = $(opts.sliderName + ' ' + opts.slideName).size();
		var slideWidth = $(opts.sliderName + ' ' + opts.slideName).width();
		$(opts.sliderName + ' ' + opts.slides).width(slideWidth * slidesSize);

		function prevItem() {
			$(opts.sliderName + ' ' + opts.slideName).eq(i-1).addClass(opts.prevItem).siblings().removeClass(opts.prevItem);
		};

		/* Amimate slide */
			function slideAnimation() {
				if (opts.effect == 'slide') {
					$(opts.sliderName + ' ' + opts.slides).animate({'left' : -slideWidth * (i-1)}, opts.time);	
				};
				if (opts.effect == 'fade') {
					$(opts.sliderName + ' ' + opts.slideName).css({
						'position' : 'absolute',
						'left' : '0',
						'top' : '0'
					});
					$(opts.sliderName + ' ' + opts.slideName).fadeOut(opts.time);
					$(opts.sliderName + ' ' + opts.slideName).eq(i-1).fadeIn(opts.time)				
				}
			}
			if (opts.effect == 'fade') {
				$(opts.sliderName + ' ' + opts.slideName).css({
					'position' : 'absolute',
					'left' : '0',
					'top' : '0'
				});
				$(opts.sliderName + ' ' + opts.slideName).hide();
				$(opts.sliderName + ' ' + opts.slideName).eq(i-1).show()		
			}
		/* Amimate slide end */

		/* Pagination */
		$(opts.sliderName + ' ' + opts.paginationItem).click(function(){
			if ($(this).hasClass(opts.activeItem)) {
				return
			}
			prevItem()
			var currentSlide = $(this).index();
			i = currentSlide+1;
			pagination();
			var activeWidth = $(opts.sliderName + ' ' + opts.slideName).eq(i-1).width();
			console.log(activeWidth);
		});
		function pagination(){
			$(opts.sliderName + ' ' + opts.slideName).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			$(opts.sliderName + ' ' + opts.paginationItem).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			slideAnimation();	
		}
	/* Pagination end */

	/* Prev */
		$(opts.sliderName + ' ' + opts.prev).css('z-index' , '2');
		$(opts.sliderName + ' ' + opts.prev).click(function(e){
			prevItem()
			prevCarousel();
			prev();
			e.preventDefault();
			console.log(i)
		});
		function prev(){
			if (i <= 1) {
				return
			}
			--i
			$(opts.sliderName + ' ' + opts.slideName).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			$(opts.sliderName + ' ' + opts.paginationItem).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			slideAnimation();
		}
	/* Prev end */

	/* Next */
		$(opts.sliderName + ' ' + opts.next).css('z-index' , '2');
		$(opts.sliderName + ' ' + opts.next).click(function(e){
			prevItem()
			nextCarousel();
			next();
			e.preventDefault();
			console.log(i)
		});
		function next(){
			if (i >= slidesSize) {
				return	
			}
			i++
			$(opts.sliderName + ' ' + opts.paginationItem).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			$(opts.sliderName + ' ' + opts.slideName).eq(i-1).addClass(opts.activeItem).siblings().removeClass(opts.activeItem);
			slideAnimation();
		}
	/* Next end */

	/* Carousel */
		function prevCarousel() {
			if (opts.carousel == true) {
				if (i <= 1) {
					i = slidesSize+1;
					prevAnimate();
					clearCarousel();
				}
			}
		}
		function prevAnimate() {
			if (opts.effect == 'slide') {
				$(opts.sliderName + ' ' + opts.slides).css('position' , 'static');
				$(opts.sliderName + ' ' + opts.slideName + ':first').css('z-index' , '1').animate({'left' : slideWidth}, opts.time);
				$(opts.sliderName + ' ' + opts.slideName + ':last').css({
					'position': 'absolute',
					'left' : -slideWidth,
					'z-index' : '1',
					'top' : '0'
				}).animate({'left' : '0'}, opts.time);
			}
		}
		function nextCarousel() {
			if (opts.carousel == true) {
				if (i >= slidesSize) {
					i = 0;
					nextAnimate();
					clearCarousel();
				}
			}
		}
		function nextAnimate() {
			if (opts.effect == 'slide') {
				$(opts.sliderName + ' ' + opts.slides).css('position' , 'static');
				$(opts.sliderName + ' ' + opts.slideName + ':last').css({
					'top' : '0',
					'left' : '0',
					'position' : 'absolute',
					'z-index' : '1'
				}).animate({'left' : -slideWidth}, opts.time);
				$(opts.sliderName + ' ' + opts.slideName + ':first').css({
					'position': 'absolute',
					'left' : slideWidth,
					'top' : '0',
					'z-index' : '1'
				}).animate({'left' : '0'}, opts.time);
			}
		}
		function clearCarousel() {
			setTimeout(function(){
				$(opts.sliderName + ' ' + opts.slides).css('position' , 'relative');
				$(opts.sliderName + ' ' + opts.slideName + ':first').css({
					'left' : '0',
					'position' : 'relative'
				});
				$(opts.sliderName + ' ' + opts.slideName + ':last').css({
					'position' : 'relative',
					'left' : '0'
				});
			}, opts.time+100);
		}
	/* Carousel end */
	/* Auto Play */
		if (opts.auto == true) {
			autoplay()
			function autoplay(){
				autoPlay = setInterval(function(){
					if (i >= slidesSize) {
						i = 0
						if (opts.carousel == true) {
							if (opts.effect == 'slide') {
								nextAnimate();
								clearCarousel();
							}
						}
					}
					next();
				}, opts.autoDelay)
				$(opts.sliderName + ' ' + opts.slideName + ' , ' + opts.sliderName + ' ' + opts.prev + ' , ' + opts.sliderName + ' ' + opts.next + ' , ' + opts.sliderName + ' ' + opts.paginationItem).mouseover(function(){
					clearInterval(autoPlay)
				});
			};
			$(opts.sliderName + ' ' + opts.slideName + ' , ' + opts.prev + ' , ' + opts.sliderName + ' ' + opts.next + ' , ' + opts.sliderName + ' ' + opts.paginationItem).mouseleave(function(){
				autoplay()
			});
		};
	/* Auto Play */
	};
})(jQuery);