// 1
gradient(0.3)
  .mask(noise(30, 0.3).thresh(0.3))

  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.3))
  .modulateScale(noise(() => fft() / 2, 0.1))

  .rotate(1, 0.1)

  .out(o0);

// 2
gradient(0.1)
  .mask(noise(16, 0.3).thresh(0.3))

  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.7))
  .modulateScale(noise(() => fft() / 4, 0.1))
  .scrollX(7, 0.77)
  .rotate(1, 0.2)
  .scrollY(0, 0.01)

  .out(o0);

// 3
gradient(0.1)
  .mask(noise(16, 0.3).thresh(0.3))

  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.7))
  .modulateScale(noise(() => fft() / 4, 0.1))
  .scrollX(7, 0.77)
  .rotate(1, 0.2)
  .scrollY(0, 0.01)

  .out(o0);

// 4
gradient(0.1)
  .mask(noise(16, 0.3).thresh(0.3))

  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.7))
  .modulateScale(noise(() => fft() / 4, 0.1))
  .scrollX(7, 0.77)
  .rotate(1, 0.2)
  .scrollY(0, 0.01)

  .out(o0);

gradient(0.1)
  .mask(noise(16, 0.3).thresh(0.3))

  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.7))
  .modulateScale(noise(() => fft() / 4, 0.1))
  .scrollX(7, 0.77)
  .rotate(1, 0.2)
  .scrollY(0, 0.01)

  .out(o0);

//   $: n("<[1 3 4 5] 1 [1 4 5 6] [1 5 3 6]>").s("piano").lpf(3000).gain(0.5)
// .scale("c4:ritusen") // ritusen scale sounds interesting

// $: s("[bd? bd] cp [hh? hh] cp,[- rim - rim -@2]*2").bank("casiorz1").lpf(sine.range(1000,3000).slow(33))
