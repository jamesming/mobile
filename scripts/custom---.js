$(document).ready(function() { 
		app.initial_setup(window);
									
//		$('.navOverlayLink.start').click();
//		
		setTimeout(function(){
//				$('#tab_videos').click();	
		},100);
		 
		setTimeout(function(){
				// $('#arrow_1').click();	
//				$('#innerConnectContainer a[feed=facebook]').click()
				
		},1000);	
		
//		setTimeout(function(){
//				$('.share_video').click();	
//		},1500);			

});
 	
var app = function(window){

	var  local_var
			,twitter_marquee_height = 27
			,video_autoplay = 1
			,durationB4HomePageNavMenuSlidesDown = 1000
			,numOfIcons = 0
			,navRightCount = 0
			,navIsSliding = 0
			,isThisIphone =    navigator.platform.indexOf("iPhone") != -1 
											|| navigator.platform.indexOf("iPod") != -1
											|| false;
	
	return {
		
		initial_setup: function(window){

			
			
			/* 
			*
			*  DEFAULTS
			*
			*/
			window.userId = window.global_get( 'id' );
			window.unit = window.global_get( 'unit' );
			if( !window.unit  ) window.unit = 1;;
			this.BrowserDetect.init();
			window.widget_width = 320;
			window.widget_height = 480;	
			window.nav_icon_size  = 86;
			window.click_macro = window.global_get( 'click_macro' );
			
			console.log(this.format[window.unit].height);
			
			if( isThisIphone ) $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=0" />');
			
			if( app.BrowserDetect.browser == 'Firefox'  ||
				  app.BrowserDetect.browser == 'Explorer'  && app.BrowserDetect.version == '8'){
					$('.playerContainer').hide();
			};
			
			if( app.BrowserDetect.browser == 'Explorer' ){
					$('.elementsWrapper').corner('8px');
					$('.mapWrapper').corner('8px');
					$('.overlayNavItem').corner('8px');
					$('.tweetTextArea').corner('8px');		
					
					$('.playerContainer').css({background:'#202020'})
			}else{
				$('.audioLabelContainer').parent().height(55);
			}
			
			$('.navTextLink').click(function(){
				$(this).css({'text-shadow' : '0 0 10px #FFFFFF', 'color' : '#FFFFFF' });
			});	
			
			var that = this;
								
			$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/global.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
	
						var size;
										
						switch(window.unit){
							case "1": size ='320x480'; break; // Mobile
							case "2": size ='400x350'; break; // Web Player
							case "3": size ='300x250'; break; // Interactive Ad Unit
							case "4": size ='600x500'; break; // Mini-Website
							default: size ='320x480'; break;
						};
						
			
						window.name = $(xml).find('name').text()
						window.about = $(xml).find('about').text()
						window.abouttitle = ( $(xml).find('abouttitle').text() !='' ? $(xml).find('abouttitle').text():$(xml).find('name').text())
						window.facebookID = $(xml).find('facebookID').text()
						window.twitter = $(xml).find('twitter').text()
						window.hashtag = $(xml).find('hashtag').text()
						window.channelid = $(xml).find('channelid').text()
						window.ustreamid = $(xml).find('ustreamid').text()
						var logourl = $(xml).find('logourl').text()
						var avatarurl = $(xml).find('avatarurl').text();
						var base_url = $(xml).find('base_url').text();
						var base_url2 = $(xml).find('base_url2').text();
						app.tab = $(xml).find('tab').text();
						app.target = $(xml).find('target').text();
						app.custom_html = $(xml).find('custom_html').text();
						
						if( window.ustreamid  == ''){
							$('.headerBtnUstream').remove(); 
							$('.headerBtns').css({'padding-top':'15px','padding-bottom':'20px'});
						}; 
			
						if( window.unit  == 1){ 
							window.urlToShare = window.location.hostname + "/user/" + window.userId + "/deploy/embed/400x300.html";
						}else{
							window.urlToShare = window.location.hostname + "/user/" + window.userId + "/deploy/embed/" +  size  + ".html";
						};
						
						window.gid = $(xml).find('gid').text();  // GOOGLE ANALYTICS
						window.gid = 'UA-32580165-4';
						
						
						var unit_url = ( window.click_macro && window.click_macro != '' ?  unescape(window.click_macro) + unescape(base_url) : base_url );
						var unit_url2 = ( window.click_macro && window.click_macro != '' ?  unescape(window.click_macro) + unescape(base_url2) : base_url2 );  // top banner
						
						/* 
						*  LOADING LOGO
						*/
			
						var logo_section = $('\
							<div class="bannerWrapper">\
								<div id="logoWrapper">\
									<a  id="header_link" >\
										<img 	src="/user/' +  window.userId  + '/deploy/userassets/' +  logourl  + '" />\
									</a>\
								</div>\
							</div>\
						');
				
						$('#logo_section').html(logo_section);
						
						$('#header_link').click(function(event) {
									event.preventDefault();	
									
										app.googleAnalytics({
											'type'			:'events'
											,'category'	:'EXIT'
											,'action'		:'CLICK'
											,'label'		:'HEADER'
										});
									
									window.open(unit_url2);
						});	
						
						$('#homePageContainer div img').css({'cursor':'pointer'}).live('click', function(event) {
							
										app.googleAnalytics({
											'type'			:'events'
											,'category'	:'EXIT'
											,'action'		:'CLICK'
											,'label'		:'HOMESCREEN'
										});
							
									window.open(unit_url);
						});	
						
							
													
						/* 
						*  DEFAULT
						*/
						
						switch(window.unit){ 
							case '1': // MOBILE
						
								window.widget_width = 320;
								window.widget_height = 480;		
								
								if( isThisIphone ){
									// THIS ACCOMODATES THE ADDRESS BAR
									window.widget_height = 356;
								};
		
							break;
							case '2': // WEB PLAYER
		
								$('.panels').css({
									width:'400px'
								})
								window.widget_width = 400;
								window.widget_height = 350;
								
							break;			
							case '3': // INTERACTIVE AD UNIT
								
								$('.panels').css({
									width:'300px'
								})
								window.widget_width = 300;
								window.widget_height = 250;
								window.nav_icon_size  = 77;		
								
								
								$('.sharethisOverlay').css({
										top: '65px'
								})									
								
							break;										
							case '4': // MINI SITE
								window.widget_width = 600;
								window.widget_height = 500;		
		
		
								$('#headerWrapper, .panels').css({
									width:'600px'
								})								
		
							break;	
						}	

	
						
						if( app.BrowserDetect.browser == 'Firefox' ){
							$('#socialWrapper').css({right:'40px'})
						};
						
						
						if( window.unit == 3 ){// INTERACTIVE AD UNIT
							
								$('#socialWrapper table td.first-row').height(window.widget_height-165);
								$('#socialWrapper table td.facebook_td').width('60%');
								$('#socialWrapper table td.twitter_td').width('40%');
								
								$('#logo_section_span').parent().css({
										'padding-left':'0px'
								});
								
								$('#logo_section_span').css({
										'margin-right':'6px'
								});																	
				
						}else{
							
							
								switch(app.BrowserDetect.browser){ 
									case 'Firefox': 
											$('#socialWrapper table td.first-row').height(window.widget_height-245);
									break;
									case 'Chrome': 
											$('#socialWrapper table td.first-row').height(window.widget_height-220);
									break;							
									case 'Explorer': 
											$('#socialWrapper table td.first-row').height(window.widget_height-215);
									break;							
								};		
						};
						
						
		
						$('.panels').width(window.widget_width);
						
						$(document).attr("title", 
							window.abouttitle.toLowerCase().replace(/\b[a-z]/g, function(letter) {
							    return letter.toUpperCase();
							})						
						
						);
			
			
						
	
						$('#homePageContainer div img').css({
							 'position':'relative','left':'50%'
							,'margin-left': '-' + $('#homePageContainer div').width()+'px'
							,'margin-top': app.homescreenMarginTop[window.unit]() +'px'
							});
							
							
						app.setHomeScreenImage();

			
						if( window.unit == 4){  // FOR MINISITE
							
							$('#left_controls div').css({
									'padding-left': '50px'
								});
								
							$('#right_controls div').css({
									'padding-right': '50px'
								});							
							
							$('.headerBtns').css({'margin-right':'10px'})
	
							
							$('.stepcarousel').css({width:'430px'})
							
							$('#twitter_feed_scroller').css({'padding-right':'10px'})	
							
						};
						
						
						if( window.unit == 2){  // WEBPLAYER
							
							$('#left_controls div').css({
									'padding-left': '41px'
								});
								
							$('#right_controls div').css({
									'padding-right': '41px'
								});		
							
						};					
						
						
						$('.scrollDisplay').width(app.scrollDisplay.width[window.unit]).css({'margin-left':app.scrollDisplay.marginLeft[window.unit]})
						
						if( window.unit == 3){  // FOR Interactive Ad Unit
							
			
							$('.stepcarousel').css({width:'230px'})
						};					
			
						var controllers  = new Array();
						
						
						var icons = '';
	
						/* 
						*	Putting nav icons scroller
						*/
						$(xml).find('elem').each(function(){
							
							var  controller = $(this).text()
									,tab_name;
							
							if( controller != 'custom'){
								tab_name = $(this).text();
								if ( controller == 'bio') tab_name =  'about';
								var icon_image = '/mobile/images/icons/'+controller;
							}else{
								tab_name = that.tab;
								var icon_image = '/user/' + window.userId + '/deploy/userassets/tab_icon';
							};
	
							controllers.push (controller);
	
							var new_panel_div = '\
							<div  class="panel"   style="background:transparent; "    controller="' + controller + '">\
								<div  class="navItemHolder addFontSize11 addTextAlignCenter ">\
									<div >\
										<a id="tab_' + controller + '" targetIs="panel-2"  class="navLink navTextLink"  data-transition="slide" controller="' + controller + '">' + tab_name + '</a>\
									</div>\
								</div>\
								<div  class="icon_div addTextAlignCenter ">\
									<a   targetIs="panel-2" class="navLink ' +  controller  + ' navIconLink"   data-transition="slide"  controller="' + controller + '">\
										<img   style="margin-top:7px"  class="navImg" src="' + icon_image + '.png" />\
									</a>\
								</div>\
							</div>\
							';
						
							numOfIcons++;
							icons +=  new_panel_div;
							
							
						});
						
						$('#belt').append(icons);
						
						$('.panel').each(function(i) {
									// $(this).css({background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)});
									$(this).width(window.nav_icon_size)
						});	
						
						icons = '';
						
						/* 
						*	Putting nav icons in the popout div
						*/
						$(xml).find('elem').each(function(){
							
							var  controller = $(this).text()
									,tab_name
									,icon_image;
							
							if( controller != 'custom'){
								tab_name = $(this).text();
								if ( controller == 'bio') tab_name =  'about';
								icon_image = '/mobile/images/icons/'+controller;
							}else{
								tab_name = that.tab;
								icon_image = '/user/' + window.userId + '/deploy/userassets/tab_icon';
							};
							
							var overlayNavItem_div = '\
									<div class="overlayNavItem"  >\
										<a targetIs="panel-2" class="navLink naviconlink_overlay"   onclick=app.toggleShowElements() controller="' + tab_name + '">\
											<img class="navImg" src="' + icon_image + '.png" />\
										</a>\
										<div class="navItemHolder " style="font-size: 11px; ; margin-top: 4px;">\
											<a targetIs="panel-2" class="navLink"   onclick=app.toggleShowElements()  controller="' + controller + '">\
												' + tab_name + '\
											</a>\
										</div>\
									</div>\
							';
							
							icons +=  overlayNavItem_div;
							
							
						});
						
						$('.elementsInnerWrapper').append(icons);	
						
						$('.overlayNavItem').css({
												'width': app.navMenuverlay[window.unit].overlayNavItem.width
												});
						$('.elementsWrapper').css({
												'margin-top': app.navMenuverlay[window.unit].elementsWrapper.marginTop,
												height: app.navMenuverlay[window.unit].elementsWrapper.height
												});
						$('.elementsInnerWrapper').css({'width': app.navMenuverlay[window.unit].elementsInnerWrapper.width});
						
						if( app.inArray('music', controllers) ){
							app.hasMusic = true;
						}else{
							app.hasMusic = false;
						};
						
						if( app.hasMusic ){
							app.setup_music_player();
						}
						else {
							$('.playerContainer').hide();
						};					

							
						if( window.unit == 4  || window.unit == 2 ){
														
								$('#logo_section_span').parent().parent().parent().prepend('\
													<a id="avatar"  style="float:left;width:75px;padding:5px;padding-top:' + app.avatar.marginTop[window.unit]() + 'px"  >\
														<img src="/user/' +  window.userId  + '/deploy/userassets/avatar.png">\
													</a>\
								')
								
								$('#avatar').click(function(event) {
									
										event.preventDefault();							
										
										app.googleAnalytics({
											'type'			:'events'
											,'category'	:'EXIT'
											,'action'		:'CLICK'
											,'label'		:'AVATAR'
										});
										
										window.open(unit_url);
																				
								});	
								
								$('#top_area').width(that.top_area[window.unit]);
	
							
								$('#logo_section').parent().css({
										float:'left',
										width:$('#logo_section_span').width(window.widget_width-180),
										overflow:'hidden'	
								})									
								
						}else if( window.unit ==  3){
							
								$('#logo_section').parent().css({
										float:'left',
										width:$('#logo_section_span').width(window.widget_width-85),
										overflow:'hidden'	
								})	
								$('#logo_section_span').parent().css({
										'padding-left':'0px'
								})									
																
						}else if( window.unit ==  1){
							
								$('#logo_section').parent().css({
										float:'left',
										width:$('#logo_section_span').width(window.widget_width-85),
										overflow:'hidden'	
								})	
								$('#logo_section_span').parent().css({
										'padding-left':'5px'
								})									
																
						};
	

						if( window.unit == 3 ){
							$('.naviconlink_overlay').remove();
							$('.overlayNavItem').height(30).css({'margin-top':'5px'});
						}else if( window.unit ==  2){
							$('.naviconlink_overlay').remove();
							$('.overlayNavItem').height(30).css({'margin-top':'5px'});
						};
				
						$('.overlayNavItem').corner('8px');
						
						
						if( window.unit == 3){
							$('#twitter_feed_scroller').remove();
							//$('#contentWrapper').css({top:'67px'}).height( $('#contentWrapper').height() + twitter_marquee_height );
							$('#contentWrapper').css({top:'67px'}).height( 162 );
						}else{
							that.setup_marquee();
						};							
						
						
					}
			});
			
			this.scrollTo();
			
			window.isSlideDown = false;
			
			
			$('#contentWrapper').height(window.widget_height - app.panel_height_unit[window.unit][window.isSlideDown]);


			if( window.unit == 3 || window.unit == 2){
				
						this.bind_hover_event_nav();
						
						setTimeout(function(){
								if( $('#footerWrapper').css('bottom') == '0px' ){
									app.nav_slide.down();	
								};
								
						},durationB4HomePageNavMenuSlidesDown)
	
			};
			
	
			this.create_embed_code_for_sharing();	
			this.bind_nav_link();	
			this.adjustVideoShareOverlay();
			
		}



		/* Unit Variables
		*
		*  
		*
		*/
		
		
		,format:{
								 1:{
										 width 	: 320
										,height	: ( isThisIphone ? 356: 480) 
									
									}			
								,3:{
										 width 	: 400
										,height	: 350
									
									}			
								,3:{
										 width 	: 300
										,height	: 250
									
									}
								,4:{
										 width 	: 600
										,height	: 550
									
									}
		}		
		
		
		,homescreenMarginTop:{
			1: function(){
					if( isThisIphone ) return 0;
					else return 0;
			},			
			2: function(){
				return 0;
			},
			3: function(){
				return 0;
			},
			4: function(){
				return 0;
		}
		}		
		,home_img_size_unit:{
			
			1:  { // MOBILE
						'false':function(){
							
							if( isThisIphone ) return 193;
							else return 317;
							
						}
					},			
			
			2:	{ // WEB PLAYER
						'true':238,
						'false':240
					},
			
			3:  { // IAU
						'false':180
					},

			
			4:  { // MINI
						'false':360
					}
			
		}
		,panel_height_unit:{
			1:{ // MOBILE
						'true':281,
						'false': function(){
							
							if( isThisIphone ) return 143;
							else return 163;
							
						}
				},			
			2:{ // WEB PLAYER
						'true':88,
						'false': 145
				},
			3:{ // IAU
						'true':120,
						'false': 120				
				},
			4:{ // MINI
						'true':303,
						'false': 142				
				}
		}
		,panel_height_connect_tab_unit:{
			1:{ // MOBILE
						'true':130,
						'false': function(){
							
							if( isThisIphone ) return 213;
							else return 233;
							
						}
				},			
			
			2:{ // WEB PLAYER
						'true':130,
						'false': 180
				},
			3:{ // IAU
						'true':158,
						'false': 158				
				},
			4:{ // MINI
						'true':30,
						'false': 400
				}				
		}
		,font_size_unit:{
			
			1:  { // MOBILE
						big: 13,
						small: 9
					},
			2:  { // WEB PLAYER
						big: 12,
						small: 9
					},
			3:  { // IAU
						big: 11,
						small: 8
					},
			4:  { //  MINI-SITE
						big: 13,
						small: 10
					},
		}
		,top_area:{
			2:  308,
			4:  511,
		}
		,scrollDisplay:{
			width:{
				1:302,
				2:295,
				4:494				
			},
			marginLeft:{
				1:5,
				2:0,
				4:0	
			},
			marquee:{
				1: 301,
				2: 293,
				4: 494
			}
		}
		,avatar:{
			marginTop:{
				2:function(){
					if( app.hasMusic ) return 12;
					else return 4;
				},
				4:function(){
					return 6;
				}
			}
		}
		,navMenuverlay: {
			1:{
				overlayNavItem:{
					width:'54px'	
				},
				elementsWrapper:{
						marginTop:'40px',
						height: '295px'
				},
				elementsInnerWrapper: {
						width: '90%'
					}
				},
			2:{
				overlayNavItem:{
					width:'70px'	
				},
				elementsWrapper:{
						marginTop:'54px',
						height: '205px'
				},
				elementsInnerWrapper: {
						width: '70%'
					}
				},
			3:{
				overlayNavItem:{
					width:'70px'	
				},
				elementsWrapper:{
						marginTop:'10px',
						height: '185px'
				},
				elementsInnerWrapper: {
						width: '90%'
					}
				},
			4:{
				overlayNavItem:{
					width:'70px'	
				},
				elementsWrapper:{
						marginTop:'60px',
						height: '319px'
				},
				elementsInnerWrapper: {
						width: '60%'
					}
				}
		}
		,scrollPaneAarrows:{
			1: function(){
							
							if( isThisIphone ) return 157;
							else return 282;
							
						},
			2: 203,
			3: 126,
			4: 304
		}
		,scrollPaneArrowsConnectTabUnit:{
			1: function(){
							
							if( isThisIphone ) return 125;
							else return 251;
							
						},
			2:172,
			3:93,
			4:271
		}
		
		
		/* EVENTS
		*
		*  
		*
		*/
		,googleAnalytics: function( arg ){
				switch(arg.type){
							case "events": {
								
								arg.label = arg.label.split(' ').join('_');
								
								//console.log( 'type: ' + arg.type+  ', category: ' + arg.category+ ', action: ' + arg.action+ ', label: '   + arg.label);
								_gaq.push(['_trackEvent', arg.category, arg.action, window.userId + '_' + arg.label]);
							};	break;
							case "pageviews": {
								
								arg.unique_desc = arg.unique_desc.split(' ').join('_');
								
								//console.log( 'type: ' + arg.type + ', section: ' + arg.section  + ', unique_desc: ' +arg.unique_desc);
								_gaq.push(['_trackPageview', '/unit/' + window.userId + '/' + arg.section  + '/' +  arg.unique_desc]);
							};	break;
				}	
 		}
		,scrollTo: function(){
		
			window.onPanel = 1;
		
			$('.scrollTo_panel-1').css({cursor:'pointer'}).live("click", function(e) {
				
						window.onPanel = 1;
			
						if( window.unit == 2 || window.unit == 3){
							
								app.nav_slide.up( false );					  
								
								
								
						};			
			
						$('#contentWrapper').scrollTo( $('#panel-1'), 500);
						
			});	
			
			
			$('.scrollTo_panel-2').css({cursor:'pointer'}).live("click", function(e) {
				
				$('.shareVideoOverlay').hide();
				
				window.onPanel = 2;
				
				if(  window.unit == 2 || window.unit == 3 ){
						app.nav_slide.up( false );					  
				};							
				
				$('#contentWrapper').scrollTo( $('#panel-2'), 500, function(){
								if(  window.unit == 2 || window.unit == 3 ){
										app.nav_slide.down(  false );					  
								};				
								$('#panel-3').children().remove()
				});
						
			});	
		
		}
		,scroll:function(){
			
						if(navRightCount == 0) return;
						else navRightCount--;

						$(".belt").animate({left: "+=" + window.nav_icon_size}, 100);	
				
		}
		,scrollRight:function(){
		var panelLimit = 0;
						
						if( window.unit == 4 ){
							if(navRightCount == numOfIcons - 5 ) return;
						}else{
							if(navRightCount == numOfIcons - 3 ) return;
						};
						
						navRightCount++;
		
						$(".belt").animate({left: "-=" + window.nav_icon_size}, 100);	
						
		}
		,bind_hover_event_nav:function(){
			
					window.countIt = 0;
					$('#contentWrapper, .shareVideoOverlay').mouseover(function(event) {
						
							//if( $('#footerWrapper').css('bottom') == '-50px' ){
								$('.jspVerticalBar').css({visibility:'visible'})
							//};						
						
							window.countIt++;
							if( !window.isSlideDown ){
								app.nav_slide.down();	
							};
					});	
					
					$('#footerWrapper').mouseover(function(event) {
						

						
							if( window.isSlideDown ){
								app.nav_slide.up();
							};
							
					});	
					
		}
		,nav_slide: {
								up: function(){
									
											//console.log('navIsSliding is: ' + navIsSliding + ' -- footerwrapper bottom is: '  +$('#footerWrapper').css('bottom') );								
									
											if(  navIsSliding == 0 ){
												
													navIsSliding = 1;
															
													window.isSlideDown = false;
												
													$('.jspVerticalBar').css({visibility:'hidden'});
													
													if( $('#footerWrapper').css('bottom') == '-50px' ){
													  
															$('#footerWrapper').animate({
															    'bottom': '+=50'
															  }, 500, function(){
															  	
															  	navIsSliding = 0;
															  	$('#footerWrapper').css({bottom:'0px'});
		
															});		
													
													};
													  
														
											};	
									
								},
								down: function(){
									
											//console.log('navIsSliding is: ' + navIsSliding + ' -- footerwrapper bottom is: '  +$('#footerWrapper').css('bottom') );
									
											if(   navIsSliding == 0  ){
												
													navIsSliding = 1;
												
													window.isSlideDown = true;
													
													
													if( $('#footerWrapper').css('bottom') == '0px' ){
														
																$('#footerWrapper').animate({
																    'bottom': '-=50'
																  }, 500, function(){
																  	
																  	navIsSliding = 0;
																  	$('#footerWrapper').css({bottom:'-50px'});
																  	$('.jspVerticalBar').css({visibility:'visible'})
																  	
																});														
														
													};

											
													
											};				
						
								}
		}
		,bind_nav_link :function(){
						
						/* 
						*  MIDDLE SECTION IS CHANGED BY CLICKING ON ICONS
						*/
						
						$('.navLink').live("click", function(e) {
							
								e.preventDefault();							
							
								$('.shareVideoOverlay').hide();

								$('.jspVerticalBar').css({visibility:'hidden'});
	    
								/* 	Highlighting icon	*/		    
										controller_to_use = $(this).attr('controller');
										switch($(this).attr('controller')){
											case "musicDetails": controller_to_use = 'music';	break;
											case "photosThumbnails": controller_to_use = 'photos';	break;
											case "photosDetails": controller_to_use = 'photos';	break;
											case "videoDetails": controller_to_use = 'videos';	break;
											case "merchDetails": controller_to_use = 'merch';	break;
											case "eventsDetails": controller_to_use = 'events';	break;
											case "theatersDetails": controller_to_use = 'theaters';	break;
										}	
						
										$('.navItemHolder').removeClass('navSelected');
										$('.icon_div').removeClass('highlightedIcon');
											    
										$('.panel[controller='+controller_to_use+']').children('.navItemHolder').addClass('navSelected')
										$('.panel[controller='+controller_to_use+']').children('.icon_div').addClass('highlightedIcon');

								
								if( $(this).attr('photoId') != null ){
									window.photoId_selected =  $(this).attr('photoId');
								}			
								
								if( $(this).attr('eventsId') != null ){
									window.eventsId_selected =  $(this).attr('eventsId');
								} 		
								
								if( $(this).attr('musicId') != null ){
									window.musicId_selected =  $(this).attr('musicId');
								} 		
								
								if( $(this).attr('youtube_id') != null ){
									window.youtube_id_selected =  $(this).attr('youtube_id');
								}
								
								if( $(this).attr('merchId') != null ){
									window.merchId_selected =  $(this).attr('merchId');
								}				  					 								
								
						
								if($(this).attr('targetIs') == 'panel-2' ){
									
									
											app.googleAnalytics({
												 'type'				:'pageviews'
												,'section'		:controller_to_use
												,'unique_desc':'list'
											});
									
											window.onPanel = 2;
									
											$('#panel-2')
											.load( '/mobile/widget_controllers/' + $(this).attr('controller') + '.html?random=' + Math.floor(Math.random()*999999999), function(e){
						
						
												if(window.unit ==2 || window.unit==3 ){
															if(window.isSlideDown == true){
																$('.jspVerticalBar').css({visibility:'visible'});
																// console.log('slide is down. jspVerticalBar is visible' );
															}else{
																// console.log('slide is up. jspVerticalBar is hidden' );
																$('.jspVerticalBar').css({visibility:'hidden'});
															};													
													
												};
												
						
												$('#contentWrapper').scrollTo( $('#panel-2'), 500, function(){
						
															$('#panel-3').children().remove();
															
													
												} )
												
											});
											
											
											
								}else{  // 'targetIs' == 'panel-3'
									
											window.onPanel = 3;
									
											$('#panel-3')
											.load( '/mobile/widget_controllers/' + $(this).attr('controller') + '.html?random=' + Math.floor(Math.random()*999999999), function(e){
												
													
												$('#contentWrapper').scrollTo( $('#panel-3'), 500, function(){
													
												}  )
												
											})
														
								};
						
						    
						});			
		
		}
		,displayShareThis:function(){
			
				
					this.close_ustream();
			
			/* 
					var width, height, marginTop, marginLeft;
			
					switch(window.unit){
			//			case "1": window.unit = 1;	break; // Mobile
			//			case "2": window.unit = 2;	break; // Web Player
						case "3": width =  break; // Interactive Ad Unit
			//			case "4": window.unit = 4;	break; // Mini-Website
					}		
			
				$('#socialWrapper').css({
						width: '271px',
						height: '122px',
						'margin-top': '-90px',
						'margin-left': '-135px',
					})
			*/
				
				if ($('.sharethisOverlay').css('display') == 'none') { 
					
					if( $('#iframe_video').is(':visible') ){
							if( $('#iframe_video').attr('src') != '') this.youtubeVideoSrc = $('#iframe_video').attr('src');
							$('#iframe_video').attr('src', '');
					};	
					
					$('.sharethisOverlay').fadeIn(300); 
					$('#share_button').attr('src', '/mobile/images/button-close.gif');
				}
				else{
					
					if( $('#iframe_video').is(':visible') ){
							$('#iframe_video').attr('src', this.youtubeVideoSrc);
					};
					 
					$('.sharethisOverlay').fadeOut(300);
					$('#share_button').attr('src', '/mobile/images/btnShare.gif');
				}
				return;		
		}	
		,displayUstream:function(){
			

			
						if ($('.ustreamOverlay').css('display') == 'none') { 
							
							if( $('#iframe_video').is(':visible') ){
									if( $('#iframe_video').attr('src') != '') this.youtubeVideoSrc = $('#iframe_video').attr('src');
									$('#iframe_video').attr('src', '');
							};							
							
							$('.ustreamOverlay').fadeIn(300); 
							$('#ustreamBtn').attr('src', '/mobile/images/closelivestream.png');
							
							
							var ustream = '\
							<iframe  id="ustream_iframe"  src="http://www.ustream.tv/embed/' +  window.channelid  + '" \
							width="' + window.widget_width + '" height="' + (window.widget_height - 92)  + '" scrolling="no" frameborder="0" \
							style="border: 0px none transparent;"></iframe><br />\
							';


							$('.ustreamOverlay').html(ustream);		
							
							
							if( window.unit == 3 ){
								$('.ustreamOverlay').css({top:'65px'})
								.children('iframe').height(185);
							};							
						}
						else { 
							this.close_ustream()	
						}
						return;
		
		}
		,close_ustream:function(){
			
				if( $('#iframe_video').is(':visible') ){
						$('#iframe_video').attr('src', this.youtubeVideoSrc);
				};
			
				$('.ustreamOverlay').fadeOut(300);
				$('#ustreamBtn').attr('src', '/mobile/images/livestream.png');
				$('.ustreamOverlay').html('');			
		}
		,toggleShowElements: function(){
				if ($('.elementsOverlay').css('display') == 'block'){
					$('.elementsOverlay').fadeOut('fast', function(){
						$('.elementsOverlay').css('display', 'none');
					});	
				}
				else{	
					$('.elementsOverlay').fadeIn('fast', function(){
						$('.elementsOverlay').css('display', 'block');
					});
				};
		}
		,adjustVideoShareOverlay:function(){
		
				if( window.unit != 3){
					$('.shareVideoOverlay').css({top:'125px'});
				};
		
		}
		,adjustScrollPanel:function(visibility){
		
					$('.scroll-pane-arrows').height(app.scrollPaneAarrows[window.unit]);
		
					$('.scroll-pane-arrows').jScrollPane({
								showArrows: true,
								horizontalGutter: 10
							});
		
					if( window.unit == 2|| window.unit == 3){
						$('.jspVerticalBar').css({visibility:'hidden'});
					}else{
						$('.jspVerticalBar').css({visibility:visibility});
					};
						
		}	
		,adjust_slideUpDownHeight:function(){
					$('.slideUpDown').css({'overflow-y':'auto'}).height(window.widget_height - app.panel_height_unit[window.unit][window.isSlideDown]);
		}			
		,setup_marquee:function(){
					/* Marquee */
					
					

						window.tweet_marquee = '';
						$.ajax({
							type: "GET",
							url: 'http://twitter.com/status/user_timeline/' +  window.twitter  + '.json?count=10&callback=?',
							dataType: "jsonp",
							success: function(data) {
								
								$.each(data, function(key, tweet) {
		
									tweet_marquee = window.tweet_marquee + ' ' + tweet.text + '     ';
									
							  });		
							  
								$('marquee').text(tweet_marquee)
								.linkify();
								
								if( window.unit == 4){  // FOR MINISITE
										$('marquee')
										.css({'font-size':'9px'})
										.parent().css({height:'10px'})
								};
								
								$('marquee').marquee('pointer').width(app.scrollDisplay.marquee[window.unit]).mouseover(function() {
									$(this).trigger('stop');
								}).mouseout(function() {
									$(this).trigger('start');
								});										
								
								
							}	
						});

					
		}		
		,setHomeScreenImage:function(){
			
			var cachebust = '?v=' + Math.floor(Math.random()*999999999) 
			,homeScreens = {
					 1:	isThisIphone ? 'unitOneIphone.png' + cachebust : 'unitOneAndroid.png' + cachebust
					,2:	'unitTwo.png'
					,3:	'unitThree.png?' + cachebust
					,4:	'unitFour.png' + cachebust
			}
			,configureProperImageSrc = function(homescreen_image){
				
				$('#homePageContainer div img')
				.height( app.home_img_size_unit[window.unit][window.isSlideDown] )
				.attr('src', '/user/' + window.userId + '/deploy/userassets/' + homescreen_image );
			}
			,checkImageExist = new Image();
			
			checkImageExist.src = '/user/' + window.userId + '/deploy/userassets/' + homeScreens[window.unit];
			checkImageExist.onerror = function(){
           configureProperImageSrc('homescreen.png');
      };
			checkImageExist.onload=function(){
					 configureProperImageSrc(homeScreens[window.unit]);
      };
      
		}	
		
		/* MUSIC PLAYER  
		*
		*	
		*
		*/
		,setup_music_player:function(){
		
						// ------------------------------------------------------------------------------------
						// audio player elapsed and remaining
						// ------------------------------------------------------------------------------------
						
						var audio = document.getElementById('audioPlayer');
						var timeElapsed = document.getElementById('timeElapsed');
						var timeRemaining = document.getElementById('timeRemaining');
						
						if (audio.addEventListener){
						audio.addEventListener('timeupdate',function(event){
						// time remaining
						difference = parseInt(audio.duration - audio.currentTime);
						secondsRemaining = difference % 60;
						minutesRemaining = parseInt(difference / 60);
						
						// time elapsed
						secondsElapsed = parseInt(audio.currentTime % 60);
						minutesElapsed = parseInt(audio.currentTime / 60);
						
						timeRemaining.innerHTML = minutesRemaining+':'+secondsRemaining;
						timeElapsed.innerHTML = minutesElapsed+':'+secondsElapsed;
						timelineWidth = parseInt((audio.currentTime / audio.duration) * 100);
						$('.ui-slider-range').css('width', timelineWidth+'%');
						},false);
						} else if (audio.attachEvent){
						audio.attachEvent('timeupdate', function(event){
						// time remaining
						difference = parseInt(audio.duration - audio.currentTime);
						secondsRemaining = difference % 60;
						minutesRemaining = parseInt(difference / 60);
						
						// time elapsed
						secondsElapsed = parseInt(audio.currentTime % 60);
						minutesElapsed = parseInt(audio.currentTime / 60);
						
						timeRemaining.innerHTML = minutesRemaining+':'+secondsRemaining;
						timeElapsed.innerHTML = minutesElapsed+':'+secondsElapsed;
						timelineWidth = parseInt((audio.currentTime / audio.duration) * 100);
						$('.ui-slider-range').css('width', timelineWidth+'%');
						},false);
						}
						
						$('#audioPlayBtn').click(function(){
						document.getElementById('audioPlayer').play();
						$('#audioPlayBtnWrapper').css('visibility', 'hidden');
						$('#audioPauseBtnWrapper').css('visibility', 'visible');
						});
						
						$('#audioPauseBtn').click(function(){
						document.getElementById('audioPlayer').pause();
						$('#audioPauseBtnWrapper').css('visibility', 'hidden');
						$('#audioPlayBtnWrapper').css('visibility', 'visible');
						});
						
						$('#audioPrevBtn').click(function(){
						app.playMusic($('#prevId').val(), $('#prevAsin').val(), $('#prevThumb').val(), $('#prevTitle').val(), 1);
						});
						
						$('#audioNextBtn').click(function(){
						app.playMusic($('#nextId').val(), $('#nextAsin').val(), $('#nextThumb').val(), $('#nextTitle').val(), 1);
						});
						
						$(".playerBtn").click(function(){
							if ($(".playerContainer").css("marginTop") == "-15px"){
								$(".playerContainer").animate({marginTop: "-55px"}, 300);
								$(this).children('img').attr('src', '/mobile/images/playerBtnDown.png');
								
								
							}
							else{
								
								$(".playerContainer").animate({marginTop: "-15px"}, 300);
								$(this).children('img').attr('src', '/mobile/images/playerBtnUp.png');
								
								$('#tab_music').click();
								app.playMusicFromList(0);
							}
						});
						
						window.musicArr = new Array();
											
						window.count_music = 0;
						$.ajax({
						    type: "GET",
						    url:  '/user/' + window.userId + '/deploy/data/music.xml',
						    dataType: "xml",
								success: function(xml) {	
									
									$(xml).find('Song').each(function(){
										
										var musicId = $(this).find('musicid').text();
										var songname = $(this).find('songname').text();
										var albumname = $(this).find('albumname').text();
										var albumurl = $(this).find('albumurl').text();
										var albuminfo = $(this).find('albuminfo').text();
										var cover = $(this).find('cover').text();
										var isfree = $(this).find('isfree').text();
										var ringurl = $(this).find('ringurl').text();
										var songurl = $(this).find('songurl').text();
										
										window.musicArr[window.count_music] = new Array(window.count_music, songurl, cover, songname);
										
										window.count_music++;
							
									});		
						
						
						
									
								}
						});
		}
		,playMusic:function(index, songurl, thumb, title, autoplay){

						if(  app.BrowserDetect.browser == 'Firefox'  ||
								 app.BrowserDetect.browser == 'Explorer'  && app.BrowserDetect.version == '8'
						){
							
							app.warning({
							  msg: 'Sorry, this device support does not support MP3 audio via HTML5.',
							  duration: 3000,
							  borderSize: '2px',
							  borderColor: '#424242',
							  backgroundColor: '#232323',
							  boxWidth: '200px',
							  boxHeight: '85px',
							  boxPadding:'0px 15px 15px 15px',
							  fontSize:'12px'
							});
							
						}else{
							
							
								app.googleAnalytics({
									 'type'			:'events'
									,'category'	:'PLAYER'
									,'action'		:'PLAY'
									,'label'		:'MUSIC_'  + title
								});
							
					
								changeValues(index);
								
								if (autoplay == 1){	
									$(".playerContainer").animate({marginTop: "-15px"}, 300);
									$('.playerBtn').children('img').attr('src', '/mobile/images/playerBtnUp.png');
									$('#audioPlayer').attr('autoplay', 'autoplay');
									$('#audioPlayBtnWrapper').css('visibility', 'hidden');
									$('#audioPauseBtnWrapper').css('visibility', 'visible');
								}
								else{
									$('#audioPlayBtnWrapper').css('visibility', 'visible');
									$('#audioPauseBtnWrapper').css('visibility', 'hidden');	
								}
								
								$('#audioThumb').attr('src', thumb);
								$('#audioTitle').html(title);
								
								var audio = document.getElementById('audioPlayer');
								var timeElapsed = document.getElementById('timeElapsed');
								var timeRemaining = document.getElementById('timeRemaining');
								
								
								if (audio.addEventListener){
										audio.addEventListener('loadedmetadata', function() {
					
										$("#timeline").slider({
										range: "min",
										min: 0,
										max: audio.duration,
										slide: function( event, ui ) {
										audio.currentTime = ui.value;	
										}
										});
										$( "#amount" ).html($( "#timeline" ).slider("value"));
										});
								} else if (audio.attachEvent){
									  audio.attachEvent('loadedmetadata', function() {
					
										$("#timeline").slider({
											range: "min",
											min: 0,
											max: audio.duration,
											slide: function( event, ui ) {
												audio.currentTime = ui.value;	
											}
										});
										$( "#amount" ).html($( "#timeline" ).slider("value"));
										});
								}
								
								
						
						
								document.getElementById("audioPlayer").src = songurl;
								
								$("#sliderContainer").css('visibility', 'hidden');
								$("#sliderLoadingContainer")
										.html("<img src='/mobile/images/loader.gif' />")
										.css('visibility', 'visible');
								
										
								if (document.getElementById("audioPlayer").addEventListener){
									
										document.getElementById("audioPlayer").addEventListener('loadedmetadata', function() {
											$("#sliderContainer").css('visibility', 'visible');
											$("#sliderLoadingContainer").css('visibility', 'hidden');
										});
										
								} else if (document.getElementById("audioPlayer").attachEvent){
									
										document.getElementById("audioPlayer").attachEvent('loadedmetadata', function() {
											$("#sliderContainer").css('visibility', 'visible');
											$("#sliderLoadingContainer").css('visibility', 'hidden');
										});
								}
										
								invalidSong = setTimeout("app.rejectPlayMethod();", 10000);
								
								if (autoplay == 0) { 
									document.getElementById('audioPlayer').pause();
								}
							
						};
	

			
		}
		,playMusicFromList: function(index){
				app.playMusic(musicArr[index][0], musicArr[index][1], musicArr[index][2], musicArr[index][3], 1)
		}
		,rejectPlayMethod:function(){
			if (document.getElementById("audioPlayer").addEventListener){
			
				document.getElementById("audioPlayer").removeEventListener('loadedmetadata');
				$("#sliderLoadingContainer").html("Unable to play song");
				clearTimeout(invalidSong);
			
			} else{
			
				document.getElementById("audioPlayer").detachEvent('loadedmetadata');
				$("#sliderLoadingContainer").html("Unable to play song");
				clearTimeout(invalidSong);
			}
		}
		
		
		/* UTILS
		*
		*  
		*
		*/
		,BrowserDetect: {
		init: function() {
		    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
		    this.OS = this.searchString(this.dataOS) || "an unknown OS";
		},
		searchString: function(data) {
		    for (var i = 0; i < data.length; i++) {
		        var dataString = data[i].string;
		        var dataProp = data[i].prop;
		        this.versionSearchString = data[i].versionSearch || data[i].identity;
		        if (dataString) {
		            if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
		        }
		        else if (dataProp) return data[i].identity;
		    }
		},
		searchVersion: function(dataString) {
		    var index = dataString.indexOf(this.versionSearchString);
		    if (index == -1) return;
		    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		},
		dataBrowser: [
		    {
		    string: navigator.userAgent,
		    subString: "Chrome",
		    identity: "Chrome"},
		{
		    string: navigator.userAgent,
		    subString: "OmniWeb",
		    versionSearch: "OmniWeb/",
		    identity: "OmniWeb"},
		{
		    string: navigator.vendor,
		    subString: "Apple",
		    identity: "Safari",
		    versionSearch: "Version"},
		{
		    prop: window.opera,
		    identity: "Opera",
		    versionSearch: "Version"},
		{
		    string: navigator.vendor,
		    subString: "iCab",
		    identity: "iCab"},
		{
		    string: navigator.vendor,
		    subString: "KDE",
		    identity: "Konqueror"},
		{
		    string: navigator.userAgent,
		    subString: "Firefox",
		    identity: "Firefox"},
		{
		    string: navigator.vendor,
		    subString: "Camino",
		    identity: "Camino"},
		{ // for newer Netscapes (6+)
		    string: navigator.userAgent,
		    subString: "Netscape",
		    identity: "Netscape"},
		{
		    string: navigator.userAgent,
		    subString: "MSIE",
		    identity: "Explorer",
		    versionSearch: "MSIE"},
		{
		    string: navigator.userAgent,
		    subString: "Gecko",
		    identity: "Mozilla",
		    versionSearch: "rv"},
		{ // for older Netscapes (4-)
		    string: navigator.userAgent,
		    subString: "Mozilla",
		    identity: "Netscape",
		    versionSearch: "Mozilla"}
		],
		dataOS: [
		    {
		    string: navigator.platform,
		    subString: "Win",
		    identity: "Windows"},
		{
		    string: navigator.platform,
		    subString: "Mac",
		    identity: "Mac"},
		{
		    string: navigator.userAgent,
		    subString: "iPhone",
		    identity: "iPhone/iPod"},
		{
		    string: navigator.platform,
		    subString: "Linux",
		    identity: "Linux"}
		]
		
		}	
		,value_of_parameter: function( name, frompath){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( frompath );
		if( results == null )
		  return "";
		else
		  return results[1];
		}
		,get_moments_past: function(created){
			right_now_in_miliseconds = Date.now();
			created = new Date(created);
			created_in_miliseconds = created.getTime();
			miliseconds_past_since_tweet_is_posted = right_now_in_miliseconds - created_in_miliseconds;
			
			days = ((miliseconds_past_since_tweet_is_posted/1000) / 3600) / 24;
			hours = (miliseconds_past_since_tweet_is_posted/1000) / 3600;
			mins = (miliseconds_past_since_tweet_is_posted/1000) / 60;
			
			
			if ( days < 1){
			
			if( Math.ceil(mins)  < 60){  // MINUTES AGO
			
				moments_past = Math.ceil(mins);
				moments_past = moments_past + ( moments_past==1 ? ' min':' mins' );
				moments_past = moments_past +  " ago";
				
			}else{  // HOURS AGO
				
				moments_past = Math.ceil(hours);
				moments_past = moments_past + ( moments_past==1 ? ' hour':' hours' );
				moments_past = moments_past +  " ago";
				
			};
			
			}
			else{ // DAYS AGO
			
			moments_past = Math.ceil(days);
			moments_past = moments_past + ( moments_past==1 ? ' day':' days' );
			moments_past = moments_past +  " ago";
			
			}
			return moments_past;
		}
		,parseIt:function(s){
		
				/* 
				*
				*  http://stackoverflow.com/questions/9852224/parse-date-in-ie
				*
				*/
			
			   var months = {Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, 
			                 Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11};
			
			   // Split the string up 
			   var s = s.split(/[\s:]/);
			
			   // Create a date object, setting the date                
			   var d = new Date(s[7], months[s[1]], s[2]);
			
			   // Set the time
			   d.setHours(s[3], s[4], s[5], 0);
			
			   // Correct the timezone
			   d.setMinutes(d.getMinutes() + Number(s[6]) - d.getTimezoneOffset());
			
			   // Done 
			   return d;
		}
		,create_embed_code_for_sharing:function(){
		
						/*
						* OLD FLASH EMBED
						var embed_code = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="400" height="350" id="widget400x350" align="middle">\
							<param name="movie" value="/flash/widget400x350.swf?artistid=' + window.userId   + '" />\
							<param name="quality" value="high" />\
							<param name="bgcolor" value="#cccccc" />\
							<param name="play" value="true" />\
							<param name="loop" value="true" />\
							<param name="wmode" value="window" />\
							<param name="scale" value="showall" />\
							<param name="menu" value="true" />\
							<param name="devicefont" value="false" />\
							<param name="salign" value="" />\
							<param name="allowScriptAccess" value="sameDomain" />\
							<embed src="/flash/widget400x350.swf?artistid="' +  window.userId   + '" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="400" height="350"></embed>\
							</object>\
						';						
						
						
						*
						*/ 
						
						var size;
										
						switch(window.unit){
							case "1": size ='320x480'; break; // Mobile
							case "2": size ='400x300'; break; // Web Player
							case "3": size ='300x250'; break; // Interactive Ad Unit
							case "4": size ='600x500'; break; // Mini-Website
						};
		
						if( window.unit  == 1){
							var embed_code = '<script type="text/javascript" language="Javascript" src="http://cdn.republicproject.com/user/' +  window.userId  + '/deploy/embed/400x300.js"></script>';
						}else{
							var embed_code = '<script type="text/javascript" language="Javascript" src="http://cdn.republicproject.com/user/' +  window.userId  + '/deploy/embed/' + size + '.js"></script>';
						};
		
		
						$('#embedWrapper').val(embed_code);
						
						
						
						$("#embedWrapper").click(function(){
							$("#embedWrapper").select();
						});		
						
						
						
						
						$('#facebookShareBtn').click(function(){
							
								app.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'SHAREDIALOGUE_FACEBOOK'
								});
								
								window.open('http://www.facebook.com/sharer.php?u='+urlToShare);
						});
						
						$('#twitterShareBtn').click(function(){
							
								app.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'SHAREDIALOGUE_TWITTER'
								});
															
								
								var link = 'http://twitter.com/intent/tweet?text=' + encodeURIComponent( window.hashtag + ' http://' + window.urlToShare); 
								
								window.open(link); 
							
						});						
						
		}
		,warning:function(){
			$('#warning_msg_overlay').show();
			$('.warning-wrapper').height(arguments[0].boxHeight).width(arguments[0].boxWidth);
			$('.warning-content').css({
			background: arguments[0].backgroundColor,
			border: arguments[0].borderSize + ' solid ' + arguments[0].borderColor,
			padding: arguments[0].boxPadding,
			'font-size': arguments[0].fontSize
			}).children('p.body_msg').html(arguments[0].msg);
			setTimeout(function() {
			$('#warning_msg_overlay').hide();
			}, arguments[0].duration);			
		}
		,inArray:function(needle, haystack) {
		    var length = haystack.length;
		    for(var i = 0; i < length; i++) {
		        if(haystack[i] == needle) return true;
		    }
		    return false;
		}
		

		/* TABS
		*
		*  
		*
		*/

		,showvideos:function(){
			
			this.youtube_video_obj = {};
		
			$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/videos.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
					
		
						var count = 0;
			
						$(xml).find('item').each(function(){
							
							var videoId = $(this).find('id').text();
							var userid = $(this).find('userid').text();
							var url = $(this).find('url').text();
							var title = $(this).find('title').text();
							var description = $(this).find('description').text();
							var provider = $(this).find('provider').text();

							var youtube_id = app.value_of_parameter( 'v', frompath = url );
							
							var thumbPath = "http://img.youtube.com/vi/"  + youtube_id +   "/1.jpg";
							
							app.youtube_video_obj[youtube_id] = {
																	title: title,
																	description: description
																};
		
							var videos_box = $('\
									<div class="videoInnerItemHolder navLink "   youtube_id="' +  youtube_id  + '" controller="videoDetails" >\
										<div   class="video_item_left" >\
												<div class="videoThumbWrapper"   >\
													<div class="videoThumb">\
														<img src="' + thumbPath + '" />\
													</div>\
												</div>\
												<div class="videoLabelWrapper"  >\
														<div class="videoLabel" style="font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;text-overflow: ellipsis;">\
															' + title + '\
														</div>\
														<div class="albumInfo" style="font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;text-overflow: ellipsis;">\
															' + description + '\
														</div>\
												</div>\
										</div>\
										<div   class="video_item_right "  >\
												<a id="arrow_'+count+'" class="videoplay_link playHolder">\
													<img src="/mobile/images/images-music/play.png" />\
												</a>\
										</div>\
									</div>\
									<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
							');
				
		
							$('#vidListContainer').append(videos_box);
							
							count++;
							
							
						});
						
			
						app.adjust_slideUpDownHeight();					
		
						$('.videoLabelWrapper').width( $('.video_item_left').width() - $('.videoThumbWrapper').width() -20)
						
						app.adjustScrollPanel();				
										
					}
					
					
					
			});	
			

			
		}		
		,showvideosdetails:function(){
		
					switch(window.unit){
						case "1": { // Mobile
							
										$('#iframe_video').height(window.widget_height - 196);
						
						}; break;
						case "2":  {// Web Player
							
										$('#iframe_video').height(210);		
									
						}; break; 
						case "3":  {// Interactive Ad Unit
							
										$('#iframe_video').remove();
										$('#video_container').append("<iframe frameBorder='0' allowfullscreen style='height:130px' ></iframe>");	
										$('iframe').attr({
										  id: 'iframe_video',
										  src: 'http://www.youtube.com/embed/' +  youtube_id_selected  + '?controls=0&showinfo=0&autoplay=1'
										});
										
								
										$('#shareVideoOnTwitter').attr('src', '/mobile/images/twitter_small.png');
										$('#shareVideoOnFacebook').attr('src', '/mobile/images/facebook_small.png?v4');
										
						}; break;
						default:  {
							
										$('#iframe_video').height(window.widget_height - 196);							
						
						}; break;
					};
		
					$('#iframe_video').attr('src', 'http://www.youtube.com/embed/' +  youtube_id_selected  + '?wmode=transparent&rel=0&controls=0&showinfo=0&autoplay='+video_autoplay);
					
					// http://stackoverflow.com/questions/4146832/getting-youtube-embed-video-code-from-a-youtube-link
					
					$('.share_video').click(function(event) {
							$('.shareVideoOverlay').toggle();	
					});	
					
					$('#currently_playing').text(this.youtube_video_obj[youtube_id_selected].title);
					
					
					app.googleAnalytics({
						 'type'				:'pageviews'
						,'section'		:'VIDEOS_VIEWING'
						,'unique_desc': app.youtube_video_obj[youtube_id_selected].title  + '_YOUTUBEID:'  + youtube_id_selected
					});
					
					
					$('#tweet_video_link').attr('href','http://twitter.com/home?status=' +  this.youtube_video_obj[youtube_id_selected].title +' - http://www.youtube.com/embed/' +  youtube_id_selected)
						.click(function(event) {
								app.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'TWEET_YOUTUBE_' + app.youtube_video_obj[youtube_id_selected].title  + '_YOUTUBEID:'  + youtube_id_selected
								});
						});	
					
					
					$('#facebook_video_link').attr('href','https://www.facebook.com/sharer/sharer.php?u=http://www.youtube.com/embed/' +  youtube_id_selected)
						.click(function(event) {
								app.googleAnalytics({
									 'type'			:'events'
									,'category'	:'EXIT'
									,'action'		:'CLICK'
									,'label'		:'FACEBOOKSHARE_YOUTUBE_' + app.youtube_video_obj[youtube_id_selected].title  + '_YOUTUBEID:'  + youtube_id_selected
								});
						});	

					
					$('#cancel_video_share').css({cursor:'pointer'}).click(function(event) {
							$('.shareVideoOverlay').hide();
					});	
					
					$('#grab_video_share').css({cursor:'pointer'}).click(function(event) {
							alert('');
					});						
					
					
		}
		,show_merch: function(){
			
			var  count
					,merch_box = '';
			
			$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/packages.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
					
						$(xml).find('item').each(function(){
		
							var  title = $(this).find('title').text()
									,id = $(this).find('id').text()
									,imageurl = $(this).find('imageurl').text()
									,description = $(this).find('description').text()
									,price = $(this).find('price').text()
									,buyinfo = $(this).find('buyinfo').text()
									,asin = $(this).find('asin').text()
									,buylink = $(this).find('buylink').text();
									
									
									title  = title.substring(0, 34);
		
									merch_box += '\
																				<div class="merchItemHolder navLink "  merchId=' + id   + '  controller="merchDetails"   style="cursor:pointer;"  >\
																						<div   style="width:90%;float: left;white-space:nowrap" >\
																								<div class="musicIconHolder" style="float: left;">\
																										<img src="' +  imageurl  + '" width="36" height="36"  />\
																								</div>\
																								<div class="merchLabelHolder"   style="float: left;"  >\
																										<div class="merchNameContainer" style="font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;clear:both;text-overflow: ellipsis;">\
																											' +   title + '\
																										</div>\
																										<div class="priceNameContainer" style="font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;text-overflow: ellipsis;">\
																											Price: ' +  price  + '\
																										</div>\
																								</div>\
																						</div>\
																						<div   style="width:10%;float: left" >\
																							<a  id="arrow_'+count+'"   class="merchPlayHolder" style="float: right">\
																								<img src="/mobile/images/images-merch/play.png" />\
																							</a>\
																						</div>\
																				</div>\
																				<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
									';
							
									count++;
							
						});		
						
						
						$('.merchWrapper').append(merch_box);
	
						//app.adjust_slideUpDownHeight();
						
						app.adjustScrollPanel();			
						
						
										
						$('.merchLabelHolder').css({width:window.widget_width - 150})							
				
		
					},
					error: function(data) {	
						alert(JSON.stringify(data));
					}
			});	
		}
		,showmerchdetails:function(){
			
			var  doOnce  = 0
					,doOnce2 = 0;
		
			$.ajax({
			    type: "GET",
			    url:  '/user/' + window.userId + '/deploy/data/packages.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							
												var title = $(this).find('title').text();
												var id = $(this).find('id').text();
												var imageurl = $(this).find('imageurl').text();
												var description = $(this).find('description').text();
												var price = $(this).find('price').text();
												var buyinfo = $(this).find('buyinfo').text();
												var asin = $(this).find('asin').text();
												var buylink = $(this).find('buylink').text();
												
												if(id == window.merchId_selected ){
													
															$('#merch_img').attr('src', imageurl);
															$('#title_div').css({'font-size':app.font_size_unit[window.unit]['big']}).text(title)
															$('#price_div').text(price)
															$('#description_div').text(description)
															$('#album_info_div').text(description);
													
															if( doOnce == 0){
																
																	doOnce = 1;
																	
																	app.googleAnalytics({
																		 'type'				:'pageviews'
																		,'section'		:'MECHANDISE_DETAILS'
																		,'unique_desc': title
																	});
																	
																	if( buyinfo !=''){
																		$('#buyinfo_div').show()
																		$('#buyinfo').attr('href', buyinfo)
																		.click(function(event) {												
																	
																				app.googleAnalytics({
																					 'type'			:'events'
																					,'category'	:'EXIT'
																					,'action'		:'CLICK'
																					,'label'		:'MERCHADISE_BUYLINK_' + title
																				});
																	
																	
																	});													
							
															};
																						
												};
					
													
												if( doOnce2 == 0){
													
														doOnce2 = 1;
														
														$('#share_merch').css({cursor:'pointer'}).click(function(event) {
															
																app.googleAnalytics({
																	 'type'			:'events'
																	,'category'	:'EXIT'
																	,'action'		:'CLICK'
																	,'label'		:'MERCHANDISE_SHARE_' + title
																});
														
																window.open('http://www.facebook.com/sharer.php?u='+buyinfo);
														});			
																								
												};
								
								
							};
							
							
							if( $('#description_div').height() > 0){
									$('.scroll-pane-arrows').jScrollPane({
										showArrows: true,
										horizontalGutter: 10
									});
									
									$('.jspVerticalBar').css({visibility:'visible'});									
							};
			
		
						});		
						
					}
			});
			


			app.adjust_slideUpDownHeight();			
			
		
			

			
		}	
		,show_theaters:function(){
		
			switch(window.unit){
				case "1": { // Mobile
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	
				};	break; 
				case "2": {// Web Player
					
				};	break; 
				case "3": { // Interactive Ad Unit
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	
					
				};	break;
				case "4": { // Mini-Website
					$('#theaters').css({
							height:window.widget_height-123
					});				
				};	break; 
			};
			
			
			$('#theatersZipCode').keypress(function(event){
				if(event.which == 13 ){
					$('#go_theater_btn').click();
				};
			});
			
			
			
			app.adjust_slideUpDownHeight();	
			
			$('#go_theater_btn').live('click',function(event) {
				
				app.googleAnalytics({
					 'type'				:'pageviews'
					,'section'		:'THEATERS_SEARCH'
					,'unique_desc':$('#theatersZipCode').val()
				});				
			
			  var feed = new google.feeds.Feed("http://www.fandango.com/rss/moviesnearme_"+ $('#theatersZipCode').val());
			  
			  feed.setNumEntries(15);
			  
			  feed.load(function(result) {	
			  		
				    if (!result.error) {
				    	
				    	var feed_length = result.feed.entries.length;
				    	
				    	var theaters = [];
			
				      for (var i = 0; i < feed_length; i++) {
				      	
				      		var theater = {};
				      	
				        	var entry = result.feed.entries[i];
			
				          theater.name = entry.title;
				          
				          theater.link = entry.link;
				        
				          var content = entry.content;
			
			  					$('#storageDiv').html('').append(content);
			  					
						    	theater.address = $('#storageDiv').children('p:nth-child(1)').text();
				          
				          theater.movies = [];		
				          
						    	$('#storageDiv').find('li').each(function(event) {
						    		
						    				theater.movies.push($(this).text());
			
						    	});				         	
				          
				          var number_of_movies = theater.movies.length;
				          
				          if( number_of_movies > 0 ){
				          	
				          	theaters.push(theater);
				          	
				          };
			
				      }
				      
				    };
				    
				    app.theaters = theaters;
				    
				    var collectionOfTheatersRows = '';
			
				    for( theater in theaters){
				    	
				    	collectionOfTheatersRows = collectionOfTheatersRows + "\
				    	<div  class='theater_names_wrapper play_arrow'    theater-num='" + theater + "'   style='cursor:pointer;border-bottom:1px solid black'    >\
				    			<div   style='float:left;width:92%'  >\
							    	<div  class='theater_ticket_images'    >\
							    						<img src='images/images-theaters/ticketLogo.png' />\
							    	</div>\
							    	<div  class='theater_names_right_wrapper ' >\
												    	<div  class='theater_names '    style='font-size: " + app.font_size_unit[window.unit]['big'] + "px;'    >\
													    	" + theaters[theater].name + "\
												    	</div>\
												    	<div  class='theater_address '    style='font-size: " + app.font_size_unit[window.unit]['small'] + "px;'     >\
													    	" + theaters[theater].address + "\
												    	</div>\
							    	</div>\
				    			</div>\
						    	<div   style='float:left;width:8%;'  >\
						    						<img src='images/images-merch/play.png' />\
						    	</div>\
						  </div>\
						  <div style='height: 1px; background:#2F2F2F; '> &nbsp; </div>\
				    	";
				    	
				    };
				    

//				    
//				    $("#theaters").remove();
//				    
//				    $('.theatersContainer').html("\
//				    	<div id='theaters'  class='scroll-pane-arrows slideUpDown'  ></div>\
//				    ");
//				    
//				    
				    
				     $("#theaters").children().remove();
				    
				    
						$("#theaters").append(collectionOfTheatersRows);
						
							
							
						$('.scroll-pane-arrows').height(app.scrollPaneAarrows[window.unit]);						
							
						$('.scroll-pane-arrows').jScrollPane({
							showArrows: true,
							horizontalGutter: 10
						});
						
						$('.jspVerticalBar').css({visibility:'visibile'});							

			
						
						
						
			  });
			  
			  
			  
				    		  

			});	
			

				
			$('.play_arrow').live('click', function(event) {
			
						var indexOfTheater = $(this).attr('theater-num');
						
						app.temp = {
							name:app.theaters[indexOfTheater].name,
							address:app.theaters[indexOfTheater].address,
							movies:app.theaters[indexOfTheater].movies,
							link:app.theaters[indexOfTheater].link
						};
						
						$('#panel-3')
						.load( '/mobile/widget_controllers/theaters_details.html?random=' + Math.floor(Math.random()*999999999), function(e){
					
							$('#contentWrapper').scrollTo( $('#panel-3'), 500);
							
						})
						
			});
			
	
		
		}		
		,show_theaters_details: function(){
			
			switch(window.unit){
				case "1": { // Mobile
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	
				};	break; 
				case "2": {// Web Player
				};	break; 
				case "3": { // Interactive Ad Unit
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	

				};	break;
				case "4": { // Mini-Website
					$('#theaters').css({
							height:window.widget_height-123
					});				
				};	break; 
			};
			
		app.adjust_slideUpDownHeight();	
		
		var geo = '';
		var geocoder = new google.maps.Geocoder();
		
		
		if (geocoder) {
			
		  geocoder.geocode({ 'address': this.temp.address }, function (results, status) {
		
		     if (status == google.maps.GeocoderStatus.OK) {
		
		     	geo = results[0].geometry.location.toString();
		     	
		     	geo = geo.replace('(','');
		     	geo = geo.replace(')','');
		     	geo = geo.replace(' ','');
		
		     	app.temp.map = 'http://maps.googleapis.com/maps/api/staticmap?center=' + app.temp.address + '&zoom=14&size=80x80&maptype=roadmap&markers=' + geo + '&sensor=false';
		
					$("#theaters_details").html('').append("\
						<div  class='ot '   style='padding:10px;box-sizing:border-box;'  >\
							<img   style='border:3px solid black'  src='" + app.temp.map + "' />\
							<a  id='theater_buylink' href='" +  app.temp.link + "' target='_blank' ><img   src='images/images-theaters/getTickets.png' /></a>\
						</div>\
						<div   class='tt ' style='padding:10px; padding-left:15px;box-sizing:border-box' >\
							<div   style='margin-bottom:5px;font-size:11px;color:#02D0BE'  >Event Name:</div>\
							<div   style='margin-bottom:10px;border-bottom:1px solid gray;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;	'  >" +  app.temp.name  +"</div>\
							<div   style='margin-bottom:5px;font-size:11px;color:#02D0BE'  >Additional Event Information:</div>\
							<div   style='font-size:11px;color:gray'  >" +  app.temp.address  +"</div>\
						</div>\
					");		
					
					
					app.googleAnalytics({
						 'type'				:'pageviews'
						,'section'		:'THEATERS_DETAILS'
						,'unique_desc':app.temp.name
					});
					 	
					$('#theater_buylink').click(function(event) {	
							app.googleAnalytics({
								 'type'			:'events'
								,'category'	:'EXIT'
								,'action'		:'CLICK'
								,'label'		:'THEATER_BUYLINK_'  + app.temp.name
							});	
					});	
					 	
		
		     };
		     
		  });
		  
		} 		
		
		
		
		$('.scroll-pane-arrows').jScrollPane({
			showArrows: true,
			horizontalGutter: 10
		});
		
		$('.jspVerticalBar').css({visibility:'visibile'});	
		
		
		
		
			//			    	for( movie in theaters[theater].movies){
			//			    		count++;
			//			    		$("#theaters").append("<div  class='theater_movies '   style='padding-left:40px'  >" + count + ') ' + theaters[theater].movies[movie] + "</div>");
			//			    		
			//			    	};
		}
		,showmusic: function(){
			
			
			window.count_music = 0;
			
			var music_list = '';
			
			$.ajax({
			    type: "GET",
			    url:  '/user/' + window.userId + '/deploy/data/music.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('Song').each(function(){
							
							var musicId = $(this).find('musicid').text();
							var ASIN = $(this).find('ASIN').text();
							var songname = $(this).find('songname').text();
							var albumname = $(this).find('albumname').text();
							var albumurl = $(this).find('albumurl').text();
							var albuminfo = $(this).find('albuminfo').text();
							var cover = $(this).find('cover').text();
							var isfree = $(this).find('isfree').text();
							var ringurl = $(this).find('ringurl').text();
							var songurl = $(this).find('songurl').text();
		
		
							var music_box = '\
												<div class="musicItemHolder"   style="clear:both"  >\
													<div class="musicItemContainer">\
															<!--  --><div   style="width:65%;float: left;white-space:nowrap" >\
																<span class="navLink" musicId='+ musicId +'   controller="musicDetails"  style="cursor:pointer;float: left;display: inline-block ">\
																	<div class="musicIconHolder">\
																		<div class="musicImageWrapper">\
																			<img src="' + cover +  '" width="36" height="36" onError=$(this).attr("src", "/mobile/images/images-music/imageNotFound.png") />\
																		</div>\
																	</div>\
																	<div style="float: left; margin-left: 3px; margin-right: 2px; margin-top: -8px;">\
																		<img src="/mobile/images/images-music/dividerLeft.png" />\
																	</div>\
																</span\
																<span class="musicLabelHolder" style="float: left;display: inline-block ">\
																		<div class="songNameContainer navLink"  musicId='+musicId+' controller="musicDetails" style="cursor:pointer;font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;  text-overflow: ellipsis;">'+ songname +'</div>\
																		<div class="albumNameContainer navLink"  musicId='+musicId+' controller="musicDetails" style="cursor:pointer;font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;text-overflow: ellipsis;">' + albumname +  '</div>\
																</span>\
															<!--  --></div>\
															<!--  --><div style="width:35%;float: left; white-space:nowrap" >\
																	<span>\
																		<a style="float: right;" class="navLink musicPlayHolder" musicId='+musicId+' controller="musicDetails" >\
																			<img src="/mobile/images/images-music/play.png" />\
																		</a>\
																	</span>\
																	<span   style="float: right;"  class="soundHolder" id='+ musicId +' >\
																		<a href="javascript: void(0);" onclick=app.playMusicFromList(' +  window.count_music  + ')  >\
																			<img src="/mobile/images/images-music/sound.png" />\
																		</a>\
																	</span>\
															<!--  --></div>\
													</div>\
												</div>\
												<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
							';
							
							music_list += music_box;
							
							window.count_music++;	
		
						});
						
						$('.musicWrapper').append(music_list);
						
						$('.musicLabelHolder, .musicLabelHolder div').width(window.widget_width-200);
						
						app.adjustScrollPanel();					
						
					}
			});
		}
		,showmusicdetails: function(){
		
			var  music_number = new Array()
					,count_musics = 0
					,doOnce = 0;
		
			$.ajax({
			    type: "GET",
			    url:  '/user/' + window.userId + '/deploy/data/music.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('Song').each(function(){
							
							z
							var musicid = $(this).find('musicid').text();
							var ASIN = $(this).find('ASIN').text();
							var songname = $(this).find('songname').text();
							var albumname = $(this).find('albumname').text();
							var albumurl = $(this).find('albumurl').text();
							var albuminfo = $(this).find('albuminfo').text();
							var cover = $(this).find('cover').text();
							var isfree = $(this).find('isfree').text();
							var ringurl = $(this).find('ringurl').text();
							var songurl = $(this).find('songurl').text();
							
							music_number[count_musics] = musicid;	
		
							if(musicid == window.musicId_selected ){
								
								$('#music_img').attr('src', cover)		
								$('.musicName').text(songname)
								$('.albumName').text(albumname)
								$('.albumInfo').text(albuminfo);
								
								if( doOnce == 0){
									
											doOnce = 1;	
											
											app.googleAnalytics({
												 'type'				:'pageviews'
												,'section'		:'MUSIC_DETAILS'
												,'unique_desc':songname
											});											
																		
											$('#amazon_link')
											.click(function(event) {
												
			
															
															app.googleAnalytics({
																 'type'			:'events'
																,'category'	:'EXIT'
																,'action'		:'CLICK'
																,'label'		:'MUSIC_BUYLINK_' + songname
															});
			
												
											})
											.attr('href', $('#amazon_link').attr('href')+ASIN);	
						

								};
								
								window.music_index = count_musics;
								
							};
							
							count_musics++;
		
						});		
						
						/* 
						*
						*  Pass music_id to previous and next button
						*
						*/
		
						if( window.music_index == 0 ){
							var previous_music_index = music_number.length - 1;
						}else{
							var previous_music_index = window.music_index - 1;
						};
						
						if( window.music_index == music_number.length - 1){
							var next_music_index = 0;
						}else{
							var next_music_index = window.music_index  + 1;
						};
		
		
						$('.prev_a_link').attr('musicId', music_number[previous_music_index])
						
						$('.next_a_link').attr('musicId', music_number[next_music_index])
						
						
					}
			});
			
			app.adjust_slideUpDownHeight();
			
			if((navigator.userAgent.match(/iPhone/i)) || 
			 (navigator.userAgent.match(/iPod/i))) {
				
						$('#filler').height(150).html('\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
						')
				
			};
			
			$('.scroll-pane-arrows').jScrollPane({
				showArrows: true,
				horizontalGutter: 10
			});
			
		
		}	
		,showphotos: function(){
		

			$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/photos.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							
							var url = $(this).find('url').text();
							var photoid = $(this).find('photoid').text();
							var title = $(this).find('title').text();
							var description = $(this).find('description').text();
							var category = $(this).find('category').text();
							var dateupdated = $(this).find('dateupdated').text();
							
		
							/* 
							*
							*  Add New Ribbon if image is posted within 7 days
							*
							*/
							var right_now_in_miliseconds = Date.now();
							var dateupdated = new Date(dateupdated);
							var dateupdated_in_miliseconds = dateupdated.getTime();
							var miliseconds_past_since_image_is_posted = right_now_in_miliseconds - dateupdated_in_miliseconds
							var seven_days_in_miliseconds = 7 * 24 * 60 * 60 * 1000; // within 7 days
		
							if ( seven_days_in_miliseconds >  miliseconds_past_since_image_is_posted){
									new_ribbon =  '\
									 				<div style="margin-left: 48px; top: -68px; z-index: 100; position: relative; cursor: pointer;" onclick="displayPhoto(' + photoid + ')">\
														<img src="/mobile/images/images-photos/newTag.png" />\
													</div>\
											';						
							}else{
									new_ribbon = '';
							}
		
		
							// border-bottom: 1px solid #545554; border-right: 1px solid #545554;
		
							var image_box = $('\
								<div class="addFloatLeft photo_box" style="margin-top: 10px; width: 86px; height: 70px; background: url(\'' +   '/mobile/images/images-photos/imageContainer.png\'); margin-left: 15px;">\
									<div style="margin-top: 6px; margin-left: 6px; z-index: 1; height: 58px; width: 74px; text-align: center;">\
										<a  class="navLink" photoId=' +  photoid  + ' title="' + title +  '" controller="photosDetails">\
											<img src="' + url + '" width="74px" height="58px" onError="$(this).attr(\'src\', \'' + '/mobile/images/images-photos/imageNotFound.png\')" />\
										</a>\
									</div>\
									'+ new_ribbon +'\
								</div>\
							');
							
							$('#gallery').append(image_box);
		
						});		
						
						var  ml;
						switch(window.unit){ 
							case '1': // MOBILE
								ml=14;
							break;
							case '2': // WEB PLAYER
								ml=7;
							break;			
							case '3': // INTERACTIVE AD UNIT
								ml=7;
							break;										
							case '4': // MINI SITE
								ml=28;
							break;	
						}	
						
						$('.photo_box').css({'margin-left': ml +'px'})
						
						//.each( function(){	$(this).css({background:'#'+(Math.random()*0xFFFFFF<<0).toString(16)});});
						//app.adjust_slideUpDownHeight();
						
						
						app.adjustScrollPanel();
						

					}
			});
			
		}
		,showphotodetail: function(){
		
			window.image_number = new Array();
			window.count_images = 0;
			
			var doOnce = 0;
		
			$.ajax({
			    type: "GET",
			    url:  '/user/' + window.userId + '/deploy/data/photos.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							
							var url = $(this).find('url').text();
							var photoid = $(this).find('photoid').text();
							var title = $(this).find('title').text();
							var description = $(this).find('description').text();
							var category = $(this).find('category').text();
							
							window.image_number[window.count_images] = photoid;	
		
							if(photoid == window.photoId_selected ){
								
								
								if( doOnce == 0){
									doOnce = 1;
									
										app.googleAnalytics({
											 'type'				:'pageviews'
											,'section'		:'PHOTOS_DETAILS'
											,'unique_desc':title
										});											
									
								};
		
								$('#image_detail').width(window.widget_width).attr('src',url)		
								$('#image_description').text(description)
								$('#image_title').text(title)
								$('.overlay_image_detail').html(title)
								
								window.image_index = window.count_images;
							};
							
							window.count_images++;
		
						});		
						
					/* 
					*
					*  Pass photo_id to previous and next button
					*
					*/
		
					if( window.image_index == 0 ){
						var previous_image_index = window.image_number.length - 1;
					}else{
						var previous_image_index = window.image_index - 1;
					};
					
					if( window.image_index == window.image_number.length - 1){
						var next_image_index = 0;
					}else{
						var next_image_index = window.image_index  + 1;
					};
		
					$('.prev_a_link').attr('photoId', window.image_number[previous_image_index])
					
					$('.next_a_link').attr('photoId', window.image_number[next_image_index])
					
						
					}
					
			});
			
			$('#inside_content').css({'overflow-y':'auto'}).height(window.widget_height - app.panel_height_unit[window.unit][window.isSlideDown]);

			$('#inside_content').hover(function(event) {
						$('.overlay_image_detail').fadeToggle();
			})

			
	
		}
		,fixphotodetail:function(){
		
		$("#image_detail").on("load", function(){
		
				switch(window.unit){
					case "1": {// Mobile
		
		
						if( $('#image_detail').width() >= $('#image_detail').height()){
		
							if( $('#image_detail').width() >= $('#inside_content').width()){
								if( $('#image_detail').height() >= $('#inside_content').height()){
									$('#image_detail').css({height:$('#inside_content').height()*.95, width:'auto'});
								}else{
									$('#image_detail').css({width:$('#inside_content').width(), height:'auto'});
								};
								
							};
							
						}else{
							// console.log($('#inside_content').height());
							$('#image_detail').css({height:$('#inside_content').height()*.95, width:'auto'});
						};
						
						
		
					}; break; 
					case "2": {// Web Player
						
							$('#image_detail').css({height:$('#inside_content').height()-10, width:'auto'})
		
					}; break; 
					case "3": { // Interactive Ad Unit
						
		
							$('#image_detail').css({
									height:$('#inside_content').height()-5, 
									width:'auto'
								});
		
					}; break;
					case "4": {// Mini-Website
						
							$('#image_detail').css({height:$('#inside_content').height()-10, width:'auto'});
					
						
					}; break;
				};
				
			
				if( window.unit != 3 && window.unit != 2){
						
						var marginTop = ($('#inside_content').height() - $('#image_detail').height()) /2;
						$('#image_detail').css({'margin-top':marginTop+'px'});						
						
					
				};
								
				
		});
		}		
		,showconnect:function(){
		
//			if( window.unit != 3 && window.unit != 2 ){
//				$('#feed').css({
//						width:window.widget_width,
//						height:window.widget_height-232
//				})
//			}else{
//				$('#feed').css({
//						width:window.widget_width,
//						height:window.widget_height-182
//				})
//			};	
									

			//$('.slideUpDown').css({'overflow-y':'auto'}).height(window.widget_height - app.panel_height_connect_tab_unit[window.unit][window.isSlideDown]);

			this.connectIsClicked = 1;
		
		 	this.show_tweets();
		 	
		 	
		 	var that = this;			
		
			$('#innerConnectContainer a').css({cursor:'pointer'}).click(function(event) {
				
					event.preventDefault();
				
					$('.menuItemContainer').removeClass('active');
					$(this).parent().addClass("active");

					
					$('#feed').remove();
					
					$('.feedContainer').html("\
						<div id='feed'  class='scroll-pane-arrows slideUpDown' style='display: block; background: #131313; overflow-y:auto;overflow-x:hidden'  >\
					 	</div>\
					");
					
					//$('.slideUpDown').css({'overflow-y':'auto'}).height(window.widget_height - app.panel_height_connect_tab_unit[window.unit][window.isSlideDown]);

					switch($(this).attr('feed')){
						case "tweets": that.show_tweets();	break;
						case "mentions": that.show_mentions();break;
						case "facebook": that.show_facebook_feeds();		break;
					}		
						
		
			});
			
			$('.tweetTextArea').corner('8px');
			
		
			if( window.unit == 3){
				$('.menuItemContainer').width(100);
			};
		}
		,show_tweets: function(){
			
			app.googleAnalytics({
				 'type'				:'pageviews'
				,'section'		:'twitter_feeds'
				,'unique_desc':''
			});			
			
			var that = this;
			
			$.ajax({
			    type: "GET",
			    url: 'http://twitter.com/status/user_timeline/' +  window.twitter  + '.json?count=10&callback=?',
			    dataType: "jsonp",
			    error:function(data) {
			    		// console.log('twitter failure');
			    },
					success: function(data) {
		
						$.each(data, function(key, tweet) {
							
					    tweeted_text = tweet.text;
					    profile_image_url = tweet.user['profile_image_url'];
					    created = tweet.created_at;
					    
							created_ = new Date(app.parseIt(created));
		
					   	created_formated = created_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");					    	
		
							/* 
							*
							*  app.parseIt() needed to fix date issues in IE
							*
							*/
		
							moments_past = app.get_moments_past(  app.parseIt(created) );
		  
							tweet_segment = $('\
							<div class="feedItemContainer">\
								<div class="avatarContainer">\
									<div class="outerAvatarContainer">\
										<div class="innerAvatarContainer">\
											<img src="' + profile_image_url   + '" />\
										</div>\
										<div class="durationContainer addFontWeightBold">' +  moments_past  + '</div>\
									</div>\
								</div>\
								<div class="addOverflowHidden addMargin10">\
									<div class="twitterContent"   style="font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
									<div class="twitterContentTimeStamp addFontSize10"   style="font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;text-align:left;"  >' +  created_formated  + '</div>\
									<div class="authorContainer addTextAlignRight">by ' +  window.twitter  + '</div>\
								</div>\
								<div class="addClearBoth"></div>\
							</div>\
							<div class="itemBorder"> &nbsp; </div>\
							');
							
							$('#feed').append(tweet_segment);
					   
					   
					  });
							
							
				  	$('#feed').linkify();	
				  	
						$('.scroll-pane-arrows').height(app.scrollPaneArrowsConnectTabUnit[window.unit]);
						
						$('.scroll-pane-arrows').jScrollPane({
								showArrows: true,
								horizontalGutter: 10
							});
						
						
					
						if( window.unit == 2 || window.unit ==3){		
							if( that.connectIsClicked == 1){
								that.connectIsClicked = 0;
								$('.jspVerticalBar').css({visibility:'hidden'});
							};							
							
						};

					}
			});	
			
		}		
		,show_mentions: function(){
			
			
				app.googleAnalytics({
					'type'				:'pageviews'
					,'section'		:'twitter_mentions'
					,'unique_desc':''
				});		
			
				$.ajax({
					type: "GET",
				   url: 'http://search.twitter.com/search.json?q=' +  window.twitter  + '&rpp=100&callback=?',
				   dataType: 'jsonp',
				   success: function(data){ 
				
								$.each(data['results'], function(key, tweet) {
				
							    tweeted_text = tweet['text'];
							    profile_image_url = tweet['profile_image_url'];
							    twitter_who_tweeted = tweet['from_user'];
							    created = tweet['created_at'];
							    
							    created_ = new Date(created)
							   	created_formated = created_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");					    
							    
									moments_past = app.get_moments_past( created );					    
				
									var tweet_segment = $('\
									<div class="feedItemContainer">\
										<div class="avatarContainer">\
											<div class="outerAvatarContainer">\
												<div class="innerAvatarContainer">\
													<img src="' + profile_image_url   + '"   />\
												</div>\
												<div class="durationContainer addFontWeightBold">' +  moments_past  + '</div>\
											</div>\
										</div>\
										<div class="addOverflowHidden addMargin10">\
											<div class="twitterContent"  style="font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
											<div class="twitterContentTimeStamp addFontSize10" style="font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;text-align:left;color:#CCCCCC" >' +  created_formated  + '</div>\
											<div class="authorContainer addTextAlignRight">by ' +  twitter_who_tweeted  + '</div>\
										</div>\
										<div class="addClearBoth"></div>\
									</div>\
									<div class="itemBorder"> &nbsp; </div>\
									');
									
									$('#feed').append(tweet_segment);
									
				        });
		    
								$('.scroll-pane-arrows').height(app.scrollPaneArrowsConnectTabUnit[window.unit]);
								
								$('.scroll-pane-arrows').jScrollPane({
										showArrows: true,
										horizontalGutter: 10
									});	
										
		
				        $('#feed').linkify();		        
									
				   }
				})
		}
		,show_facebook_feeds: function(){
			
				app.googleAnalytics({
					'type'				:'pageviews'
					,'section'		:'facebook_status'
					,'unique_desc':''
				});					
			
			  var feed = new google.feeds.Feed("https://www.facebook.com/feeds/page.php?format=atom10&id="+window.facebookID);
			  
			  feed.setNumEntries(15)
			  
			  feed.load(function(result) {
			  	
		    if (!result.error) {
		    	
		    	var  feed_length = result.feed.entries.length
		    	    ,feeds = '';
		    	
		      for (var i = 0; i < feed_length; i++) {
		      	
		        	var entry = result.feed.entries[i];
		        
		          var content = entry.content;
		          
		         	published = entry.publishedDate;   
					    
					    published_ = new Date(published)
					   	published_formated = published_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");              
		        
							var   oneFeed = document.createElement("div")
									, oneImageWithWrapper;
							
							oneFeed.id = 'oneFeed';
							oneFeed.style.float = 'left';
							
							$('#feed').append(oneFeed);
							
				      $('#oneFeed').html(content)
				      
		      		.find("a").each(function() {
				      	$(this).attr('target','_blank').removeAttr('href');
		      		})				      
				      
				      .find("img").each(function() {
				      	$(this).parent().wrap('<div id="imageWrapper" style="float:left"/>');
				      	oneImageWithWrapper = $(this).parent().parent().html();
				      	$(this).parent().remove();
		      		})
		      		
//							.not("a").each(function() {
//								
//										console.log( $(this).contents());
//								
//										var content = $(this).contents();
//										$(this).replaceWith(content);
//							});
		      		
		      		
		      		//console.log( $('#oneFeed').html());
		      		
		      		//console.log( oneImageWithWrapper);
		      		
		      		// console.log( $('#oneFeed').html());		
		      						
							var feed_segment = '\
							<div class="feedItemContainer"    style="padding:5px;height:auto;font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;margin-left:10px;text-align:left;color:#CCCCCC"   >\
								<div  class="image_container"   >' +  ( oneImageWithWrapper || '' ) + '</div>\
								<div   style="font-size:11px"  >' +   $('#oneFeed').html() + '</small></div>\
							</div>\
							<div   style="padding-left:5px;padding-top:8px;clear:both;font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;margin-left:10px;text-align:left;color:#CCCCCC;margin-bottom:5px"  >' + published_formated  + '\
							</div>\
							<div class="itemBorder"   style="margin-bottom:15px"  > &nbsp; </div>\
							';			      						
							
							feeds += feed_segment;
		      		
		      		$('#oneFeed').remove();			
		      		
		      		oneImageWithWrapper	= undefined;				

		      }
		      
					$('#feed').append(feeds);
					
					$('.feedItemContainer').each(function(event) {
							$(this).css({'min-height': $(this).children('img').height() +'px'})
					});	
					
					//$('#feed').linkify();
					
					$('.scroll-pane-arrows').height(app.scrollPaneArrowsConnectTabUnit[window.unit]);
					
					
					$('.scroll-pane-arrows').jScrollPane({
							showArrows: true,
							horizontalGutter: 10
						});
							
							
		    }


			    
			  });	
		}	
		,show_events: function(find_zipcode){
			var month_textualized = new Array(12);
			  
			  month_textualized[1] = 'Jan';
			  month_textualized[2] = 'Feb';
			  month_textualized[3] = 'Mar';
			  month_textualized[4] = 'Apr';
			  month_textualized[5] = 'May';
			  month_textualized[6] = 'Jun';
			  month_textualized[7] = 'Jul';
			  month_textualized[8] = 'Aug';
			  month_textualized[9] = 'Sep';
			  month_textualized[10] = 'Oct';
			  month_textualized[11] = 'Nov';
			  month_textualized[12] = 'Dec';
			  
				$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/events.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
			
							var eventsid = $(this).find('id').text();
							var userid = $(this).find('userid').text();
							var eventname = $(this).find('eventname').text();
							var imageurl = $(this).find('imageurl').text();
							var datetime = $(this).find('datetime').text();
		
							var firstSplit = datetime.split(':'); 
			
							dateIs = firstSplit[0].split('-');
		
							var month = month_textualized[ Math.ceil(dateIs[1]) ];
							var day = dateIs[2];
							
							day = day.split(' ')[0];
							
							var location = $(this).find('location').text();
							var eventinfo = $(this).find('eventinfo').text();
							var buylink = $(this).find('buylink').text();
							var date = $(this).find('date').text();
							var time = $(this).find('time').text();
							var country = $(this).find('country').text();
							var zipcode = $(this).find('zipcode').text();
		
																var events_box = $('\
												<div class="eventsItemHolder navLink"   eventsid=' +  eventsid  + '  controller="eventsDetails" style="padding-bottom:5px;">\
													<div class="eventsItemContainer  ">\
														<!--  --><div   style="width:90%;float: left;white-space:nowrap" >\
																<span class="dateHolder"  style="float: left;">\
																	<div class="monthHolder">' +  month  + '</div>\
																	<div class="dayHolder">' +  day  + '</div>\
																</span>\
																<span style="float: left; margin-left: 6px;">\
																	<img src="/mobile/images/images-merch/dividerLeft.png" />\
																</span>\
																<span class="eventsLabelHolder"  style="float: left;">\
																		<div class="eventsNameContainer" style="font-size: ' + app.font_size_unit[window.unit]['big'] + 'px;text-overflow: ellipsis;">\
																			' +  eventname + '\
																		</div>\
																		<div class="dateNameContainer" style="text-overflow: ellipsis;">\
																			<span style="font-size: ' + app.font_size_unit[window.unit]['small'] + 'px;color: #51C4FF;">' +  location  + '</span>\
																		</div>\
																 </span>\
														<!--  --></div>\
														<!--  --><div   style="width:10%;float: left;white-space:nowrap" >\
																<span style="float: right; ">\
																	<a class=" eventsPlayHolder">\
																		<img src="/mobile/images/images-merch/play.png" />\
																	</a>\
																</span>\
														<!--  --></div>\
													</div>\
												</div>\
												<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
																');
									
																$('.eventsWrapper').append(events_box);
														
							
						});		
						

						
						$('.eventsLabelHolder div').width(window.widget_width-180);
																
																
						app.adjustScrollPanel();
						
					}
			});	
		}
		,showeventsdetails: function(){
			
			var doOnce = 0;
			
			$.ajax({
			    type: "GET",
			    url:  '/user/' + window.userId + '/deploy/data/events.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							var eventsid = $(this).find('id').text()
									,userid = $(this).find('userid').text()
									,eventname = $(this).find('eventname').text()
									,imageurl = $(this).find('imageurl').text()
									,datetime = $(this).find('datetime').text()
									,eventinfo = $(this).find('eventinfo').text()
									,lat = $(this).find('lat').text()
									,long = $(this).find('long').text();
							
							datetime_ = new Date(datetime);
							// datetime_formated = datetime_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");
							
							var firstSplit = datetime.split(':'); 
							dateIs = firstSplit[0].split('-');
		
							var month = dateIs[1]
									,day = dateIs[2]
									,location = $(this).find('location').text()
									,eventinfo = $(this).find('eventinfo').text()
									,buylink = $(this).find('buylink').text()
									,date = $(this).find('date').text()
									,time = $(this).find('time').text()
									,country = $(this).find('country').text();
							
		
							if(eventsid == window.eventsId_selected ){
								
										if( doOnce == 0){
											
												doOnce = 1;			
												
															app.googleAnalytics({
																'type'				:'pageviews'
																,'section'		:'EVENT_DETAILS'
																,'unique_desc':eventname + '_' + datetime
															});					
																											
															if( buylink != ''){
																$('#buylink_div').show();
																$('#buylink').attr('href', buylink)
																.click(function(event) {
																			
																			app.googleAnalytics({
																				 'type'			:'events'
																				,'category'	:'EXIT'
																				,'action'		:'CLICK'
																				,'label'		:'EVENT_BUYLINK_' + eventname + '_' + datetime
																			});
																			
																});	
									
									
										};
																			
									
																
								}
		
								$('#eventname').css({'font-size':app.font_size_unit[window.unit]['big']}).text(eventname);
								$('#datetime').css({'font-size':app.font_size_unit[window.unit]['big']}).text(datetime);
								$('#location').css({'font-size':app.font_size_unit[window.unit]['big']}).text(location);
								$('#eventinfo').css({'font-size':app.font_size_unit[window.unit]['big']}).text(eventinfo);
								
								$('#map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center='+lat+','+long+'&zoom=12&size=95x95&maptype=roadmap4&sensor=false&markers=size:mid|color:red|label:A|'+lat+','+long);
								
							};
		
						});		
		
					}
			});
			
		
			$('#right_content').css({width:window.widget_width - 157});
			
			$('.scroll-pane-arrows').height(app.scrollPaneAarrows[window.unit]);						
				
			$('.scroll-pane-arrows').jScrollPane({
				showArrows: true,
				horizontalGutter: 10
			});
			
			$('.jspVerticalBar').css({visibility:'visibile'});						
			
		}
		,showbio: function(){
			

						
			$('.bioContent').text(window.about);
			$('.bioHeader').text(window.abouttitle);
			
						
			app.adjustScrollPanel('visible');
			

			
		}		
		,shownews: function(){
		
			$.ajax({
			    type: "GET",
			    url: '/user/' + window.userId + '/deploy/data/news.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
						
						var news_box = "";
						
						$(xml).find('item').each(function(){
				
										var newsId = $(this).find('id').text();
										var title = $(this).find('title').text();
										var date = $(this).find('date').text();
										var description = $(this).find('description').text();
										var url = $(this).find('url').text();
			
										news_box = news_box + "\
										<div>" +  title  +"\
										</div>\
										<div>" +  date  +"\
										</div>\
										<div>" +  description  +"\
										</div>\
										<div   style='border-bottom:1px solid white;'  >" +  url  +"\
										</div>\
										";
										
									});		
									
					$('#newsWrapper').append(news_box);
					
					app.adjust_slideUpDownHeight();	
		
		
		}});
		}
		,showcustom: function(){
			$('.subHeaderTitle').text(app.tab);
			$('#custom').html(this.custom_html);
			
			setTimeout(function(){
				app.adjust_slideUpDownHeight();					
				app.adjustScrollPanel();					
			}, 1000);

			
				
		}
		
	};
	
	
}(this);



