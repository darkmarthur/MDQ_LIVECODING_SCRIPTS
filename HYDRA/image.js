s0.initImage("https://spag.cc/moon")

src(s0)
  .mask(shape(99,1,0).scale(1, width/height))
.brightness
.out(o0)


// LOL


s0.initImage("https://spag.cc/moon")
s1.initImage("https://spag.cc/sun")
r=1/4
moon=(s, c=0)=> s
  .mask(shape(40,1,0))
  .scale(.1,height/width)
  .scroll(()=>Math.cos(time*r+c)/2.5,()=>Math.sin(time*r+c)/2.5)

solid(0.1,0.1,0.1).blend(solid(.1,.3,.6), ()=>Math.sin(time*r+Math.PI))
.mult(
moon(src(s0)).add(moon(src(s1).saturate(1.4),Math.PI)).brightness(-.9)
)
.out(o0)

s0.initImage("https://spag.cc/moon")
s1.initImage("https://spag.cc/sun")
r=1/4
moon=(s, c=0)=> s
  .mask(shape(40,1,0))
  .scale(.1,height/width)
  .scroll(()=>Math.cos(time*r+c)/2.5,()=>Math.sin(time*r+c)/2.5)

solid(0.1,0.1,0.1).blend(solid(.1,.3,.6), ()=>Math.sin(time*r+Math.PI))
.mult(
moon(src(s0)).add(moon(src(s1).saturate(1.4),Math.PI)).brightness(-.9)
)
.out(o0)



s0.initImage("https://spag.cc/moon")

src(s0).scale(1)
  .mask(shape(99,1,0).scale(1, height/width))
.brightness(()=>-.8+fft()/4)
.mult(shape(99,.0,1).mult(osc(5,0.1).kaleid(8).scroll(.15,.1)))
.repeat(5,5)
.scale(()=>(Math.sin(time/4)+1)*4+1)
.modulateRotate(osc(10,.02,4))
.modulateScale(noise(1,.1))
.out(o0)

