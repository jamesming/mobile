core.show_facebook_feeds= function(){
	
						core.trackPixel_sections({
							 'type'				:'view'
							,'controller_to_use'		:'facebook'
						});

						core.googleAnalytics({
							'type'				:'pageviews'
							,'section'		:'facebook'
							,'unique_desc':''
						});			
						
						
						core.loadScript('jsapi', 'https://www.google.com/jsapi', function(){
							
								google.load("feeds", "1", {"callback" : function(){
									
									
			
											
											  var feed = new google.feeds.Feed("https://www.facebook.com/feeds/page.php?format=atom10&id="+core.facebookID);
											  
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
														      		
														      						
																			var feed_segment = '\
																			<div class="feedItemContainer"    style="padding:5px;height:auto;font-size: ' + core.style[core.unit].font_size_unit.big + 'px;margin-left:10px;text-align:left;color:#CCCCCC"   >\
																				<div  class="image_container"   >' +  ( oneImageWithWrapper || '' ) + '</div>\
																				<div   style="font-size:11px"  >' +   $('#oneFeed').html() + '</small></div>\
																			</div>\
																			<div   style="padding-left:5px;padding-top:8px;clear:both;font-size: ' + core.style[core.unit].font_size_unit.small + 'px;margin-left:10px;text-align:left;color:#CCCCCC;margin-bottom:5px"  >' + published_formated  + '\
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
																	
																	$('#feed').linkify();
																	
																	$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
																	
																	
																	$('.scroll-pane-arrows').jScrollPane({
																			showArrows: true,
																			horizontalGutter: 10
																		});
																			
																			
														    }
								
								
											    
											  });	
									
									
								}});	
								
						});
			
						core.processCallbackQueue();
	

};
core.show_mentions= function(){
			
			core.googleAnalytics({
				'type'				:'pageviews'
				,'section'		:'mentions'
				,'unique_desc':''
			});
			
			core.trackPixel_sections({
				 'type'				:'view'
				,'controller_to_use'		:'mentions'
			});
				
			var  tweet_segments = '';				
			
				$.ajax({
					type: "GET",
				   url: 'http://search.twitter.com/search.json?q=' +  core.twitter  + '&rpp=100&callback=?',
				   dataType: 'jsonp',
				   success: function(data){ 
				
								$.each(data['results'], function(key, tweet) {
				
							    tweeted_text = tweet['text'];
							    profile_image_url = tweet['profile_image_url'];
							    twitter_who_tweeted = tweet['from_user'];
							    created = tweet['created_at'];
							    
							    created_ = new Date(created)
							   	created_formated = created_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");					    
							    
									moments_past = core.get_moments_past( created );					    
				
									var tweet_segment = '\
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
											<div class="twitterContent"  style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
											<div class="twitterContentTimeStamp addFontSize10" style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-align:left;color:#CCCCCC" >' +  created_formated  + '</div>\
											<div class="authorContainer addTextAlignRight">by ' +  twitter_who_tweeted  + '</div>\
										</div>\
										<div class="addClearBoth"></div>\
									</div>\
									<div class="itemBorder"> &nbsp; </div>\
									';
									
									tweet_segments += tweet_segment;
									
				        });
				        
		    				$('#feed').append(tweet_segments);
		    				
		    				
								$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
								
								$('.scroll-pane-arrows').jScrollPane({
										showArrows: true,
										horizontalGutter: 10
									});	
										
		
				        $('#feed').linkify();		        
									
				   }
				})
};
core.show_tweets= function(){
			
			core.googleAnalytics({
				 'type'				:'pageviews'
				,'section'		:'tweets'
				,'unique_desc':''
			});			
			
			var  that = this
					,tweet_segments = '';
			
			$.ajax({
			    type: "GET",
			    url: 'http://twitter.com/status/user_timeline/' +  core.twitter  + '.json?count=10&callback=?',
			    dataType: "jsonp",
			    error:function(data) {
			    		// console.log('twitter failure');
			    },
					success: function(data) {
		
						$.each(data, function(key, tweet) {
							
					    tweeted_text = tweet.text;
					    profile_image_url = tweet.user['profile_image_url'];
					    created = tweet.created_at;
					    
							created_ = new Date(core.parseIt(created));
		
					   	created_formated = created_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");					    	
		
							/* 
							*
							*  core.parseIt() needed to fix date issues in IE
							*
							*/
		
							moments_past = core.get_moments_past(  core.parseIt(created) );
		  
							tweet_segment = '\
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
									<div class="twitterContent"   style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
									<div class="twitterContentTimeStamp addFontSize10"   style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-align:left;"  >' +  created_formated  + '</div>\
									<div class="authorContainer addTextAlignRight">by ' +  core.twitter  + '</div>\
								</div>\
								<div class="addClearBoth"></div>\
							</div>\
							<div class="itemBorder"> &nbsp; </div>\
							';
							
							
					   tweet_segments += tweet_segment
					   
					  });
							
						$('#feed').append(tweet_segments);	
						
						
				  	$('#feed').linkify();	
				  	
						$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
						
						$('.scroll-pane-arrows').jScrollPane({
								showArrows: true,
								horizontalGutter: 10
							});
					
						if( core.unit == 2 || core.unit ==3){		
							if( that.connectIsClicked == 1){
								that.connectIsClicked = 0;
								$('.jspVerticalBar').css({visibility:'hidden'});
							};							
							
						};

					}
			});	
			
};


core.showconnect=function(){
		
			this.connectIsClicked = 1;
		
		 	this.show_tweets();
		 	
		 	var that = this;	
		 	
			if( !core.events['#innerConnectContainer a']){
				
				core.events['#innerConnectContainer a'] = true;
				
				$('#innerConnectContainer a').live('click', function(event) {
					
						event.preventDefault();
					
						$('.menuItemContainer').removeClass('active');
						$(this).parent().addClass("active");
	
						
						$('#feed').remove();
						
						$('.feedContainer').html("\
							<div id='feed'  class='scroll-pane-arrows slideUpDown  insideWrapper' style='display: block; background: #131313; overflow-y:auto;overflow-x:hidden'  >\
						 	</div>\
						");
						
	
						switch($(this).attr('feed')){
							case "tweets":   that.show_tweets();	break;
							case "mentions": that.show_mentions();break;
							case "facebook": that.show_facebook_feeds();		break;
						}		
							
			
				})			
					
											
			};	
			
			$('#innerConnectContainer a').css({cursor:'pointer'});
			
		
			if( core.unit == 3){
				$('.menuItemContainer').width(100);
			};
			
			
			
		}