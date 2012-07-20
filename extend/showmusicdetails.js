core.showmusicdetails=function(){
		
			var  music_number = new Array()
					,count_musics = 0
					,doOnce = 0;
		
			$.ajax({
			    type: "GET",
			    url:  '/user/' +  core.userId + '/deploy/data/music.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
						
		
						$(xml).find('Song').each(function(){
							

							var musicid = $(this).find('musicid').text();
							var ASIN = $(this).find('ASIN').text();
							var songname = $(this).find('songname').text();
							var albumname = $(this).find('albumname').text();
							var albumurl = $(this).find('albumurl').text();
							var albuminfo = $(this).find('albuminfo').text();
							var cover = $(this).find('cover').text();
							var isfree = $(this).find('isfree').text();
							var ringurl = $(this).find('ringurl').text();
							var songurl = $(this).find('songurl').text();
							
							music_number[count_musics] = musicid;	
		
							if(musicid == core.musicId_selected ){
								
								$('#music_img').attr('src', cover)		
								$('.musicName').text(songname)
								$('.albumName').text(albumname)
								$('.albumInfo').text(albuminfo);
								
								if( doOnce == 0){
									
											doOnce = 1;	
											
											core.googleAnalytics({
												 'type'				:'pageviews'
												,'section'		:'MUSIC_DETAILS'
												,'unique_desc':songname
											});											
																		
											$('#amazon_link')
											.click(function(event) {
												
			
															
															core.googleAnalytics({
																 'type'			:'events'
																,'category'	:'EXIT'
																,'action'		:'CLICK'
																,'label'		:'MUSIC_BUYLINK_' + songname
															});
			
												
											})
											
											
											// .attr('href', $('#amazon_link').attr('href')+ASIN);	
											
											.attr('href', albumurl);	
						

								};
								
								core.music_index = count_musics;
								
							};
							
							count_musics++;
		
						});		
						
						/* 
						*
						*  Pass music_id to previous and next button
						*
						*/
		
						if( core.music_index == 0 ){
							var previous_music_index = music_number.length - 1;
						}else{
							var previous_music_index = core.music_index - 1;
						};
						
						if( core.music_index == music_number.length - 1){
							var next_music_index = 0;
						}else{
							var next_music_index = core.music_index  + 1;
						};
		

						$('.prev_a_link').attr('musicId', music_number[previous_music_index])
						
						$('.next_a_link').attr('musicId', music_number[next_music_index])
						
						
					}
			});
			
			core.adjust_slideUpDownHeight();
			
			if((navigator.userAgent.match(/iPhone/i)) || 
			 (navigator.userAgent.match(/iPod/i))) {
				
						$('#filler').height(150).html('\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
							<br />&nbsp;\
						')
				
			};
			
			$('.scroll-pane-arrows').jScrollPane({
				showArrows: true,
				horizontalGutter: 10
			});
			
		
}