(function(){

		var  headerWrapper = document.getElementById('headerWrapper')
				,top_area = document.getElementById('top_area')
				,avatarDiv = document.createElement("div");
		avatarDiv.innerHTML = '\
										<a id="avatar"  style=""  >\
											<img src="/user/' +  core.userId  + '/deploy/userassets/avatar.jpg">\
										</a>\
								';
		headerWrapper.insertBefore(avatarDiv, headerWrapper.firstChild || null);
		top_area.style.width = core.style[core.unit].top_area +'px';

})();