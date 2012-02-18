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
	<link href='../css/style.css' rel='stylesheet' type='text/css'>
</head>
<body>
	<header role="nav">
		<div id="logo"><!--Logo Goes Here--></div>
		<div id="app-navigation"><!--Navigation Stuff Goes here--></div>
	</header>

	<section id="page-content"> 
		<div id="title-video">
			<h1>DuPont Customer Service Training</h1>
		</div>
		<div id="main-video">
			<iframe src="player.php?v=<?echo $video;?>" scrolling="no" frameborder="0" width="600px" height="420px">	
				<p>Your Browser does not support iframes</p>
			</iframe>
		</div>
		<div id="score-box">
			<h2>Score</h2>
			<h3 id="scoreNum">0</h3>
		</div>
		<div id="info-video">
			<p><span style="font-weight:bold !important;" >Goal:</span> Click on the screen when you hear the narrator doing something wrong.</p>
		</div>
	</section>
</body>
