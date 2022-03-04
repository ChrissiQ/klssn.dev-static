<?php 

// Assignment day 8: #2

date_default_timezone_set('America/Edmonton');
$hour_now = date("H");

if ($hour_now > 16 || $hour_now < 3){
	// It is evening between 5pm and before 3am.
	$greeting = "Good evening!";
} elseif ($hour_now < 12){
	// It is morning between 3am and 12pm.
	$greeting = "Good morning!";
} else {
	// It is afternoon all other times (between 12pm and 5pm)
	$greeting = "Good afternoon!";
}

// Assignment day 8: #3

/*$provinces = [
	"Yukon",
	"Northwest Territories",
	"Nunavut",
	"British Columbia", 
	"Alberta", 
	"Saskatchewan", 
	"Manitoba",
	"Ontario",
	"Quebec",
	"New Brunswick",
	"Nova Scotia",
	"Newfoundland",
	"Prince Edward Island",
];

sort($provinces);*/

// Assignment day 10

include_once "validate.php";

if (isset($_REQUEST['submit'])){
	$errors = [];
	validate($_REQUEST, $errors);
	$previous_values = $_REQUEST;
}

// Assignment day 13
$db = new mysqli("localhost", "root", "", "travelexperts");
if ($db->connect_errno) die("Could not connect to database.");

$result = $db->query("SELECT * FROM `countries`");

while ($country = $result->fetch_assoc()){
	$countries[$country['id']] = $country['name'];
}

$closed = $db->close();
if (!$closed) echo "Error closing database connection.";



?>