core.showvideos = function(){
	

			
			this.youtube_video_obj = {};
		
			$.ajax({
			    type: "GET",
			    url: '/user/' +  core.userId + '/deploy/data/videos.xml?random=' + Math.floor(Math.random()*999999999),
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

							var youtube_id = core.value_of_parameter( 'v', frompath = url );
							
							var thumbPath = "http://img.youtube.com/vi/"  + youtube_id +   "/1.jpg";
							
							core.youtube_video_obj[youtube_id] = {
																	 title: title
																	,description: description
																	,videoId: videoId
																};
		
							var videos_box = $('\
									<div class="videoInnerItemHolder navLink "  video_id="' +  videoId  + '" youtube_id="' +  youtube_id  + '" controller="videoDetails" >\
										<div   class="video_item_left" >\
												<div class="videoThumbWrapper"   >\
													<div class="videoThumb">\
														<img src="' + thumbPath + '" />\
													</div>\
												</div>\
												<div class="videoLabelWrapper"  >\
														<div class="videoLabel" style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-overflow: ellipsis;">\
															' + title + '\
														</div>\
														<div class="albumInfo" style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-overflow: ellipsis;">\
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
						
			
						core.adjust_slideUpDownHeight();					
		
						$('.videoLabelWrapper').width( $('.video_item_left').width() - $('.videoThumbWrapper').width() -20)
						
						core.adjustScrollPanel();				
										
					}
					
					
					
			});	
			

			
}