$(document).ready(function(){
	sidebar.init();
	dance.addVerticalLines();
	dance.addHorizontalLines();
	dance.init();
	
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
		dance.saveState();
	})
	$('.reset').hammer().on('tap', function(){
		dance.clearState();
	})
	$('.timeline').hammer().on('tap', '.thumb', function(){
		var curr_thumb = $(this);
		var index = curr_thumb.parent().children('.thumb').index(curr_thumb);
		console.log("showing index " + index);
		dance.showFormation(index);
	});
});