// sets the connections between segments. 
// option sets the displayed decision title
// posistion sets where on the option wheel an individual option is placed
// segment sets which video you want

var Connection = function(segment,option,position)
{
	this.segment = segment;
	this.option = option;
	this.position = position;
};

