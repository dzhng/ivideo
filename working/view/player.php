<head>
	
	<title>Interactive Video Player</title>
	
	<style type="text/css">
		body    { background: #000; margin-left: 0; margin-right: 0; margin-top: 0; }
	</style>
	
	<script type="text/javascript" src="js/go.js"></script>

	<!--get the correct video file -->
	<script type="text/javascript" 
		src="<?echo '../videos/'.$_GET['v'].'/data.js';?>">
	</script>
	
	<script type="text/javascript">
		function document_load() {	// Setup editor
			var v = new Model();
		}
	</script>
	
</head>
<body onload="document_load();">
	<div id="controlOverlay" style="z-index:100;position:absolute;"></div>
</body>
