(function(){
				  var newDiv = document.createElement('div')  
					,content = "\
					<div class='elementsWrapper' >\
						<div style='float: right; margin-top: 5px; margin-right: 5px;'>\
							<a onclick=core.toggleShowElements()   style='outline:none'  >\
								<img src='/mobile/images/close.png'  style='border:0;outline:none' />\
							</a>\
						</div>\
						<div class='elementsInnerWrapper'  ><div class='addClearBoth'></div>\
						</div>\
					</div>";
					newDiv.className +=  'elementsOverlay';
					newDiv.innerHTML = content;
					document.body.insertBefore(newDiv, document.body.firstChild);		

			core.navOverlay = function(){
				
					var  navArraySize = core.navIcons.length - 1
					    ,icons = '';
					   
					for(var i = 0; i <= navArraySize; i++){						
									
										var  tab_name
												,icon_image;
										
										if( core.navIcons[i] != 'custom'){
											tab_name = core.navIcons[i];
											if ( core.navIcons[i] == 'bio') tab_name =  'about';
											icon_image = '/mobile/images/icons/'+ core.navIcons[i];
										}else{
											tab_name = core.custom_tab_title;
											icon_image = '/user/' + core.userId + '/deploy/userassets/tab_icon';
										};
										
										var overlayNavItem_div = '\
												<div class="overlayNavItem"  >\
													<a targetIs="panel-2" class="navLink naviconlink_overlay"   onclick=core.toggleShowElements() controller="' + tab_name + '">\
														<img class="navImg" src="' + icon_image + '.png" />\
													</a>\
													<div class="navItemHolder " style="font-size: 11px; ; margin-top: 4px;">\
														<a targetIs="panel-2" class="navLink"   onclick=core.toggleShowElements()  controller="' + core.navIcons[i] + '">\
															' + tab_name + '\
														</a>\
													</div>\
												</div>\
										';
										
										icons +=  overlayNavItem_div;
										
					};
					
								
					$('.elementsInnerWrapper').append(icons);		
			};
			
			core.navOverlay();
			
			if( !core.events['.navLink']){
					core.events['.navLink'] = true;
					
					var ga_src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
					core.loadScript('google_analytics_source', ga_src, function(){
					  _gaq.push(['_setAccount', core.gid]);
					  _gaq.push(['_trackPageview']);						
					});	
					core.loadScript('googleAnalytics_core', '/mobile/extend/googleAnalytics.js', function(){})	
					core.loadScript('dateformat', '/mobile/scripts/dateformat.js', function(){})
					core.loadScript('jscrollpane', '/mobile/scripts/jquery.jscrollpane.2.0.js', function(){});
					core.loadScript('linkify', '/mobile/scripts/jquery.linkify.js', function(){});
					core.loadScript('marquee', '/mobile/scripts/jquery.marquee.js', function(){});
					core.loadScript('scrollTo', '/mobile/scripts/jquery.scrollTo-min.js', function(){});		
					core.loadScript('events', '/mobile/extend/events.js', function(){
							core.setup_marquee();	
					});
					
					core.loadScript('scrolltoNLoad', '/mobile/extend/scrolltoNLoad.js', function(){
						
									if( !core.events['.scrollTo_panel-1']){
											core.events['.scrollTo_panel-1'] = true;
											$('.scrollTo_panel-1').css({cursor:'pointer'}).live("click", function(e) {
														core.onPanel = 1;
														if( core.unit == 2 || core.unit == 3){
																core.nav_slide.up( false );					  
														};			
														$('#contentWrapper').scrollTo( $('#panel-1'), core.slideSpeed);
											});											
									};
									
									if( !core.events['.scrollTo_panel-2']){
											core.events['.scrollTo_panel-2'] = true;
											$('.scrollTo_panel-2').css({cursor:'pointer'}).live("click", function(e) {
														$('.shareVideoOverlay').hide();
														core.onPanel = 2;
														if(  core.unit == 2 || core.unit == 3 ){
																core.nav_slide.up( false );					  
														};							
														$('#contentWrapper').scrollTo( $('#panel-2'), core.slideSpeed, function(){
																		if(  core.unit == 2 || core.unit == 3 ){
																				core.nav_slide.down(  false );					  
																		};				
																		$('#panel-3').children().remove()
														});
											});											
									};
			
					})								
		
					core.processCallbackQueue();
					
					$('.navLink').live('click', function(event) {
						$(this).scrolltoNLoad();			
					});				
			};
})();