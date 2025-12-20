// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// 
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧    Follow Me  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧ Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
//
// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz


// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧ STRUDEL  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸

const KEY = 'c';
const MODE = ' minor';

setcps(140/60/4)

_KICK: s("sbd!4")
  .duck("2:3:4").duckattack(0.2).duckdepth(0.8)

_HIHAT: s("~ hh ~ hh ~ hh ~ hh")
  .velocity("[0 0.2 0.3 0.4]*4")
  .bank('RolandTR909')

ACID: n(irand(10).sub(7).seg(16))
  .rib(46, 1)
  .sound("sawtooth")
  .lpf(200)
  .lpenv(slider(3.736,0,8))
  .lpq(12)
  .scale(KEY + 1 +MODE)
  .distort("2.2:.3")
  .orbit("2")

$: s("pulse").orbit(4).seg(16).dec(0.1).fm(time).fmh(time)

_BASS: 
  n("{~ 0 ~ 0 ~ <0 5> ~ <3 0>}%8")
    .scale(KEY + '2' + MODE)
    .sound("sawtooth")
    .attack(.1)
    .decay(.5)
    .release(0.1)
    .lpf(100, 4)
    // .hpf(50)
    // .lpenv(1).lpattack(0.3)
    .distort(3.0)

let PTN_LD = "3 4 5 [6 7]*2"
_LEAD: n(PTN_LD)
  .scale(KEY + '3' + MODE).fast(2)
  .transpose(0)
  // ._pianoroll({ fold: 1, cycles: 8 })
  .sound("gm_electric_bass_finger")
  .lpf(1000)
  .release(perlin.range(0.2,1))

