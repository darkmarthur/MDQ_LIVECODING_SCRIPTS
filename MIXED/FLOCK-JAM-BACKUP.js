// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧ STRUDEL + HYDRA + P5 ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧  by Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz

// Follow me on instagram or soundcloud if this code is useful for you

// This template demonstrates how to combine
// Strudel (live-coded music), P5.js (custom graphics), and Hydra (visual effects)
// into one synchronized creative environment. Strudel generates music patterns,
// P5 renders an off-screen canvas for interactive or generative visuals,
// and Hydra samples that P5 output to apply real-time effects, blends, or post-processing.
// Use this as a starting point to build audiovisual performances, music-driven visuals,
// and interactive live-coding artworks.

/////////// STRUDEL CODE ///////////
let PTN_MUSIC = "3 4 5 [6 7]*2";
MUSIC: n(PTN_MUSIC).scale("c3:minor").fast(1).sound("piano").lpf(1000);

///////////   P5 CODE   ///////////
const { mountP5, hydraGate } = await import(
  'https://cdn.jsdelivr.net/gh/darkmarthur/LiveCoding@v1.1.1/utils/strudel-p5.mjs'
);

const api = await mountP5({
  webgl: true,
// Replace ONLY the setup() and draw() functions inside your mountP5({ ... }) call
// (keep your import + mountP5 usage exactly as you have it)

setup(p, { g, size }) {
  g.noStroke()
  g.rectMode(g.CORNER)

  // --- Flow-field state (ported from your first script)
  g.FF = {
    N: 600,
    SC: 0.002,
    ACC: 0.15,
    DAMP: 0.96,
    MOUSE: { radius: 220, strength: 1, visc: 0.1, repulseOnClick: true },
    P: [],
    pmx: 0,
    pmy: 0,
    lastW: 0,
    lastH: 0,
  }

  // init particles if size is ready
  const { w, h } = size
  if (w && h) {
    g.FF.lastW = w
    g.FF.lastH = h
    g.FF.P = Array.from({ length: g.FF.N }, () => ({
      x: p.random(-w / 2, w / 2),
      y: p.random(-h / 2, h / 2),
      vx: 0,
      vy: 0,
      r: p.random(1.5, 3.5),
    }))
    g.FF.pmx = w / 2
    g.FF.pmy = h / 2
  }
},

draw(p, { g, size, pointer }) {
  const { w, h } = size
  if (!w || !h) return

  const FF = g.FF

  // Re-init particles on resize
  if (FF.lastW !== w || FF.lastH !== h || !FF.P?.length) {
    FF.lastW = w
    FF.lastH = h
    FF.P = Array.from({ length: FF.N }, () => ({
      x: p.random(-w / 2, w / 2),
      y: p.random(-h / 2, h / 2),
      vx: 0,
      vy: 0,
      r: p.random(1.5, 3.5),
    }))
    FF.pmx = w / 2
    FF.pmy = h / 2
  }

  // subtle trail fade (fullscreen translucent quad)
  g.resetMatrix()
  g.rectMode(g.CORNER)
  g.fill(0, 18)
  g.rect(-w / 2, -h / 2, w, h)

  const t = p.millis() * 0.0002

  // pointer is already provided by mountP5
  const mx = pointer.x
  const my = pointer.y
  const inBounds = pointer.inside

  // convert to WEBGL-centered coords
  const cx = mx - w / 2
  const cy = my - h / 2

  const mvx = (mx - FF.pmx) * FF.MOUSE.visc
  const mvy = (my - FF.pmy) * FF.MOUSE.visc

  g.fill(255, 190)

  for (const a of FF.P) {
    // Perlin flow
    const ang =
      p.noise((a.x + w / 2) * FF.SC, (a.y + h / 2) * FF.SC, t) * p.TAU * 4 -
      p.PI

    a.vx = a.vx * FF.DAMP + Math.cos(ang) * FF.ACC
    a.vy = a.vy * FF.DAMP + Math.sin(ang) * FF.ACC

    // Pointer field (attract; hold to repel)
    if (inBounds) {
      const dx = cx - a.x
      const dy = cy - a.y
      const dist = Math.hypot(dx, dy) || 1e-6

      if (dist < FF.MOUSE.radius) {
        const dir = pointer.down && FF.MOUSE.repulseOnClick ? -1 : 1
        const wgt = 1 - dist / FF.MOUSE.radius
        const nx = dx / dist
        const ny = dy / dist

        a.vx += nx * FF.MOUSE.strength * wgt * dir + mvx * 0.02
        a.vy += ny * FF.MOUSE.strength * wgt * dir + mvy * 0.02
      }
    }

    // integrate
    a.x += a.vx
    a.y += a.vy

    // wrap
    if (a.x < -w / 2) a.x = w / 2
    if (a.x >  w / 2) a.x = -w / 2
    if (a.y < -h / 2) a.y = h / 2
    if (a.y >  h / 2) a.y = -h / 2

    g.circle(a.x, a.y, a.r * 2)
  }

  FF.pmx = mx
  FF.pmy = my
},

});

/////////// HYDRA CODE ///////////
await initHydra();
await hydraGate({ sourceIndex: 0 }); //  REQUIRED TO VISUALIZE P5 OVER HYDRA
window.P5VIS = { on: 1 }; //  OPTIONAL TO MIX HYDRA/P5

//  HYDRA DEMO ANIMATION
const oscLayer = osc(12, 0.03, 0.3)
  .color(H(PTN_MUSIC))

//  GLOBAL VIDEO MIXER
src(s0)
  .blend(solid(0, 0, 0), () => 1 - window.P5VIS.on)
  .blend(oscLayer, 0.5)
  .contrast(1.1)
  .brightness(0.02)
  .out(o0);
