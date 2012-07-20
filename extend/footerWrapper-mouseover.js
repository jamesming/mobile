(function(){

											core.loadSpinner();
									
											core.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
											core.processCallbackQueue();
											
											if( core.renderNavIconsOnce === false){
												core.navigational_icon_layout(renderIcons = true);
												core.renderNavIconsOnce = true;
											};
											
											core.doWhenJqueryReady(function(){
													core.loadScript('nav_slide', '/mobile/extend/' + 'nav_slide.js',function(){
																	if( core.isSlideDown ){
																		!core.nav_slide || core.nav_slide.up();
																	};											
													});
													core.processCallbackQueue();
											});
											
											core.processCallbackQueue();    
    
})();
