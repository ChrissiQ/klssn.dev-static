<?php

// for Assignment day 13

$db = new mysqli("localhost", "root", "", "travelexperts");
if ($db->connect_errno) die("Could not connect to database.");

$sql = "SELECT `id`, `name` FROM `provinces` WHERE `country_id`='$_REQUEST[country]'";
$result = $db->query($sql);

while ($province = $result->fetch_assoc()){
	$provinces[$province['id']] = $province['name'];
}

$closed = $db->close();
if (!$closed) echo "Error closing database connection.";

?>


<option value=""></option>

<?php foreach($provinces as $province_id => $province_name){ ?>
	<option value="<?php echo $province_id ?>">
		<?php echo $province_name ?>
	</option>
<?php } ?>