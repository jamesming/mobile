core.displayUstream=function(){
	
						core.closeShareThis();
	
						if ($('.ustreamOverlay').css('display') == 'none') { 
							
							
							core.gaq({
								'type':'view'
								,'path':'livestream'
							});
							

							if( typeof(core.trackingPixel) !== "undefined"){
									core.trackPixel_sections({
										 'type'				:'view'
										,'controller_to_use'		:'livestream'
									});
							};								
							
							
							
							if( $('#iframe_video').is(':visible') ){
									if( $('#iframe_video').attr('src') != '') this.youtubeVideoSrc = $('#iframe_video').attr('src');
									$('#iframe_video').attr('src', '');
							};							
							
							$('.ustreamOverlay').fadeIn(300); 
							$('#ustreamBtn').attr('src', '/mobile/images/livestream_close.gif');
							
							var ustream = '\
							<iframe  id="ustream_iframe"  src="http://www.ustream.tv/embed/' + core.channelid  + '" \
							width="' + core.style[core.unit].width + '" height="' + (core.style[core.unit].height - 92)  + '" scrolling="no" frameborder="0" \
							style="border: 0px none transparent;"></iframe><br />\
							';


							$('.ustreamOverlay').html(ustream);		
							
							
							if( core.unit == 3 ){
								$('.ustreamOverlay').children('iframe').height(190);
							};							
						}
						else { 
							this.close_ustream()	
						}
						return;
		
};


core.close_ustream=function(){
			
				if( $('#iframe_video').is(':visible') ){
						$('#iframe_video').attr('src', this.youtubeVideoSrc);
				};
				
				if ($('.ustreamOverlay').css('display') == 'block') {
					$('.ustreamOverlay').fadeOut(300);
					$('#ustreamBtn').attr('src', '/mobile/images/livestream_open.gif');
					$('.ustreamOverlay').html('');	
					core.gaq({
					 'type':'event'
					,'path':'ActionLivestreamClose'
					});								
				};
}

//core.loadScript('shareoverlay', '/mobile/extend/' + 'shareoverlay.js', function(){});
//core.processCallbackQueue();