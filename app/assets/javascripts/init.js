$(document).ready(function(){
	sidebar.init();
	dance.addVerticalLines();
	dance.addHorizontalLines();
	dance.readState($('#dance_id').val());
	
	$('#delete').on('click', function(){
		dance.removeSelected();
	});
	$('#next').hammer().on('tap', function(){
		$('#next').before("<div class='thumb'><svg></svg></div>");
		dance.newFormation();
		//dance.nextFormation();
		dance.deselectAll();
		var children = $('.thumbnail_container').children('.thumb');
		children.attr('class','thumb');
		$('#next').prev().attr('class','thumb selected_thumb');
		$('#formation_number').html(dance.formations.length + 1);
	});
	$('.stage').hammer().on('pinch', function(e){
		console.log("Pinch Detected...")
	})
	$('.stage').hammer().on('swipeleft', function(e){
		if(e.gesture.touches.length > 0){
			// go to next formation if it exists, else create new formation
			var bool = dance.nextFormation();
			dance.deselectAll();
			// ADD THUMBNAIL TO TIMELINE - only in case nextFormation calls newFormation
			if(!bool && dance.atEnd()) {
				// add thumbnail to timeline
				$('#next').before("<div class='thumb'><svg></svg></div>");
				// make thumbnail selected
				var children = $('.thumbnail_container').children('.thumb');
				children.attr('class','thumb');
				$('#next').prev().attr('class','thumb selected_thumb');
			}
			$('#formation_number').html(dance.f_id + 1);
		}
	});

	$('.stage').hammer().on('swiperight', function(e){
		if(e.gesture.touches.length > 0){
			dance.previousFormation();
			dance.deselectAll();
			$('#formation_number').html(dance.f_id + 1);
		}
	});	
	$('.save').hammer().on('tap', function(){
		dance.saveState($('#dance_id').val());
	});
	
	$('#comment_toggle').hammer().on('tap', function(){
		$('#comments').modal('show');
	});

/*
	$('.play_slideshow').hammer().on('tap', function(){
		if(dance.f_id !== dance.formations.length - 1){
			//$(this)."<button id=""slideshow_toggle"" class=""btn""><span>Play Slideshow</span></button>"
			//$(this).children('span').html("Stop Slideshow");
			dance.nextFormation();
		} else {
			return;
		}
		var interval = window.setInterval(function(){
			if(dance.f_id === dance.formations.length - 1){
				window.clearInterval(interval);
				return;
			}
			dance.nextFormation();
		}, 1000);
	});

	$('.stop_slideshow').hammer().on('tap', function(){
		if(dance.f_id !== dance.formations.length - 1){
			//$(this)."<button id=""slideshow_toggle"" class=""btn""><span>Play Slideshow</span></button>"
			$(this).children('span').html("Stop Slideshow");
			dance.nextFormation();
		} else {
			return;
		}
		var interval = window.setInterval(function(){
			if(dance.f_id === dance.formations.length - 1){
				window.clearInterval(interval);
				return;
			}
			dance.nextFormation();
		}, 1000);
	});
*/
	$('.timeline').hammer().on('tap', '.thumb', function(){
		var curr_thumb = $(this);
		var index = curr_thumb.parent().children('.thumb').index(curr_thumb);
		console.log("showing index " + index);
		dance.showFormation(index);
	});
});