<?php

// validate variables (it really doesn't actually)
$name = $_POST['name'];
$email = $_POST['email'];
$comments = $_POST['comments'];

// add the date the form was submitted

$date = date("M d Y");

// Thank user for visiting or filling out form
print "<p>Thank you, $name, for submitting the form.</p>";
print "Form submitted at $date";

// send data to a particular email address
$to = "rediahs@gmail.com";
$subject = "Someone submitted your form!";
$body = "Date: $date\n Name: $name \n Email address: $email \n Comments: $comments \n\n";
mail($to, $subject, $body);


?>