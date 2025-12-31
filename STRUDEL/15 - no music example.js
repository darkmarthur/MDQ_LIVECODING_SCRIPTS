$: s("nomusic").gain(5).room(.2).delay("<.1!3 .7>:.75:.3")  
    .clip(1).coarse(4).orbit(37).freq(30)
    .fit().splice(8, "0 1 [2 3] [7 6]".early(1/4))
.sometimesBy(.3,x=>x.ply("4").speed("1.5|2").gain(3).clip(.8).penv("0|12|-12"))_$: n("1").add(note("12,12.1,24,24.1")).s("nomusic")
.orbit(56)
.hurry("<1 2 1 4>").gain(5)

_$: s("nomusic").gain(5).room(.2).delay("<.1!3 .7>:.75:.3")  
    .clip(1).coarse(4).orbit(37).freq(30)
    .fit().splice(8, "0 1 [2 3] [7 6]".early(1/4))
.sometimesBy(.3,x=>x.ply("4").speed("1.5|2").gain(3).clip(.8).penv("0|12|-12"))


$: s("bd*4").n(0).bank("garden").duck(37).duckattack(.2).duckdepth(0.8).gain(.5)
$: s("crow???").orbit(77).room(3).delay(.4)