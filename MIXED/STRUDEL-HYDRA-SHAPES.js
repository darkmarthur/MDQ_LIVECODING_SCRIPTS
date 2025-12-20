await initHydra()
setcpm(120)

let i = 0.0034; // speed (advancing when bd is playing)
let l = .05; // turning left speed (when hh is playing)
let r = 0.1; // Turning right speed (when oh is playing)
let p = "bd hh <bd bd <[hh hh bd hh]/2 oh>>".fast(1.1)
shape(21,.001)
  .color(
      [0,1].fast(.2).smooth(),[.5,0].smooth().fast(.5),[.20,.5].fast(.3)
    )
  .add(src(o0),.9991)
  .scale(1)
  .scroll( 0,()=> -i * (H(p)()==='bd')
         )
  .rotate(()=>
    l * (H(p)()==='hh') +
    -r * (H(p)()==='oh')  
         )
  .out(o0)

render(o0)

s(p)


// @version 1.0