<?php include "read_script.php"; ?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Customers</title>
	<link type="text/css" rel="stylesheet" href="read.css" />
</head>

<body>

<?php if (isset($customers)) { ?>

	<table>

		<thead>
			<tr>

			<?php foreach(reset($customers) as $label => $value){ ?>
				<td><?php echo $label; ?></td>
			<?php } ?>

			</tr>
		</thead>
		<tbody>

		<?php foreach($customers as $row){ ?>
			<tr>

			<?php foreach($row as $col){ ?>
				<td><?php echo $col; ?></td>
			<?php } ?>

			</tr>
		<?php } ?> 

		</tbody>

	</table>

<?php } else { ?>

	<p>I was not able to retrieve customer data.</p>

<?php } ?>

</body>

</html>