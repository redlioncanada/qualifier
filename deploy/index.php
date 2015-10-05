<html>
<head>
</head>
<body>
	<?php
		$currentVersion = #VERSION;
		$location = #LOCATION;

		if (!headers_sent()) {
			header('Location: '.$location.'/'.$currentVersion);
	    	die();
	    } else {
	    	die('<script type="text/javascript">window.location.href="' . $location.'/'.$currentVersion . '";</script>');
	    }
	?>
</body>
</html>