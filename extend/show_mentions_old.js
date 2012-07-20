core.show_mentions= function(){
			
			
				core.googleAnalytics({
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
							    
									moments_past = core.get_moments_past( created );					    
				
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
											<div class="twitterContent"  style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-align:left;color:#CCCCCC"  ><small>' +  tweeted_text  + '</small></div>\
											<div class="twitterContentTimeStamp addFontSize10" style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-align:left;color:#CCCCCC" >' +  created_formated  + '</div>\
											<div class="authorContainer addTextAlignRight">by ' +  twitter_who_tweeted  + '</div>\
										</div>\
										<div class="addClearBoth"></div>\
									</div>\
									<div class="itemBorder"> &nbsp; </div>\
									');
									
									$('#feed').append(tweet_segment);
									
				        });
		    
								$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
								
								$('.scroll-pane-arrows').jScrollPane({
										showArrows: true,
										horizontalGutter: 10
									});	
										
		
				        $('#feed').linkify();		        
									
				   }
				})
		}