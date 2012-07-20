(function(){

			core.toggleShowElements = function(){
							if ($('.elementsOverlay').css('display') == 'block'){
								$('.elementsOverlay').fadeOut('fast', function(){
									$('.elementsOverlay').css('display', 'none');
								});	
							}
							else{	
								$('.elementsOverlay').fadeIn('fast', function(){
									$('.elementsOverlay').css('display', 'block');
								});
							};
			};
			
			core.adjust_slideUpDownHeight=function(){
								$('.slideUpDown').css({'overflow-y':'auto'}).height(core.style[core.unit].height - core.style[core.unit].panel_height_unit);
			};
			
			
			core.value_of_parameter = function( name, frompath){
							name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
							var regexS = "[\\?&]"+name+"=([^&#]*)";
							var regex = new RegExp( regexS );
							var results = regex.exec( frompath );
							if( results == null )
							  return "";
							else
							  return results[1];
			};
			
			core.adjustScrollPanel=function(visibility){
				
					
								$('.scroll-pane-arrows').height(core.style[core.unit].scrollPaneAarrows);
					
								$('.scroll-pane-arrows').jScrollPane({
											showArrows: true,
											horizontalGutter: 10
										});
					
								if( core.unit == 2|| core.unit == 3){
									$('.jspVerticalBar').css({visibility:'hidden'});
								}else{
									$('.jspVerticalBar').css({visibility:visibility});
								};
									
			};
			
			core.parseIt=function(s){
					
							/* 
							*
							*  http://stackoverflow.com/questions/9852224/parse-date-in-ie
							*
							*/
						
						   var months = {Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, 
						                 Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11};
						
						   // Split the string up 
						   var s = s.split(/[\s:]/);
						
						   // Create a date object, setting the date                
						   var d = new Date(s[7], months[s[1]], s[2]);
						
						   // Set the time
						   d.setHours(s[3], s[4], s[5], 0);
						
						   // Correct the timezone
						   d.setMinutes(d.getMinutes() + Number(s[6]) - d.getTimezoneOffset());
						
						   // Done 
						   return d;
			};
			
			core.get_moments_past=function(created){
						var right_now_in_miliseconds = Date.now();
						created = new Date(created);
						created_in_miliseconds = created.getTime();
						miliseconds_past_since_tweet_is_posted = right_now_in_miliseconds - created_in_miliseconds;
						
						days = ((miliseconds_past_since_tweet_is_posted/1000) / 3600) / 24;
						hours = (miliseconds_past_since_tweet_is_posted/1000) / 3600;
						mins = (miliseconds_past_since_tweet_is_posted/1000) / 60;
						
						
						if ( days < 1){
						
						if( Math.ceil(mins)  < 60){  // MINUTES AGO
						
							moments_past = Math.ceil(mins);
							moments_past = moments_past + ( moments_past==1 ? ' min':' mins' );
							moments_past = moments_past +  " ago";
							
						}else{  // HOURS AGO
							
							moments_past = Math.ceil(hours);
							moments_past = moments_past + ( moments_past==1 ? ' hour':' hours' );
							moments_past = moments_past +  " ago";
							
						};
						
						}
						else{ // DAYS AGO
						
						moments_past = Math.ceil(days);
						moments_past = moments_past + ( moments_past==1 ? ' day':' days' );
						moments_past = moments_past +  " ago";
						
						}
						return moments_past;
			};
			
			core.BrowserDetect = {
					init: function() {
					    this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
					    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
					    this.OS = this.searchString(this.dataOS) || "an unknown OS";
					},
					searchString: function(data) {
					    for (var i = 0; i < data.length; i++) {
					        var dataString = data[i].string;
					        var dataProp = data[i].prop;
					        this.versionSearchString = data[i].versionSearch || data[i].identity;
					        if (dataString) {
					            if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
					        }
					        else if (dataProp) return data[i].identity;
					    }
					},
					searchVersion: function(dataString) {
					    var index = dataString.indexOf(this.versionSearchString);
					    if (index == -1) return;
					    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
					},
					dataBrowser: [
					    {
					    string: navigator.userAgent,
					    subString: "Chrome",
					    identity: "Chrome"},
					{
					    string: navigator.userAgent,
					    subString: "OmniWeb",
					    versionSearch: "OmniWeb/",
					    identity: "OmniWeb"},
					{
					    string: navigator.vendor,
					    subString: "Apple",
					    identity: "Safari",
					    versionSearch: "Version"},
					{
					    prop: window.opera,
					    identity: "Opera",
					    versionSearch: "Version"},
					{
					    string: navigator.vendor,
					    subString: "iCab",
					    identity: "iCab"},
					{
					    string: navigator.vendor,
					    subString: "KDE",
					    identity: "Konqueror"},
					{
					    string: navigator.userAgent,
					    subString: "Firefox",
					    identity: "Firefox"},
					{
					    string: navigator.vendor,
					    subString: "Camino",
					    identity: "Camino"},
					{ // for newer Netscapes (6+)
					    string: navigator.userAgent,
					    subString: "Netscape",
					    identity: "Netscape"},
					{
					    string: navigator.userAgent,
					    subString: "MSIE",
					    identity: "Explorer",
					    versionSearch: "MSIE"},
					{
					    string: navigator.userAgent,
					    subString: "Gecko",
					    identity: "Mozilla",
					    versionSearch: "rv"},
					{ // for older Netscapes (4-)
					    string: navigator.userAgent,
					    subString: "Mozilla",
					    identity: "Netscape",
					    versionSearch: "Mozilla"}
					],
					dataOS: [
					    {
					    string: navigator.platform,
					    subString: "Win",
					    identity: "Windows"},
					{
					    string: navigator.platform,
					    subString: "Mac",
					    identity: "Mac"},
					{
					    string: navigator.userAgent,
					    subString: "iPhone",
					    identity: "iPhone/iPod"},
					{
					    string: navigator.platform,
					    subString: "Linux",
					    identity: "Linux"}
					]
					
			};
			
			
		  var newDiv = document.createElement('div')  
			,content = "\
			<div class='warning-wrapper'>\
				<div class='warning-content'>\
				<p  class='head_msg ' >Feature Not Supported</p>\
				<p  class='body_msg ' ></p>\
				</div>\
			</div>";
			newDiv.className +=  'warning_msg_overlay';
			newDiv.innerHTML = content;
			document.body.insertBefore(newDiv, document.body.firstChild);		
			
			core.warning=function(){
						$('.warning_msg_overlay').show();
						$('.warning-wrapper').height(arguments[0].boxHeight).width(arguments[0].boxWidth);
						$('.warning-content').css({
						background: arguments[0].backgroundColor,
						border: arguments[0].borderSize + ' solid ' + arguments[0].borderColor,
						padding: arguments[0].boxPadding,
						'font-size': arguments[0].fontSize
						}).children('p.body_msg').html(arguments[0].msg);
						setTimeout(function() {
						$('#warning_msg_overlay').hide();
						}, arguments[0].duration);			
			};	
	    
	    
})();


