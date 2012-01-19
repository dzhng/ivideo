// main segments
var S1 = new Segment("demo2/S1");
var S1b = new Segment("demo2/S1b");
var S1r = new Segment("demo2/S1r");
var S2as = new Segment("demo2/S2as");
var S2af = new Segment("demo2/S2Af");
var S2bf = new Segment("demo2/S2bf");
var S2bs = new Segment("demo2/S2bs");
var S2c = new Segment("demo2/S2c");

S1b.insertConnection(S1r, "You want to run that by me again?", 1);
S1b.insertConnection(S2as, "What was that around the corner?", 4);
S1b.insertConnection(S2bs, "Did I see something move in your pants?", 5);
S1b.insertConnection(S2c, "It's okay I'm a rock hound too", 3);

S1.insertDirect(S1b);
S1r.insertDirect(S1b);
S2as.insertDirect(S2af);
S2bs.insertDirect(S2bf);


// timed event from 3 - 10
S2bs.insertTimedEvent(S2bf, 3, 10);

