core.showphotos = function(){
		
			var image_boxes = '';
			
			$.ajax({
			    type: "GET",
			    url: '/user/' + core.userId + '/deploy/data/photos.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
						
						$(xml).find('item').each(function(){
							
							var url = $(this).find('url').text();
							var photoid = $(this).find('photoid').text();
							var title = $(this).find('title').text();
							var description = $(this).find('description').text();
							var category = $(this).find('category').text();
							var dateupdated = $(this).find('dateupdated').text();
							
		
//							/* 
//							*
//							*  Add New Ribbon if image is posted within 7 days
//							*
//							*/
//							var right_now_in_miliseconds = Date.now();
//							var dateupdated = new Date(dateupdated);
//							var dateupdated_in_miliseconds = dateupdated.getTime();
//							var miliseconds_past_since_image_is_posted = right_now_in_miliseconds - dateupdated_in_miliseconds
//							var seven_days_in_miliseconds = 7 * 24 * 60 * 60 * 1000; // within 7 days
//		
//							if ( seven_days_in_miliseconds >  miliseconds_past_since_image_is_posted){
//									new_ribbon =  '\
//									 				<div style="margin-left: 48px; top: -68px; z-index: 0; position: relative; cursor: pointer;" onclick="displayPhoto(' + photoid + ')">\
//														<img src="/mobile/images/images-photos/newTag.png" />\
//													</div>\
//											';						
//							}else{
//									
//							}
		
							new_ribbon = '';
							image_boxes +=  '\
								<div class="addFloatLeft photo_box" style="margin-top: 10px; width: 86px; height: 70px; background: url(\'' +   '/mobile/images/images-photos/imageContainer.png\'); margin-left: 15px;">\
									<div style="margin-top: 6px; margin-left: 6px; z-index: 1; height: 58px; width: 74px; text-align: center;">\
										<a  class="navLink" photoId=' +  photoid  + ' title="' + title +  '" controller="photosDetails">\
											<img src="' + url + '" width="74px" height="58px" onError="$(this).attr(\'src\', \'' + '/mobile/images/images-photos/imageNotFound.png\')" />\
										</a>\
									</div>\
									'+ new_ribbon +'\
								</div>\
							';

		
						});		
						
						$('#gallery').append(image_boxes);
						
						
						var  marginLeft;
						switch(core.unit){ 
							case '1': // MOBILE
								marginLeft=14;
							break;
							case '2': // WEB PLAYER
								marginLeft=7;
							break;			
							case '3': // INTERACTIVE AD UNIT
								marginLeft=7;
							break;										
							case '4': // MINI SITE
								marginLeft=28;
							break;	
						}	
						
						$('.photo_box').css({'margin-left': marginLeft +'px'})
						
						core.adjust_slideUpDownHeight();
						core.adjustScrollPanel();
						
					}
			});
			

			
}