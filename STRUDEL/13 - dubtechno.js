// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @title DUB TECHNO   ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @by Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz

/////////// UTILS CODE ///////////
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

register('dubTick', (pat) => {
  return pat
    .lpf(perlin.range(300, 4200).segment(64).slow(10))
    .dist(perlin.range(0.2, 0.9).segment(64).slow(12))
    .room(perlin.range(0.2, 2.2).segment(64).slow(8))
    .delay(perlin.range(0.06, 0.28).segment(64).slow(9))
    .sometimesBy(0.25, x => x.delay(rand.range(0.12, 0.44)).room(rand.range(1.6, 3.2)))
    .orbit(1)
})

register('noiseBed', (pat) => {
  return pat
    .hpf(perlin.range(120, 700).segment(96).slow(12))
    .lpf(perlin.range(900, 6500).segment(96).slow(14))
    .dist(perlin.range(0.05, 0.55).segment(96).slow(16))
    .room(perlin.range(0.8, 3.6).segment(96).slow(18))
    .delay(perlin.range(0.02, 0.22).segment(96).slow(15))
    .orbit(3)
})


/////////// STRUDEL CODE ///////////

setcpm(124 / 4);
const KEY  = 'C'
const MODE = ':Minor'

crackle: s("crackle*4")
  // random thinning so it “breathes”
  .degradeBy(perlin.range(0.15, 0.55).slow(8))
  .noiseBed()
  .fast(1)

noise: s("brown".slow(12))
  // .noiseBed()

const sidechain = false
kick: s("bd bd bd bd")
  .bank("tr505")
  .lpf(1000)
  .hpf(100)
  .dist(1)

sub: n("0 0 0 0")
  .scale(KEY + 1 + MODE)
  .sound("sbd")
  .decay(1)
  .duck(sidechain ? 1 : 3)
  // .duckdepth(1)
  // .duckattack(1)

const OPENHAT = false;
hihat: s(OPENHAT ? "~ oh ~ oh ~ oh ~ oh" : "~ hh ~ hh ~ hh ~ hh")
  .room(OPENHAT ? 2 : 0.4)
  .bank("tr808")
    // subtle humanization + occasional thinning (random removal)
  .degradeBy(perlin.range(0.02, 0.18).slow(10))
  .lpf(perlin.range(3500, 9000).segment(64).slow(12))
  .room(perlin.range(0.15, 0.55).slow(14))
  .delay(perlin.range(0.00, 0.12).slow(16))
  .dist(0.8)

const ISCLAP = true;
snare: s(ISCLAP ? "~ cp ~ cp" : "~ sd ~ sd")
  .bank("tr909")
  .lpf(perlin.range(1200, 3500).slow(12))
  .room(perlin.range(0.3, 1.0).slow(10))
  .delay(perlin.range(0.02, 0.20).slow(14))
  // dub throw sometimes (never identical)
  .sometimesBy(0.22, x => x.room(rand.range(1.6, 3.2)).delay(rand.range(0.15, 0.35)))
  .dist(0.7)

// Rim/tick = dub event generator
rim: s("{~ rim ~ ~ ~ rim ~ ~}%8")
  .bank("tr909")
  .dubTick()
  .gain(0.2)

_bass: n("{0 ~ 0 ~ 0 ~ [0 3] ~}%8")
  .scale(KEY + MODE)
  .sound("z_sine")
  // tiny drifting tone so it stays alive but still “sub-first”
  .lpf(perlin.range(140, 320).segment(96).slow(10))
  .dist(perlin.range(0.4, 0.9).segment(96).slow(12))
  .duck(2)

// acid_bass: cat([
//     n("0 1 0 3 5 0 7 9"),
//     n("0 1 0 3 5 11 13 10")
//   ])
//   .scale(KEY + 1 + MODE)
//   .acid(100, 500)
//   .fast(1)
//   .orbit(2)
//   .gain(0.5)

stab: n("{0 ~ ~ ~ ~ ~ ~ ~}%8")
  .scale(KEY + 3 +  MODE)
  .sound("gm_fx_atmosphere")
  .lpf(perlin.range(600, 2200).segment(96).slow(16))
  .room(perlin.range(1.6, 4.2).segment(96).slow(18))
  .delay(perlin.range(0.04, 0.28).segment(96).slow(20))
  // rare “wide-open room” moments (breakdown glue)
  .rarely(x => x.room(rand.range(3.2, 5.0)).delay(rand.range(0.18, 0.40)))
  .orbit(3)

arp: cat(
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

chord: 
cat(
    n("[0, 3, 5]".add("<0 0 4 7>")),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("[0, 3, 5]".add("<0 0 4 7>")),
    n("~ ~ ~ ~"),
    n("~ ~ ~ ~"),
    n("[0, 3, 5]".add("<0 0 4 7>")),
  )
  .scale(KEY + 3 + MODE)
  .sound("piano")
  .off(0, (x) => x
    .arp("1 3 5")
    .add(note(24)))
  .room(2)
  .juxBy(1, rev)
  .gain(.5)
  .degradeBy(perlin.range(0.00, 0.22).slow(12))
  .off(1/16, x => x.gain(perlin.range(0.18, 0.45).slow(10)).delay(perlin.range(0.10, 0.38).slow(11)).room(perlin.range(1.8, 3.8).slow(9)))
  .room(perlin.range(0.6, 3.2).segment(96).slow(9))
  .delay(perlin.range(0.05, 0.33).segment(96).slow(11))

// _lead: n("{~ ~ 7 ~ ~ ~ [9 10] ~}%16")
//   .scale(KEY + 2 + MODE)
//   .sound("gm_koto")
//   .lpf(perlin.range(900, 3200).slow(14))
//   .room(perlin.range(0.8, 2.8).slow(12))
//   .delay(perlin.range(0.05, 0.30).slow(13))
//   .sometimesBy(0.18, x => x.delay(rand.range(0.18, 0.42)).room(rand.range(1.8, 3.6)))
//   .orbit(2)


// // ///////////   P5 CODE   ///////////
await initHydra();

// HYDRA PLAY / UPDATE
// CTRL + SHIFT + ENTER
// HYDRA STOP
// CTRL + .
gradient(1)
  .mask(noise(2, 1).thresh(0.3))
  .add(gradient(0.5).mask(noise(20, 0.1).thresh(0.3)))
  .diff(src(o0).modulateScrollX(osc(1, 0.1)).scale(0.7))
  .modulateScale(noise(() => time / .0000001, 0.1))
  .color(23,)
  .scrollX(7, 0.77)
  .rotate(1, 0.2)
  .scrollY(0, 0.01)

  // .out(o0);
