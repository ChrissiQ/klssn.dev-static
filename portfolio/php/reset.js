$(document).ready(function(){

	$("form :reset").click(function(event){

		$('input').not(':button, :submit, :reset, :hidden')
			.attr("value", "")
			.removeAttr('checked')
			.removeAttr('selected');
	});

});