// @title cycle counter example @by switch angel
const sc = "D3:minor:pentatonic"
$: n("c")
  .scale(sc)
  .add(note(time.seg(1)))
  .sound("piano")
  ._punchcard({labels: true, hideInactive: true,vertical: true, fillActive: 1})
// $: n(irand(15).seg('16').ribbon(1,4)).scale(sc)
//   .delay(.7).hpf(slider(564, 0000, 4000))


