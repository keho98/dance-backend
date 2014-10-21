SVG_WIDTH = 700;
SVG_HEIGHT = 500;

$(document).ready(function() {
	printerFriendlyDance.readState($('#dance_id').val());
});

window.printerFriendlyDance = {
	readState: function(dance_id){
		$.get('/dances/' + dance_id + '/get_data', function(data){
			if(data != null) {
				printerFriendlyDance.renderDance(JSON.parse(data.data).formations);
				return true;
			} else {
				return null;
			}
		});
	},
	renderDance: function(formations){
		// render each formation, each time adding a new div and svg below the previous one
		for(var i=0; i<formations.length; i++){
			console.log("rendering formation..");
			$('#formations').append("<div class='printer_friendly_formation'><svg width='700' height='500'></svg></div>");
			printerFriendlyDance.renderFormation(i, formations[i]);
		}
	},
	renderFormation: function(index, circles){
		var groups = d3.select($('.printer_friendly_formation')[index]).selectAll('svg').selectAll('g');
		groups.data(circles, function(d){ return d.d_id})
			.enter().append('svg:g')
					.append('svg:circle');
		d3.select($('.printer_friendly_formation')[index]).selectAll('svg').selectAll('g')
			.select('circle')
					.attr('r', function(d){ return d.r})
					.attr('cx', function(d){ return d.x})
					.attr('cy', function(d){ return d.y})
					.style('fill', function(d){ return d.fillColor});
	}
}