// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

// Rogue Strings
//crazywizard.ca

// You may want to let the code "warm up" before using.
// Plug in your audio and play something random till it looks good

a.setBins(24)
a.setScale(3.3)
a.setCutoff(0.3)
a.setSmooth(0.8)
a.show()

let makeLayer = (bin) => 
 osc(()=>a.fft[bin]+1*5,0,()=>a.fft[bin]*4)
.rotate(44/14/2)
.mult(
 shape(2, 0.25, 0)
.rotate(44/14/2)
.mult(shape(2, () => a.fft[bin]/22-0.01, 0.01).rotate(44/14/2),1),1)
.scrollX(0.6+bin/30,()=>a.fft[bin]/4000)
.scrollY(0,()=>a.fft[bin]/100)
let layerConfigs = [
    {bin:0},
    {bin:1},
    {bin:2},
    {bin:3},
    {bin:4},
    {bin:5},
    {bin:6},
    {bin:7},
    {bin:8},
    {bin:9},
    {bin:10},
    {bin:11},
    {bin:12},
    {bin:13},
    {bin:14},
    {bin:15},
    {bin:16},
    {bin:17},
    {bin:18},
    {bin:19},
    {bin:20},
    {bin:21},
    {bin:22},
    {bin:23}]

let layers = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(bin => makeLayer(bin))

let combined = layers.reduce((acc, layer, idx) => idx === 0 ? layer : acc.add(layer))
combined.out(o0)
render(o0)








































 







