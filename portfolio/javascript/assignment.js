// Javascript and jQuery Assignment
// Chrissi Klassen
// CPNT 262, Harvey Peters

$(document).ready(function(){

//
// Assignment 2
//

//
// 2.1 Date
//

var date = new Date(),
	dateHour = date.getHours(),
	dateMinute = date.getMinutes(),
	dateSecond = date.getSeconds(),

	// Formatting the date string, padding with zeroes where needed (shorthand if statements)
	date_string = 
		( (dateHour < 10) ? ("0" + dateHour) : dateHour ) + ":" + 
		( (dateMinute < 10) ? ("0" + dateMinute) : dateMinute ) + ":" + 
		( (dateSecond < 10) ? ("0" + dateSecond) : dateSecond );

$('div#footer').html("When this page loaded, the time was " + date_string + ".");


//
// 2.2 Name
//

// Ask for name with a jQuery UI modal.
// This annoys the user less than a regular Javascript prompt()
// and can be ignored if desired.
$('#name-dialog')
	.dialog({

		// Animates the modal into existence.
		show: 'clip',

		// Size settings.
		minWidth: '15em',
		width: '18em',
		maxWidth: '95%',

		// Actions to perform after the modal exists.
		// Modifying the layout of this modal because the default is ugly.
		open: function(){

			// Move the OK button up into the main dialog box.
			var ok_button = $('#name-dialog').siblings('.ui-dialog-buttonpane').find('.ui-button');
			$('#name-dialog div').append(ok_button);

			// Remove the button pane that is now empty.
			var buttonpane = $('#name-dialog').siblings('.ui-dialog-buttonpane');
			buttonpane.remove();
		},

		// Submit the name when the modal closes.
		close: function(){
			var name = $('#name-dialog').find('input:text')[0].value;
			giveName(name);
		},

		// Make sure we have an OK button.
		buttons: [ { 
			text: "OK", 
			click: function() { 
				$(this).dialog("close"); 
			} 
		} ]
	})

	// Enable escape key to ignore modal window.
	.keydown(function (event) {
		var escape = 13;
	    if (event.keyCode === escape) {
	        $(this).dialog("close");
	    }
	});
 
// Write name
function giveName(name){
	var message = name ? 
		"<h3 id='personalized'>Hello " + name + "!  Welcome to my Javascript and jQuery demonstration.</h3>" : 
		"<h3 id='personalized'>Hello anonymous!  I hope you can share your name with me next time.</h3>";
	$('body h2:first').after(message);
}


//
// 2.3 Product table
//
// Assignment 6 Event Handling
//


var products = [
	{
		"name": "Orange",
		"description": "A tasty, juicy, sweet orange.",
		"link": "http://oranges.com/our-best",
		"linkdescription": "Read more about how oranges are grown."
	},
	{
		"name": "Apple",
		"description": "A crisp, fresh, red Gala apple.",
		"link": "http://fruit.com/gala-apples",
		"linkdescription": "View the nutritional benefits of Gala apples!"
	},
	{
		"name": "Celery",
		"description": "Long, stringy stalks of negative-calorie nutrition.",
		"link": "http://we-love-veggies.com/celery-rocks",
		"linkdescription": "Learn about how awesome celery is."
	},
	{
		"name": "Potato",
		"description": "A tasty tuber often eaten with butter or sour cream.",
		"link": "http://potato-farmers.com/why-choose-spuds",
		"linkdescription": "Why should you eat potatoes instead of not-potatoes?"
	}
];

products.forEach(function(product){
	$("table#products tbody").append(
		'<tr><td>' + 
			product.name + 
		'</td><td>' + 
			product.description + 
			'<div>' +
				'<a href="' + product.link + '">' + 
					product.linkdescription + 
				'</a>' +
			'</div>' +
		'</td></tr>'
	);
});

$('table#products div').hide();

$('table#products tr').mouseenter(function(event){
	$(this).find('div').fadeIn('fast').css("display","inline-block");;
});
$('table#products tr').mouseleave(function(event){
	$(this).find('div').fadeOut('fast');
});




//
// Assignment 3 & 5
//
// Form validation
//

$('.errorMsg').hide();

function validate(form){ 

	// Make sure we start with an empty dialog each time we validate.
	// Otherwise, previous messages stick around.
	$('#form-dialog').html("<p>Please correct the following problems:</p>");
	var error = [];

	// Find all the errors.
	$.each( 
		$(form).find('input:text, input[type=email]'), 

		function(index, element){

			if (!validateField(element)){
				var input_id = $(element).attr('id');

				// We are grabbing the name for the error from the label.  It's the most accurate.
				var label = $("label[for='" + input_id + "']").text();
				var label_text = label.substring(0, label.lastIndexOf(":")).toLowerCase();

				error.push("You must enter your " + label_text);
			} // end if
		}
	);

	// If there are errors
	if (error[0]){

		// Create a dialog modal using jQuery UI
		$("#form-dialog")
			.append(function(){
				var msg = "";
				msg += "<ul>";
				error.forEach(function(value, index){
					msg += "<li>" + value + "</li>";
				});
				msg += "</ul>";
				return msg;
			})
			.dialog({
				minWidth: '15em',
				width: '25em',
				maxWidth: '95%',
				modal: true
			});

		// Cancels form submission in the case of errors.
		return false;
	} else {

		// Allows form submission.
		return true;
	}
}
function validateField(field){
	
	var regex,
		type = $(field).data('validate');

	// Regex matching.
	if (type === "postal"){
		regex = /(^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$)|(^\d{5}(-\d{4})?$)/;
	} else if (type === "email"){
		regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;
	}

	// Check that the field isn't blank and matches any required regex.
	if 	(	field.value == "" 
			|| 
			(regex && !field.value.toUpperCase().match(regex)) 
		)
		return false;
	else 
		return true;
}

$('div#form input:text, div#form input[type=email]').blur(function(){
	if (
		(this.name == "postal" && !validateField(this, "postal"))
		||
		(this.name == "email" && !validateField(this, "email"))
		||
		!validateField(this)
	)
	{
		$(this).next('.errorMsg').show();
		$(this).addClass("errorField");
	} else {
		$(this).next('.errorMsg').hide();
		$(this).removeClass("errorField");
	}
});

$('div#form form').submit(function(){
	return validate(this);
});

$('div#form form button[type=reset]').click(function(){
	$('#reset-dialog')
		.dialog({
			show: 'clip',
			minWidth: '15em',
			width: '18em',
			maxWidth: '95%',
			buttons: [
				{ 
					text: "OK", 
					click: function() { 
						$('div#form form').get(0).reset();
						$(this).dialog("close"); 
					} 
				},
				{
					text: "Cancel",
					click: function() { 
						$(this).dialog("close"); 
					} 
				}
			]
		})
		.keydown(function (event) {
			var escape = 13;
		    if (event.keyCode === escape) {
		        $(this).dialog("close");
		    }
		});

	// Prevent the form from resetting unless "OK" is clicked.
	return false;
});

$('div#form button[type=submit]').click(function(event){

	$('#confirm-dialog')
		.dialog({
			show: 'clip',
			minWidth: '15em',
			width: '18em',
			maxWidth: '95%',
			buttons: [
				{ 
					text: "OK", 
					click: function() { 
						$('div#form form').submit();
						$(this).dialog("close"); 
					} 
				},
				{
					text: "Cancel",
					click: function() { 
						$(this).dialog("close"); 
					} 
				}
			]
		})
		.keydown(function (event) {
			var escape = 13;
		    if (event.keyCode === escape) {
		        $(this).dialog("close");
		    }
		});

	// Prevent the form from submitting unless the "OK" button is clicked.
	return false;
});


//
// Assignment 4
//

$("#bouncy-image>div").hide();

function goRight(){
	$('#bouncy-image').animate({
		'left': ($(window).width() - $('#bouncy-image').width() - 15)
	}, 5000, goLeft);
}
function goLeft(){
	$('#bouncy-image').animate({
		'left': 0
	}, 5000, goRight);
}

goRight();

$("#bouncy-image>div")

$("#bouncy-image").mouseenter(function(event){
	$("#bouncy-image>div").fadeIn('fast');
});$("#bouncy-image").mouseleave(function(event){
	$("#bouncy-image>div").fadeOut('fast');
});

// End document.ready
});