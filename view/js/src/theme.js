
var ThemeModel = function(model, theme, width, height)
{
	this.model = model;			//provides interface for theme to give it's events to.
	this.paper = model.paper;	//paper is an object to draw things on
	this.theme = theme;			//detects events 

	// color choices
	var textColor = "rgb(250,250,250)";
	var textHighlighted = "rgb(255,166,10)";
	var eventIndicatorFill = "90-#fa6900:0-#fa6900:100";
	var shadowFill = "rgba(0,0,0,0.7)";

	// option selector and icon
	var size = width/10;		// size of option selection circle
	var isize = size * 0.6;		// size of icon in middle of circle
	this.selx = width/2;
	this.sely = height - size*0.7;
	this.selector = this.paper.image("themes/" + this.theme + "/selector.png", 
				this.selx-size/2, this.sely-size/2, size, size);
	this.icon = this.paper.image("themes/" + this.theme + "/icon.png",
			this.selx-isize/2, this.sely-isize/2, isize, isize);
	this.selector.hide();
	this.icon.hide();
	

	// option text
	var fsize = size/4;	// text font size
	// generate array of option positions
	var r = size * 0.55;		// radius
	var optionAttr = [
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx - 0.7*r, y:this.sely - 0.7*r, "text-anchor":"end"},
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx - r, y:this.sely, "text-anchor": "end"},
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx - 0.7*r, y:this.sely + 0.7*r, "text-anchor": "end"},
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx + 0.7*r, y:this.sely + 0.7*r, "text-anchor": "start"},
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx + r, y:this.sely, "text-anchor": "start"},
		{type:"text", "font-size": fsize, "font-family": "Arial", "font-weight": "bold", x:this.selx + 0.7*r, y:this.sely - 0.7*r, "text-anchor": "start"}
	];
	this.optionShadow = this.paper.add(optionAttr);
	this.options = this.paper.add(optionAttr);		

	// hide all the option text by default
	for(var i = 0; i < this.options.length; i++) {
		var current = 0;
		(function (model, paper, options, i) {
			var option = options[i];
			option.attr({fill:textColor, cursor:"pointer"});
			
			option.mousedown(function(){
					model.selectOption(i);
				}).mouseover(function(){	
					options[current].animate({fill:textColor}, 200);		
					option.animate({fill:textHighlighted}, 200);
					option.toFront();
					paper.safari();
					current = i;	
				}).mouseout(function(){	
					option.animate({fill:textColor}, 200);
					paper.safari();
				});
			option.hide();
		})(this.model, this.paper, this.options, i);
		this.optionShadow[i].attr({fill:shadowFill});
		this.optionShadow[i].translate(1,1);
		this.optionShadow[i].hide();
	}

	// play/replay button on menu
	var playsize = size * 1.5;
	var playx = width/2 - playsize/2;
	var playy = height/2 - playsize/2;
	this.play = this.paper.image("themes/" + this.theme + "/play.png", 
				playx, playy, playsize, playsize);
	this.play.click(this.model.playClicked.bind(this.model));
	this.play.node.style.cursor = "pointer";
	this.play.hide();

	// event indicator
	/*this.eventIndicator = this.paper.rect(0, height, width, 0).attr({fill:eventIndicatorFill, "fill-opacity":0, "stroke-width":0});
	this.eventIndicator.data("h", r);
	this.eventIndicator.data("y", height-r);
	this.eventIndicator.hide();*/
	this.eventIndicator = null;			// TODO: Hide event indicator for now until we figure out a good way of doing this

	// control play/pause button
	var consize = fsize;
	var conx = consize/2;
	var cony = height - consize*1.5;
	this.playControl = this.paper.image("themes/" + this.theme + "/play_control.png",
			conx, cony, consize, consize).attr({opacity:0});
	this.pauseControl = this.paper.image("themes/" + this.theme + "/pause_control.png",
			conx, cony, consize, consize).attr({opacity:0});
	this.playControl.hide();
	this.pauseControl.hide();

	// register control button click events
	this.playControl.click((function() {
		this.playControl.hide();
		this.pauseControl.show();
		this.pauseControl.attr({opacity:1});
		this.playControl.attr({opacity:0});
		this.model.playVideo();
	}).bind(this));
	this.pauseControl.click((function() {
		this.pauseControl.hide();
		this.playControl.show();
		this.playControl.attr({opacity:1});
		this.pauseControl.attr({opacity:0});
		this.model.pauseVideo();
	}).bind(this));

	// component states
	this.eventIndicatorHidden = true;
	this.controlsHidden = true;			// stores if the play/pause controls are shown
};

ThemeModel.prototype.rotateSelector = function(rotation)
{
	this.selector.attr({transform:"r" + rotation});
};

ThemeModel.prototype.showOptions = function(text)
{
	this.icon.show();
	this.selector.show();
	
	for(var i = 0; i < text.length; i++) {
		if(text[i] != undefined) {
			this.options[i].attr({text: text[i]});
			this.options[i].show();
			this.optionShadow[i].attr({text: text[i]});
			this.optionShadow[i].show();
		} 
	}
};

ThemeModel.prototype.hideOptions = function()
{
	this.icon.hide();
	this.selector.hide();
	
	for(var i = 0; i < 6; i++) {
		this.options[i].hide();
		this.optionShadow[i].hide();
	}
};

ThemeModel.prototype.showControls = function(play)
{
	if(this.controlsHidden == true) {
		if(play) {
			this.playControl.show();
			this.playControl.animate({opacity: 1}, 200, "<>");
		} else {
			this.pauseControl.show();
			this.pauseControl.animate({opacity: 1}, 200, "<>");
		}
		this.controlsHidden = false;
	}
};

ThemeModel.prototype.hideControls = function(play)
{
	if(this.controlsHidden == false) {
		if(play) {
			this.playControl.animate({opacity: 0}, 500, "<>", this.hide);
		} else {
			this.pauseControl.animate({opacity: 0}, 500, "<>", this.hide);
		}
		this.controlsHidden = true;
	}
};

ThemeModel.prototype.showHomeScreen = function(restart)
{
	this.play.show();
};

ThemeModel.prototype.hideHomeScreen = function()
{
	this.play.hide();
};

ThemeModel.prototype.showEventIndicator = function()
{
	// set this.eventIndicator = null to avoid showing anything
	if(this.eventIndicator != null && this.eventIndicatorHidden == true) {
		var h = this.eventIndicator.data("h");
		var y = this.eventIndicator.data("y");
		this.eventIndicator.show();
		this.eventIndicator.animate({"height":h,"y":y}, 500, "<>");
		this.eventIndicatorHidden = false;
	}
};

ThemeModel.prototype.hideEventIndicator = function()
{
	// set this.eventIndicator = null to avoid showing anything
	if(this.eventIndicator != null && this.eventIndicatorHidden == false) {
		var h = this.eventIndicator.data("h");
		var y = this.eventIndicator.data("y");
		this.eventIndicator.animate({"height":0,"y":y+h}, 500, "<>", this.hide);
		this.eventIndicatorHidden = true;
	}
};

