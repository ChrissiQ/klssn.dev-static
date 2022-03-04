<?php include "links_hash.php"; ?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>PHP Links</title>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.css" />
	<script type="text/javascript" src="index.js"></script>
	<link type="text/css" rel="stylesheet" href="index.css" />
</head>

<body>

<h1>PHP Links</h1>

<?php foreach($links as $tag => $link){ ?>

	<a href="<?php echo $link ?>">
		<?php echo $tag ?></a>
	<br />

<?php } ?>

</body>

</html>