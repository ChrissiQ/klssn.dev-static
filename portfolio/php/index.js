$(document).ready(function(){


	$('select#country').change(function(){
	$('select#province')
		.load('loadprovince.php?country=' + $(this).val());
});



});
