// licensed with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/
// by Olivia Jack dizzy
osc(20, 0.03, 1.7)
	.kaleid()
	.mult(osc(24.781, 0.001, 0)
		.rotate(1.58))
	.blend(o0, 0.94)
	.modulateScale(osc(10, 0.442), -0.03)
	.scale(0.8, () => 1.05 + 0.1 * Math.sin(0.05 * time))
	.out(o0);