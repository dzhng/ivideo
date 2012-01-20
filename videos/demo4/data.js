//Black Dude
	//Main Segments
		var S1 = new Segment("demo4/S1");
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
		//Wrong Choice
			var	Sjw1bd = new Segment("demo4/bd/j/w/1bd");
			var Sjw2wdf = new Segment("demo4/bd/j/w/2wdf");

	//Main Segment Transistions	
		var S2t = new Segment("demo4/bd/2t");
		var S4t = new Segment("demo/bd/4t");
		var S6t = new Segment("demo/bd/4t");
		var S8t = new Segment("demo/bd/8t");
		var S10t = new Segment("demo/bd/10t");
//Post it Note Lady 
	//Main Segments
	//Transistions
	
//Black Lady
	//Main Segments
	//Transistions
	
//Video Order

//First Choice to decide which customer
S1.insertConnection(S1bd, "Black Dude", 3);
//S1.insertConnection(,"Postit Note Lady",4);
//S1.insertConnection(,"Black Lady",5);

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

//Going back?
//S11j.insertConnection(,"",);

//Forward Choices
S11j.insertConnection(Sjw1bd, "Choice 1", 3);
S11j.insertConnection(Sjw1bd, "Choice 2", 4);
S11j.insertConnection(Sjc1t, "Choice 3", 5);

//Wrong choice
Sjw1bd.insertDirect(Sjw2wdf);
Sjw2wdfinsertDirect(S1bd);
//Correct Choices - nothing needed
