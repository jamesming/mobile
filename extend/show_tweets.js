core.show_tweets=function(){
			
			core.googleAnalytics({
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
					    
							created_ = new Date(core.parseIt(created));
		
					   	created_formated = created_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");					    	
		
							/* 
							*
							*  core.parseIt() needed to fix date issues in IE
							*
							*/
		
							moments_past = core.get_moments_past(  core.parseIt(created) );
		  
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
									<div class="twitterContent"   style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
									<div class="twitterContentTimeStamp addFontSize10"   style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-align:left;"  >' +  created_formated  + '</div>\
									<div class="authorContainer addTextAlignRight">by ' +  window.twitter  + '</div>\
								</div>\
								<div class="addClearBoth"></div>\
							</div>\
							<div class="itemBorder"> &nbsp; </div>\
							');
							
							$('#feed').append(tweet_segment);
					   
					   
					  });
							
							
				  	$('#feed').linkify();	
				  	
						$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
						
						$('.scroll-pane-arrows').jScrollPane({
								showArrows: true,
								horizontalGutter: 10
							});
						
						
					
						if( unit == 2 || unit ==3){		
							if( that.connectIsClicked == 1){
								that.connectIsClicked = 0;
								$('.jspVerticalBar').css({visibility:'hidden'});
							};							
							
						};

					}
			});	
			
		}