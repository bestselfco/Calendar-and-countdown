	$(function(){
		$('#slides').slides({
			preload: true,
			preloadImage: 'img/loading.gif',
			play: 5000,
			pause: 2500,
			hoverPause: true,
			animationStart: function(current){
				$('.caption').animate({
					bottom:-210
				},100);
			},
			animationComplete: function(current){
				$('.caption').animate({
					bottom:0
				},200);
			},
			slidesLoaded: function() {
				$('.caption').animate({
					bottom:0
				},200);
			}
		});
	});