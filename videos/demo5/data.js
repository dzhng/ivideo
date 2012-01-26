//Main Clip Sans customer
var S1 = new Segment("demo5/S1");
//Main Segments
	var S1bd = new Segment("demo5/S1");	
	var S3wd = new Segment("demo5/S1");	
	var S5r1 = new Segment("demo5/S1");

	S1.insertConnection(S1bd, "Bill", 3);
	S1.insertConnection(S3wd,"Jill",4);
	S1.insertConnection(S5r1, "Susan", 5);
