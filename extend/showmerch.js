core.show_merch=function(){
	
			
			var  count
					,merch_box = '';
			
			$.ajax({
			    type: "GET",
			    url: '/user/' +  core.userId + '/deploy/data/packages.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
					
						$(xml).find('item').each(function(){
		
							var  title = $(this).find('title').text()
									,id = $(this).find('id').text()
									,imageurl = $(this).find('imageurl').text()
									,description = $(this).find('description').text()
									,price = $(this).find('price').text()
									,buyinfo = $(this).find('buyinfo').text()
									,asin = $(this).find('asin').text()
									,buylink = $(this).find('buylink').text();
									
									
									title  = title.substring(0, 34);
		
									merch_box += '\
																				<div class="merchItemHolder navLink "  merchId=' + id   + '  controller="merchDetails"   style="cursor:pointer;"  >\
																						<div   style="width:90%;float: left;white-space:nowrap" >\
																								<div class="musicIconHolder" style="float: left;">\
																										<img src="' +  imageurl  + '" width="36" height="36"  />\
																								</div>\
																								<div class="merchLabelHolder"   style="float: left;"  >\
																										<div class="merchNameContainer" style="font-size: ' + core.style[core.unit].font_size_unit.big + 'px;clear:both;text-overflow: ellipsis;">\
																											' +   title + '\
																										</div>\
																										<div class="priceNameContainer" style="font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-overflow: ellipsis;">\
																											Price: ' +  price  + '\
																										</div>\
																								</div>\
																						</div>\
																						<div   style="width:10%;float: left" >\
																							<a  id="arrow_'+count+'"   class="merchPlayHolder" style="float: right">\
																								<img src="/mobile/images/images-merch/play.png" />\
																							</a>\
																						</div>\
																				</div>\
																				<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
									';
							
									count++;
							
						});		
						
						
						$('.merchWrapper').append(merch_box);
	
						core.adjust_slideUpDownHeight();
						
						core.adjustScrollPanel();			
						
						
										
						$('.merchLabelHolder').css({width:core.style[core.unit].width - 150})							
				
		
					},
					error: function(data) {	
						alert(JSON.stringify(data));
					}
			});	
		}