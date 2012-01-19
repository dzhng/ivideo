//Create a video segment that has a URL file and creates the possible decision paths.

var Segment = function(url)
{
	this.url = url;

	// the default segment to go to, if set, the player will automatically
	// go to that position without the option dialog
	this.defaultPos = -1;					

	this.connections = new Array();
	this.timedEvents = new Array();

	this.video = null;
	this.player = null;	// video player to callback when video is done playing
};

// make video visible and play
Segment.prototype.setVisible = function()
{
	this.video.style.visibility = "visible";
};

Segment.prototype.play = function()
{
	this.video.play();
};

// pause video
Segment.prototype.pause = function()
{
	this.video.pause();
};

// iterate through all the connections and return the reference at the input position
Segment.prototype.getConnectionByPosition = function(position)
{
	for(var i = 0; i < this.connections.length; i++) {
		if(this.connections[i].position === position) {
			return this.connections[i];
		}
	}
	return null;
};

// iterate through all the connections and return the reference at the input position
// also remove the videos of other connections
Segment.prototype.chooseConnection = function(position)
{
	var pos;
	for(var i = 0; i < this.connections.length; i++) {
		if(this.connections[i].position === position) {
			pos = i;
		} else {
			this.connections[i].segment.removeVideo();
		}
	}
	return this.connections[pos];
};

Segment.prototype.insertDirect = function(child)
{
	this.defaultPos++;
	this.connections.push(new Connection(child, "", this.defaultPos));
};

Segment.prototype.insertConnection = function(child, option, position)
{
	this.connections.push(new Connection(child, option, position));
};

Segment.prototype.insertTimedEvent = function(child, starttime, endtime)
{
	this.timedEvents.push(new TimedEvent(child, starttime, endtime));
};

// create a video element and set it as the video for this segment
Segment.prototype.loadVideo = function(player)
{
	this.player = player;

	if(this.video == null) {
		var vid = document.createElement("video");
		vid.controls = false;
		vid.volume = 1;
		vid.preload = "auto";
		vid.style.visibility = "hidden";
		vid.style.position = "absolute";
		vid.width = this.player.width;
		vid.height = this.player.height;

		// setup timer to change to option video when connection done playing
		//vid.addEventListener("ended", this.videoEnded.bind(this), false);
		//vid.addEventListener("loadedmetadata", this.videoLoaded, false);
		document.body.insertBefore(vid, document.getElementById("controlOverlay"));

		this.video = vid;
	}

	this.video.src = setVideoUrl(this.url);
	this.video.load();
};

Segment.prototype.removeVideo = function()
{
	if(this.video != null) {
		document.body.removeChild(this.video);
		this.video = null;
	}
};

Segment.prototype.videoEnded = function(e) 
{
	this.player.videoEnded();
};

Segment.prototype.videoLoaded = function(e)
{
	if(this.paused) {
		console.log("video loaded, paused");
		this.currentTime = 0.1;
	} else {
		console.log("video loaded, playing");
		this.currentTime = 0.1;
		this.play();
		setTimeout(this.play.bind(this), 33);	// because chrome sometimes still freezes
	}
};

