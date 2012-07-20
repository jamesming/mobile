core.shownews= function(){
		
			$.ajax({
			    type: "GET",
			    url: '/user/' +  core.userId + '/deploy/data/news.xml?random=' + Math.floor(Math.random()*999999999),
			    dataType: "xml",
					success: function(xml) {	
						
						var news_box = "";
						
						$(xml).find('item').each(function(){
				
										var newsId = $(this).find('id').text();
										var title = $(this).find('title').text();
										var date = $(this).find('date').text();
										var description = $(this).find('description').text();
										var url = $(this).find('url').text();
			
										news_box = news_box + "\
										<div>" +  title  +"\
										</div>\
										<div>" +  date  +"\
										</div>\
										<div>" +  description  +"\
										</div>\
										<div   style='border-bottom:1px solid white;'  >" +  url  +"\
										</div>\
										";
										
									});		
									
					$('#newsWrapper').append(news_box);
					
					core.adjust_slideUpDownHeight();	
		
		
		}});
		}