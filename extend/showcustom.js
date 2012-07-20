core.showcustom= function(){
			$('.subHeaderTitle').text(core.custom_tab_title);
			
			// console.log(core.custom_html);
			$('#custom').html(core.custom_html);
			
			setTimeout(function(){
				core.adjust_slideUpDownHeight();					
				core.adjustScrollPanel();					
			}, 1000);

			
				
		}