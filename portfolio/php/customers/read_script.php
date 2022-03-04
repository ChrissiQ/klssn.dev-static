<?php 

$db = new mysqli("localhost", "root", "", "travelexperts");
if ($db->connect_errno) die("Could not connect to database.");
$result = $db->query("SELECT * FROM `customers`");

while ($customer = $result->fetch_assoc()){
	foreach ($customer as $field => $value){
		$id = $customer['CustomerId'];
		$customers[$id][$field] = $value;
	}
}

$closed = $db->close();
if (!$closed) echo "Error closing database connection.";


?>