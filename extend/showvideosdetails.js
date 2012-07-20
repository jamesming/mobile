(function(){

  var newDiv = document.createElement('div')  
	,content = "\
		<div   style='padding-top:15px'  >\
						<div   class='shareVideoOverlayRow '  style='top:8%'  ><b><big>SHARE THIS VIDEO</big></b>\
						</div>\
						<div   class='shareVideoOverlayRow '   style='top:26%' >\
							<span  class='tinyItalic ot' >Currently playing:</span><b  id='currently_playing'  class='tt ellipsis' ></b>\
						</div>\
						<div    class='shareVideoOverlayRow ' class='shareVideoOverlay_main '    style='top:45%' >\
							<div  class='oh '      >\
								<div  class='tt tinyItalic'   style='text-align:right' >Post video to Twitter\
								</div>\
								<div  class='ot ' >\
									<a id='tweet_video_link' target='_blank' >\
										<img  id='shareVideoOnTwitter'  src='/mobile/images/twitter.png' />\
									</a>\
								</div>\
							</div>\
							<div class='oh '  >\
								<div  class='ot ' >\
									<a id='facebook_video_link' target='_blank' >\
										<img   id='shareVideoOnFacebook'    src='/mobile/images/facebookBtn.png' />\
									</a>\
								</div>\
								<div  class='tt tinyItalic'  style='text-align:left'>Post Video to Facebook\
								</div>\
							</div>\
						</div>\
						<div  class='shareVideoOverlayRow '    style='top:70%' >\
							<div  >\
								<img  id='cancel_video_share'  src='/mobile/images/cancel.png?v=2' />\
							</div>\
						</div>\
		</div>\
	<style>\
.shareVideoOverlay{\
		position: fixed;\
		width: 100%;\
		top: " + core.style[core.unit].shareVideoOverlay.top +  ";\
		left: 0px;\
		bottom:0px;\
		z-index: 4;\
		background-color: rgba(0, 0, 0, .5);\
		display:none;\
	}\
			.shareVideoOverlay div{\
					color:white;\
					text-align:center;\
				}	\
				\
			.shareVideoOverlay .shareVideoOverlayRow{\
					position:absolute;\
					left:0px;\
					right:0px;\
				}				\
								.shareVideoOverlay .shareVideoOverlay_main .oh{\
									margin-top:4px;\
								}\
								\
				\
			.shareVideoOverlay .tinyItalic{\
			 font-size:11px;\
			 font-style:italic;\
			}\
\
			.shareVideoOverlay textarea{\
					width:80%;	\
			}\
	</style>\
	";
	newDiv.className +=  'shareVideoOverlay';
	newDiv.innerHTML = content;
	document.body.insertBefore(newDiv, document.body.firstChild);



	if( !core.events['.share_video']){
			core.events['.share_video'] = true;
			$('.share_video').live('click', function(event) {
				
					$('.shareVideoOverlay').toggle();
					
					core.trackPixel_records({
						 'type'				:'action'
						,'controller_to_use'		: 'videos'
						,'foreign_key'		: core.youtube_video_obj[core.youtube_id_selected].videoId
					});	
					
			});	
	};



core.showvideosdetails = function(){
		
					switch(core.unit){
						case "1": { // Mobile
							
										$('#iframe_video').height(core.style[core.unit].height - 196);
						
						}; break;
						case "2":  {// Web Player
							
										$('#iframe_video').height(210);		
									
						}; break; 
						case "3":  {// Interactive Ad Unit
							
										$('#iframe_video').remove();
										$('#video_container').append("<iframe frameBorder='0' allowfullscreen style='height:130px' ></iframe>");	
										$('iframe').attr({
										  id: 'iframe_video',
										  src: 'http://www.youtube.com/embed/' +  core.youtube_id_selected  + '?controls=0&showinfo=0&autoplay=1'
										});
										
								
										$('#shareVideoOnTwitter').attr('src', '/mobile/images/twitter_small.png');
										$('#shareVideoOnFacebook').attr('src', '/mobile/images/facebook_small.png?v4');
										
						}; break;
						default:  {
							
										$('#iframe_video').height(core.style[core.unit].height - 196);							
						
						}; break;
					};
		
					$('#iframe_video').attr('src', 'http://www.youtube.com/embed/' +  core.youtube_id_selected  + '?wmode=transparent&rel=0&controls=0&showinfo=0&autoplay='+core.video_autoplay);
					
					// http://stackoverflow.com/questions/4146832/getting-youtube-embed-video-code-from-a-youtube-link
					
					$('#currently_playing').text(core.youtube_video_obj[core.youtube_id_selected].title);
					
					
					core.googleAnalytics({
						 'type'				:'pageviews'
						,'section'		:'VIDEOS_VIEWING'
						,'unique_desc': core.youtube_video_obj[core.youtube_id_selected].title  + '_YOUTUBEID:'  + core.youtube_id_selected
					});
					
					
					
					$('#tweet_video_link').attr('href','http://twitter.com/home?status=' +  core.youtube_video_obj[core.youtube_id_selected].title +' - http://www.youtube.com/embed/' +  core.youtube_id_selected)
						.click(function(event) {
								core.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'TWEET_YOUTUBE_' + core.youtube_video_obj[core.youtube_id_selected].title  + '_YOUTUBEID:'  + core.youtube_id_selected
								});
						});	
					
					
					$('#facebook_video_link').attr('href','https://www.facebook.com/sharer/sharer.php?u=http://www.youtube.com/embed/' +  core.youtube_id_selected)
						.click(function(event) {
								core.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'FACEBOOKSHARE_YOUTUBE_' + core.youtube_video_obj[youtube_id_selected].title  + '_YOUTUBEID:'  + core.youtube_id_selected
								});
						});	

					
					$('#cancel_video_share').click(function(event) {
							$('.shareVideoOverlay').hide();
					}).css({cursor:'pointer'});	
					
					$('#grab_video_share').click(function(event) {
							alert('');
					}).css({cursor:'pointer'});						
					
					
		}
	  
})();


