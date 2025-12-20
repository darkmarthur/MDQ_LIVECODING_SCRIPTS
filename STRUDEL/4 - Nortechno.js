// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @title NORTECHNO   ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @by Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz

/////////// UTILS CODE ///////////

/////////// STRUDEL CODE ///////////
///////////// STRUDEL — BASE NORTEÑA (compat) /////////////
setcpm(120 / 4)
const KEY = 'D'
const MODE = ':Mixolydian'



// ---------- GROOVE ----------
BOMBO: s("bd ~ bd ~")
  .bank("tr505")
  .gain(0.95)
  .lpf(1500).hpf(40)
  .fast(2)


TAROLA: s("~ [sd, rim] ~ [sd, rim]")
  .bank("tr909")
  .gain(0.9)
  .room(0.2)
  .hpf(800)
  .fast(2)

TAROLAZO: s("~ [rim rim] ~ [rim rim]")
  .bank("tr909")
  .gain(0.2)
  .room(0.2)
  .hpf(800)
  .fast(2)

_PALMAS: s("~ cp ~ cp")
  .bank("tr909")
  .gain(0.9)
  .room(1)
  .hpf(800)
  .fast(2)

CRASH: s("cr") // crash cada 4 compases
  .bank("tr909")
  .slow(32)
  .gain(0.2)
  .room(2)

// ---------- OOM-PAH (TUBA + BAJO) ----------
_TUBA: n("<0 4> <0 <4 5>>")       // I–V por negras en 2/4
  .scale(KEY + 3 + MODE)
  .sound("gm_tuba")
  .gain(0.95)

BAJO: 
  n("7 ~ 4 ~ 6 3 7 10 8 ~ 5 ~ 7 3 4 5").slow(2)
  // n("7 4 7 4 7 4 [1 2 3] [4 5]")
  .sound("gm_slap_bass_2")
  .scale(KEY + 1 + MODE)
  .transpose("[0]")
  .sound("[gm_acoustic_bass, gm_electric_bass_pick]")
  .gain(1.2)
  // .gain(.1)

// ---------- GUITARRA (rasgueo básico) ----------
_GUITARRA: cat([
    n("[0,2,4]").slow(2),   // I
    n("[4,6,8]").slow(2),   // V
    n("[3,5,7]").slow(2),   // IV
    n("[4,6,8]").slow(2)    // V
  ])
  .scale(KEY + MODE)
  .off(5, x => x.arp("0 0 1 3").add(note(12)).ply("<1 2 [1 3]>"))
  .sound("[gm_acoustic_guitar_steel, gm_acoustic_guitar_nylon]")
  .gain(1.3)
  .room(0.3)

// ---------- ACORDEÓN — Sección A (motivo principal) ----------
_ACORDEON_A: 
  n(irand(16).seg(16))
  .scale(KEY + 2 + MODE)
  .sound("gm_accordion")
  // .legato(0.9)
  .ribbon(8, 1)
  .room(0.4)
  .gain(0.9)

// ---------- ACORDEÓN — Sección B (subida/respuesta) ----------
_ACORDEON_B: cat([
    n("[0,2,4]").slow(2),   // I
    n("~").slow(2),   // V
    n("~").slow(2),   // IV
    n("~").slow(2)    // V
  ])
  .scale(KEY + MODE)
  // .off(0, x => x.arp("0 1 2 1 0").fast(2))
  .sound("[<gm_accordion none>]")
  .gain(0.3)
  .room(0.3)

_VIENTOS: 
// n(irand(16).seg(16))
  note(`<[0,4] [0,4]>`.add(irand(8).seg(8))
    .scale(KEY + '3' + MODE).slow(2)
  )
  .sound("gm_brass_section")
  .gain(1)
  .room(0.5)
  // .transpose(2) // terceras sobre el acordeón



// // ///////////   P5 CODE   ///////////
// const { mountP5, hydraGate } = await import(
//   'https://cdn.jsdelivr.net/gh/darkmarthur/LiveCoding@v1.1.1/utils/strudel-p5.mjs'
// );

// const api = await mountP5({
//   webgl: true,
  

//   setup(p, { g, size }) {
//     const { w, h } = size;
//   },
  
//   draw(p, { g, size, pointer }) {
//     const { w, h } = size;
   
//   }
// });


// // /////////// HYDRA CODE ///////////
// await initHydra();
// await hydraGate({ sourceIndex: 0 }); //  REQUIRED TO VISUALIZE P5 OVER HYDRA
// window.P5VIS = { on: 1 }; //  OPTIONAL TO MIX HYDRA/P5

// //  HYDRA DEMO ANIMATION
// const oscLayer = voronoi(3, 0.15)
//   .modulateScale(osc(8).rotate(Math.sin(time)), 0.5)
//   .thresh(0.8)
//   .modulateRotate(osc(7), 0.4)
//   .thresh(0.7)
//   .diff(src(o0).scale(1.8))
//   .modulateScale(osc(2).modulateRotate(o0, 0.74))
//   // .diff(
//   //   src(o0)
//   //     .rotate([-0.012, 0.01, -0.002, 0])
//   //     .scrollY(0, [-1 / 199800, 0].fast(0.7))
//   // )
//   // .brightness([-0.02, -0.17].smooth().fast(0.5))
//   .color(50, 10, 10)


// //  GLOBAL VIDEO MIXER
// src(s0)
//   // .mult(oscLayer, 0.1)
//   .blend(solid(0, 0, 0), () => 1 - window.P5VIS.on)
//   .contrast(1.1)
//   // .brightness(0.02)
//   .out(o0);
