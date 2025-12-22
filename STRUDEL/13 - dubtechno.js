/////////// UTILS CODE ///////////

// 1) Living dub chord: short dry stab, long wet space, and *always-moving* FX
register('dubChord', (lpfMin, lpfMax, pat) => {
  return pat
    .s('supersaw')
    .detune(irand(3))
    .unison(rand.range(0,2).slow(6))
    // tone never repeats exactly
    .lpf(perlin.range(lpfMin, lpfMax).segment(96).slow(6))
    .lpq(perlin.range(12, 22).segment(96).slow(7))
    .lpenv(perlin.range(1.1, 2.2).segment(96).slow(8))
    .dist(perlin.range(0.5, 1.2).segment(96).slow(10))
    // space as instrument (continuous + random modifiers)
    .room(perlin.range(0.6, 3.2).segment(96).slow(9))
    .delay(perlin.range(0.05, 0.33).segment(96).slow(11))
    // occasional dub throws (random, cycle-based)
    .someCyclesBy(0.35, x => x.room(rand.range(2.4, 4.0)).delay(rand.range(0.18, 0.42)))
    .orbit(2)
})

// 2) Dub tick / rim: sparse events that “speak” through randomized space
register('dubTick', (pat) => {
  return pat
    .lpf(perlin.range(300, 4200).segment(64).slow(10))
    .dist(perlin.range(0.2, 0.9).segment(64).slow(12))
    .room(perlin.range(0.2, 2.2).segment(64).slow(8))
    .delay(perlin.range(0.06, 0.28).segment(64).slow(9))
    .sometimesBy(0.25, x => x.delay(rand.range(0.12, 0.44)).room(rand.range(1.6, 3.2)))
    .orbit(1)
})

// 3) Noise bed: breathing air + motion, never static
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
const KEY  = 'D'
const MODE = ':Dorian'

// =========================
// PERCUSSIONS (KICK FIRST)
// =========================

kick: s("bd bd bd bd")
  .bank("tr909")
  .lpf(1400)
  .dist(1.6)
  .duck(2)

hihat: s("~ hh ~ hh ~ hh ~ hh")
  .bank("tr808")
  // subtle humanization + occasional thinning (random removal)
  .degradeBy(perlin.range(0.02, 0.18).slow(10))
  .lpf(perlin.range(3500, 9000).segment(64).slow(12))
  .room(perlin.range(0.15, 0.55).slow(14))
  .delay(perlin.range(0.00, 0.12).slow(16))
  .dist(0.8)

snare: s("~ cp ~ cp")
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


// ======
// BASS
// ======

bass: n("{0 ~ 0 ~ 0 ~ [0 3] ~}%8")
  .scale(KEY + MODE)
  .sound("z_sine")
  // tiny drifting tone so it stays alive but still “sub-first”
  .lpf(perlin.range(140, 320).segment(96).slow(10))
  .dist(perlin.range(0.4, 0.9).segment(96).slow(12))
  .duck(2)


// ==================
// HARMONY (THE ENGINE)
// ==================

chord: cat([
    n("[0, 3, 7]".add("<0 0 0 2 0 4 0 7>".slow(6))),
    n("[0, 4, 7]".add("<0 0 0 0 2 0 5 0>".slow(8))).slow(2)
  ])
  .scale(KEY + MODE)
  // event density is also slightly random (micro-variation without “busy”)
  .degradeBy(perlin.range(0.00, 0.22).slow(12))
  // dub chord organism (includes randomized reverb + delay + throws)
  .gain(0.3)
  .dubChord(180, 1400)
  // extra echo ghosts (offset copies) with randomized wetness
  .off(1/16, x => x.gain(perlin.range(0.18, 0.45).slow(10)).delay(perlin.range(0.10, 0.38).slow(11)).room(perlin.range(1.8, 3.8).slow(9)))
  .off(3/16, x => x.gain(perlin.range(0.10, 0.30).slow(12)).delay(perlin.range(0.06, 0.30).slow(13)).room(perlin.range(1.2, 3.2).slow(14)))


// ===========================
// TEXTURE (CRACKLE + NOISE BED)
// ===========================

crackle: s("crackle*4")
  // random thinning so it “breathes”
  .degradeBy(perlin.range(0.15, 0.55).slow(8))
  .noiseBed()
  .fast(1)

noise: s("pink brown".slow(12))
  .noiseBed()

// ===========================
// ATMOSPHERE (THE BACKCLOTH)
// ===========================

atmos: n("{0 ~ ~ ~ ~ ~ ~ ~}%8")
  .scale(KEY + MODE)
  .sound("gm_fx_atmosphere")
  .lpf(perlin.range(600, 2200).segment(96).slow(16))
  .room(perlin.range(1.6, 4.2).segment(96).slow(18))
  .delay(perlin.range(0.04, 0.28).segment(96).slow(20))
  // rare “wide-open room” moments (breakdown glue)
  .rarely(x => x.room(rand.range(3.2, 5.0)).delay(rand.range(0.18, 0.40)))
  .orbit(3)


// =====
// LEAD (optional, keep muted by underscore)
// =====

lead: n("{~ ~ 7 ~ ~ ~ [9 10] ~}%16")
  .scale(KEY + 2 + MODE)
  .sound("gm_koto")
  .lpf(perlin.range(900, 3200).slow(14))
  .room(perlin.range(0.8, 2.8).slow(12))
  .delay(perlin.range(0.05, 0.30).slow(13))
  .sometimesBy(0.18, x => x.delay(rand.range(0.18, 0.42)).room(rand.range(1.8, 3.6)))
  .orbit(2)