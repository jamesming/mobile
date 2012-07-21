core.show_theaters_details=function(){
			
			switch(core.unit){
				case "1": { // Mobile
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	
				};	break; 
				case "2": {// Web Player
				};	break; 
				case "3": { // Interactive Ad Unit
					$('#search_zip_div').hide();
					$('#theatersZipCode').val('zipcode').click(function(event) {
						$(this).val('');			
					});	

				};	break;
				case "4": { // Mini-Website
					$('#theaters').css({
							height:core.style[core.unit].height-123
					});				
				};	break; 
			};
			
		core.adjust_slideUpDownHeight();	
		
		     	core.temp.map = 'http://maps.googleapis.com/maps/api/staticmap?zoom=12&size=80x80&maptype=roadmap&markers=size:mid%7Ccolor:red%7C' + core.temp.address + '&sensor=false';
		
					$("#theaters_details").html('').append("\
						<div  class='ot '   style='padding:10px;box-sizing:border-box;'  >\
							<img   style='border:3px solid black'  src='" + core.temp.map + "' />\
							<a  id='theater_buylink' href='" +  core.temp.link + "' target='_blank' ><img   src='images/images-theaters/getTickets.png' /></a>\
						</div>\
						<div   class='tt ' style='padding:10px; padding-left:15px;box-sizing:border-box' >\
							<div   style='margin-bottom:5px;font-size:11px;color:#02D0BE'  >Event Name:</div>\
							<div   style='margin-bottom:10px;border-bottom:1px solid gray;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;	'  >" +  core.temp.name  +"</div>\
							<div   style='margin-bottom:5px;font-size:11px;color:#02D0BE'  >Additional Event Information:</div>\
							<div   style='font-size:11px;color:gray'  >" +  core.temp.address  +"</div>\
						</div>\
					");		
					
					
					core.googleAnalytics({
						 'type'				:'pageviews'
						,'section'		:'THEATERS_DETAILS'
						,'unique_desc':core.temp.name
					});
					 	
					$('#theater_buylink').click(function(event) {	
							core.gaq({
							'type':'event'
							,'path':'ExitTheatersBuy'
							});
					});	
					 	

		$('.scroll-pane-arrows').jScrollPane({
			showArrows: true,
			horizontalGutter: 10
		});
		
		$('.jspVerticalBar').css({visibility:'visibile'});	
		
}