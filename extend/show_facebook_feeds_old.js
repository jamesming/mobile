core.show_facebook_feeds= function(){
			
				core.googleAnalytics({
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
					
					//$('#feed').linkify();
					
					$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneArrowsConnectTabUnit);
					
					
					$('.scroll-pane-arrows').jScrollPane({
							showArrows: true,
							horizontalGutter: 10
						});
							
							
		    }


			    
			  });	
		}