/* 
*
*  THE FOLLOWING ARE LEFT OVER FUNCTIONS THAT MAY NOT EVEN BE USED
*
*/
function togglePost(){

if ($('.postInnerContainer').css('display') == 'block') { 	
$('.postInnerContainer').css('display', 'none');
}
else { 
$('.postInnerContainer').fadeIn(300, function(){
$('.postInnerContainer').show();
}); 
}



return;
};
function determineCharRemaining(){
var curCount = 140 - parseInt($(".tweetTextArea").val().length);
if (curCount >= 0)
{
$("#charCount").html(curCount);
}
if (curCount <= 0)
{
var text = $(".tweetTextArea").val();
text = text.substring(0, 140);
$('.tweetTextArea').val(text);
}

// hack for jquery mobile (google chrome issue)
$('.trigger').css('display', 'none');
$('.trigger').fadeIn(100, function(){
$('.trigger').css('display', 'block');
});

return;
};
function changeValues(index){	
var prevIndex = '';
var currentIndex = parseInt(index);
var nextIndex = '';
if (currentIndex == 0){
if (musicArr.length > 1) { 
prevIndex = musicArr.length-1;
nextIndex = parseInt(index)+1;
}
else{ // if there's only 1 song, don't display previous and next buttons

prevIndex = 0;
nextIndex = 0; 
$('#audioNextBtn').unbind('click');
$('#audioPrevBtn').unbind('click');
$('#audioNextBtn').css('cursor', 'default');
$('#audioPrevBtn').css('cursor', 'default');
$('#audioNextBtn').children('img').attr('src', '/mobile/images/musicPlayerNextDisabled.gif');
$('#audioPrevBtn').children('img').attr('src', '/mobile/images/musicPlayerPrevDisabled.gif');
}
}
else if (currentIndex == musicArr.length-1){
prevIndex = parseInt(index)-1;
nextIndex = 0;	
}
else{
prevIndex = parseInt(index)-1;
nextIndex = parseInt(index)+1;
}
$('#prevId').val(musicArr[prevIndex][0]);
$('#prevAsin').val(musicArr[prevIndex][1]);
$('#prevThumb').val(musicArr[prevIndex][2]);
$('#prevTitle').val(musicArr[prevIndex][3]);

$('#currentId').val(musicArr[currentIndex][0]);
$('#currentAsin').val(musicArr[currentIndex][1]);
$('#currentThumb').val(musicArr[currentIndex][2]);
$('#currentTitle').val(musicArr[currentIndex][3]);

$('#nextId').val(musicArr[nextIndex][0]);
$('#nextAsin').val(musicArr[nextIndex][1]);
$('#nextThumb').val(musicArr[nextIndex][2]);
$('#nextTitle').val(musicArr[nextIndex][3]);

$('#audioThumb').attr('src', $('#currentThumb').val());
$('#audioTitle').html($('#currentTitle').val());

};
