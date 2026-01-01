////// Mini Notation Format
////// The snippet above is enclosed in backticks (`), which allows you to write multi-line strings.
////// You can also use regular double quotes (") for single line mini-notation, as we have done already.
////// If you do just want to get a regular string that is not parsed as mini-notation, use single quotes (').

////// --------------------------
////// 1 - Sequences of events in a cycle
////// We can play more notes by separating them with spaces:
note("c e g b")
// note("c d e f g a b")


// ////// 2 - Multiplication
// ////// A sequence can be sped up by multiplying it by a number using the asterisk symbol (*):
// note("[e5 b4 d5 c5]*2")
// note("[e5 b4 d5 c5]*2.75")

// ////// 3 - Division
// ////// Contrary to multiplication, division can slow the sequence down by enclosing it in brackets and dividing it by a number (/2):
// note("[e5 b4 d5 c5]/2")
// note("[e5 b4 d5 c5]/2.75")

// ////// 4 - Angle Brackets
// ////// Using angle brackets <>, we can define the sequence length based on the number of events:
// note("<e5 b4 d5 c5>")
// note("<e5 b4 d5 c5 a4 c5>*8")



// ////// 5 - Subdividing time with bracket nesting
// ////// To create more interesting rhythms, you can nest or enclose sequences (put sequences inside sequences) with brackets [], like this:
// note("e5 b4 c5 d5 c5 b4")
// note("e5 [b4 c5] d5 c5 b4")
// note("e5 [b4 c5] d5 [c5 b4]")
// note("e5 [b4 c5] d5 [c5 b4 d5 e5]")
// note("e5 [b4 c5] d5 [c5 b4 [d5 e5]]")

// ////// 6 - Rests
// ////// The ”~” represents a rest, and will create silence between other events:
// note("[b4 [~ c5] d5 e5]")


// ////// 7 - Parallel / polyphony
// ////// Using commas, we can play chords.
// note("[g3,b3,e4]")
// note("<[g3,b3,e4] [a3,c3,e4] [b3,d3,f#4] [b3,e4,g4]>*2")

// ////// 8 - Elongation
// ////// With the ”@” symbol, we can specify temporal “weight” of a sequence child:
// note("<[g3,b3,e4]@2 [a3,c3,e4] [b3,d3,f#4]>*2")

// ////// 9 - Replication
// ////// Using ”!” we can repeat without speeding up:
// note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>*2")

// ////// 10 - Randomness
// ////// Events with a ”?” placed after them will have a 50% chance of being removed from the pattern:
// //////// Events separated by a ”|” will be chosen from at random:
// note("[g3,b3,e4]*8?")
// note("[g3,b3,e4] | [a3,c3,e4] | [b3,d3,f#4]")

// ////// 11 - Euclidian rhythms
// ////// Using round brackets after an event, we can create rhythmical sub-divisions based on three parameters: beats, segments and offset. This algorithm can be found in many different types of music software, and is often referred to as a Euclidean rhythm sequencer, after computer scientist Godfriend Toussaint. Why is it interesting? Well, consider the following simple example:
// ////// This makes it easy to write patterns with interesting rhythmic structures and variations that still sound familiar:
// s("bd(3,8)") // s("bd ~ ~ bd ~ ~ bd ~")
// note("e5(2,8) b4(3,8) d5(2,8) c5(3,8)").slow(2)


// ////// 12 - Offsets
// ////// offset: the third (optional) parameter controls the starting position for distributing the beats. We need a secondary rhythm to hear the difference:
// s("bd(3,8,0), hh cp")
// s("bd(3,8,3), hh cp")
// s("bd(3,8,5), hh cp")