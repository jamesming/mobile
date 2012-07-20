var core = function(window, document){
	 	return {
	 		 init:function(){
	 			
	 			this.unit = url_get( 'unit' ) || 1;
	 			this.userId = url_get( 'id' );	 			
	 			
	 			var that = this;	 		
	 			
				this.loadScript('data', '/user/' + core.userId + '/deploy/scripts/data.js', function(){

							if( that.unit == 2 || that.unit == 3){
									that.navigational_icon_layout();
							}else{
									that.navigational_icon_layout(renderIcons = true);
							};						
						
				});

					
				that.loadScript('style', '/mobile/extend/style_for_unit' + core.unit + '.js', function(){
					that.setHomeScreenImage();
					that.logo_avatar_header_banner();
					that.layout();
					that.addEvents();
				})	
				
				this.processCallbackQueue();

	 			
	 		}
	 		
	 		,loadSpinner:function(){
	 						var that = this;
							this.loadScript('spinner', '/mobile/scripts/' + 'spin.min.js', function(){
									that.target = document.getElementById('spinner');
									that.spinner = ( typeof(Spinner) !== "undefined" ? new Spinner(): undefined );
								});
							this.processCallbackQueue();
			}
	 		,setProperties:function( dataObj ){
	 			this.navIcons = dataObj.navIcons;	 			
	 			this.custom_tab_title = dataObj.custom_tab_title;
	 			this.base_url = dataObj.base_url;
	 			this.base_url2 = dataObj.base_url2;
	 			this.ustreamid = dataObj.ustreamid;
	 			this.hasUstream = ( this.ustreamid !== '' ? true : false );
	 			this.channelid = dataObj.channelid;
	 			this.abouttitle = dataObj.abouttitle;
	 			this.twitter = dataObj.twitter;
	 			this.twitter_sharetext = dataObj.twitter_sharetext;
	 			this.hashtag = dataObj.hashtag;
	 			this.facebook = dataObj.facebook;
	 			this.facebookID = dataObj.facebookID;
	 			this.gid = dataObj.gid;
	 			this.video_autoplay = 1;
	 			this.count_music = 0;
	 			this.numOfIcons = this.navIcons.length - 1;
	 			this.navRightCount = 0;
	 			this.slideSpeed = 400;
	 			this.spinnerDelay = 0;
	 			this.appHasMusic = core.inArray('music', this.navIcons );
	 			this.musicIsSetup = false;
				this.navIsSliding = 0;
				this.isSlideDown = true;	

				this.isThisAndroid = navigator.userAgent.toLowerCase().indexOf("android") != -1;	 			
	 			this.isThisIphone = navigator.platform.toLowerCase().indexOf("iphone") != -1 
													|| navigator.platform.toLowerCase().indexOf("ipod") != -1
													|| false
				this.isThisMobile = (this.isThisAndroid == true || this.isThisIphone == true);

	 			this.shareBtn = {
	 				 open:{
		 				 'true' : 'share_open'
		 				,'false': ( this.unit == 3 ? 'share2x_300_open' : 'share2x_open' )  		 					
	 				}
	 				,close:{
		 				 'true' : 'share_close'
		 				,'false': ( this.unit == 3 ? 'share2x_300_close' : 'share2x_close' )			 					
	 				}
	 			}
	 		}
	 		
	 		,navigational_icon_layout:function(renderIcons ){

					var  navArraySize = ( !renderIcons ? 2 :core.navIcons.length -1)
							,controllers  = new Array()
					    ,icons = '';
					for(var i = 0; i <= navArraySize; i++){
						
									var  tab_name;
									
									if( this.navIcons[i] != 'custom'){
										tab_name = this.navIcons[i];
										if ( this.navIcons[i] == 'bio') tab_name =  'about';
										var icon_image = '/mobile/images/icons/' + this.navIcons[i];
									}else{
										tab_name = this.custom_tab_title;
										var icon_image = '/user/' + this.userId + '/deploy/userassets/tab_icon';
									};
									var new_panel_div = '\
											<div  class="iconbox"   style="background:transparent;width:' + this.style[this.unit].nav_icon_size + 'px"    controller="' + this.navIcons[i] + '">\
												<div  class="navItemHolder addFontSize11 "   style="text-align:center;cursor:pointer"  >\
													<div   >\
														<a  id="tab_' + this.navIcons[i] + '" targetIs="panel-2"  class="navMenuLink navTextLink"  controller="' + this.navIcons[i] + '">\
														' + tab_name + '\
														</a>\
													</div>\
												</div>';
									
									if(  renderIcons ){
										new_panel_div += '\
												<div  class="icon_div addTextAlignCenter "   style="text-align:center;cursor:pointer;"  >\
													<a  targetIs="panel-2" class="navMenuLink ' +  this.navIcons[i]  + ' navIconLink"   controller="' + this.navIcons[i] + '"    >\
														<img   style="margin-top:7px"  class="navImg" src="' + icon_image + '.png" />\
													</a>\
												</div>';												
									};

									
									new_panel_div += '</div>';
								
									icons +=  new_panel_div;
					};
					
					var belt = document.getElementById('belt');
					belt.innerHTML = icons;

					var footerWrapper = document.getElementById('footerWrapper');	

					if (!renderIcons) {
						footerWrapper.style.bottom = '-50px';
					};
					
					if (this.isThisMobile) {
						footerWrapper.className = 'norollover';
					} else {
						footerWrapper.className = 'rolloverok';
					}

			}
			,setHomeScreenImage:function(){
					var  homeScreens = {
									 1:	this.isThisIphone ? 'unitOneIphone.jpg?v=' + Math.random() : 'unitOneAndroid.jpg?v=' + Math.random()
									,2:	'unitTwo.jpg?v=' + Math.random()
									,3:	'unitThree.jpg?v=' + Math.random()
									,4:	'unitFour.jpg?v=' + Math.random()
								}
							,configureProperImageSrc = function(homescreen_image){
								
								var home_img = document.getElementById('home_img');
								home_img.style.height = core.style[core.unit].home_img_size_unit  + 'px';
								home_img.src = '/user/' + core.userId + '/deploy/userassets/' + homescreen_image;
								
								}
							,checkImageExist = new Image();
				
					checkImageExist.src = '/user/' + core.userId + '/deploy/userassets/' + homeScreens[core.unit];
					
					checkImageExist.onerror = function(){
							configureProperImageSrc('homescreen.jpg');
					};
					
					checkImageExist.onload = function(){
					 		configureProperImageSrc(homeScreens[core.unit]);
	      	};
			}	
			,logo_avatar_header_banner: function(){
				
						var logo_section = '\
							<div class="bannerWrapper">\
								<div id="logoWrapper">\
									<a  id="header_link" >\
										<img 	src="/user/' +  core.userId  + '/deploy/userassets/logo' + core.unit +'.jpg" />\
									</a>\
								</div>\
							</div>\
						';
				
						document.getElementById('logo_section').innerHTML=logo_section;

						var  logo_section_span = document.getElementById('logo_section_span')
								,rightTwoThirdsOfTopSection = document.getElementById('rightTwoThirdsOfTopSection');
						
							logo_section_span.style.float = 'left';
							logo_section_span.style.width = core.style[core.unit].logo_section_span.width +'px';
							logo_section_span.style.height = core.style[core.unit].logo_section_span.height +'px';
							logo_section_span.style.marginRight = core.style[core.unit].logo_section_span.marginRight +'px';
							logo_section_span.style.marginLeft = core.style[core.unit].logo_section_span.marginLeft +'px';
							logo_section_span.style.overflow = 'hidden';

							rightTwoThirdsOfTopSection.style.paddingLeft = core.style[core.unit].rightTwoThirdsOfTopSection.paddingLeft + 'px';	
												
  						if( core.unit == 4  || core.unit == 2 ){
								core.loadScript('avatar', '/mobile/extend/' + 'avatar.js',function(){});
							};
			}	
			,layout:function(){
				
				var  contentWrapper = document.getElementById('contentWrapper');
				
				contentWrapper.style.height = core.style[core.unit].contentWrapper.height +'px';
				contentWrapper.style.top = core.style[core.unit].contentWrapper.top +'px';
				
				var  left_controlsInnerDivs = document.querySelectorAll('.left_controlsInnerDivs')[1]
						,right_controlsInnerDivs = document.querySelectorAll('.right_controlsInnerDivs')[0];

				left_controlsInnerDivs.style.paddingLeft = core.style[core.unit].navControls.paddingLeft+'px';
				right_controlsInnerDivs.style.paddingRight = core.style[core.unit].navControls.paddingRight+'px';
				
				var mygallery = document.getElementById('mygallery');
				mygallery.style.width =  core.style[core.unit].mygallery.width+'px';
				
				if( this.hasUstream  === false){
						var headerBtnUstream = document.querySelectorAll('.headerBtnUstream')[0];
						headerBtnUstream.parentNode.removeChild(headerBtnUstream);
				}; 		
				var share_button = document.getElementById('share_button');
				share_button.src = '/mobile/images/' + this.shareBtn.open[this.hasUstream] + '.gif';					

			}

			,inArray:function(needle, haystack) {
				var length = haystack.length;
				for(var i = 0; i < length; i++) {
						if(haystack[i] == needle) return true;
				}
				return false;
			}
			,addEvents:function(){
				
						 var that = this
								,activateNav = function(){
							
									that.loadSpinner();
							
									that.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
									that.processCallbackQueue();
									

									
									that.doWhenJqueryReady(function(){
										
											if( that.renderNavIconsOnce === false){
												that.navigational_icon_layout(renderIcons = true);
												that.renderNavIconsOnce = true;
											};	
											
											
											that.loadScript('continue', '/mobile/extend/continue.js', function(){});
											that.processCallbackQueue();
																						
										
											if( core.unit == 2 || core.unit == 3){											
												
													that.loadScript('nav_slide', '/mobile/extend/' + 'nav_slide.js',function(){
																	if( that.isSlideDown ){
																		!that.nav_slide || that.nav_slide.up();
																	};											
													});
													that.processCallbackQueue();
											
											};												
											
									});
									
									
									that.processCallbackQueue();
							
						};

						this.renderNavIconsOnce = false;
						
						if( core.unit == 2 | core.unit == 3){
							this.attachEvent('footerWrapper-mouseover', document.getElementById('footerWrapper'), 'mouseover', activateNav);	
						}else{
							activateNav();
						};
						
						if( document.getElementById('liveStreanLink')){
							
							this.attachEvent('liveStreanLink', document.getElementById('liveStreanLink'), 'click', function(){
								
										that.loadSpinner();
								
										that.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
										that.processCallbackQueue();
										
										that.doWhenJqueryReady(function(){
												that.loadScript('ustream', '/mobile/extend/' + 'ustream.js', function(){
													that.displayUstream();
												});
												that.processCallbackQueue();
										});
										
										that.processCallbackQueue();									
							});							
							
						};


						this.attachEvent('shareThisLink', document.getElementById('shareThisLink'), 'click', function(){
							
									that.loadSpinner();
							
									that.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
									that.processCallbackQueue();
									
									that.doWhenJqueryReady(function(){
											that.loadScript('shareoverlay', '/mobile/extend/' + 'shareoverlay.js', function(){
												core.displayShareThis();
											});
											that.processCallbackQueue();
									});
									
									that.processCallbackQueue();									
						});
						

			}			
			,events:{}
			,attachEvent: function(name, element, event, callbackFunction){
				
				
					if( !this.events[name]){
						
							this.events[name] = true;
							if( typeof(element.length) === "undefined"){
									
					        if (element.addEventListener) {
					            element.addEventListener(event, callbackFunction, false);
					        } else if (element.attachEvent) {
					            element.attachEvent('on' + event, callbackFunction);
					        }											
								
							}else{

								var length = element.length;
								
								for(var i = 0 ; i < element.length; i++){
					        if (element[i].addEventListener) {
					            element[i].addEventListener(event, callbackFunction, false);
					        } else if (element[i].attachEvent) {
					        	
//											element[i].prototype.addEventListener = function(action, fn, phase) {
//											
//												var self = this;
//												
//												return this.attachEvent('on' + action, function() {
//																																	
//																																	return fn.apply(self, [window.event]);
//																																
//																															 });
//											}
//					        		element[i].addEventListener(event, callbackFunction, false);
//					            element[i].attachEvent('on' + event, function(){
//					            	callbackFunction.apply(element[i]);
//					            });


												element[i].attachEvent('on' + event, callbackFunction);

					        }			
								}
								
							};
					
					};
    	}
    	
			,scripts: {}
    	,loadScript : function(name, url, callback){
    		
    		this.callbackQueue[name] = {
    			 scripts:false
    			,callback:callback	
    		};

				if( !this.scripts[name]){
					
	    		if(    typeof(this.target) !== "undefined" 
	    				&& typeof(this.spinner) !== "undefined" ){
						this.target.style.display='block';					
						this.spinner.spin(this.target);	    			
	    		};					
					
					this.scripts[name] = url;
					
	    		var  head = document.documentElement
	    				,script = document.createElement('script');
	    		
	    		script.async = false;
	    		script.src = url + '?v=' + Math.random(); // REMOVE CACHE BUSTING IN PRODUCTION
	    		
	    		var 	that = this
	    				 ,done = false;
	    		
	    		script.onload = script.onreadystatechange = function(){
	    			
/*	    			if(    !done 
	    					&& this.readyState != 'loading' 
	    					&& (    !this.readyState
  										|| this.readyState === 'scripts'
  										|| this.readyState === 'complete')) {*/
  										
  											
	    			if( this.readyState != 'loading' ) {  											
	    											
	    											done = true;
	    											
	    											//console.log('loading...   name: ' + name + ' |  url: ' + url);
	    											
	    											if( that.callbackQueue[name]){		
	    												that.callbackQueue[name].scripts = true;
	    											};
	    											
	    											// Handle memory leak in IE
	    											script.onload = script.onreadystatechange = null;
	    											if( head && script.parentNode ){
	    												head.removeChild( script );
	    											};
	    				
	    			};
	    			
	    		};
	    		head.insertBefore( script, head.firstChild );					
					
				} 
				else {
					//console.log(' '+ name + ' already loaded.');
					this.callbackQueue[name].scripts = true;
					
				}
    	}
    	
			,callbackQueue: {}    	
    	,processCallbackQueue: function(){
    		
	    		var		that = this
	    		     ,queueIsReady = function(){
	    		     		var readiness = true;
					    		for( name in that.callbackQueue){
					    			if( that.callbackQueue[name].scripts === false){
					    				readiness = false;
					    			};
					    		};
					    		return readiness;  			
				    		}
				    	 ,doWhenReady = function(){
				    	 	
				    	 		if( queueIsReady() === false){
				    	 			setTimeout(function(){
				    	 				doWhenReady();
				    	 			}, 10);
				    	 		}else{
							    		for( name in that.callbackQueue){
							    			that.callbackQueue[name].callback();
							    			delete that.callbackQueue[name];
							    		};
							    		that.callbackQueue = {};
							    		setTimeout(function(){
							    			if( typeof(that.spinner) !== "undefined"){
							    				that.spinner.stop();
							    				that.target.style.display='none';	
							    			}  
							    		}, core.spinnerDelay);
							    		
				    	 		};
				    	 };
				    	 
				 doWhenReady();

    	}
    	,doWhenJqueryReady:function( callback ){
    		
    		var that = this;
    		if( typeof($) === "undefined"){
    			setTimeout(function(){
    				that.doWhenJqueryReady(callback);
    			}, 10);
    		}else{
    				callback();
    		};
    	}
			
	 	};
	 	
}(this, document);
	
window.onload = function(){
	core.init();	
};