core.show_events= function(find_zipcode){
			var month_textualized = new Array(12);
			  
			  month_textualized[1] = 'Jan';
			  month_textualized[2] = 'Feb';
			  month_textualized[3] = 'Mar';
			  month_textualized[4] = 'Apr';
			  month_textualized[5] = 'May';
			  month_textualized[6] = 'Jun';
			  month_textualized[7] = 'Jul';
			  month_textualized[8] = 'Aug';
			  month_textualized[9] = 'Sep';
			  month_textualized[10] = 'Oct';
			  month_textualized[11] = 'Nov';
			  month_textualized[12] = 'Dec';
			  
				$.ajax({
			    type: "GET",
			    url: '/user/' +  core.userId + '/deploy/data/events.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('item').each(function(){
			
							var eventsid = $(this).find('id').text();
							var userid = $(this).find('userid').text();
							var eventname = $(this).find('eventname').text();
							var imageurl = $(this).find('imageurl').text();
							var datetime = $(this).find('datetime').text();
		
							var firstSplit = datetime.split(':'); 
			
							dateIs = firstSplit[0].split('-');
		
							var month = month_textualized[ Math.ceil(dateIs[1]) ];
							var day = dateIs[2];
							
							day = day.split(' ')[0];
							
							var location = $(this).find('location').text();
							var eventinfo = $(this).find('eventinfo').text();
							var buylink = $(this).find('buylink').text();
							var date = $(this).find('date').text();
							var time = $(this).find('time').text();
							var country = $(this).find('country').text();
							var zipcode = $(this).find('zipcode').text();
		
																var events_box = $('\
												<div class="eventsItemHolder navLink"   eventsid=' +  eventsid  + '  controller="eventsDetails" style="padding-bottom:5px;">\
													<div class="eventsItemContainer  ">\
														<!--  --><div   style="width:90%;float: left;white-space:nowrap" >\
																<span class="dateHolder"  style="float: left;">\
																	<div class="monthHolder">' +  month  + '</div>\
																	<div class="dayHolder">' +  day  + '</div>\
																</span>\
																<span style="float: left; margin-left: 6px;">\
																	<img src="/mobile/images/images-merch/dividerLeft.png" />\
																</span>\
																<span class="eventsLabelHolder"  style="float: left;">\
																		<div class="eventsNameContainer" style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;text-overflow: ellipsis;">\
																			' +  eventname + '\
																		</div>\
																		<div class="dateNameContainer" style="text-overflow: ellipsis;">\
																			<span style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;color: #51C4FF;">' +  location  + '</span>\
																		</div>\
																 </span>\
														<!--  --></div>\
														<!--  --><div   style="width:10%;float: left;white-space:nowrap" >\
																<span style="float: right; ">\
																	<a class=" eventsPlayHolder">\
																		<img src="/mobile/images/images-merch/play.png" />\
																	</a>\
																</span>\
														<!--  --></div>\
													</div>\
												</div>\
												<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
																');
									
																$('.eventsWrapper').append(events_box);
														
							
						});		
						

						
						$('.eventsLabelHolder div').width(core.style[core.unit].width-180);
																
																
						core.adjustScrollPanel();
						
					}
			});	
		}