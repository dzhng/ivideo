// main segments
var S1 = new Segment("demo1/S1");
var S2af = new Segment("demo1/S2af");
var S2bf = new Segment("demo1/S2bf");
var S3a1 = new Segment("demo1/S3a1");
var S3a2 = new Segment("demo1/S3a2");
var S3b1 = new Segment("demo1/S3b1");
var S3b2 = new Segment("demo1/S3b2");

// connection segments
var S1r = new Segment("demo1/S1r");
var S2as = new Segment("demo1/S2as");
var S2bs = new Segment("demo1/S2bs");

var S2ar = new Segment("demo1/S2ar");
var S2br = new Segment("demo1/S2br");

S1.insertConnection(S1r, "Wtf?", 1);
S1.insertConnection(S2as, "Noob? I'm better than you!", 4);
S1.insertConnection(S2bs, "It's for beating people up", 5);

S1r.insertDirect(S1);
S2as.insertDirect(S2af);
S2bs.insertDirect(S2bf);

S2af.insertConnection(S2ar, "What you talking about?", 1);
S2af.insertConnection(S3a1, "Team up", 4);
S2af.insertConnection(S3a2, "Get Lost", 5);

S2ar.insertDirect(S2af);

S2bf.insertConnection(S2br, "The who with the what now?", 1);
S2bf.insertConnection(S3b1, "Join Forces", 4);
S2bf.insertConnection(S3b2, "Go Die", 5);

S2br.insertDirect(S2bf);

// timed event from 10 - 12
S3b2.insertTimedEvent(S2br, 10, 12);

