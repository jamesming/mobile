core.loadScript('cookie', '/mobile/scripts/jquery.cookie.js', function(){});
core.processCallbackQueue();

core.extractZip = function(data) {
	var area = data.kml.Response.Placemark.AddressDetails.Country.AdministrativeArea;
	if (typeof(area.Locality) != "undefined") {
		return area.Locality.PostalCode.PostalCodeNumber.$;
	}
	if (typeof(area.DependentLocality) != "undefined") {
		return area.DependentLocality.PostalCode.PostalCodeNumber.$;
	}
	if (typeof(area.SubAdministrativeArea) != "undefined") {
		return area.SubAdministrativeArea.Locality.PostalCode.PostalCodeNumber.$;
	}
	return false;
};

core.show_theaters=function() {
	
	if ($.cookie("rp_theaters_zip") != null) {

		var zip = $.cookie("rp_theaters_zip");
		setTimeout(function(){
			$('#theatersZipCode').val(zip);
			$('#go_theater_btn').click();
		}, 500);

	} else {
	
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var googleURL = "http://maps.google.com/maps/geo";
				googleURL += "?q="+position.coords.latitude+","+position.coords.longitude;
				googleURL += "&output=xml";
				googleURL += "&sensor=false";
				$.ajax({
					url: "http://skwerl.appspot.com/handler?url="+escape(googleURL),
					contentType: "application/json",
					dataType: "jsonp",
					success: function(data) {
						var zip = core.extractZip(data);
						if (zip) {
	
							$('#theatersZipCode').val(zip);
							$('#go_theater_btn').click();
							$.cookie("rp_theaters_zip", zip, { expires: 3 });
	
						} else {
							//alert("Got GPS, but couldn't get zip from Google.");
						}
					}
				});
			}, function(error) {
				//alert("Problem getting GPS.");
			});
		} else {
			//alert("GPS not supported.");
		}

	}

	switch(core.unit) {
		case "1": { // Mobile
			$('#search_zip_div').hide();
			$('#theatersZipCode').val('zipcode').click(function(event) {
				$(this).val('');			
			});	
			break;
		}; 
		case "2": { // Web Player
			break; 
		};	
		case "3": { // Interactive Ad Unit
			$('#search_zip_div').hide();
			$('#theatersZipCode').val('zipcode').click(function(event) {
				$(this).val('');			
			});	
			break;			
		};
		case "4": { // Mini-Website
			$('#theaters').css({
				height:core.style[core.unit].height-123
			});				
			break;
		}; 
	};
	
	$('#theatersZipCode').keypress(function(event) {
		if(event.which == 13 ){
			$('#go_theater_btn').click();
		};
	});
	
	core.adjust_slideUpDownHeight();	
	
	$('#go_theater_btn').live('click',function(event) {

		core.loadScript('jsapi', 'https://www.google.com/jsapi', function() {
		
			google.load("feeds", "1", { "callback" : function() {
			
				core.googleAnalytics({
				'type'				:'pageviews'
				,'section'		:'THEATERS_SEARCH'
				,'unique_desc':$('#theatersZipCode').val()
				});				
				
				var feed = new google.feeds.Feed("http://www.fandango.com/rss/moviesnearme_"+ $('#theatersZipCode').val());
				
				feed.setNumEntries(15);
				
				feed.load(function(result) {	
				
					if (!result.error) {

						$("#insertZipImage").hide();

						var clientZip;
						
						if ($('#theatersZipCode').val()) {
							clientZip = $('#theatersZipCode').val();                
						}

						var map = 'http://maps.googleapis.com/maps/api/staticmap?zoom=12&size=220x75&maptype=roadmap&markers=size:mid%7Ccolor:red%7C'+clientZip+'&sensor=false';
						var zipTemplate = "<div id='zipImage'><img src='" + map + "' /></div>";
											
						var feed_length = result.feed.entries.length;
						
						var theaters = [];
						
						for (var i = 0; i < feed_length; i++) {
						
							var theater = {};
							
							var entry = result.feed.entries[i];
							
							theater.name = entry.title;
							
							theater.link = entry.link;
							
							var content = entry.content;
							
							$('#storageDiv').html('').append(content);
							
							theater.address = $('#storageDiv').children('p:nth-child(1)').text();
							
							theater.movies = [];		
							
							$('#storageDiv').find('li').each(function(event) {
							
								theater.movies.push($(this).text());
							
							});				         	
							
							var number_of_movies = theater.movies.length;
							
							if( number_of_movies > 0 ) {

								theaters.push(theater);
							
							}
						
						}
					
					};
														
					core.theaters = theaters;
					
					var collectionOfTheatersRows = '';
					
					for (theater in theaters) {
					
						collectionOfTheatersRows = collectionOfTheatersRows + "\
							<div  class='theater_names_wrapper play_arrow'    theater-num='" + theater + "'   style='cursor:pointer;border-bottom:1px solid black'    >\
							<div   style='float:left;width:88%'  >\
							<div  class='theater_ticket_images'    >\
									<img src='images/images-theaters/ticketLogo.png' />\
							</div>\
							<div  class='theater_names_right_wrapper ' >\
									<div  class='theater_names '    style='font-size: " + core.style[core.unit].font_size_unit.big + "px;'    >\
										" + theaters[theater].name + "\
									</div>\
									<div  class='theater_address '    style='font-size: " + core.style[core.unit].font_size_unit.small + "px;'     >\
										" + theaters[theater].address + "\
									</div>\
							</div>\
							</div>\
							<div   style='float:left;width:8%;'  >\
								<img src='images/images-merch/play.png' />\
							</div>\
							</div>\
							<div style='height: 1px; background:#2F2F2F; '> &nbsp; </div>\
						";
					
					};
					
					
					//lets set are pane object here
					var settings = {
						showArrows: true,
						horizontalGutter: 10
					};
					
					$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);
					
					//lets create the pane the right way
					var pane = $('.scroll-pane-arrows');
					pane.jScrollPane(settings);
					var api = pane.data('jsp');

					if (collectionOfTheatersRows.length > 0) {
						collectionOfTheatersRows = zipTemplate.concat(collectionOfTheatersRows);
					}
					
					api.getContentPane().empty().append(collectionOfTheatersRows);

					//remember when making changes to the pane you have to reinitalize it.
					api.reinitialise();
					
					core.doThisOnce = true;
					$('.jspVerticalBar').show().css({visibility:'visible'});

				});
				
			
			}});	
			
		});
		
		core.processCallbackQueue();
	
	});	

	$('.play_arrow').live('click', function(event) {
	
		var indexOfTheater = $(this).attr('theater-num');
		
		core.temp = {
			name:core.theaters[indexOfTheater].name,
			address:core.theaters[indexOfTheater].address,
			movies:core.theaters[indexOfTheater].movies,
			link:core.theaters[indexOfTheater].link
		};
		
		$('#panel-3').load( '/mobile/widget_controllers/theaters_details.html?random=' + Math.floor(Math.random()*999999999), function(e) {
			$('#contentWrapper').scrollTo( $('#panel-3'), 500);
		})
		
	});

}