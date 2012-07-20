core.showmerchdetails=function(){
			
			var  doOnce  = 0
					,doOnce2 = 0;
		
			$.ajax({
			    type: "GET",
			    url:  '/user/' +  core.userId + '/deploy/data/packages.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							
												var title = $(this).find('title').text();
												var id = $(this).find('id').text();
												var imageurl = $(this).find('imageurl').text();
												var description = $(this).find('description').text();
												var price = $(this).find('price').text();
												var buyinfo = $(this).find('buyinfo').text();
												var asin = $(this).find('asin').text();
												var buylink = $(this).find('buylink').text();
												
												if(id == core.merchId_selected ){
													
															$('#merch_img').attr('src', imageurl);
															$('#title_div').css({'font-size':core.style[core.unit].font_size_unit.big}).text(title)
															$('#price_div').text(price)
															$('#description_div').text(description)
															
															
															$('#album_info_div').text(description);
													
															if( doOnce == 0){
																
																	doOnce = 1;
																	
																	core.googleAnalytics({
																		 'type'				:'pageviews'
																		,'section'		:'MECHANDISE_DETAILS'
																		,'unique_desc': title
																	});
																	
																	if( buyinfo !=''){
																		$('#buyinfo_div').show()
																		$('#buyinfo').attr('href', buyinfo)
																		.click(function(event) {												
																	
																				core.googleAnalytics({
																					 'type'			:'events'
																					,'category'	:'EXIT'
																					,'action'		:'CLICK'
																					,'label'		:'MERCHADISE_BUYLINK_' + title
																				});
																	
																	
																	});													
							
															};
																						
												};
					
													
												if( doOnce2 == 0){
													
														doOnce2 = 1;
														
														$('#share_merch').css({cursor:'pointer'}).click(function(event) {
															
																core.googleAnalytics({
																	 'type'			:'events'
																	,'category'	:'EXIT'
																	,'action'		:'CLICK'
																	,'label'		:'MERCHANDISE_SHARE_' + title
																});
														
																window.open('http://www.facebook.com/sharer.php?u='+buyinfo);
														});			
																								
												};
												
									
                        //lets set are pane object here
                        var settings = {
                            showArrows: true,
                            horizontalGutter: 10
                        };

                        $('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);

                        //lets create the pane the right way
                        var pane = $('.scroll-pane-arrows')
                        pane.jScrollPane(settings);
                        var api = pane.data('jsp');


                        if( !core.doThisOnce){
                        core.doThisOnce = true;
                        $('.jspVerticalBar').show().css({visibility:'visible'});
                        };											
								
								
							};
							
							
			
		
						});		
						
					}
			});

				
			
					
			
}