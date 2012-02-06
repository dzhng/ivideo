//Model.js draws on a canvas above the videos that are
//playing to provide the users with the ability to interact with the videos

//TODO: 

// global tick tock variable
var jiffy = 0;

var Model = function()
{
	// player size
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	//get the context of the canvas
	var canvas = document.getElementById("controlOverlay");
	canvas.width = this.width;
	canvas.height = this.height;
	this.paper = Raphael(canvas, this.width,this.height);

	// initialize the theme
	this.theme = new ThemeModel(this, "professional1", this.width, this.height);

	// initialize the video player
	this.player = new Player(this, this.width, this.height);

	// marks if the video is a replay
	this.replay = false;

	// controls
	this.mousex = 0;
	this.mousey = 0;

    this.mouseMoveHandler = this.mouseMove.bind(this);
    document.addEventListener("mousemove", this.mouseMoveHandler, false);

	this.mouseUpHandler = this.mouseUp.bind(this);
    document.addEventListener("mouseup", this.mouseUpHandler, false);

	// setup periodic timer tick
	this.tickId= setInterval(this.timerTick.bind(this), 33);

	// idle parameters
	this.idleCounter = 15;	// when this counter reaches 15 (0.5 sec), the mouse will be determined to be idle

	// show the initial control on startup
	this.theme.showHomeScreen(this.restart);
	this.controlsVisible = false;				// don't show idle controls by default
};

Model.prototype.mouseMove = function(e)
{
	// store new pointer position
	this.mousex = e.pageX;
	this.mousey = e.pageY;

	// reset idle counter and show controls
	this.idleCounter = 15;	// reset the idle conter
	if(this.controlsVisible == true) {
		this.theme.showControls(this.player.isPaused());
	}
};

Model.prototype.mouseUp = function(e)
{
	if(this.player.timerEventCanTrigger) {
		switch(this.player.timerEventMode) {
		case 0:
			this.player.setSegment(this.player.timerEventSegment);
			break;
		case 1:
			// stacked and append
			this.player.segment.videoStack.insert(this.player.timerEventSegment);
			break;
		case 2:
			// stacked and remove
			this.player.segment.videoStack.remove(this.player.timerEventSegment);
			break;
		default:
			console.error("Illegle timer event mode");
			break;
		}
	}
};

Model.prototype.playClicked = function()
{
	if(this.replay == true) {
		this.player.segment.removeVideo();
		this.player.reset();
	}
	this.player.playVideo();
	this.controlsVisible = true;	// enable video controls
	this.theme.hideHomeScreen();
};

Model.prototype.playVideo = function()
{
	this.player.playVideo();
};

Model.prototype.pauseVideo = function()
{
	this.player.pauseVideo();
};

// callback function for when the video is done playing
Model.prototype.videoComplete = function()
{
	this.replay = true;
	this.theme.showHomeScreen(this.restart);
	this.controlsVisible = false;		// don't show controls during home screen
};

// callback function for when a video is requesting options
Model.prototype.showOptions = function(segment)
{
	var found = false;
	var options= new Array(6);

	var cons = new Array(6);
	for(var i = 0; i < 6; i++) {
		cons[i] = segment.getConnectionByPosition(i);
	}

	if(cons[0] != null) {
		options[0] = cons[0].option;
		found = true;
	}
	if(cons[1] != null) {
		options[1] = cons[1].option;
		found = true;
	}
	if(cons[2] != null) {
		options[2] = cons[2].option;
		found = true;
	}
	if(cons[3] != null) {
		options[3] = cons[3].option;
		found = true;
	}
	if(cons[4] != null) {
		options[4] = cons[4].option;
		found = true;
	}
	if(cons[5] != null) {
		options[5] = cons[5].option;
		found = true;
	}

	// see if any options got pushed
	if(!found) {
		return false;
	}

	// draw the texts
	this.theme.showOptions(options);
	this.controlsVisible = false;		// don't show controls during option sequences
	this.theme.hideControls(this.player.isPaused());

	return true;
};

Model.prototype.selectOption = function(opt)
{
	this.theme.hideOptions();
	this.player.chooseOption(opt);
	this.controlsVisible = true;		// make sure controls are visible for the next segment
};

Model.prototype.timerTick = function()
{
	// increment the jiffy for every tick
	jiffy++;

	// tick the idle timer
	if(--this.idleCounter <= 0) {
		this.theme.hideControls(this.player.isPaused());
	}
	
	//Menu selector rotation angle
	var angle = Math.atan((this.theme.sely - this.mousey)/(this.mousex - this.theme.selx)) - Math.PI/2;
	if(this.mousex - this.theme.selx < 0) {
		angle = angle - Math.PI;
	}
	this.theme.rotateSelector(-1*angle * 360 / (2*Math.PI));

	// check timed event indicator
	if(this.player.timerEventCanTrigger) {
		this.theme.showEventIndicator();
	} else {
		this.theme.hideEventIndicator();
	}
};

