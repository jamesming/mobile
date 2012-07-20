core.showmusic = function(){
			
			window.count_music = 0;
			
			var music_list = '';
			
			$.ajax({
			    type: "GET",
			    url:  '/user/' +  core.userId + '/deploy/data/music.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
		
						$(xml).find('Song').each(function(){
							
							var musicId = $(this).find('musicid').text();
							var ASIN = $(this).find('ASIN').text();
							var songname = $(this).find('songname').text();
							var albumname = $(this).find('albumname').text();
							var albumurl = $(this).find('albumurl').text();
							var albuminfo = $(this).find('albuminfo').text();
							var cover = $(this).find('cover').text();
							var isfree = $(this).find('isfree').text();
							var ringurl = $(this).find('ringurl').text();
							var songurl = $(this).find('songurl').text();
							var playDiv;
							
							if (core.ie === 8) {
								playDiv = '';
							}else{
								playDiv = '\
													<span   style="float: right;"  class="soundHolder" id='+ musicId +' >\
														<a  class="playmusic " musicId='+musicId+'  count_music="' +  core.count_music  + '" >\
															<img src="/mobile/images/images-music/sound.png" />\
														</a>\
													</span>\
								';
							};
		
		
							var music_box = '\
								<div class="musicItemHolder" style="clear: both;">\
									<div class="musicItemContainer">\
											<div style="width: 65%; float: left; white-space:nowrap;" >\
												<span class="navLink" musicId="'+ musicId +'" controller="musicDetails" style="cursor: pointer; float: left; display: inline-block;">\
													<div class="musicIconHolder">\
														<div class="musicImageWrapper">\
															<img src="' + cover +  '" width="36" height="36" onError="$(this).attr(\'src\', \'/mobile/images/images-music/imageNotFound.png\')" />\
														</div>\
													</div>\
													<div style="float: left; margin-left: 3px; margin-right: 2px; margin-top: -8px;">\
														<img src="/mobile/images/images-music/dividerLeft.png" />\
													</div>\
												</span\
												<span class="musicLabelHolder" style="float: left;display: inline-block ">\
														<div class="songNameContainer navLink"  musicId='+musicId+' controller="musicDetails" style="cursor:pointer;font-size: ' + core.style[core.unit].font_size_unit.big + 'px;  text-overflow: ellipsis;">'+ songname +'</div>\
														<div class="albumNameContainer navLink"  musicId='+musicId+' controller="musicDetails" style="cursor:pointer;font-size: ' + core.style[core.unit].font_size_unit.small + 'px;text-overflow: ellipsis;">' + albumname +  '</div>\
												</span>\
											</div>\
											<div style="width:35%;float: left; white-space:nowrap" >\
													<span>\
														<a style="float: right;" class="navLink musicPlayHolder" musicId='+musicId+' controller="musicDetails" >\
															<img src="/mobile/images/images-music/play.png" />\
														</a>\
													</span>' + playDiv + '\
											</div>\
									</div>\
								</div>\
								<div style="height: 1px; background: #2F2F2F; "> &nbsp; </div>\
							';
							
							music_list += music_box;
							
							core.count_music++;	
		
						});
						
						$('.musicWrapper').append(music_list);
						
						$('.musicLabelHolder, .musicLabelHolder div').width(core.style[core.unit].width-200);
						
						$('.playmusic').live('click', function(event) {
							
									var musicId = $(this).attr('musicId');
									
									core.trackPixel_records({
										 'type'				:'action'
										,'controller_to_use'		: 'music'
										,'foreign_key'		: musicId
									});										
							
									var musicIndex = $(this).attr('count_music');
							
									core.loadScript('musicplayer', '/mobile/extend/musicplayer.js', function(){
												if( core.musicIsSetup === false){
													core.setup_music_player();
													core.musicIsSetup = true;
												};
												var doWhenReady = function(){
													if( core.musicArr.length === 0 ){
														setTimeout(function(){
															doWhenReady()
														}, 500);
													}else{
														
														core.playMusicFromList(musicIndex);
													};
												};
												
												doWhenReady();
												
									});							
									core.processCallbackQueue();
						});							
						
						core.adjustScrollPanel();					
						
					}
			});
		}