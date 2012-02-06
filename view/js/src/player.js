
// dynmanic interactive video player - handles controls and buffering
var Player = function(model, width, height)
{
	this.width = width;
	this.height = height;

	// model instance used for displaying controls after video is done playing
	this.model = model;

	// reset the player on startup
	this.reset();

	// timer events
	this.timerEventCanTrigger = false;
	this.timerEventSegment = null;
	this.timerId = setInterval(this.timerTick.bind(this), 100);

	// 0 = not stacked
	// 1 = stacked and append
	// 2 = stacked and remove
	this.timerEventMode = 0;
	
	// stores if the current segment has other segment(s) stacked
	this.videoStacked = false;
};

// switch to the first default video
Player.prototype.reset = function()
{
	// currently playing segment, set it as first segment by default
	this.segment = S1;

	// set current video and load the first video
	this.segment.loadVideo(this);
	this.segment.setVisible();
	this.preloadVideo();
};

// preload all connection videos of current segment
// set children to all the possible connection videos and preload those
Player.prototype.preloadVideo = function()
{
	//iterate through the current segment and load the connection videos
	console.log("video has %d connections", this.segment.connections.length);
	for(var i = 0; i < this.segment.connections.length; i++) {
		var seg = this.segment.connections[i].segment;
		seg.loadVideo(this);
	}

	console.log("video has %d timed events", this.segment.timedEvents.length);
	for(var i = 0; i < this.segment.timedEvents.length; i++) {
		var seg = this.segment.timedEvents[i].segment;
		seg.loadVideo(this);
	}
};

Player.prototype.playVideo = function()
{
	this.segment.setVisible();
	this.segment.play();
};

Player.prototype.skipToEnd = function()
{
};

Player.prototype.pauseVideo = function()
{
	this.segment.pause();
};

Player.prototype.isPaused = function()
{
	return this.segment.video.paused;
};

// set the input segment as the segment to play, also kills currently playing segment
Player.prototype.setSegment = function(segment)
{
	this.segment.removeVideo();
	this.segment = segment;

	// reload the next segment's video
	this.preloadVideo();
	this.playVideo();
};

// choose the option in all possible option connections
Player.prototype.chooseOption = function(option)
{
	console.log("option %d choosen", option);

	// get the new segment and stop other segments from loading
	var newSeg = this.segment.chooseConnection(option).segment;

	// set the new segment
	this.setSegment(newSeg);
};

//***** CALLBACK FUNCTIONS *****
// timer used for getting timer events and seeing if video ended
Player.prototype.timerTick = function(e) 
{
	var seg = this.segment;
	if(seg.video != null) {
		// first check if the video has ended
		if(seg.video.currentTime >= seg.video.duration) {
			this.videoEnded();
			return;
		}

		// go through all the segment's timer events and check if any event is viable
		for(var i = 0; i < seg.timedEvents.length; i++) {
			var evn = seg.timedEvents[i];
			if((seg.video.currentTime > evn.startTime) && (seg.video.currentTime < evn.endTime)) {
				this.timerEventCanTrigger = true;
				this.timerEventSegment = evn.segment;
				this.timerEventMode = evn.mode;
				return;
			}
		}	
		// if none found, reset timer event variables
		this.timerEventCanTrigger = false;
		this.timerEventSegment = null;
	}
};

// called when the video is done playing
Player.prototype.videoEnded = function()
{
	//TODO: support looping waiting videos
	
	// check if the video is in stacked mode
	if(this.videoStacked) {
		this.videoStacked = false;	// reset flag

		// build the connections from the stack
		var seg = this.segment;
		var con = seg.connections;	// save the connections for now
		var df = seg.defaultPos;
		var stack = seg.videoStack;
		seg.connections = new Array();	// make a new connections array
		while((s = stack.pull()) != null) {
			seg.insertDirect(s);
			seg = s;
		}
		seg.connections = con;	// restore the connection to the last segment in the stack
		seg.defaultPos = df;
		
		// go to the first direct connection
		this.chooseOption(this.segment.defaultPos);
		return;
	}

	// check if the video supports directly skipping forward
	if(this.segment.defaultPos != -1) {
		console.log("direct video detected, not showing options");
		this.chooseOption(this.segment.defaultPos);
		return;
	}

	if(!this.model.showOptions(this.segment)) {
		//console.log("no more options, end of interactive video");
		//NOTE: This will keep executing at 10 times/sec due to timer tick check
		this.model.videoComplete();
		return;
	}

	return;
};

