<?php 
$db = new mysqli("localhost", "root", "", "travelexperts");
if ($db->connect_errno) die("Could not connect to database.");


$result = $db->query("SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_NAME`='customers'");

$labels = [];
while ($column_titles = $result->fetch_row()){
	array_push($labels, $column_titles[0]);
}

// Helper to make code in HTML shorter.
function submitted($name){
	return isset($_REQUEST[$name]) ? $_REQUEST[$name] : '';
}

include_once "../validate.php";

if (isset($_REQUEST['submit'])){
	$errors = [];
	validate($_REQUEST, $errors);

	if ($errors === []){
		$sql = "INSERT INTO "
			. "`customers` "
				. "("
					. "`CustFirstName`, "
					. "`CustLastName`, "
					. "`CustAddress`, "
					. "`CustCity`, "
					. "`CustProv`, "
					. "`CustPostal`, "
					. "`CustCountry`, "
					. "`CustHomePhone`, "
					. "`CustBusPhone`, "
					. "`CustEmail` "
				. ") "
			. "VALUES "
				. "("
					. "'$_REQUEST[CustFirstName]', "
					. "'$_REQUEST[CustLastName]', "
					. "'$_REQUEST[CustAddress]', "
					. "'$_REQUEST[CustCity]', "
					. "'$_REQUEST[CustProv]', "
					. "'$_REQUEST[CustPostal]', "
					. "'$_REQUEST[CustCountry]', "
					. "'$_REQUEST[CustHomePhone]', "
					. "'$_REQUEST[CustBusPhone]', "
					. "'$_REQUEST[CustEmail]' "
				. ")";
		$result = $db->query($sql);

		echo $result 
			? $_REQUEST['CustFirstName'] . " " . $_REQUEST['CustLastName'] . " inserted."
			: "There was a problem inserting the customer.  Please try again. Error:" . $db->error;
		
	}

}



$closed = $db->close();
if (!$closed) echo "Error closing database connection.";

?>

