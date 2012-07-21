(function(){	
	var newDiv = document.createElement('div')
	,content = "\
	<div id='socialWrapper' 	>\
	<table>\
		<tr>\
			<td  class='first-row '  colspan=2>\
				<textarea id='embedWrapper'></textarea>\
			</td>\
		</tr>\
		<tr  class='second-row ' >\
			<td  class='facebook_td ' align=center>\
				<div id='facebookShareBtn'> &nbsp; </div>\
			</td>\
			<td   class='twitter_td ' align=center>\
				<div id='twitterShareBtn'> &nbsp; </div>\
			</td>\
		</tr>\
	</table>\
	</div>\
	<style>\
	.sharethisOverlay{\
		position: fixed;\
		width: 100%;\
		left: 0px;\
		bottom: 0px;\
		z-index: 999;\
		display: none;\
		background: #3F3F3F;\
		visibility: visible;\
	}\
				#socialWrapper{\
					position: absolute; \
					top: 10px; \
					left: 10px;\
					right:20px;\
					bottom:60px;\
				}	\
								#socialWrapper table{\
									width:100%;	\
								}		\
											#socialWrapper table td.first-row{\
												height:105px;	\
												padding:10px 20px 10px 10px;	\
											}		\
											\
															#embedWrapper{\
																border: 1px solid #CCC;\
																padding: 10px;\
																background: #000;\
																color: #FFF;\
																overflow-y: auto;\
																overflow-x: hidden;\
																cursor: pointer;\
																border-radius: 4px;\
																-webkit-border-radius: 4px;\
																-moz-border-radius: 4px;\
																width: 100%;\
																height: 100%;\
																font-size: 11px;\
															}\
													\
													\
															#facebookShareBtn{\
																border-radius: 3px;\
																-webkit-border-radius: 3px;\
																-moz-border-radius: 3px;\
																background: url('/mobile/images/shareOnFacebook.png'); \
																height: 27px;\
																width:140px;\
																cursor: pointer;\
															}\
													\
															#twitterShareBtn{\
																border-radius: 3px;\
																-webkit-border-radius: 3px;\
																-moz-border-radius: 3px;\
																background: url('/mobile/images/shareOnTwitter.png'); \
																height: 27px;\
																width:123px;\
																cursor: pointer;\
															}	\
	</style>\
	";
		
	newDiv.className +=  'sharethisOverlay';
	newDiv.innerHTML = content;
	document.body.insertBefore(newDiv, document.body.firstChild);
	
	core.close_ustream = function(){
			
				if( $('#iframe_video').is(':visible') ){
						$('#iframe_video').attr('src', this.youtubeVideoSrc);
				};
			
				$('.ustreamOverlay').fadeOut(300);
				$('#ustreamBtn').attr('src', '/mobile/images/livestream_open.gif');
				$('.ustreamOverlay').html('');			
	};


	core.url2ShareBecomes=function(){
				switch(core.unit){
					case "1": size ='320x480'; break; // Mobile
					case "2": size ='400x350'; break; // Web Player
					case "3": size ='300x250'; break; // Interactive Ad Unit
					case "4": size ='600x500'; break; // Mini-Website
					default: size ='320x480'; break;
				};						
				
				if( core.unit  == 1){ 
					core.urlToShare = window.location.hostname + "/user/" + core.userId + "/deploy/embed/400x350.html";
				}else{
					core.urlToShare = window.location.hostname + "/user/" + core.userId + "/deploy/embed/" +  size  + ".html";
				};
	};
	
	core.create_embed_code_for_sharing=function(){
		
						var size;
										
						switch(core.unit){
							case "1": size ='320x480'; break; // Mobile
							case "2": size ='400x350'; break; // Web Player
							case "3": size ='300x250'; break; // Interactive Ad Unit
							case "4": size ='600x500'; break; // Mini-Website
						};
		
						if( core.unit  == 1){
							var embed_code = '<script type="text/javascript" language="Javascript" src="http://' + window.location.hostname + '/user/' +  core.userId  + '/deploy/embed/400x350.js"></script>';
						}else{
							var embed_code = '<script type="text/javascript" language="Javascript" src="http://' + window.location.hostname + '/user/' +  core.userId  + '/deploy/embed/' + size + '.js"></script>';
						};
		
		
						$('#embedWrapper').val(embed_code);
						
						
						
						$("#embedWrapper").click(function(){
							$("#embedWrapper").select();
						});		
						
						
						
						
						$('#facebookShareBtn').click(function(){
							
								core.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'SHAREDIALOGUE_FACEBOOK'
								});
								
							//	var link = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent('http://'+core.urlToShare);
								var link = 'http://www.facebook.com/sharer.php?u=' + encodeURIComponent('http://'+core.urlToShare+'?cache='+Math.floor(Math.random()*9999));

								window.open(link);

						});
						
						$('#twitterShareBtn').click(function(){
							
								core.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'SHAREDIALOGUE_TWITTER'
								});
								
								
								var link = 'http://twitter.com/intent/tweet?text=' + encodeURIComponent(core.twitter_sharetext+' http://'+core.urlToShare); 
								
								window.open(link); 
							
						});						
						
	};
	
	core.displayShareThis = function(){
				this.close_ustream();
				
				if ($('.sharethisOverlay').css('display') == 'none') {
					
					core.gaq({
					'type':'view'
					,'path':'share'
					});
					
					if( typeof(core.trackingPixel) !== "undefined"){
						core.trackPixel_sections({
							 'type'				:'action'
							,'controller_to_use'		:'home'
						});
					};	
					
					if( $('#iframe_video').is(':visible') ){
							if( $('#iframe_video').attr('src') != '') this.youtubeVideoSrc = $('#iframe_video').attr('src');
							$('#iframe_video').attr('src', '');
					};	
					
					$('.sharethisOverlay').fadeIn(300); 
					$('#share_button').attr('src', '/mobile/images/' + this.shareBtn.close[this.hasUstream] + '.gif');					

				}
				else{
					
					if( $('#iframe_video').is(':visible') ){
							$('#iframe_video').attr('src', this.youtubeVideoSrc);
					};
					 
					$('.sharethisOverlay').fadeOut(300);
					$('#share_button').attr('src', '/mobile/images/' + this.shareBtn.open[this.hasUstream] + '.gif');

				}
				return;		
		}
		
		
		
core.url2ShareBecomes();
core.create_embed_code_for_sharing();		
		

})();

