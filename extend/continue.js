(function(){

				var  navL = document.getElementById('scrollLeftImg');
				var  navR = document.getElementById('scrollRightImg');
				navL.src = '/mobile/images/navL.png';
				navR.src = '/mobile/images/navR.png';
				
				
		 		core.setOtherProperties=function( dataObj ){
		 			this.custom_html = dataObj.custom_html;
		 			this.about = dataObj.about;
		 		};
				core.loadScript('otherdata', '/user/' + core.userId + '/deploy/scripts/otherdata.js', function(){});
				
				core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
				core.loadScript('loadcss', '/mobile/extend/loadcss.js', function(){});
				core.processCallbackQueue();
				
				/* 
				*
				*  CLICK NAVOVERLAY
				*
				*/			

				core.attachEvent('navOverlayLink', document.querySelectorAll('.navOverlayLink'), 'click', function(){
					
							core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
							core.processCallbackQueue();
							
							core.doWhenJqueryReady(function(){
									core.loadScript('tools', '/mobile/extend/tools.js', function(){});
									core.loadScript('navOverlay', '/mobile/extend/navOverlay.js', function(){
												core.toggleShowElements();
										});
									core.processCallbackQueue();
							});
							
				});

			
				/* 
				*
				*  CLICK LEFT OR RIGHT NAV SLIDER THEN LOAD LIBRARIES
				*
				*/

				core.attachEvent('scrollRight', document.getElementById('scrollRight'), 'click', function(){
					core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){
						core.scrollRight();
					});
					core.processCallbackQueue();
				});																		

				core.attachEvent('scrollLeft', document.getElementById('scrollLeft'), 'click', function(){
					core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){
						core.scrollLeft();
					});
					core.processCallbackQueue();	
				});		

								
				/* 
				*
				*  CLICK NAV ICON AND LOAD LIBRARIES
				*
				*/
			
//				core.attachEvent('navMenuLink', document.querySelectorAll('.navMenuLink'), 'click', function(element){

			$('.navMenuLink').click(function(event) {
					
					//console.log(this);

					var that = this;
					
					core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){
					
						
					});
					
 					var ga_src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
					core.loadScript('google_analytics_source', ga_src, function(){
					  _gaq.push(['_setAccount', core.gid]);
					  _gaq.push(['_trackPageview']);						
					});
					
					core.loadScript('googleAnalytics_core', '/mobile/extend/googleAnalytics.js', function(){
							if( typeof(core.trackingPixel) !== "undefined"){
								core.trackPixel_sections({
									 'type'				:'view'
									,'controller_to_use'		:'home'
								});
							};	
					})	
					core.loadScript('dateformat', '/mobile/scripts/dateformat.js', function(){})

					core.processCallbackQueue();

					core.doWhenJqueryReady(function(){
						
							core.loadScript('tools', '/mobile/extend/tools.js', function(){});
							core.loadScript('events', '/mobile/extend/events.js', function(){
									core.setup_marquee();	
							});
							
							core.loadScript('jscrollpane', '/mobile/scripts/jquery.jscrollpane.2.0.js', function(){});
							core.loadScript('linkify', '/mobile/scripts/jquery.linkify.js', function(){});
							core.loadScript('marquee', '/mobile/scripts/jquery.marquee.js', function(){});
							core.loadScript('scrollTo', '/mobile/scripts/jquery.scrollTo-min.js', function(){});
							
							core.loadScript('scrolltoNLoad', '/mobile/extend/scrolltoNLoad.js', function(){


//								console.log(that);
//								console.log($(that));
//								console.log('1: '+$(that).attr('targetIs'));

								$(that).scrolltoNLoad();	
								
								if( !core.events['.navLink']){
										core.events['.navLink'] = true;
										$('.navLink').live('click', function(event) {
											$(this).scrolltoNLoad();
										});										
								};
								
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
					});
					
					
				});		
				
				


				core.scrollLeft = function(){
							
						if(core.navRightCount == 0) return;
						else core.navRightCount--;
				
						$(".belt").animate({left: "+=" + core.style[core.unit].nav_icon_size}, 100);	
								
				};
				
				core.scrollRight = function(){
						var panelLimit = 0;
										
						if( core.unit == 4 ){
							if(core.navRightCount == core.numOfIcons - 5 ) return;
						}else{
							if(core.navRightCount == core.numOfIcons - 2 ) return;
						};
						
						core.navRightCount++;
				
						$(".belt").animate({left: "-=" + core.style[core.unit].nav_icon_size}, 100);	
										
				};





    
})();