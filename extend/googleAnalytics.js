_gaq.push(['_setAccount', core.gid]);

core.gaq= function( arg ){

	if( typeof(arg.path) === undefined) return;
	
//	console.log(JSON.stringify(arg));
	
	switch(arg.type){
				case "event": {
					
					_gaq.push(['_trackEvent', 'rp_' + core.userId , arg.path, arg.path ]);
					
					console.log('pushing: ' + 'rp_' + core.userId , arg.path, arg.path);
					
				};	break;
				case "view": {
				
					arg.path = arg.path.split(' ').join('_');
					arg.path.toLowerCase();

					console.log('pushing: ' + '/rp/' + core.userId + '/' + arg.path);

					_gaq.push(['_trackPageview', '/rp/' + core.userId + '/' + arg.path ]);								
					
					
				};	break;
	}	
	
};


core.googleAnalytics= function( arg ){
	
	
	return;
	
				switch(arg.type){
							case "events": {
								
								arg.label = arg.label.split(' ').join('_');
								
								//console.log( 'type: ' + arg.type+  ', category: ' + arg.category+ ', action: ' + arg.action+ ', label: '   + arg.label);
								_gaq.push(['_trackEvent', arg.category, arg.action, core.userId + '_' + arg.label]);
							};	break;
							case "pageviews": {
								
								arg.unique_desc = arg.unique_desc.split(' ').join('_');
								
								//console.log( 'type: ' + arg.type + ', section: ' + arg.section  + ', unique_desc: ' +arg.unique_desc);
								_gaq.push(['_trackPageview', '/unit/' + core.userId + '/' + arg.section  + '/' +  arg.unique_desc]);
							};	break;
				}	
};


core.convert_controller_to_use_TO_section_name = function(obj){
	
	var  convert_controller_to_use_TO_section_name = {
						 'custom':'custom'
						,'home':'home'
						,'theaters':'theaters'
						,'photos':'photos'
						,'videos':'videos'
						,'bio':'about'
						,'music':'music'
						,'news':'news'
						,'connect':'tweets'
						,'events':'events'
						,'merch':'packages'
						,'news':'news'
						,'mentions':'mentions'
						,'facebook':'facebook'
						,'livestream':'livestream'
					};
					
			return convert_controller_to_use_TO_section_name[obj.controller_to_use];	
}

core.trackPixel_in_div = function( content ){
	$('.trackPixelDiv').html(content);
}

core.trackPixel_sections = function(obj){
	
	if( typeof(core.trackingPixel) !== "undefined" ){
	
	var section = core.convert_controller_to_use_TO_section_name(obj);
	if( typeof(core.trackingPixel[section]) !== "undefined" ){
		if( obj.type == 'view'){
			core.trackPixel_in_div( core.trackingPixel[section].main );
		}else{ // obj.type == 'action'
			core.trackPixel_in_div( core.trackingPixel[section].action );
		};
		
	};

	};
		
};


core.trackPixel_records = function(obj){
	
	if( typeof(core.trackingPixel) !== "undefined" ){	
		var section = core.convert_controller_to_use_TO_section_name(obj);
		if( typeof(core.trackingPixel[section].records[obj.foreign_key]) !== "undefined" ){
			if( obj.type == 'view'){
				core.trackPixel_in_div( core.trackingPixel[section].records[obj.foreign_key].main );
			}else{ // obj.type == 'action'
				core.trackPixel_in_div( core.trackingPixel[section].records[obj.foreign_key].action );
			};
		};

	};
};

core.loadScript('anal', '/user/' + core.userId + '/deploy/scripts/anal.js', function(){
  var newDiv = document.createElement('div');
	newDiv.className +=  'trackPixelDiv';
	newDiv.style.width =  '0px';
	document.body.insertBefore(newDiv, document.body.firstChild);
});
core.processCallbackQueue();