(function($){

		var ie = (function () {
				    var undef, v = 3, div = document.createElement('div');
				
				    while (
				        div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
				        div.getElementsByTagName('i')[0]
				    );
				
				    return v > 4 ? v : undef;
				}());
				
		var  head = document.getElementsByTagName('head')[0]
				,css = [
						 'helpers'
						,'videos'
						,'bio'
						,'connect'
						,'merch'
						,'scrollpane'
						,'music'
					]
				,length = css.length
				,head
				,link
				,path 
				,url; 
		
		
		for( var i = 0; i <= length; i++ ){
			
			
				if (ie === 8) {

						url ='/mobile/css/' + css[i] + '.css' + '?cache_buster='  + cache_buster + '&v=' + Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1;
						
						if(document.createStyleSheet) {
						    try { document.createStyleSheet(url); } catch (e) { }
						}
						else {
						    var css;
						    css         = document.createElement('link');
						    css.rel     = 'stylesheet';
						    css.type    = 'text/css';
						    css.media   = "all";
						    css.href    = url;
						    document.getElementsByTagName("head")[0].appendChild(css);
						}
						
				}else{
					
						for( var i = 0; i <= length; i++ ){
				    		link = document.createElement('link');
				    		path = '/mobile/css/' + css[i]+ '.css?cache_buster='  + cache_buster + '&v=' + Math.floor(Math.random() * (99999999999999 - 1 + 1)) + 1;			
						    link.rel = 'stylesheet';
						    link.type = 'text/css';
						    link.href = path;
						    link.media = 'all';			
						    $(head).prepend(link);
						}
					
				}

		};

	    
})($);