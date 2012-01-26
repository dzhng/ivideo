
var setVideoUrl = function(url)
{
	if(url == "" || url == null) {
		return null;
	}

	if(isMozilla) {
		return ("/videos/" + url + ".ogv");
	} else {
		return ("/videos/" + url + ".mp4");
	}
}

