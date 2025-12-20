await initHydra()
let pattern = "3 4 5 [6 7]*2"
shape(H(pattern)).out(o0)
osc(100, 0.01, H(pattern))
	.rotate(0, 0.1)
	.mult(osc(10, 0.1).modulate(osc(10).rotate(0, -0.1), 1))
	.color(2.83,0.91,0.39)
  .out(o0)


n(pattern).scale("A:minor").piano().room(1) 



// p5 = new P5()
// p5.hide()

// s0.init({ src: p5.canvas })

// p5.draw = function () {
//     p5.background(0, 5)
//     p5.noStroke()
//     p5.translate(600, 250)
//     p5.rotate(p5.millis() * 0.001)
//     p5.rect(0, 0, 200, 200)
// }

// src(s0).mult(osc(10, 0.1, 0.1)).out(o0)

// // osc(10, 0.1, 2).out(o0)




// other pattern 
// setcps(1)
// /*
//   Song / Code Structure
  
//   Using .p1 or .d1 for track 1, .p2 / .d2 for track 2... so on 
// */

// s("bd sd").p1

// s("hh hh hh hh").p2

// const test = 'c3 minor';
// "0 1 2 <3 4>"
//   .scale(test).note().s("square")
//   .lpf(2000)
//   .p3

// "<0 2 -2 -1>".struct("1(3,8)")
//   .scale('c2 minor').note().s("square")
//   .p4

// /* a simple mixer for tracks */

// // "~".p1 // kicks
// // "~".p2 // hhs
// // "~".p3 // notes
// "~".p4 // bassline


// // @version 1.0