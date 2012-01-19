// main segments
var S1 = new Segment("demo3/Cath-1");
var S1A = new Segment("demo3/Cath-1A");
var S1B = new Segment("demo3/Cath-1B");
var S1C = new Segment("demo3/Cath-1C");
var S1D = new Segment("demo3/Cath-1D");
var S1Q = new Segment("demo3/Kath-1Q");
var S2 = new Segment("demo3/Cath-2");
var S2A = new Segment("demo3/Cath-2A");
var S2B = new Segment("demo3/Cath-2B");
var S2C = new Segment("demo3/Cath-2C");
var S2D = new Segment("demo3/Cath-2D");
var S2Q = new Segment("demo3/Cath-2Q");




S1Q.insertConnection(S1A, "A", 1);
S1Q.insertConnection(S1B, "B", 4);
S1Q.insertConnection(S1C, "C", 2);
S1Q.insertConnection(S1D, "D", 3);

S2Q.insertConnection(S2A, "A", 1);
S2Q.insertConnection(S2B, "B", 2);
S2Q.insertConnection(S2C, "C", 4);
S2Q.insertConnection(S2D, "D", 5);

S1.insertDirect(S1Q);
S2.insertDirect(S2Q);

