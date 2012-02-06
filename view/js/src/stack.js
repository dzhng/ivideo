
// store an array of data in a data structure, provide functions to add videos into the stack
var Stack = function()
{
	this.stack = new Array();
};

// this is called when a new video is to be inserted into the stack
Stack.prototype.insert = function(seg)
{
	this.stack.push(seg);
};

// remove the input segment from the stack
Stack.prototype.remove = function(seg)
{
	for(var i = 0; i < this.stack.length; i++) {
		// if segment found, remove and return
		if(this.stack[i] == seg) {
			this.stack.splice(i, 1);
			return;
		}
	}
};

Stack.prototype.pull = function()
{
	if(this.stack.length > 1) {
		return this.stack.shift();
	} else if(this.stack.length == 1) {
		return this.stack.pop();
	} else {
		return null;
	}
};

Stack.prototype.size = function()
{
	return this.stack.length;
};

