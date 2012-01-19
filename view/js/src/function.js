
// need this for Safari support. It doesn't seem to have the bind function?
Function.prototype.bind = function(obj)
{
	var self = this;
	return function()
	{
		return self.apply(obj, arguments);
	};
};

