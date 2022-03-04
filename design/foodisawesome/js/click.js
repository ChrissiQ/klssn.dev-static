$(document).ready(function(){


$("nav ul a").click(function(event){

	var listItem = $(event.target).parent('nav>ul>li')[0];
	var subList = $(event.target).siblings("ul")[0];

	// If it's open, then close it.
	if ($(subList).hasClass("open")){
		$(subList).attr("class", "");
		$(listItem).css("list-style-image", "url('images/hollow-bullet-small.png')");
	
	// If it's closed, and has child lists, open it.
	} else if ($(listItem).children("ul").length > 0) {
		$(subList).attr("class", "open");
		$(listItem).css("list-style-image", "url('images/hollow-bullet-down-small.png')");
	}
});


});