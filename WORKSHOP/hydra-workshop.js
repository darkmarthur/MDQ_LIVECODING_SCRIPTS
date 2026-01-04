// Licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// 
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧    @title HYDRA WROKSHOP  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧ @authot Mario D. Quiroz  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸
//
// https://www.instagram.com/mariodquiroz/
// https://soundcloud.com/mario-quiroz
// https://link.me/mariodquiroz


// ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸ ✧ ✦ ✧ HYDRA  ✧ ✦ ✧ ¸,ø¤º°`°º¤ø,¸¸,ø¤º°`°º¤ø,¸


//// use next function to enable hydra in strudel
//// await initHydra()

//// ----------------------------------------------------------------
//// HYDRA VIDE SYNTH DOCUMENTATION
//// https://hydra.ojack.xyz/docs/

//// HYDRA FUNCTIONS DOCUMENTATIPN
//// https://hydra.ojack.xyz/functions/
//// ----------------------------------------------------------------

//// CTRL-Enter: run a line of code
//// CTRL-Shift-Enter: run all code on screen
//// ALT-Enter: run a block
//// CTRL-Shift-H: hide or show code
//// CTRL-Shift-F: format code using Prettier
//// CTRL-Shift-S: Save screenshot and download as local file.

//// ----------------------------------------------------------------
//// 1 - TRY DIFFERENT VIDEO GENERATORS: solid, osc, noise, voronoir, shape, gradient
//// ----------------------------------------------------------------
// solid() // solid( r, g, b, a = 1 )
osc() // osc( frequency = 60, sync = 0.1, offset )
// noise() // noise( scale = 10, offset = 0.1 )
// voronoi() // voronoi( scale = 5, speed = 0.3, blending = 0.3 )
// shape() // shape( sides = 3, radius = 0.3, smoothing = 0.01 )
// gradient() // gradient( speed )

//// ----------------------------------------------------------------
//// 3 - TRY SEQUENCING PARAMETERS
//// ----------------------------------------------------------------
// osc().rotate([-1,1]) // parameter switches from -1 to 1
// osc().rotate(() => Math.sin(time * 4)) // parameter changes gradually from -1 to 1 but mult by 4

//// ----------------------------------------------------------------
//// 4 - TRY SEQUENCING PARAMETERS
//// ----------------------------------------------------------------

//// MOUSE INPUT
// gradient()
//	.hue(() => mouse.x / 3000)
//	.scale(1,1,()=>mouse.y / 1000)
//	.out()

//// AUDIO INPUT
// a.show() // monitor audio input
// a.setBins(6) // number of audio bands
// osc(10, 0, () => a.fft[0]*4) // access specific audio band, this case the first one


//// ----------------------------------------------------------------
//// 5 - GEOMETRY FUNCTIONS, try different functions and combinations
//// ----------------------------------------------------------------
// .rotate(() => time % 360) // rotate( angle = value from 0 to 3.1416, speed ) 
// .pixelate(20,20) // pixelate( pixelX = 20, pixelY = 20 )
// .repeat(3.0, 3.0, 0.0, 0.0) // repeat( repeatX = 3, repeatY = 3, offsetX, offsetY )
// .kaleid(5) // kaleid( nSides = 4 )
// .scroll(0.5,-0.3) // scroll( scrollX = 0.5, scrollY = 0.5, speedX, speedY )


//// ----------------------------------------------------------------
//// 6 - COLOR FUNCTIONS, try different functions and combinations
//// ----------------------------------------------------------------
// .color(10,0,1) // color( r = 1, g = 1, b = 1, a = 1 ) 
// .hue(() => Math.sin(time)) // hue( hue = 0.4 )
// .saturate(() => Math.sin(time) * 10)
// .posterize( [1, 5, 15, 30] , 0.5 ) // posterize( bins = 3, gamma = 0.6 )
// .shift(0.1,0.9,0.3) // shift( r = 0.5, g, b, a )
// .contrast(() => Math.sin(time) * 5) // contrast( amount = 1.6 )
// .brightness(() => Math.sin(time)) // brightness( amount = 0.4 )
// .luma(0.5,0.1) // luma( threshold = 0.5, tolerance = 0.1 )
// .thresh(0.5,0.04) // thresh( threshold = 0.5, tolerance = 0.04 )
// .colorama([0.005,0.33,0.66,1.0]) // colorama( amount = 0.005 )


