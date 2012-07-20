var core = function(window, document){
	
var  testMode = true
				var  testMode = false
//				,nav2test = 'music';
				
	 	return {
	 		
	 		 init:function(){
	 			
	 			this.unit = url_get( 'unit' ) || 1;
	 			this.userId = url_get( 'id' );	 			
	 			
	 			var that = this;	 		
	 			
	 			this.loadScript('spin', '/mobile/scripts/spin.min.js',function(){
					that.target = document.getElementById('spinner');
					that.spinner = new Spinner();
	 			});
	 			
				this.loadScript('data', '/user/' + core.userId + '/deploy/scripts/data.js', function(){});
				
				that.loadScript('style', '/mobile/extend/style_for_unit' + core.unit + '.js', function(){
					that.setHomeScreenImage();
					that.logo_avatar_header_banner();
					that.layout();
					that.addEvents();
				})	
				
				if( core.unit == 2 || core.unit == 3){
					that.loadScript('navigational_icon_layout-no_icons', '/mobile/extend/navigational_icon_layout.js',function(){
						that.navigational_icon_layout();
					});			 				
				}else{
					that.loadScript('navigational_icon_layout-icons', '/mobile/extend/navigational_icon_layout.js',function(){
						that.navigational_icon_layout(renderIcons = true);
					});					 				
				};	 				
	 			this.processCallbackQueue();
	 			
	 			
	 			
				if( testMode){
					
				 			/* return;
				 			*		
				 			*  Take next section out in production
				 			*
				 			*/
				 			
				 			console.log(' TESTING MODE ============================================');
				 			
							this.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
							var ga_src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
							core.loadScript('google_analytics_source', ga_src, function(){
							  _gaq.push(['_setAccount', core.gid]);
							  _gaq.push(['_trackPageview']);						
							});
							core.loadScript('googleAnalytics_core', '/mobile/extend/googleAnalytics.js', function(){})	
							this.processCallbackQueue();
							
							this.loadScript('tools', '/mobile/extend/tools.js', function(){});
							this.loadScript('jscrollpane', '/mobile/scripts/jquery.jscrollpane.min.js', function(){})									
							this.loadScript('linkify', '/mobile/scripts/jquery.linkify.js', function(){})
							core.loadScript('marquee', '/mobile/scripts/jquery.marquee.js', function(){});									
							this.loadScript('scrollTo', '/mobile/scripts/jquery.scrollTo-min.js', function(){})
							this.loadScript('scrolltoNLoad', '/mobile/extend/scrolltoNLoad.js', function(){})
							this.loadScript('events', '/mobile/extend/events.js', function(){
									core.setup_marquee();	
							});
							core.loadScript('dateformat', '/mobile/scripts/dateformat.js', function(){})
							this.processCallbackQueue();
							
							this.doWhenJqueryReady(function(){
								
			
								core.events['navMenuLink'] = true;
								$('.navMenuLink').live('click', function(event) {
									$(this).scrolltoNLoad();			
								});	
								
							
								$('.scrollTo_panel-1').live("click", function(e) {
											core.onPanel = 1;
											if( core.unit == 2 || core.unit == 3){
													core.nav_slide.up( false );					  
											};			
											$('#contentWrapper').scrollTo( $('#panel-1'), 500);
								}).css({cursor:'pointer'});	
								
								$('.scrollTo_panel-2').live("click", function(e) {
											$('.shareVideoOverlay').hide();
											core.onPanel = 2;
											if(  core.unit == 2 || core.unit == 3 ){
													core.nav_slide.up( false );					  
											};							
											$('#contentWrapper').scrollTo( $('#panel-2'), 500, function(){
															if(  core.unit == 2 || core.unit == 3 ){
																	core.nav_slide.down(  false );					  
															};				
															$('#panel-3').children().remove()
											});
								}).css({cursor:'pointer'});	
									
								
								setTimeout(function(){
									$('#tab_'+nav2test).click();
								}, 10);
								
							});		
							
							/* 		
							*
							*  Take prev section out in production
							*
							*/
					
				};

	 		}
	 		,setProperties:function( dataObj ){
	 			
	 			this.navIcons = dataObj.navIcons;	 			
	 			this.custom_tab_title = dataObj.custom_tab_title;
	 			this.custom_html = dataObj.custom_html;
	 			this.base_url = dataObj.base_url;
	 			this.base_url2 = dataObj.base_url2;
	 			this.ustreamid = dataObj.ustreamid;
	 			this.channelid = dataObj.channelid;
	 			this.abouttitle = dataObj.abouttitle;
	 			this.about = dataObj.about;
	 			this.twitter = dataObj.twitter;
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
	 			this.isThisIphone = navigator.platform.indexOf("iPhone") != -1 
													|| navigator.platform.indexOf("iPod") != -1
													|| false
	 			
	 		}
			,setHomeScreenImage:function(){
				
					var  homeScreens = {
									 1:	this.isThisIphone ? 'unitOneIphone.png?v=' + Math.random() : 'unitOneAndroid.png?v=' + Math.random()
									,2:	'unitTwo.png?v=' + Math.random()
									,3:	'unitThree.jpg?v=' + Math.random()
									,4:	'unitFour.png?v=' + Math.random()
								}
							,configureProperImageSrc = function(homescreen_image){
								
								var home_img = document.getElementById('home_img');
								home_img.style.height = core.style[core.unit].home_img_size_unit  + 'px';
								home_img.src = '/user/' + core.userId + '/deploy/userassets/' + homescreen_image;
								
								}
							,checkImageExist = new Image();
				
					checkImageExist.src = '/user/' + core.userId + '/deploy/userassets/' + homeScreens[core.unit];
					
					checkImageExist.onerror = function(){
							configureProperImageSrc('homescreen.png');
					};
					
					checkImageExist.onload = function(){
					 		configureProperImageSrc(homeScreens[core.unit]);
	      	};
	      	
	
//					$('#home_img').css({
//						 'position':'relative','left':'50%'
//						,'margin-left': '-' + $('#homePageContainer div').width()+'px'
//						});			
	      
			}	
			,logo_avatar_header_banner: function(){
				
						var logo_section = '\
							<div class="bannerWrapper">\
								<div id="logoWrapper">\
									<a  id="header_link" >\
										<img 	src="/user/' +  core.userId  + '/deploy/userassets/logo.jpg" />\
									</a>\
								</div>\
							</div>\
						';
				
						document.getElementById('logo_section').innerHTML=logo_section;

						var  logo_section_span = document.getElementById('logo_section_span')
								,rightTwoThirdsOfTopSection = document.getElementById('rightTwoThirdsOfTopSection');
						
							logo_section_span.style.float = 'left';
							logo_section_span.style.width = core.style[core.unit].logo_section_span.width +'px';
							logo_section_span.style.marginRight = core.style[core.unit].logo_section_span.marginRight +'px';
							logo_section_span.style.overflow = 'hidden';

							rightTwoThirdsOfTopSection.style.paddingLeft = core.style[core.unit].rightTwoThirdsOfTopSection.paddingLeft + 'px';	
												
  						if( core.unit == 4  || core.unit == 2 ){
							
									var  headerWrapper = document.getElementById('headerWrapper')
											,top_area = document.getElementById('top_area')
											,avatarDiv = document.createElement("div");
											
									avatarDiv.innerHTML = '\
																	<a id="avatar"  style="float:left;width:75px;padding:5px;padding-top:' + core.style[core.unit].avatar.marginTop + 'px"  >\
																		<img src="/user/' +  core.userId  + '/deploy/userassets/avatar.png">\
																	</a>\
															';
									
									headerWrapper.insertBefore(avatarDiv, headerWrapper.firstChild || null);
									
									top_area.style.width = core.style[core.unit].top_area +'px';
							
							};
			}	
			,layout:function(){
				
				var  contentWrapper = document.getElementById('contentWrapper');
				
				contentWrapper.style.height = core.style[core.unit].contentWrapper.height +'px';
				contentWrapper.style.top = core.style[core.unit].contentWrapper.top +'px';
				
				var  left_controlsInnerDivs = document.getElementsByClassName('left_controlsInnerDivs')[1]
						,right_controlsInnerDivs = document.getElementsByClassName('right_controlsInnerDivs')[0];
				
				left_controlsInnerDivs.style.paddingLeft = core.style[core.unit].navControls.paddingLeft+'px';
				right_controlsInnerDivs.style.paddingRight = core.style[core.unit].navControls.paddingRight+'px';
				
				var mygallery = document.getElementById('mygallery');
				mygallery.style.width =  core.style[core.unit].mygallery.width+'px';
				
				var twitter_feed_scroller = document.getElementById('twitter_feed_scroller');
				if( core.unit == 3){
			        twitter_feed_scroller.parentNode.removeChild(twitter_feed_scroller);
				};	
				
				var headerBtns = document.getElementsByClassName('headerBtns')[0];
				if( core.unit == 4){  // FOR MINISITE
					twitter_feed_scroller.style.paddingRight = '10px';
					headerBtns.style.marginRight = '10px';
				};
		
				if( this.ustreamid  == ''){
					var headerBtns = document.getElementsByClassName('headerBtns')[0];
					headerBtns.style.paddingTop = '15px';
					headerBtns.style.paddingBottom = '20px';
					var headerBtnUstream = document.getElementsByClassName('headerBtnUstream')[0];
					headerBtnUstream.parentNode.removeChild(headerBtnUstream);
				}; 			

			}

			,inArray:function(needle, haystack) {
				var length = haystack.length;
				for(var i = 0; i < length; i++) {
						if(haystack[i] == needle) return true;
				}
				return false;
			}
			
			
			,addEvents:function(){
				
						var that = this;
						
						
						
						this.attachEvent('liveStreanLink', document.getElementById('liveStreanLink'), 'click', function(){
							
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
												
						
						
						
						
						this.attachEvent('shareThisLink', document.getElementById('shareThisLink'), 'click', function(){
							
									that.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
									that.processCallbackQueue();
									
									that.doWhenJqueryReady(function(){
											that.loadScript('shareoverlay', '/mobile/extend/' + 'shareoverlay.js', function(){
												that.displayShareThis();
											});
											that.processCallbackQueue();
									});
									
									that.processCallbackQueue();									
						});
						
						
						
						
						
						
						if( core.unit == 2 || core.unit == 3){
							
								this.navIsSliding = 0;
								this.isSlideDown = true;
								this.renderNavIconsOnce = false;
								this.attachEvent('footerWrapper-mouseover', document.getElementById('footerWrapper'), 'mouseover', function(){
									
											that.loadScript('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',function(){});
											that.processCallbackQueue();
											
											that.loadScript('navigational_icon_layout-icons', '/mobile/extend/navigational_icon_layout.js',function(){
															if( that.renderNavIconsOnce === false){
																that.navigational_icon_layout(renderIcons = true);
																that.renderNavIconsOnce = true;
															};
											});		
											
											that.doWhenJqueryReady(function(){
													that.loadScript('nav_slide', '/mobile/extend/' + 'nav_slide.js',function(){
																	if( that.isSlideDown ){
																		!that.nav_slide || that.nav_slide.up();
																	};											
													});
													that.processCallbackQueue();
											});
											
											that.processCallbackQueue();
									
								});							
						};
						

						  
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
					            element[i].attachEvent('on' + event, callbackFunction);
					        }			
								}
								
							};
					
					};
    	}
    	
			,scripts: {}
    	,loadScript : function(name, url, callback){
    		
    		
    		if(    typeof(this.target) !== "undefined" 
    				&& typeof(this.spinner) !== "undefined" ){
					this.target.style.display='block';					
					this.spinner.spin(this.target);	    			
    		};
    		
    		this.callbackQueue[name] = {
    			 scriptscripts:false
    			,callback:callback	
    		};

				if( !this.scripts[name]){
					
					this.scripts[name] = url;
					
			    		var  head = document.documentElement
			    				,script = document.createElement('script');
			    		
			    		script.async = false;
			    		script.src = url + '?v=' + Math.random(); // REMOVE CACHE BUSTING IN PRODUCTION
			    		
			    		var 	that = this
			    				 ,done = false;
			    		
			    		script.onload = script.onreadystatechange = function(){

			    			
		    			if(    !done 
		    					&& this.readyState != 'loading' 
		    					&& (    !this.readyState
	  										|| this.readyState === 'scripts'
	  										|| this.readyState === 'complete')) {
		    											
		    											done = true;
		    											
		    											//console.log('loading...   name: ' + name + ' |  url: ' + url);
		    											
		    											if( that.callbackQueue[name]){		
		    												that.callbackQueue[name].scriptscripts = true;
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
					this.callbackQueue[name].scriptscripts = true;
					
				}
    	}
    	
			,callbackQueue: {}    	
    	,processCallbackQueue: function(){
    		
	    		var		that = this
	    		     ,queueIsReady = function(){
	    		     		var readiness = true;
					    		for( name in that.callbackQueue){
					    			if( that.callbackQueue[name].scriptscripts === false){
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
							    			that.spinner.stop();
												that.target.style.display='none';	
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
