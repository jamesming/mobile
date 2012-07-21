core.showeventsdetails=function(){
			
			var doOnce = 0;
			
			$.ajax({
			    type: "GET",
			    url:  '/user/' +  core.userId + '/deploy/data/events.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
							var eventsid = $(this).find('id').text()
									,userid = $(this).find('userid').text()
									,eventname = $(this).find('eventname').text()
									,imageurl = $(this).find('imageurl').text()
									,datetime = $(this).find('datetime').text()
									,eventinfo = $(this).find('eventinfo').text()
									,lat = $(this).find('lat').text()
									,long = $(this).find('long').text();
							
							datetime_ = new Date(datetime);
							// datetime_formated = datetime_.format("dddd, mmmm dS, yyyy, h:MM:ss TT");
							
							var firstSplit = datetime.split(':'); 
							dateIs = firstSplit[0].split('-');
		
							var month = dateIs[1]
									,day = dateIs[2]
									,location = $(this).find('location').text()
									,eventinfo = $(this).find('eventinfo').text()
									,buylink = $(this).find('buylink').text()
									,date = $(this).find('date').text()
									,time = $(this).find('time').text()
									,country = $(this).find('country').text();
							
		
							if(eventsid == core.eventsId_selected ){
								
										if( doOnce == 0){
											
												doOnce = 1;			
												
															core.gaq({
																'type':'view'
																,'path':'events/'+eventname + '_' + datetime
															});				
																											
															if( buylink != ''){
																$('#buylink_div').show();
																$('#buylink').attr('href', buylink)
																.click(function(event) {
																			
																			core.googleAnalytics({
																				 'type'			:'events'
																				,'category'	:'EXIT'
																				,'action'		:'CLICK'
																				,'label'		:'EVENT_BUYLINK_' + eventname + '_' + datetime
																			});
																			
																});	
									
									
										};
																			
									
																
								}
		
								$('#eventname').css({'font-size':core.style[core.unit].font_size_unit.big}).text(eventname);
								$('#datetime').css({'font-size':core.style[core.unit].font_size_unit.big}).text(datetime);
								$('#location').css({'font-size':core.style[core.unit].font_size_unit.big}).text(location);
								$('#eventinfo').css({'font-size':core.style[core.unit].font_size_unit.big}).text(eventinfo);
								
								$('#map').attr('src', 'http://maps.googleapis.com/maps/api/staticmap?center='+lat+','+long+'&zoom=12&size=95x95&maptype=roadmap4&sensor=false&markers=size:mid|color:red|label:A|'+lat+','+long);
								
							};
		
						});
						
						
						
						$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);						
							
						$('.scroll-pane-arrows').jScrollPane({
							showArrows: true,
							horizontalGutter: 10
						});
						
						$('.jspVerticalBar').css({visibility:'visibile'});	
						
						
						
						
		
					}
			});
			
		
			$('#right_content').css({width:core.style[core.unit].width - 157});
			
			$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);						
				
			$('.scroll-pane-arrows').jScrollPane({
				showArrows: true,
				horizontalGutter: 10
			});
			
			$('.jspVerticalBar').css({visibility:'visibile'});			

//
//        var settings = {
//            showArrows: true,
//            horizontalGutter: 10
//        };
//
//        $('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);
//
//        var pane = $('.scroll-pane-arrows')
//        pane.jScrollPane(settings);
//        var api = pane.data('jsp');
//        
//        api.reinitialise();
//
//
//        $('.jspVerticalBar').show().css({visibility:'visible'});
							
			
			
		}