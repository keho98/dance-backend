//colors = d3.scale.category10();
window.sidebar = {
	init: function(){
		$(".add_dancer").click(function(){
			$(".dancer_names").append("<li><input type='text' class='dancer_name_input'></input></li>");

			$(".dancer_name_input").focus().blur(function(e){
				if($(this).val() == ''){
					$(this).parent().remove();
				}
			});
			
			$(".dancer_name_input").keydown(function(e){
				var code = e.keyCode ? e.keyCode : e.which;
				if(code == 13){
					var dancer_name = this.value;
					dance.nameSelected(dancer_name);
					$(".dancer_names").append("<li><a href='#'>" + dancer_name + "</a><input type='hidden' value='" + dancer_name + "'></input></li>");
					$(".dancer_names li:last-child").click(function(){
						var name = $(this).find("input").val();
						console.log("selected dancer name: " + name);
					});
					$(this).remove();
				}
			});
		});

		var color_list = "<table width='100%' class='table_of_colors'>";
		for(var i=0;i<5;i++){
			var color_item = "<tr><td height='25px' bgcolor='" + colors(i) + "' style='border:none'></td><input type='hidden' value='" + i + "'></input></tr>";
			color_list += color_item;
		}
		color_list += "</table>";

		$(".blocks").append("<li>" + color_list + "</li>");

		$(".table_of_colors td").hammer().on('tap',function(){
			var val = $(this).siblings("input").val();
			$(".table_of_colors td").css({
				'border': 'none',
				'height': '25px',
				'width': '100%'
			});

			$(this).css({
				'border': '3px solid',
				'border-color': 'black',
			});

			console.log("selected color: " + val);
			dance.colorSelected(parseInt(val));

			/*if(formation.colorSelected(val) == true){
				$(".table_of_colors td").css({
					'border': 'none',
					'height': '25px',
					'width': '100%'
				});
			}*/
		});
	}
}


