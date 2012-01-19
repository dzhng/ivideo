
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
	<!-- Facebook made medo it -->
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=204353349642023";
				  fjs.parentNode.insertBefore(js, fjs);
				  }(document, 'script', 'facebook-jssdk'));</script>
	<!-- end of facebook integration box pops up with div called fb-comments -->
	<header role="nav">
		<div id="logo">Logo Goes Here</div>
		<div id="app-navigation">Navigation Stuff Goes here</div>
	</header>

	<section id="page-content"> 
		<div id="home-main-video">
			<iframe src="player.php?v=<?echo $video;?>" scrolling="no" frameborder="0" width="600px" height="420px">	
				<p>Your Browser does not support iframes</p>
			</iframe>
			<div class="fb-like" data-href="<?echo $url;?>" data-send="true" data-width="450" data-show-faces="false"></div>
			<div class="fb-comments" data-href="<?echo $url;?>" data-num-posts="5" data-width="600"></div>
		</div>
	</section>
</body>
