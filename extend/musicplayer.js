(function(){
					
				  var newDiv = document.createElement('div')  
					,content = "\
					<style>\
					.playerBtn{\
						cursor: pointer;\
					}\
					.playerContainer{\
						z-index: 2; \
						position: absolute;\
						left: 10px;\
						margin-top: -55px;\
						margin-left: 0px;\
					}\
					.audioControlsContainer{\
						height: 57px;\
						width: 208px;\
						background: #202020;\
						border-left: 1px solid #3A3A3A;\
						border-right: 1px solid #3A3A3A;\
					}\
					#audioContainer{\
						padding-top: 21px;\
						padding-left: 5px;\
						margin-top: -200px;\
					}\
					.audioLabelContainer{\
						float: left;\
						font-size: 8px;\
						margin-top: 3px;\
						font-family: arial;\
						font-weight: bold;\
						margin-left: 10px;\
					}\
					.audioArtistContainer{\
						width: 150px;\
						overflow: hidden;\
						font-weight: bold;\
						height: 10px;\
					}\
					.audioPlayContainer{\
						margin-top: 4px;\
					}\
					.audioBtnContainer{\
						float: left;\
						margin-right: 3px;\
					}\
					.audioThumbWrapper{\
						width: 31px;\
						height: 31px;\
						background: #393939;\
						margin-top: 3px;\
						float: right;\
					}\
					.audioThumbContainer{\
						width: 25px;\
						height: 25px;\
						background: green;\
						margin-top: 3px;\
						margin-left: 3px;\
					}\
					#timeline{\
						float: left;\
						height: 6px;\
						background: #808080;\
						width: 50px;\
						margin-top: 4px;\
						border: 1px solid #313131;\
						overflow: hidden;\
					}\
					#timelineBar{\
						background: #A8A8A8;\
					}\
					#timeElapsed, #timeRemaining{\
						color: #646464;\
						width: 20px;\
					}\
					#sliderContainer{\
						float: left;\
						width:100px;\
					}\
					#sliderLoadingContainer{\
						color: #FFF;\
						float: left;\
						height: 9px;\
						margin-left: -91px;\
						padding: 3px;\
						text-align: center;\
						width: 75px;\
						visibility: hidden;\
						z-index: 100;\
						font-weight: bold;\
					}\
					</style>\
							<div   style='background:#202020;height:40px;'  >\
								<div class='audioLabelContainer'   style='width:165px;float:left;background:#202020'    >\
									<div class='audioArtistContainer'>\
										<span style='color: #4E4E4E;'>Playing:</span> \
										<span style='color: #919191;' id='audioTitle'></span>\
									</div>\
									<div class='audioPlayContainer'>\
										<div class='audioBtnContainer' id='audioPrevBtnWrapper'>\
											<a href='javascript: void(0);' id='audioPrevBtn'>\
												<img src='/mobile/images/musicPlayerPrev.gif' />\
											</a>\
										</div>\
										<div class='audioBtnContainer' id='audioPauseBtnWrapper' style='visibility: visible;'>\
											<a href='javascript: void(0);' id='audioPauseBtn'>\
												<img src='/mobile/images/musicPlayerPause.gif' />\
											</a>\
										</div>\
										<div class='audioBtnContainer' id='audioPlayBtnWrapper' style='margin-left: -20px; visibility: hidden;'>\
											<a href='javascript: void(0);' id='audioPlayBtn'>\
												<img src='/mobile/images/musicPlayerPlay.gif' />\
											</a>\
										</div>\
										<div class='audioBtnContainer' id='audioNextBtnWrapper'>\
											<a href='javascript: void(0);' id='audioNextBtn'>\
												<img src='/mobile/images/musicPlayerNext.gif' />\
											</a>\
										</div>\
						\
										<div id='sliderContainer'    >\
											<div style='float: left; color: #919191; margin-top: 3px; margin-left: 3px; margin-right: 3px; width: 15px;'>\
												<span id='timeElapsed'>&nbsp;</span>\
											</div>\
											\
											<div id='timeline'>\
												<div id='timelineBar'>\
													&nbsp;\
												</div>\
											</div>\
											\
											<div style='float: left; color: #919191; margin-top: 3px; margin-left: 3px; width: 15px;'>\
												<span id='timeRemaining'>&nbsp;</span>\
											</div>\
										\
											<div class='addClearBoth'></div>\
										</div>\
										\
										<div id='sliderLoadingContainer'><img src='/mobile/images/loader.gif' /></div>\
						\
									</div>\
								</div>\
								<div class='audioThumbWrapper'  style='float:left'  >\
									<div class='audioThumbContainer' style='background: #CCC;'>\
										<img 	id='audioThumb' \
												src=''\
												height='25' \
												width='25' />\
									</div>\
								</div>\
							</div>\
							<div class='playerBtn'>\
								<img src='/mobile/images/playerBtnDown.png' />\
							</div>\
								\
							<div id='audioContainer'     >\
								<audio id='audioPlayer' src='' controls='controls' autoplay='autoplay' style='width: 197px;'></audio>\
								<input type='hidden' id='prevId' value='' />\
								<input type='hidden' id='prevAsin' value='' />\
								<input type='hidden' id='prevThumb' value='' />\
								<input type='hidden' id='prevTitle' value='' />\
								\
								<input type='hidden' id='currentId' value='' />\
								<input type='hidden' id='currentAsin' value='' />\
								<input type='hidden' id='currentThumb' value='' />\
								<input type='hidden' id='currentTitle' value='' />\
								\
								<input type='hidden' id='nextId' value='' />\
								<input type='hidden' id='nextAsin' value='' />\
								<input type='hidden' id='nextThumb' value='' />\
								<input type='hidden' id='nextTitle' value='' />\
							</div>\
					";
					newDiv.className +=  'playerContainer';
					newDiv.innerHTML = content;
					document.body.insertBefore(newDiv, document.body.firstChild);			
	
					core.changeValues = function(index){ 
						
										var prevIndex = '';
										var currentIndex = parseInt(index);
										var nextIndex = '';
										if (currentIndex == 0){
										if (core.musicArr.length > 1) { 
										prevIndex = core.musicArr.length-1;
										nextIndex = parseInt(index)+1;
										}
										else{ // if there's only 1 song, don't display previous and next buttons
										
										prevIndex = 0;
										nextIndex = 0; 
										$('#audioNextBtn').unbind('click');
										$('#audioPrevBtn').unbind('click');
										$('#audioNextBtn').css('cursor', 'default');
										$('#audioPrevBtn').css('cursor', 'default');
										$('#audioNextBtn').children('img').attr('src', '/mobile/images/musicPlayerNextDisabled.gif');
										$('#audioPrevBtn').children('img').attr('src', '/mobile/images/musicPlayerPrevDisabled.gif');
										}
										}
										else if (currentIndex == core.musicArr.length-1){
										prevIndex = parseInt(index)-1;
										nextIndex = 0;	
										}
										else{
										prevIndex = parseInt(index)-1;
										nextIndex = parseInt(index)+1;
										}
										$('#prevId').val(core.musicArr[prevIndex][0]);
										$('#prevAsin').val(core.musicArr[prevIndex][1]);
										$('#prevThumb').val(core.musicArr[prevIndex][2]);
										$('#prevTitle').val(core.musicArr[prevIndex][3]);
										
										$('#currentId').val(core.musicArr[currentIndex][0]);
										$('#currentAsin').val(core.musicArr[currentIndex][1]);
										$('#currentThumb').val(core.musicArr[currentIndex][2]);
										$('#currentTitle').val(core.musicArr[currentIndex][3]);
										
										$('#nextId').val(core.musicArr[nextIndex][0]);
										$('#nextAsin').val(core.musicArr[nextIndex][1]);
										$('#nextThumb').val(core.musicArr[nextIndex][2]);
										$('#nextTitle').val(core.musicArr[nextIndex][3]);
										
										$('#audioThumb').attr('src', $('#currentThumb').val());
										$('#audioTitle').html($('#currentTitle').val());
								
					};
					
					core.setup_music_player = function(){
							
											// ------------------------------------------------------------------------------------
											// audio player elapsed and remaining
											// ------------------------------------------------------------------------------------
											
											var audio = document.getElementById('audioPlayer');
											var timeElapsed = document.getElementById('timeElapsed');
											var timeRemaining = document.getElementById('timeRemaining');
											
											if (audio.addEventListener){
											audio.addEventListener('timeupdate',function(event){
											// time remaining
											difference = parseInt(audio.duration - audio.currentTime);
											secondsRemaining = difference % 60;
											minutesRemaining = parseInt(difference / 60);
											
											// time elapsed
											secondsElapsed = parseInt(audio.currentTime % 60);
											minutesElapsed = parseInt(audio.currentTime / 60);
											
											timeRemaining.innerHTML = minutesRemaining+':'+secondsRemaining;
											timeElapsed.innerHTML = minutesElapsed+':'+secondsElapsed;
											timelineWidth = parseInt((audio.currentTime / audio.duration) * 100);
											$('.ui-slider-range').css('width', timelineWidth+'%');
											},false);
											} else if (audio.attachEvent){
											audio.attachEvent('timeupdate', function(event){
											// time remaining
											difference = parseInt(audio.duration - audio.currentTime);
											secondsRemaining = difference % 60;
											minutesRemaining = parseInt(difference / 60);
											
											// time elapsed
											secondsElapsed = parseInt(audio.currentTime % 60);
											minutesElapsed = parseInt(audio.currentTime / 60);
											
											timeRemaining.innerHTML = minutesRemaining+':'+secondsRemaining;
											timeElapsed.innerHTML = minutesElapsed+':'+secondsElapsed;
											timelineWidth = parseInt((audio.currentTime / audio.duration) * 100);
											$('.ui-slider-range').css('width', timelineWidth+'%');
											},false);
											}
											
											$('#audioPlayBtn').click(function(){
												
												core.gaq({
													 'type'		:'event'
													,'path'		:'ActionAudioPlayerToggle'
												});
												
												document.getElementById('audioPlayer').play();
												$('#audioPlayBtnWrapper').css('visibility', 'hidden');
												$('#audioPauseBtnWrapper').css('visibility', 'visible');
												
											});
											
											$('#audioPauseBtn').click(function(){
											document.getElementById('audioPlayer').pause();
											$('#audioPauseBtnWrapper').css('visibility', 'hidden');
											$('#audioPlayBtnWrapper').css('visibility', 'visible');
											});
											
											$('#audioPrevBtn').click(function(){
											core.playMusic($('#prevId').val(), $('#prevAsin').val(), $('#prevThumb').val(), $('#prevTitle').val(), 1);
											});
											
											$('#audioNextBtn').click(function(){
											core.playMusic($('#nextId').val(), $('#nextAsin').val(), $('#nextThumb').val(), $('#nextTitle').val(), 1);
											});
											
											$(".playerBtn").click(function(){
												if ($(".playerContainer").css("marginTop") == "-15px"){
													$(".playerContainer").animate({marginTop: "-55px"}, 300);
													$(this).children('img').attr('src', '/mobile/images/playerBtnDown.png');
													
													
												}
												else{
													
													$(".playerContainer").animate({marginTop: "-15px"}, 300);
													$(this).children('img').attr('src', '/mobile/images/playerBtnUp.png');
													
													$('#tab_music').click();
													core.playMusicFromList(0);
												}
											});
											
											core.musicArr = new Array();
																
											core.count_music = 0;
											$.ajax({
											    type: "GET",
											    url:  '/user/' + core.userId + '/deploy/data/music.xml',
											    dataType: "xml",
													success: function(xml) {	
														
														
														$(xml).find('Song').each(function(){
															
															var musicId = $(this).find('musicid').text();
															var songname = $(this).find('songname').text();
															var albumname = $(this).find('albumname').text();
															var albumurl = $(this).find('albumurl').text();
															var albuminfo = $(this).find('albuminfo').text();
															var cover = $(this).find('cover').text();
															var isfree = $(this).find('isfree').text();
															var ringurl = $(this).find('ringurl').text();
															var songurl = $(this).find('songurl').text();
															
															core.musicArr[core.count_music] = new Array(core.count_music, songurl, cover, songname);
															core.count_music++;
												
														});		
														
													}
											});
											
					};
					
					
					core.playMusic = function(index, songurl, thumb, title, autoplay){
					
											if(  core.BrowserDetect.browser == 'Firefox'  ||
													 core.BrowserDetect.browser == 'Explorer'  && core.BrowserDetect.version == '8'
											){
												
												core.warning({
												  msg: 'Sorry, this device support does not support MP3 audio via HTML5.',
												  duration: 3000,
												  borderSize: '2px',
												  borderColor: '#424242',
												  backgroundColor: '#232323',
												  boxWidth: '200px',
												  boxHeight: '85px',
												  boxPadding:'0px 15px 15px 15px',
												  fontSize:'12px'
												});
												
											}else{
												
												
													core.googleAnalytics({
														 'type'			:'events'
														,'category'	:'PLAYER'
														,'action'		:'PLAY'
														,'label'		:'MUSIC_'  + title
													});
												
										
													core.changeValues(index);
													
													if (autoplay == 1){	
														$(".playerContainer").animate({marginTop: "-15px"}, 300);
														$('.playerBtn').children('img').attr('src', '/mobile/images/playerBtnUp.png');
														$('#audioPlayer').attr('autoplay', 'autoplay');
														$('#audioPlayBtnWrapper').css('visibility', 'hidden');
														$('#audioPauseBtnWrapper').css('visibility', 'visible');
													}
													else{
														$('#audioPlayBtnWrapper').css('visibility', 'visible');
														$('#audioPauseBtnWrapper').css('visibility', 'hidden');	
													}
													
													$('#audioThumb').attr('src', thumb);
													$('#audioTitle').html(title);
													
													var audio = document.getElementById('audioPlayer');
													var timeElapsed = document.getElementById('timeElapsed');
													var timeRemaining = document.getElementById('timeRemaining');
													
													
													if (audio.addEventListener){
															audio.addEventListener('loadedmetadata', function() {
										
					//											$("#timeline").slider({
					//												range: "min",
					//												min: 0,
					//												max: audio.duration,
					//												slide: function( event, ui ) {
					//														audio.currentTime = ui.value;	
					//													};
					//												});
					
					//												$( "#amount" ).html($( "#timeline" ).slider("value"));
															});
													} else if (audio.attachEvent){
														  audio.attachEvent('loadedmetadata', function() {
										
					//												$("#timeline").slider({
					//													range: "min",
					//													min: 0,
					//													max: audio.duration,
					//													slide: function( event, ui ) {
					//															audio.currentTime = ui.value;	
					//														};
					//													});
																	
					//												$( "#amount" ).html($( "#timeline" ).slider("value"));
					
															});
													}
													
													
											
											
													document.getElementById("audioPlayer").src = songurl;
													
													$("#sliderContainer").css('visibility', 'hidden');
													$("#sliderLoadingContainer")
															.html("<img src='/mobile/images/loader.gif' />")
															.css('visibility', 'visible');
													
															
													if (document.getElementById("audioPlayer").addEventListener){
														
															document.getElementById("audioPlayer").addEventListener('loadedmetadata', function() {
																$("#sliderContainer").css('visibility', 'visible');
																$("#sliderLoadingContainer").css('visibility', 'hidden');
															});
															
													} else if (document.getElementById("audioPlayer").attachEvent){
														
															document.getElementById("audioPlayer").attachEvent('loadedmetadata', function() {
																$("#sliderContainer").css('visibility', 'visible');
																$("#sliderLoadingContainer").css('visibility', 'hidden');
															});
													}
															
													invalidSong = setTimeout("core.rejectPlayMethod();", 10000);
													
													if (autoplay == 0) { 
														document.getElementById('audioPlayer').pause();
													}
												
											};
						
					
								
					};
					
					core.playMusicFromList= function(index){
							core.playMusic(core.musicArr[index][0], core.musicArr[index][1], core.musicArr[index][2],core.musicArr[index][3], 1)
					};
					
					core.rejectPlayMethod=function(){
								if (document.getElementById("audioPlayer").addEventListener){
								
									document.getElementById("audioPlayer").removeEventListener('loadedmetadata');
									$("#sliderLoadingContainer").html("Unable to play song");
									clearTimeout(invalidSong);
								
								} else{
								
									document.getElementById("audioPlayer").detachEvent('loadedmetadata');
									$("#sliderLoadingContainer").html("Unable to play song");
									clearTimeout(invalidSong);
								}
					};   
})();

