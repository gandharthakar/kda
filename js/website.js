
$(window).on('load', function(){
	$('.prloader-cont').fadeOut();
});

$(document).ready(function(){

	// Mobile Menu Toggle
	$('.mobi-toggle-menu').on('click', function(){
		var target = $('.site-nav');
		$(this).toggleClass('active');
		if($(this).hasClass('active')) {
			target.addClass('active');
		} else {
			target.removeClass('active');
		}
	});

	// Homepage Slider Init
	var mySwiper = new Swiper ('.hmpg-slider', {
		// Optional parameters
		//direction: 'horizontal',
		// centeredSlides: true,
		// grabCursor: true,
		loop: false,
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},
		// Navigation arrows
		navigation: {
			nextEl: '.sc-next',
			prevEl: '.sc-prev',
		},
		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		}
	});

	// Common Scroll To Div Function
	$('.scroll-to-div').on('click', function(e){
		var target = $(this).attr('scroll-target');
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $(target).offset().top
		}, 'slow');
	});

	lightboxInit();
	lightboxInitVideo();

	$('.js-gltabs li a').on('click', function(){
		var panel = $(this).attr('show-panel');
		$('.js-gltabs li').removeClass('active');
		$('.gl-panel').fadeOut();
		$(this).parent().addClass('active');
		$(panel).fadeIn();
	});

}); // End of domReady Function

	// Set Lightbox Init To Photos
	function lightboxInit() {
		$('.glimglightbox').magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Loading image #%curr%...',
			mainClass: 'mfp-img-mobile',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
			// image: {
			// 	tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			// 	titleSrc: function(item) {
			// 		return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			// 	}
			// }
		});		
	}

	function lightboxInitVideo() {
		$('.glvidlightbox').magnificPopup({
			delegate: 'a',
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false,
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1] // Will preload 0 - before current, and 1 after the current image
			},
		});
	}

	// Get Gellery Photos
 	$.ajax({
 		url: "api/photo-api.json",
 		method: "GET",
 		success: function(result){
            $.each($(result.photo_gallery), function(idx, data){
            	var aptarget = $("#demoph");
            	var templ = '<div class="col-lg-4 col-sm-6 glimglightbox">\
								<div class="glgd-pad">\
									<div class="glimgbox" style="background-image: url('+ data.img_path +'); background-size: cover;">\
										<a href="'+ data.img_path +'" class="glimgbox-ctaoly" title="See Image"><img src="'+ data.img_path +'" class="hide" alt="kda - photos" /></a>\
										<div class="tophalf-o"></div>\
										<div class="bottomhalf-o"></div>\
										<div class="dashline-h-tr"></div>\
										<div class="dashline-v-tr"></div>\
										<div class="glimgbtl">\
											<div class="txtinr">\
												<div class="cattl">Category: </div>\
												<div class="catmtxt">'+ data.img_category +'</div>\
											</div>\
										</div>\
									</div>\
								</div>\
							</div>';
				aptarget.append(templ);
				lightboxInit();
            });
        }
    });

	// Get Gellery Videos
 	$.ajax({
 		url: "api/video-api.json",
 		method: "GET",
 		success: function(result){
            $.each($(result.video_gallery), function(idx, data){
            	var aptarget = $("#demovid");
            	var templ = '<div class="col-lg-4 col-sm-6 glvidlightbox">\
								<div class="glgd-pad">\
									<div class="glimgbox" style="background-image: url('+ data.video_img_thumb +'); background-size: cover;">\
										<a href="'+ data.video_path +'" class="glimgbox-ctaoly" title="Play Video"></a>\
										<div class="tophalf-o"></div>\
										<div class="bottomhalf-o"></div>\
										<div class="dashline-h-tr"></div>\
										<div class="dashline-v-tr"></div>\
										<div class="dashline-h-bl"></div>\
										<div class="dashline-v-bl"></div>\
										<div class="glplaybtn-o text-center">\
											<a href="'+ data.video_path +'" class="simple-link" title="Play Video">\
												<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" xml:space="preserve" class="glplaybtn">\
													<g>\
														<path class="fill" d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>\
														<path class="fill" d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>\
													</g>\
												</svg>\
											</a>\
										</div>\
									</div>\
								</div>\
							</div>';
				aptarget.append(templ);
				lightboxInitVideo();
            });
        }
    });