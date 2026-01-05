// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧ @title STRUDEL + HYDRA + P5 TEXT (CENTER + HYDRA FX) ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø, ✧ ✦ ✧     @by Mario D. Quiroz ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

/////////// STRUDEL ///////////
let PTN_MUSIC = "3 4 5 [6 7]*2"
MUSIC: n(PTN_MUSIC).scale('c3:minor').fast(1).sound('piano').lpf(1000)

/////////// P5 (bridge) ///////////
const { mountP5 } = await import(
  'https://cdn.jsdelivr.net/gh/darkmarthur/LiveCoding@v1.1.1/utils/strudel-p5.mjs'
)

const api = await mountP5({
  webgl: true,

  setup(p, { g }) {
    g.noStroke()
    g.rectMode(g.CORNER)

    // HUD will be resized on first draw when we know w/h
    p.HUD = null
  },

  draw(p, { g, size }) {
    const w = size.w
    const h = size.h
    if (!w || !h) return

    // Ensure HUD matches screen
    if (!p.HUD || p.HUD.width !== w || p.HUD.height !== h) {
      p.HUD = p.createGraphics(w, h) // P2D
      p.HUD.pixelDensity(1)
      p.HUD.textFont('monospace')
      p.HUD.textAlign(p.CENTER, p.CENTER)
    }

    // Transparent base (so Hydra sees only what we draw)
    g.clear()

    // Draw BIG centered text (no background)
    const hud = p.HUD
    hud.clear()
    hud.noStroke()
    hud.fill(255, 255)

    const S = Math.max(32, Math.min(w, h) * 0.16)
    hud.textSize(S)

    // Any centered text you want:
    hud.text('THE IS THE WEATHER', w * 0.5, h * 0.5)

    // Composite HUD -> g (THIS is what Hydra samples)
    g.push()
    g.resetMatrix()
    g.translate(-w / 2, -h / 2, 0)
    g.imageMode(g.CORNER)
    g.image(hud, 0, 0)
    g.pop()
  },
})

/////////// HYDRA ///////////
await initHydra()

// Hydra samples the correct canvas (api.g.canvas)
s0.init({ src: api.canvas })

const oscLayer = osc(12, 0.03, 0.3).color(H(PTN_MUSIC))

// Put the text INSIDE the pipeline so Hydra transforms it
src(s0)
  // .modulate(oscLayer, 0.25)
  // .kaleid(2)
  // .rotate(() => time * 0.1)
  .out(o0)
