// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @title DUB TECHNO   ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @by Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz


/////////// STRUDEL CODE ///////////
const PORT = 'IAC Driver Bus 1';
midiport(PORT);

setcpm(124 / 4);
const KEY  = 'C'
const MODE = ':Minor'

// $: note("c3").control([10, slider(48, 0, 127, 1)]).midi()
fx_fade: ccn(70).ccv(slider(0, 0, 1, 0.1)).midi(PORT, { isController: true, midichannel: 1 });
fx_stutter: ccn(71).ccv(slider(0, 0, 1, 0.1)).midi(PORT, { isController: true, midichannel: 1 });
fx_riser: ccn(72).ccv(slider(0.5, 0, 0.5, 0.1)).midi(PORT, { isController: true, midichannel: 1 });
fx_release: ccn(73).ccv(0).midi(PORT, { isController: true, midichannel: 1 });

crackle: s("crackle*4")
  // random thinning so it “breathes”
  .degradeBy(perlin.range(0.15, 0.55).slow(8))
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
  .sometimesBy(0.22, x => x.room(rand.range(1.6, 3.2)).delay(rand.range(0.15, 0.35)))
  .dist(0.7)

bass: cat([
    n("<0 2 -1> ~ ~[-1 0]"),
    n("{ ~ 0 ~ 0 ~ 0 ~ [0 3]}%2"),
    n("{ ~ 0 ~ 0 ~ 0 ~ [0 3]}%2"),
    n("{ ~ 0 ~ 0 ~ 0 ~ [0 3]}%2"),
  ])
  .scale(KEY + 2 + MODE)
  .sound("[supersaw, gm_electric_bass_finger]")
  .lpf(800)
  .lpf(perlin.range(140, 320).segment(96).slow(10))
  .dist(perlin.range(0.4, 0.9).segment(96).slow(12))
  .duck(2)

stab: n("{0 ~ ~ ~ ~ ~ ~ ~}%8")
  .scale(KEY + 3 +  MODE)
  .sound("gm_fx_atmosphere")
  .lpf(perlin.range(600, 2200).segment(96).slow(16))
  .room(perlin.range(1.6, 4.2).segment(96).slow(18))
  .delay(perlin.range(0.04, 0.28).segment(96).slow(20))
  // rare “wide-open room” moments (breakdown glue)
  .rarely(x => x.room(rand.range(3.2, 5.0)).delay(rand.range(0.18, 0.40)))
  // .acid(100, 500)
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

_chord: 
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

lead: 
cat(
    n("<[0, 1, 3] [0, 3, 5] [0, 4, 9]> ~ ~ ~".add("<1 3 2 1>"))
  )
  .scale(KEY + 4 + MODE)
  .sound("[pulse, supersaw, sin]")
  .decay(0.2)
  .sustain(0.2)
  .room(1)
  .delay(1)
  .delayfeedback(1)
  .delayspeed(.5)
  .slow(2)

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
