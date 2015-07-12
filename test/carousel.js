(function( $ ){
   
	$.fn.carousel = function(settings) {
		
		// Pre-def settings and input settings
		var settings = $.extend({            

			// Environment Settings
			container: this,

			width: 'auto',
			height: 'auto', 

			// Images settings
			imgPath: null, // Images sets can be and object, a list or a path
			imgData: null, // 
			imgRatio: null, // Images ratio if is needed
			imgCenter: '50%',

			thumbRatio: 2,

		}, settings );
		
		// Eval all errors
		if(settings.imgData == null || settings.imgData == ''){ console.warn("Images data is needed to continue"); return false; }

		// Get environmet data
		var cWidth = settings.container.width();
		var cHeight = settings.container.height();

		// Rename container class for better reference
		settings.container.attr('class','carouselContainer').css({'backgroundColor':'red'});
		console.log("Container Width: " + settings.container.width())


		// Load images
		if( settings.imgPath != null && settings.imgPath != '' ){ var imgPath = settings.imgPath }else{ var imgPath = '' }

		var images = [];

		var totalImg = 0;

		var biggerHeightImg = 0;
		var biggerWidthImg = 0;
		var averageWidth = 0;
		var averageHeight = 0;

		if( Object.prototype.toString.call( settings.imgData ) === '[object Array]' ) {
		    for(image in settings.imgData){
		    	images[image] = new Image();
		    	images[image].src = imgPath + settings.imgData[image];

		    	// Setting original width and height for future reference
		    	$(images[image]).attr('img-org-width', images[image].width);
		    	$(images[image]).attr('img-org-height', images[image].height);

		    	$(images[image]).addClass('imgCarrousel');

		    	// If this images is the bigger one
		    	if(images[image].height > biggerHeightImg){ biggerHeightImg = images[image].height; }
		    	if(images[image].width > biggerWidthImg){ biggerWidthImg = images[image].width; }

		    	totalImg++;
		    	averageWidth += images[image].width;
		    	averageHeight += images[image].height;
		    }
		}else if( Object.prototype.toString.call( settings.imgData ) === '[object Object]' ){
			// Pendiente
		}

		// Setting environment base on images
		var imgCenterWidth = 0;
		var imgCenterHeight = 0;

		averageWidth = averageWidth / totalImg;
		averageHeight = averageHeight / totalImg;

		if(settings.imgRatio != null && settings.imgRatio != ''){ var imgRatio = settings.imgRatio; }else{ var imgRatio = averageWidth / averageHeight; }

		console.log("Average Width: " + averageWidth);
		console.log("Average Height: " + averageHeight);
		console.log("Ratio: " + imgRatio);
		console.log("********************************");

		function imageSetup(){
			
			if(settings.imgCenter.indexOf('%') >= 0){ imgCenterWidth = ( cWidth * parseInt(settings.imgCenter.replace('%','')) ) / 100; }
			else { imgCenterWidth = parseInt( settings.imgCenter.replace('px','') ); }

			imgCenterHeight = imgCenterWidth / imgRatio;

			for(image in images){

				if(image == 0){ $(images[image]).width(imgCenterWidth).height(imgCenterHeight); continue; }

				if( (imgCenterWidth / settings.thumbRatio) * totalImg <= cWidth ){
					thumbWidth  = imgCenterWidth / settings.thumbRatio;
					thumbHeight = imgCenterHeight / imgRatio;
				}else{
					// console.log("Total IMG: " + totalImg + ", Container Width: " + cWidth + ", Image Center Width: " + imgCenterWidth)
					// console.log("Entonces tenemos: " + ( (imgCenterWidth / 2) + (cWidth - imgCenterWidth) ) / totalImg)
					thumbWidth  = (cWidth - imgCenterWidth) / totalImg;
					thumbHeight = thumbWidth / imgRatio;					
				}

				$(images[image]).width(thumbWidth).height(thumbHeight);

			}

		}

		imageSetup();

		var totalWidth = 0;
		var smallestImg = 9999;

		// Adding images to the environment
		for(image in images){
			console.log(images[image]);
			totalWidth += $(images[image]).width();

			if($(images[image]).width() < smallestImg){ smallestImg = $(images[image]).width(); }
		}

		console.log("Sum Widht: " + (totalWidth - smallestImg) )

	};

})( jQuery );

	