  $.fn.scrolltoNLoad  =  function(){


				$('.shareVideoOverlay').hide();
			
				$('.jspVerticalBar').css({visibility:'hidden'});
				
				/* 	Highlighting icon	*/		    
						controller_to_use = $(this).attr('controller');
						switch($(this).attr('controller')){
							case "musicDetails": controller_to_use = 'music';	break;
							case "photosThumbnails": controller_to_use = 'photos';	break;
							case "photosDetails": controller_to_use = 'photos';	break;
							case "videoDetails": controller_to_use = 'videos';	break;
							case "merchDetails": controller_to_use = 'merch';	break;
							case "eventsDetails": controller_to_use = 'events';	break;
							case "theatersDetails": controller_to_use = 'theaters';	break;
						}	
			
						$('.navItemHolder').removeClass('navSelected');
						$('.icon_div').removeClass('highlightedIcon');
							    
						$('.iconbox[controller='+controller_to_use+']').children('.navItemHolder').addClass('navSelected')
						$('.iconbox[controller='+controller_to_use+']').children('.icon_div').addClass('highlightedIcon');
			
						
				if( $(this).attr('photoId') != null ){
					
					core.photoId_selected =  $(this).attr('photoId');
				}			
					
				if( $(this).attr('eventsId') != null ){
					core.eventsId_selected =  $(this).attr('eventsId');
				} 		
				
				if( $(this).attr('musicId') != null ){
					core.musicId_selected =  $(this).attr('musicId');
				} 		
				
				if( $(this).attr('youtube_id') != null ){
					core.youtube_id_selected =  $(this).attr('youtube_id');
				}
				
				if( $(this).attr('video_id') != null ){
					core.video_id_selected =  $(this).attr('video_id');
				}				
				
				if( $(this).attr('merchId') != null ){
					core.merchId_selected =  $(this).attr('merchId');
				}				  					 								

				if($(this).attr('targetIs') == 'panel-2' ){
					
							if( typeof(core.googleAnalytics) !== "undefined"){

								core.googleAnalytics({
									 'type'				:'pageviews'
									,'section'		:controller_to_use
									,'unique_desc':'list'
								});
								
							};
							
							
							core.gaq({
								'type':'view'
								,'path':controller_to_use
							});
							
							
							
							if( typeof(core.trackingPixel) !== "undefined"){
								core.trackPixel_sections({
									 'type'				:'view'
									,'controller_to_use'		:controller_to_use
								});
							};							
							
					
							// console.log('rendering:   /mobile/widget_controllers/' + $(this).attr('controller') + '.html?random=' + Math.floor(Math.random()*999999999));

							core.onPanel = 2;
					
							$('#panel-2')
							.load( '/mobile/widget_controllers/' + $(this).attr('controller') + '.html?random=' + Math.floor(Math.random()*999999999), function(e){
			

								if( core.unit == 2 || core.unit == 3 ){
											if(core.isSlideDown == true){
												$('.jspVerticalBar').css({visibility:'visible'});
												// console.log('slide is down. jspVerticalBar is visible' );
											}else{
												// console.log('slide is up. jspVerticalBar is hidden' );
												$('.jspVerticalBar').css({visibility:'hidden'});
											};													
									
								};
								
			
								$('#contentWrapper').scrollTo( $('#panel-2'), core.slideSpeed, function(){
											$('#panel-3').children().remove();
								} )
								
							});
							
							
							
				}else{  // 'targetIs' == 'panel-3'
					
					
							core.onPanel = 3;
							
							
							
							if( typeof(core.trackingPixel) !== "undefined"){
								
								var convert_2_foreign_key = {
									 'merch': 	core.merchId_selected
									,'videos': 	core.video_id_selected
									,'music': 	core.musicId_selected
									,'events': 	core.eventsId_selected
									,'photos': 	core.photoId_selected
									
								};
								
								
								core.trackPixel_records({
									 'type'				:'view'
									,'controller_to_use'		: controller_to_use
									,'foreign_key'		: convert_2_foreign_key[controller_to_use]
								});
							};	
							
							
					
							$('#panel-3')
							.load( '/mobile/widget_controllers/' + $(this).attr('controller') + '.html?random=' + Math.floor(Math.random()*999999999), function(e){
									
								$('#contentWrapper').scrollTo( $('#panel-3'), core.slideSpeed, function(){})
								
							})
										
				};	
			};
			
			

