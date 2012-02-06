//Main Clip Sans customer
var S1 = new Segment("demo5/S1");
//Main Segments
	var Angry  = new Segment("demo5/angry_frustrated");	
	var Chewing = new Segment("demo5/chewing_gum");	
	var Disinterested = new Segment("demo5/disinterested");
	var End = new Segment("demo6/end");
	var Forgot = new Segment("demo6/forgot_no_notes");
	var Hold = new Segment("demo6/hold_on_okay");
	var Magazine = new Segment("demo6/magazine");
	var Rude = new Segment("demo6/rude_reading_from_script");
	var Uh = new Segment("demo6/uh_huh");
	var Unprepared = new Segment("demo6/unprepared");
	var Yeah = new Segment("demo6/yeah_yeah");
	
//Set up Timed events in S1

	S1.insertTimedStack(Disinterested, 860 , 863, true);
	S1.insertTimedStack(Disinterested, 863 , 865, true);
	S1.insertTimedStack(Chewing, 866 , 868, true);
	S1.insertTimedStack(Chewing, 869 , 873, true);
	S1.insertTimedStack(Magazine, 878 , 887, true);
	S1.insertTimedStack(Uh, 876 , 880, true);
	S1.insertTimedStack(Unprepared, 900 , 905, true);
	S1.insertTimedStack(Hold, 905 , 908, true);
	S1.insertTimedStack(Angry, 923 , 930, true);
	S1.insertTimedStack(Forgot, 936 , 940, true);
	S1.insertTimedStack(Yeah, 939 , 941, true);
	S1.insertTimedStack(Forgot, 942 , 947, true);





