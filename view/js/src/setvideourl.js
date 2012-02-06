
var setVideoUrl = function(url)
{
	if(url == "" || url == null) {
		return null;
	}

	if(isMozilla) {
		return ("http://static.simply.io/" + url + ".ogv");
	} else {
		return ("http://static.simply.io/" + url + ".mp4");
	}
}

