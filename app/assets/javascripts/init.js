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

	$('#feedback_button').hammer().on('tap', function(){
		$('#feedback').modal('show');
	});

	$("#share_url").html(location.href);
	$('#share_button').hammer().on('tap', function(){
		$('#share_url_modal').modal('show');
	});

	$('.stop_slideshow').css('display', 'none');
	$('.play_slideshow').css('display', 'inline');
	
	$('#comments').on('hidden', function(){
		dance.addComment($('#comment_field').val());
	});

	$('#feedback').on('hidden', function(){
		dance.submitFeedback($('#feedback_field').val());
	});

	$('#back_btn').hammer().on('tap', function(){
		window.location = "/dances";
	});

	$('.play_slideshow').hammer().on('tap', function(){
		// hide play slideshow button and show the stop slideshow button instead
		$(this).css('display', 'none');
		$('.stop_slideshow').css('display', 'inline');
		
		if(dance.f_id !== dance.formations.length - 1){
			//$(this)."<button id=""slideshow_toggle"" class=""btn""><span>Play Slideshow</span></button>"
			//$(this).children('span').html("Stop Slideshow");
			dance.nextFormation();
		} else {
			// already on last formation
			// so go to beginning and start
			dance.showFormation(0);
		}
		var interval = window.setInterval(function(){
			if(dance.f_id === dance.formations.length - 1){
				var interval = $('.hidden_interval').val();
				window.clearInterval(interval);
				$('.play_slideshow').css('display', 'inline');
				$('.stop_slideshow').css('display', 'none');
				return;
			}
			dance.nextFormation();
		}, 1000);
		if ($('.hidden_interval').length == 0) {
			// does not already exist
			$('.play_slideshow').after('<input type="hidden" value="' + interval + '" class="hidden_interval"/>');
		} else {
			// already exists
			$('.hidden_interval').val(interval);
		}
	});

	$('.stop_slideshow').hammer().on('tap', function(){
		$(this).css('display', 'none');
		$('.play_slideshow').css('display', 'inline');
		var interval = $('.hidden_interval').val();
		window.clearInterval(interval);
	});

	$('.timeline').hammer().on('tap', '.thumb', function(){
		var curr_thumb = $(this);
		var index = curr_thumb.parent().children('.thumb').index(curr_thumb);
		console.log("showing index " + index);
		dance.showFormation(index);
	});
});