//// ----------------------------------------------------------------
//// 7 - BLEND FUNCTIONS, try different functions and combinations
//// ----------------------------------------------------------------
// .add(osc(13,0.5,5)) // add( texture, amount = 1 )
// .sub(gradient()),1) // sub( texture, amount = 1 )
// .layer(osc(15).rotate(1).luma()) // layer( texture )
// .blend(shape(4),[0,0.25,0.5,0.75,1]) // blend( texture, amount = 0.5 )
// .mult(osc(13,0.5,5)) // mult( texture, amount = 1 )
// .diff(osc(13,0.5,5)) // diff( texture )
// .mask(voronoi(),3,0.5).invert([0,1]) // mask( texture )


//// ----------------------------------------------------------------
//// 8 - MODULATE FUNCTIONS, try different functions and combinations
//// ----------------------------------------------------------------
// .modulateRepeat(osc(10), 3.0, 3.0, 0.5, 0.5) // modulateRepeat( texture, repeatX = 3, repeatY = 3, offsetX = 0.5, offsetY = 0.5 )
// .modulateKaleid(osc(11,0.5,0),50) // modulateKaleid( texture, nSides = 4 )
// .modulateScrollX(osc(10),0.5,0) // modulateScrollX( texture, scrollX = 0.5, speed )
// .modulateScrollY(osc(10),0.5,0) // modulateScrollY( texture, scrollY = 0.5, speed )
// .modulate(noise(0.6,0.5)) // modulate( texture, amount = 0.1 )
// .modulateScale(osc(4,-0.5,0).kaleid(50).scale(0.5),15,0) // modulateScale( texture, multiple = 1, offset = 1 )
// .modulatePixelate(noise(25,0.5),100) // modulatePixelate( texture, multiple = 10, offset = 3 )
// .modulateRotate(osc(1,0.5,0).kaleid(50).scale(0.5),15,0) // modulateRotate( texture, multiple = 1, offset )
// .modulateHue(src(o0).scale(1.01),1) // modulateHue( texture, amount = 1 )




//// By default, hydra contains four separate virtual outputs that can each render different visuals, and can be mixed with each other to create more complex visuals. The variables o0, o1, o2, and o3 correspond to the different outputs.
.out(o0) // out( output = o0 )

//// ----------------------------------------------------------------
//// 2 - TRY DIFFERENT VIDEO SOURCES AND DIFFERENT OUTPUTS
//// ----------------------------------------------------------------

//// We can activate the webcam inside a source variable using the initCam function. When run, you should see the light on your webcam light up. However, you will still not see any image on the screen. You need to use it within the src() function to access the video signal. If you have multiple webcams, you can access each camera by indicating an index number inside initCam, for example s0.initCam(1) or s0.initCam(2).
// s1.initCam() // init webcam on s0
// src(s1).out(o1) // show s0 on o0

//// load an image into a source object
// s2.initImage('https://upload.wikimedia.org/wikipedia/commons/2/25/Hydra-Foto.jpg')
// src(s2).out(o2) // show s0 on o0

//// load a video into a source object
// s3.initVideo('https://media.giphy.com/media/AS9LIFttYzkc0/giphy.mp4')
// src(s3).out(o3)

//// screen sharing - You can also use the screen-sharing capabilities of most modern browsers as a video source. It works in the same way sharing your screen on video conferences work!
// s3.initScreen()
// src(s2).out(o2)

//// switch render output
render(o0)  // CHANGE o1 to, o2 or o3
// render(o1)
// render(o2)
// render(o3)