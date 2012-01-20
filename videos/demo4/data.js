//Main Clip Sans customer
var S1 = new Segment("demo4/S1");

//Black Dude
	//Main Segments
		var S1bd = new Segment("demo4/bd/1bd");	
		var S3wd = new Segment("demo4/bd/3wd");	
		var S5r1 = new Segment("demo4/bd/5r1");
		var S7r2 = new Segment("demo4/bd/7r2");
		var S9r3 = new Segment("demo4/bd/9r3");
		var S11j = new Segment("demo4/bd/11j");
	//After the Junction
		//Correct Choice
			var Sjc1t = new Segment("demo4/bd/j/c/1t");			
			var Sjc2f = new Segment("demo4/bd/j/c/2f");		
			var Sjc3t = new Segment("demo4/bd/j/c/3t");
			var Sjc4wdf = new Segment("demo4/bd/j/c/4wdf");
		//Wrong Choice
			var	Sjw1bd = new Segment("demo4/bd/j/w/1wbd");
			var Sjw1bd2 = new Segment("demo4/bd/j/w/1wbd");

	//Main Segment Transistions	
		var S2t = new Segment("demo4/bd/2t");
		var S4t = new Segment("demo4/bd/4t");
		var S6t = new Segment("demo4/bd/6t");
		var S8t = new Segment("demo4/bd/8t");
		var S10t = new Segment("demo4/bd/10t");

//Black Lady 
	//Main Segments
		var Sbw2bw = new Segment("demo4/bw/2bw");
		var Sbw4wd = new Segment("demo4/bw/4wd");
		var Sbw6r1 = new Segment("demo4/bw/6r1");
		var Sbw8r2 = new Segment("demo4/bw/8r2");
		var Sbw10r3 = new Segment("demo4/bw/10r3");
		var Sbw12j = new Segment("demo4/bw/12j");

	//Transistions	
		var Sbw1t = new Segment("demo4/bw/1t");
		var Sbw3t = new Segment("demo4/bw/3t");
		var Sbw5t = new Segment("demo4/bw/5t");
		var Sbw7t = new Segment("demo4/bw/7t");
		var Sbw9t = new Segment("demo4/bw/9t");
		var Sbw11t = new Segment("demo4/bw/11t");

	//After Junction	
	//Correct
		var Sbwjc1t = new Segment("demo4/bw/j/c/1t");
		var Sbwjc2f = new Segment("demo4/bw/j/c/2f");
		var Sbwjc3t = new Segment("demo4/bw/j/c/3t");
		var Sbwjc4cr = new Segment("demo4/bw/j/c/4cr");
	//Wrong
		var Sbwjw1f = new Segment("demo4/bw/j/w/1f");
		var Sbwjw1f2 = new Segment("demo4/bw/j/w/1f");
	
//pnl
	//Main Segments
		var Spnl1pl = new Segment("demo4/pnl/1pl");
		var Spnl2wd = new Segment("demo4/pnl/2wd");
		var Spnl5r1 = new Segment("demo4/pnl/5r1");
		var Spnl7r2 = new Segment("demo4/pnl/7r2");
		var Spnl9r3 = new Segment("demo4/pnl/9r3");
		var Spnl11j = new Segment("demo4/pnl/11j");
	//Transistions
		var Spnl2t = new Segment("demo4/pnl/2t");
		var Spnl4t = new Segment("demo4/pnl/4t");
		var Spnl6t = new Segment("demo4/pnl/6t");
		var Spnl8t = new Segment("demo4/pnl/8t");
		var Spnl10t = new Segment("demo4/pnl/10t");
		
	//After junction
	//Correct
		var Spnljc1t = new Segment("demo4/pnl/j/c/1t");
		var Spnljc2f = new Segment("demo4/pnl/j/c/2f");
		var Spnljc3t = new Segment("demo4/pnl/j/c/3t");
		var Spnljc4wty = new Segment("demo4/pnl/j/c/4wty");
		var Spnljc5t = new Segment("demo4/pnl/j/c/5t");
		var Spnljc6wdwu = new Segment("demo4/pnl/j/c/6wdwu");
	//Wrong
		var Spnljw1f = new Segment("demo4/pnl/j/w/1f");
		var Spnljw1f2 = new Segment("demo4/pnl/j/w/1f");

