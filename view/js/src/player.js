
// dynmanic interactive video player - handles controls and buffering
var Player = function(model, width, height)
{
	this.width = width;
	this.height = height;

	// model instance used for displaying controls after video is done playing
	this.model = model;
	this.segment = null;	// currently playing segment

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

	// reset the player on startup
	this.reset();
};

// switch to the first default video
Player.prototype.reset = function()
{
	console.log("Resetting player");

	// currently playing segment, set it as first segment by default
	this.segment = S1;

	// add the score in the segment to the overall score
	var score = this.segment.score;	
	this.model.updateScore(null);		// reset the score first
	this.model.updateScore(score);

	if(this.segment.videoStack.size() != 0) {
		this.videoStacked = true;
		console.log("video is stacked, size: %d", this.segment.videoStack.size());
	} else {
		this.videoStacked = false;
	}		

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

	console.log("Now playing %s, duration: %d seconds", this.segment.url, this.segment.video.duration);
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

	// add the score in the segment to the overall score
	var score = this.segment.score;	
	this.model.updateScore(score);

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
	if(newSeg.videoStack.size() != 0) {
		this.videoStacked = true;
		console.log("video is stacked, size: %d", this.segment.videoStack.size());
	} else {
		this.videoStacked = false;
	}

	// set the new segment
	this.setSegment(newSeg);
};

//***** CALLBACK FUNCTIONS *****
// timer used for getting timer events and seeing if video ended
Player.prototype.timerTick = function(e) 
{
	var seg = this.segment;
	if(seg != null && seg.video != null) {
		// first check if the video has ended
		if(seg.video.currentTime >= seg.video.duration) {
			this.videoEnded();
			return;
		}
	}
};

// called when the user clicks on the video player
Player.prototype.mouseInterrupt = function(e)
{
	var seg = this.segment;
	if(seg != null && seg.video != null) {
		// go through all the segment's timer events and check if any event is viable
		for(var i = 0; i < seg.timedEvents.length; i++) {
			var evn = seg.timedEvents[i];
			if((seg.video.currentTime > evn.startTime) && (seg.video.currentTime < evn.endTime)) {
				var seg = evn.segment;
				var mode = evn.mode;
				console.log("event executed, mode %d", mode);
				switch(mode) {
				case 0:
					this.setSegment(seg);
					break;
				case 1:
					// stacked and append
					if(this.segment.videoStack.insert(seg)) {
						this.videoStacked = true;
						this.model.theme.clickEffect(true);		// show effect for clicked
					} else {
						this.model.theme.clickEffect(false);		// show effect for clicked
					}
					break;
				case 2:
					// stacked and remove
					if(this.segment.videoStack.remove(seg)) {
						if(this.segment.videoStack.size == 0) {
							this.videoStacked = false;
						} else {
							this.videoStacked = true;
						}
						this.model.theme.clickEffect(true);		// show effect for clicked
					} else {
						this.model.theme.clickEffect(false);		// show effect for clicked
					}
					break;
				default:
					console.error("Illegal timer event mode");
					return;
				}
				// if an event is found, return
				return;
			}
		}	
		// if no segment, show the negative click effect
		this.model.theme.clickEffect(false);		// show effect for clicked
	}
};

// called when the video is done playing
Player.prototype.videoEnded = function()
{
	//TODO: support looping waiting videos
	
	// check if the video is in stacked mode
	if(this.videoStacked) {
		this.videoStacked = false;	// reset flag
		console.log("stacked videos detected, unstacking...");

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

