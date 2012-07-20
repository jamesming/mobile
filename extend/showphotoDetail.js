core.showphotodetail=function(){
		
			var  image_number = new Array()
			    ,count_images = 0;
			
			var doOnce = 0;

			$.ajax({
			    type: "GET",
			    url:  '/user/' + core.userId + '/deploy/data/photos.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							
							var url = $(this).find('url').text();
							var photoid = $(this).find('photoid').text();
							var title = $(this).find('title').text();
							var description = $(this).find('description').text();
							var category = $(this).find('category').text();
							
							image_number[count_images] = photoid;	
		
							if(photoid == core.photoId_selected ){
								
								if( doOnce == 0){
									doOnce = 1;
										core.googleAnalytics({
											 'type'				:'pageviews'
											,'section'		:'PHOTOS_DETAILS'
											,'unique_desc':title
										});											
									
								};
		
								$('#image_detail').width(core.style[core.unit].width).attr('src',url)		
								$('#image_description').text(description)
								$('#image_title').text(title)
								$('.overlay_image_detail').html(title)
								
								image_index = count_images;
							};
							
							count_images++;
		
						});		
						
					/* 
					*
					*  Pass photo_id to previous and next button
					*
					*/
		
					if( image_index == 0 ){
						var previous_image_index = image_number.length - 1;
					}else{
						var previous_image_index = image_index - 1;
					};
					
					if( image_index == image_number.length - 1){
						var next_image_index = 0;
					}else{
						var next_image_index = image_index  + 1;
					};
		
					$('.prev_a_link').attr('photoId', image_number[previous_image_index])
					
					$('.next_a_link').attr('photoId', image_number[next_image_index])
					
						
					}
					
			});
			
			$('#inside_content').css({'overflow-y':'auto'})
			.height(core.style[core.unit].height - core.style[core.unit].panel_height_unit);

			$('#inside_content').hover(function(event) {
						$('.overlay_image_detail').fadeToggle();
			})
};
		
		
core.fixphotodetail=function(){
		
						$("#image_detail").on("load", function(){
						
								switch(core.unit){
									case "1": {// Mobile
						
						
										if( $('#image_detail').width() >= $('#image_detail').height()){
						
											if( $('#image_detail').width() >= $('#inside_content').width()){
												if( $('#image_detail').height() >= $('#inside_content').height()){
													$('#image_detail').css({height:$('#inside_content').height()*.95, width:'auto'});
												}else{
													$('#image_detail').css({width:$('#inside_content').width(), height:'auto'});
												};
												
											};
											
										}else{
											// console.log($('#inside_content').height());
											$('#image_detail').css({height:$('#inside_content').height()*.95, width:'auto'});
										};
										
										
						
									}; break; 
									case "2": {// Web Player
										
											$('#image_detail').css({height:$('#inside_content').height()-10, width:'auto'})
						
									}; break; 
									case "3": { // Interactive Ad Unit
										
						
											$('#image_detail').css({
													height:$('#inside_content').height()-5, 
													width:'auto'
												});
						
									}; break;
									case "4": {// Mini-Website
										
											$('#image_detail').css({height:$('#inside_content').height()-10, width:'auto'});
										
									}; break;
								};
								
							
								if( core.unit != 3 && core.unit != 2){
										var marginTop = ($('#inside_content').height() - $('#image_detail').height()) /2;
										$('#image_detail').css({'margin-top':marginTop+'px'});						
								};
												
								
						});
						
						
						
						core.adjust_slideUpDownHeight();
						core.adjustScrollPanel();
						
						
}	