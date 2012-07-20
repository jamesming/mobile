core.showbio=function(){
			$('.bioContent').html(core.about);
			$('.bioHeader').text(core.abouttitle);
						
			core.adjustScrollPanel('visible');
			
}