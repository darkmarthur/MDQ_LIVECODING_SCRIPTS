// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @title P5 BLANK   ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @by Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz

/////////// UTILS CODE ///////////
samples('github:tidalcycles/dirt-samples')

register('acid', (lpfMin, lpfMax, pat) => {
  return pat
  .s('supersaw')
  .detune(irand(2))
  .unison(rand.range(0,3).slow(3))
  .lpf(sine.range(lpfMin, lpfMax).segment(50).slow(3))
  .lpenv(2)
  .dist(1)
  .lpq(15)
})

/////////// STRUDEL CODE ///////////
setcpm(120 / 4);
const KEY = 'A'
const MODE = ':Phrygian'

const sidechain = true
_kick: s("bd bd bd bd")
  .bank("tr505")
  .lpf(1000)
  .hpf(100)
  .dist(1)

_sub: n("0 0 0 0")
  .scale(KEY + 1 + MODE)
  .sound("sbd")
  .decay(1)
  .duck(sidechain ? 2 : 1)
  // .duckdepth(1)
  // .duckattack(1)
  

const OPENHAT = false;
_hihat: s(OPENHAT ? "~ oh ~ oh ~ oh ~ oh" : "~ hh ~ hh ~ hh ~ hh")
  .room(OPENHAT ? 2 : 0.4)
  .bank("tr808")
  .dist(1)

const ISCLAP = true;
_snare:  s(ISCLAP ? "~ cp ~ cp" : "~ sd ~ sd")
  .bank("tr909")

_ACID_BASS: cat([
    n("0 1 0 3 5 0 7 9"),
    n("0 1 0 3 5 11 13 10")
  ])
  .scale(KEY + 2 + MODE)
  .acid(100, 500)
  .fast(1)
  .orbit(2)
  .gain(0.5)

chord: n("[0, 3, 5]".add("<0 0 4 7>"))
  .scale(KEY + 2 + MODE)
  .sound("piano")
  .off(0, (x) => x
    .arp("1 3 5")
    .add(note(24)))
  .room(2)
  .juxBy(1, rev)

_arp: cat(
    n("<[0, 1, 3] [3, 5, 7]>").arp("0 1 3 5 7 9"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
  )
  .scale(KEY + 4 + MODE)
  // .sound("gm_epiano1")
  .sound("sawtooth:<4 2>")
  .fm("<0 1 2 8>")
  .vib(4)
  .room(2)
  .fast(2)
  .tremolosync(4)
  .tremolodepth(0.5)
  .delay(1.5)
  // .delayfeedback("<.25 .5 .75 1>")

_lead: n("{1 1 3 5 ~ ~ [4 6] 5}%16")
  .scale(KEY + 3 + MODE)
  .transpose("0 2".slow(6))
  .sound("gm_koto")
  .room(2)

samples('github:darkmarthur/LiveCoding/main/utils/samples')
_JPVOX: s("<japanese:0 japanese:1 japanese:2 japanese:3>")
  .room(2)
  .phaser(2)



// ///////////   P5 CODE   ///////////
const { mountP5, hydraGate } = await import(
  'https://cdn.jsdelivr.net/gh/darkmarthur/LiveCoding@v1.1.1/utils/strudel-p5.mjs'
);

const api = await mountP5({
  webgl: true,
  

  setup(p, { g, size }) {
    const { w, h } = size;
  },
  
  draw(p, { g, size, pointer }) {
    const { w, h } = size;
   
  }
});


// /////////// HYDRA CODE ///////////
await initHydra();
await hydraGate({ sourceIndex: 0 }); //  REQUIRED TO VISUALIZE P5 OVER HYDRA
window.P5VIS = { on: 1 }; //  OPTIONAL TO MIX HYDRA/P5

//  HYDRA DEMO ANIMATION
const oscLayer = voronoi(3, 0.15)
  .modulateScale(osc(8).rotate(Math.sin(time)), 0.5)
  .thresh(0.8)
  .modulateRotate(osc(7), 0.4)
  .thresh(0.7)
  .diff(src(o0).scale(1.8))
  .modulateScale(osc(2).modulateRotate(o0, 0.74))
  // .diff(
  //   src(o0)
  //     .rotate([-0.012, 0.01, -0.002, 0])
  //     .scrollY(0, [-1 / 199800, 0].fast(0.7))
  // )
  // .brightness([-0.02, -0.17].smooth().fast(0.5))
  .color(50, 10, 10)


//  GLOBAL VIDEO MIXER
src(s0)
  // .mult(oscLayer, 0.1)
  .blend(solid(0, 0, 0), () => 1 - window.P5VIS.on)
  .contrast(1.1)
  // .brightness(0.02)
  .out(o0);