//Video Control flow below:		
//First Choice to decide which customer
	S1.insertConnection(S1bd, "Black Dude", 3);
	S1.insertConnection(Spnl1pl,"Postit Note Lady",4);
	S1.insertConnection(Sbw1t, "Black Lady", 5);

//Post it Lady
	Spnl1pl.insertDirect(Spnl2t);
	Spnl2t.insertDirect(Spnl2wd);
	Spnl2wd.insertDirect(Spnl4t);
	Spnl4t.insertDirect(Spnl5r1);
	Spnl5r1.insertDirect(Spnl6t);
	Spnl6t.insertDirect(Spnl7r2);
	Spnl7r2.insertDirect(Spnl8t);
	Spnl8t.insertDirect(Spnl9r3);
	Spnl9r3.insertDirect(Spnl10t);
	Spnl10t.insertDirect(Spnl11j);

	//Junction
		Spnl11j.insertConnection(Spnljc1t,"Choice 1",3);
		Spnl11j.insertConnection(Spnljw1f,"Choice 2",4);
		Spnl11j.insertConnection(Spnljw1f2,"Choice 3",5);
	//Correct	
		Spnljc1t.insertDirect(Spnljc2f);
		Spnljc2f.insertDirect(Spnljc3t);
		Spnljc3t.insertDirect(Spnljc4wty);
		Spnljc4wty.insertDirect(Spnljc5t);
		Spnljc5t.insertDirect(Spnljc6wdwu);
	//Wrong
		Spnljw1f.insertDirect(Spnl1pl);
		Spnljw1f2.insertDirect(Spnl1pl);
	
	
//Black Dude
	S1bd.insertDirect(S2t);
	S2t.insertDirect(S3wd);
	S3wd.insertDirect(S4t);
	S4t.insertDirect(S5r1);
	S5r1.insertDirect(S6t);
	S6t.insertDirect(S7r2);
	S7r2.insertDirect(S8t);
	S8t.insertDirect(S9r3);
	S9r3.insertDirect(S10t);
	S10t.insertDirect(S11j);

//Forward Choices
	S11j.insertConnection(Sjw1bd2, "Choice 1", 3);
	S11j.insertConnection(Sjw1bd, "Choice 2", 4);
	S11j.insertConnection(Sjc1t, "Choice 3", 5);

//Wrong choices
	Sjw1bd.insertDirect(S1bd);
	Sjw1bd2.insertDirect(S1bd);

//Correct Choices - nothing needed
	Sjc1t.insertDirect(Sjc2f);
	Sjc2f.insertDirect(Sjc3t);
	Sjc3t.insertDirect(Sjc4wdf);

//Black Woman
	Sbw1t.insertDirect(Sbw2bw);
	Sbw2bw.insertDirect(Sbw3t);
	Sbw3t.insertDirect(Sbw4wd);
	Sbw4wd.insertDirect(Sbw5t);
	Sbw5t.insertDirect(Sbw6r1);
	Sbw6r1.insertDirect(Sbw7t);
	Sbw7t.insertDirect(Sbw8r2);
	Sbw8r2.insertDirect(Sbw9t);
	Sbw9t.insertDirect(Sbw10r3);
	Sbw10r3.insertDirect(Sbw11t);
	Sbw11t.insertDirect(Sbw12j);

//Choose response
	Sbw12j.insertConnection(Sbwjw1f2, "Choice 1", 3);
	Sbw12j.insertConnection(Sbwjc1t, "Choice 2", 4);
	Sbw12j.insertConnection(Sbwjw1f, "Choice 3", 5);

	//Correct
	Sbwjc1t.insertDirect(Sbwjc2f);
	Sbwjc3t.insertDirect(Sbwjc4cr);

	//Wrong
	Sbwjw1f2.insertDirect(Sbw2bw);
	Sbwjw1f.insertDirect(Sbw2bw);
