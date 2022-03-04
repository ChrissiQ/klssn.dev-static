/*global $*/
/*jslint browser:true */
/* The above lines make sure I can use jslint to check my Javascript. */


/*  */
/* Form validation, (c) 2013 Chrissi Klassen */
/*  */


// Wait until the DOM has loaded.
$(document).ready(function(){
	"use strict";

	$('input').blur(function(event){

		var myTarget = $(event.target),
			errorMsg = myTarget.next().next();

		// If it exists and it's not the email address, don't display an error.
		if (myTarget.val() !== "" && !myTarget.is("#email")){
			errorMsg.hide();

		// If it's an email address, check it against a simple regex string for an email.
		} else if (myTarget.is("#email") && myTarget.val().match(/\S+@\S+\.\S+/) !== null){
			errorMsg.hide();

		// If it doesn't exist or it's an invalid email, or anything else, display error.
		} else {
			errorMsg.show();
		}

	});

});