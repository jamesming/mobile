core.nav_slide =  {
								up: function(){
									
											//console.log('core.navIsSliding is: ' + core.navIsSliding + ' -- footerwrapper bottom is: '  +$('#footerWrapper').css('bottom') );								
										if( $('#footerWrapper').css('bottom') == '-50px' ){
										
												if(  core.navIsSliding == 0 ){
											
														core.navIsSliding = 1;
																
														core.isSlideDown = false;
												  
														$('#footerWrapper').animate({
														    'bottom': '+=50'
														  }, 500, function(){
														  	
														  	core.navIsSliding = 0;
														  	$('#footerWrapper').css({bottom:'0px'}).toggleClass('expanded');
														});		
												
												};
													  
														
											};	
									
								},
								
								down: function(){
									
											if( $('#footerWrapper').css('bottom') == '0px' ){
										
													if(   core.navIsSliding == 0  ){
														
																core.navIsSliding = 1;
															
																core.isSlideDown = true;
													
																$('#footerWrapper').animate({
																    'bottom': '-=50'
																  }, 500, function(){
																  	
																  	core.navIsSliding = 0;
																  	$('#footerWrapper').css({bottom:'-50px'}).toggleClass('expanded');
																  	$('.jspVerticalBar').css({visibility:'visible'})
																  	
																});														
														
													};

													
											};				
						
								}
	
};

	
	
core.attachEvent('contentWrapper', document.getElementById('contentWrapper'), 'mouseover', function(){
	if( !core.isSlideDown ){
		core.nav_slide.down();	
	};
});

core.loadScript('googleAnalytics_core', '/mobile/extend/googleAnalytics.js', function(){
							if( typeof(core.trackingPixel) !== "undefined"){
								core.trackPixel_sections({
									 'type'				:'view'
									,'controller_to_use'		:'home'
								});
							};	
})	
core.processCallbackQueue();