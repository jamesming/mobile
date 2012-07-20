core.navigational_icon_layout  = function(renderIcons ){
	
		var  navArraySize = core.navIcons.length - 1
				,controllers  = new Array()
		    ,icons = '';
		   
		for(var i = 0; i <= navArraySize; i++){
			
						var  tab_name;
						
						if( core.navIcons[i] != 'custom'){
							tab_name = core.navIcons[i];
							if ( core.navIcons[i] == 'bio') tab_name =  'about';
							var icon_image = '/mobile/images/icons/' + core.navIcons[i];
						}else{
							tab_name = core.custom_tab_title;
							var icon_image = '/user/' + core.userId + '/deploy/userassets/tab_icon';
						};
						
						//controllers.push (core.navIcons[i]);

						var new_panel_div = '\
								<div  class="iconbox"   style="background:transparent;width:' + core.style[core.unit].nav_icon_size + 'px"    controller="' + core.navIcons[i] + '">\
									<div  class="navItemHolder addFontSize11 addTextAlignCenter ">\
										<div >\
											<a id="tab_' + core.navIcons[i] + '" targetIs="panel-2"  class="navMenuLink navTextLink"  data-transition="slide" controller="' + core.navIcons[i] + '">' + tab_name + '</a>\
										</div>\
									</div>';
									
						
						if(  renderIcons ){
							new_panel_div += '\
									<div  class="icon_div addTextAlignCenter ">\
										<a   targetIs="panel-2" class="navMenuLink ' +  core.navIcons[i]  + ' navIconLink"   data-transition="slide"  controller="' + core.navIcons[i] + '">\
											<img   style="margin-top:7px"  class="navImg" src="' + icon_image + '.png" />\
										</a>\
									</div>';												
						};
						
						new_panel_div += '</div>';
					
						icons +=  new_panel_div;
						
		};
		
		document.getElementById('belt').innerHTML = icons;
		
		/* 
		*
		*  
		*
		*/
		
		if( !renderIcons){
			
				var footerWrapper = document.getElementById('footerWrapper');	
				footerWrapper.style.bottom = '-50px';
			
		}else{
			
				document.getElementById('scrollLeftImg').src = '/mobile/images/navL.png';
				document.getElementById('scrollRightImg').src = '/mobile/images/navR.png';
			
				/* 
				*
				*  CLICK NAVOVERLAY
				*
				*/			
			

				core.attachEvent('navOverlayLink', document.getElementsByClassName('navOverlayLink'), 'click', function(){
					
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
			
				core.attachEvent('navMenuLink', document.getElementsByClassName('navMenuLink'), 'click', function(){
					
					var that = this;
					
					core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
					
 					var ga_src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
					core.loadScript('google_analytics_source', ga_src, function(){
					  _gaq.push(['_setAccount', core.gid]);
					  _gaq.push(['_trackPageview']);						
					});
					
					core.loadScript('googleAnalytics_core', '/mobile/extend/googleAnalytics.js', function(){})	
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
				
			
		};
		

		if( renderIcons && core.unit == 2 || core.unit == 3){
			
				core.attachEvent('contentWrapper', document.getElementById('contentWrapper'), 'mouseover', function(){
							
					if( !core.isSlideDown ){
						core.nav_slide.down();	
					};
							
				});
		};	
};




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
			if(core.navRightCount == core.numOfIcons - 3 ) return;
		};
		
		core.navRightCount++;

		$(".belt").animate({left: "-=" + core.style[core.unit].nav_icon_size}, 100);	
						
};





