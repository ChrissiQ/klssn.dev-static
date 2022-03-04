<?php ini_set('error_reporting', E_ALL);
ini_set( 'display_errors', 1 );
include "write_script.php"; ?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Customers</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
	<script src="../reset.js"></script>
	<link type="text/css" rel="stylesheet" href="write.css" />
</head>

<body>


<h1>Create new customer</h1>

<?php if (isset($errors) && $errors){ ?>
	<div id="errors">
		<h3>Error!</h3>
		<ul>

		<?php foreach($errors as $error){ ?>
			<li><?=$error?></li>
		<?php } ?>

		</ul>
	</div>
<?php } ?>

<?php if (isset($labels)){ ?>
	<form><fieldset>

		<legend>Information</legend>

		<?php foreach($labels as $label){ ?>
			<?php if ($label !== 'CustomerId' && $label !== 'AgentId'){ ?>
			<label for="<?=$label?>"><?=$label?>:</label>
			<input type="text" name="<?=$label?>" id="<?=$label?>" value="<?=submitted($label)?>" />
			<?php } ?>
		<?php } ?>
		
		<input type="hidden" name="submit" value="submitted" />

		<div>
			<button type="submit">Submit</button>
			<button type="reset">Reset</button>
		</div>

	</fieldset></form>
<?php } else { ?>

	<p>Could not connect to database to retrieve column labels.</p>

<?php } ?>

</body>

</html>