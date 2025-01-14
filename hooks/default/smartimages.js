EPUBJS.Hooks.register("beforeChapterDisplay").smartimages = function(callback, chapter){
		var images = chapter.doc.querySelectorAll('img'),
			items = Array.prototype.slice.call(images),
			iheight = chapter.height(),//chapter.doc.body.getBoundingClientRect().height,
			oheight;

		items.forEach(function(item){
			
			function size() {
				var itemRect = item.getBoundingClientRect(),
					rectHeight = itemRect.height,
					top = itemRect.top,
					oHeight = item.getAttribute('data-height'),
					height = oHeight || rectHeight,
					newHeight;
				
				iheight = chapter.height();
				if(top < 0) top = 0;
								
				if(height + top >= iheight) {

					if(top < iheight/2) {
						newHeight = iheight - top;
						item.style.maxHeight = newHeight + "px";
						item.style.width= "auto";
					}else{
						height = (height < iheight ? height : iheight);
						item.style.maxHeight = newHeight + "px";
						item.style.marginTop = iheight - top + "px";
						item.style.width= "auto";
					}
					
					item.setAttribute('data-height', newHeight);
					
				}else{
					item.style.removeProperty('max-height');
					item.style.removeProperty('margin-top');
				}
			}
			
			item.addEventListener('load', size, false);
			
			chapter.on("book:resized", size);
			
			chapter.on("book:chapterDestroyed", function(){
				item.removeEventListener('load', size);
				chapter.off("book:resized", size);
			});
			
			size();

		});

		if(callback) callback();

}
