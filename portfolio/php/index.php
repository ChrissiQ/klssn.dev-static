<?php 
error_reporting(E_ALL); 
ini_set( 'display_errors','1');
include "script.php"; ?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>PHP &amp; MySQL Assignment: Chrissi Klassen</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
	<script type="text/javascript" src="reset.js"></script>
	<script type="text/javascript" src="index.js"></script>
	<link type="text/css" rel="stylesheet" href="index.css" />
</head>

<body>

<h1>Chrissi Klassen's PHP &amp; MySQL Assignment Page</h1>
<h2>CPNT 262</h2>

<h3><?php echo $greeting; ?></h3>

<form>
</form>

<?php if (isset($errors) && $errors){ ?>

<div id="errors">
	<ul>
	<?php foreach($errors as $error){ ?>

		<li><?php echo $error; ?></li>

	<?php } ?>
	<ul>
</div>	

<?php } else if (isset($_REQUEST['submit'])) { ?>
	<div>The database insert was successful.</div>
<?php } ?>

<div id="form">
<form><fieldset>

	<legend>
		Add your information.
	</legend>

	<label for="name">Name:</label>
	<input type="text" id="name" name="name" value="<?php echo isset($_REQUEST['submit']) ? $_REQUEST['name'] : ''; ?>"></input><br />

	<label for="email">Email:</label>
	<input type="text" id="email" name="email" value="<?php echo isset($_REQUEST['submit']) ? $_REQUEST['email'] : ''; ?>"></input><br />

	<label>Country:</label>
	<select id="country">

		<option value=""></option>
		<?php foreach($countries as $country_id => $country_name){ ?>
			<option value="<?php echo $country_id ?>">
				<?php echo $country_name ?>
			</option>
		<?php } ?>

	</select><br />

	<label>Province:</label>
	<select id="province">

		<option value=""></option>

	</select><br />

	<label for="postal_code">Postal Code:</label>
	<input type="text" id="postal_code" name="postal_code" value="<?php echo isset($_REQUEST['submit']) ? $_REQUEST['postal_code'] : ''; ?>"></input><br />

	<input type="hidden" name="submit" value="submit"></input>

	<div id="buttons">
		<button type="submit">Submit</button>
		<button type="reset">Reset</button>
	</div>

</fieldset></form>
</div>

<div>
	<a href="links.php">Visit my links page.</a>
</div>

</div>

<div>
	<a href="customers/read.php">See all customers</a>
</div>

<div>
	<a href="customers/write.php">Add a new customer.</a><br /><br />
</div>

</body>

</html>