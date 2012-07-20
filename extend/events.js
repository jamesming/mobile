core.setup_marquee=function(){
					
						$('.scrollDisplay').width(core.style[core.unit].scrollDisplay.width).css({'margin-left':core.style[core.unit].scrollDisplay.marginLeft})

						core.tweet_marquee = '';
						$.ajax({
							type: "GET",
							url: 'http://twitter.com/status/user_timeline/' +  core.twitter  + '.json?count=10&callback=?',
							dataType: "jsonp",
							success: function(data) {
								
								$.each(data, function(key, tweet) {
		
									tweet_marquee = core.tweet_marquee + ' ' + tweet.text + '     ';
									
							  });		
							  
								$('marquee').text(tweet_marquee)
								.linkify();
								
								if( core.unit == 4){  // FOR MINISITE
										$('marquee')
										.css({'font-size':'9px'})
										.parent().css({height:'10px'})
								};
								
								$('marquee').marquee('pointer').mouseover(function() {
									$(this).trigger('stop');
								}).mouseout(function() {
									$(this).trigger('start');
								});										
								
								
							}	
						});

					
};