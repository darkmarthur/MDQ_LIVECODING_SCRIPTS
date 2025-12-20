setcps(86/60/4)
let scales = "<C4:minor G4:minor F4:minor [C5:phrygian C5:minor]>"
let scalesBass = "<C4:minor G4:minor F4:minor [C4:phrygian C4:minor]>"
stack(
  stack(
  // chords
    n("[0,2,6,14,15,17]").add("<0 4 0 0 3>").mask("<1 1 0 1 1>")
    .scale(scales.slow(2))
    .transpose(-12)
    .velocity(0.5)
    .s('piano')
    //.hush()
    ,
  // melody
    n("<0 0 0 1 ~ 0 1 [0 0] ~ 1 2 ~>*8").jux(rev).scale(scales.slow(2)).mask("<0 0 1 1 1 1 0>").transpose("<12 [12 24] 12>")
    .s('piano')
    //.hush()
  ,
    n("[0|0|[0,4]|1|2|3|4|4|5|6|7|7]*16")
    .struct("<x x*2 [x x] [x x x x]>*4").jux(rev)
    .scale(scales.slow(2)).mask("<1 1 1 <1 0>>*4").mask("<1 1 1 0>")
    .s("<gm_celesta [gm_kalimba gm_vibraphone] gm_pizzicato_strings>").cut(2)
    //.hush()
  )
  .delay(0.5, 0.33, 0.5).room(0.5)
  ,
  // drums
  s(`<
      bd ~  ~  bd
      ~  ~  bd ~
      <~ ~ bd>  ~  <~ bd ~> ~ 
      ~  ~ <bd ~> <~ ~ ~ bd*2>>*16
    `)
    .velocity("<1 0.5 0.5 0.5>*16")
    .mask("<1 1 1 <1 0>>")
    .bank('RolandTR808').distort(4.0)
    //.hush()
  ,
  s("<~ ~ <~ ~ ~ ~ ~ [sd,cp]> ~ [sd,cp] <~ rim> ~ <~ ~ ~ sd>>*16")
    .mask("<1 1 1 <1 0>>")
    .bank('RolandTR909')
    .room(0.7)
    //.hush()
  ,
  // hh
  s("<hh hh hh <hh hh hh*5 hh hh hh*3>>*16")
    .velocity("[0 0.2 0.3 0.4]*4")
    .bank('RolandTR909')
    //.hush()
  ,
    // 303
  n("<0 0 0 ~ 0 <~ 1> 0/2 <0 7> ~ <0 [0 0]>>*16").scale(scalesBass.slow(2)).transpose(-24).jux(rev).mask("<1 1 1 1 <[0 1] [1 0]>>")
  .s("sawtooth").attack(0.001).release(0.001)
  .lpf(sine.range(500, 100)).lpq(cosine.range(20, 10)).lpenv(sine.range(12, 8)).lpdecay(sine.range(0.4, 0.2))
  .distort(0).gain(0.25)
  .delay(0.3, 0.33, 0.5).room(0.5)
  //.hush()
  ,
  // bass
    n("[~ <0 0 0 7 <3 4>>!3]*4").scale(scalesBass.slow(2)).transpose(-24).s('sawtooth')
  .attack(0.2).release(0.1).lpf(300, 4).hpf(50).lpenv(1).lpattack(0.3).distort(3.0)
  //.hush()
  ,
).pianoroll()

// @version 1.0