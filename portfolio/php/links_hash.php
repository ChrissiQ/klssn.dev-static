<?php 

// Assignment day 8: #4

/*$links = array(
	"Google" => "http://google.com",
	"MSN" => "http://msn.com",
	"Reddit" => "http://reddit.com",
	"The Verge" => "http://theverge.com",
	"Engadget" => "http://engadget.com",
);*/


// Assignment day 9

$file = file("links.txt");
foreach($file as $line){
	list($url, $tag) = explode(', ', $line);
	$tag = trim($tag);	// Remove whitespace so the link doesn't have a space at end
	$links[$tag] = $url;
}

?>