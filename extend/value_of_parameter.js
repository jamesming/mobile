core.value_of_parameter=function( name, frompath){
				name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
				var regexS = "[\\?&]"+name+"=([^&#]*)";
				var regex = new RegExp( regexS );
				var results = regex.exec( frompath );
				if( results == null )
				  return "";
				else
				  return results[1];
}