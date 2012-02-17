<?
	$video = $_GET['v'];
	if(isset($_GET['debug'])) {
		include('../php/debug.php');
	} else {
		include('../php/nodebug.php');
	}

	include('../php/config.php');	
?>

<head>
	<link href='http://fonts.googleapis.com/css?family=Lobster+Two:700,400' rel='stylesheet' type='text/css'>	
	<link href='../css/style.css' rel='stylesheet' type='text/css'>
</head>
<body>
	<header role="nav">
		<div id="logo">Logo Goes Here</div>
		<div id="app-navigation">Navigation Stuff Goes here</div>
	</header>

	<section id="page-content"> 
		<div id="main-video">
			<iframe src="player.php?v=<?echo $video;?>" scrolling="no" frameborder="0" width="600px" height="420px">	
				<p>Your Browser does not support iframes</p>
			</iframe>
		</div>
	</section>
</body>
