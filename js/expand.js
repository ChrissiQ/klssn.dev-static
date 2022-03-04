/*global $*/
/*jslint browser:true */
/* The above lines make sure I can use jslint to check my Javascript. */


/*  */
/* Accordion-style script for mobile device, (c) 2013 Chrissi Klassen */
/* */

// Wait until the DOM has loaded.
$(document).ready(function() {
	"use strict";

	var heading = $('header.clickable a'),
	// Just a number that I think represents an average maximum smart phone width.  I have no evidence for this.
		maxPhoneWidth = 640; 


	// When we click a heading, call a handler that animates the content in
	// and then animates all other content out.
	function headingClickHandler(event) {



		if  (	window.matchMedia("(max-width: " + maxPhoneWidth + "px)").matches 
				&& heading.data("events") !== null 
				&& typeof(heading.loadedmetadata) !== undefined
		) {
			var targetSection = $(event.target).parents('section'),
				targetContent = targetSection.children('div'), 
				allOtherContent = $('section>div').not(targetContent);

			if (targetContent.is(':hidden')) {
				allOtherContent.slideUp('slow');
				targetContent.slideDown('slow');

				targetContent.promise().done(function(){	
					allOtherContent.parents('section').removeClass("visible");
				});
				targetSection.addClass("visible");

			} else { // if targetContent is visible
				targetContent.slideUp('slow');	
				targetContent.promise().done(function(){
					targetSection.removeClass("visible");
				});
			}
			
		}
	}
	heading.click(headingClickHandler);

});