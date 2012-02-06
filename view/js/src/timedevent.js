
// all times are in seconds
// Segment: the segment this connection leads to
// Starttime: the start time in the video for the event to begin triggering
// Endtime: the highest time for the event to be triggered
var TimedEvent = function(segment, starttime, endtime, mode)
{
	this.segment = segment;
	this.startTime = starttime;
	this.endTime = endtime;
	this.mode = mode || 0;
};

