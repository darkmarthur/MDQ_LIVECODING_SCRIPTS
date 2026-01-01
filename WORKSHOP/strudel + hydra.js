
//// ----------------------------------------------------------------
// FULLSCREEN
// CTRL + CMD + F
// CMD + SHIFT + F
// STRUDEL PLAY / UPDATE
// CTRL + ENTER
// STRUDEL STOP
// CTRL + .
//// ----------------------------------------------------------------

//// ----------------------------------------------------------------
// STRUDEL CODE
//// ----------------------------------------------------------------

// bass
$: n(irand(8).seg(16))
  .sound("saw")
  .lpf(800)
  //// UNCOMMENT TO SEE PIANO NOTES
  .pianoroll()


// kick
$: s("bd ~ bd ~")
  .bank("tr505")
  .gain(0.95)
  .lpf(1500).hpf(40)
  .fast(2)
  


//// ----------------------------------------------------------------
//// HYDRA CODE
//// ----------------------------------------------------------------

await initHydra({detectAudio: true, feedStrudel: true})
let PTN_BEAT = "10 20 50 100 150 255"


src(s0)
//// UNCOMMENT TO SEE AUDIO REACTIVITY 
// .scrollY(
//   ()=> a.fft[0]*.25
// )

//// UNCOMMENT TO SEE PATTERN REACTIVITY
// .add(
//   osc(H(PTN_BEAT), 0.1)
//     .diff(o0)
//     .modulateScrollY(osc(2).modulate(osc().rotate(), 0.11))
//     .color(1, 1.014, 1)
// )
.out();
