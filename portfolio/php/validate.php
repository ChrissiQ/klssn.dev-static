<?php 

// Assignment day 10

function validateField($field, $value, &$error_array){
	if ($value == ""){
		array_push($error_array, $field . " must have a value.");
	}
	elseif ($field == "email" || $field == "CustEmail"){
		$regex = '/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/';
		if (!(preg_match($regex, $value))){
			array_push($error_array, $field . " must be properly formatted.");
		}
	}
	elseif ($field == "postal_code" || $field == "CustPostal"){
		$regex = '/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i';
		if (!(preg_match($regex, $value))){
			array_push($error_array, $field . " must be properly formatted.");
		}
	}
}

function validate($fields, &$error_array){
	foreach($fields as $field => $value){
		validateField($field, $value, $error_array);
	}
}

?>