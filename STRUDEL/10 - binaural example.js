/**
 * BINAURAL BEATS GENERATOR
 */

let leftEarFreq  = 120 // Frequency for the left ear (Hz)
let rightEarFreq = 125 // Frequency for the right ear (Hz)

$: s("sine").freq(leftEarFreq).pan(0).gain(2)
$: s("sine").freq(rightEarFreq).pan(1).gain(2)

/** 
 * Binaural beats are auditory illusions created when two slightly different frequencies
 * are played separately to each ear through headphones. The brain perceives a third
 * "beat" frequency equal to the difference between the two tones.
 * 
 * IMPORTANT REQUIREMENTS:
 * - MUST be used with headphones or stereo speakers with proper channel separation
 * - Left ear receives one frequency, right ear receives the other
 * - The difference between frequencies should be between 1-30 Hz for optimal effect
 * 
 * BRAINWAVE FREQUENCIES AND EFFECTS:
 * 
 * GAMMA WAVES (30-100 Hz)
 * - 40 Hz: Enhanced focus, memory formation, cognitive processing
 * - 50 Hz: Peak performance, heightened awareness
 * - 60 Hz: Advanced problem solving, creativity
 * 
 * BETA WAVES (13-30 Hz)
 * - 15 Hz: Active thinking, concentration, alertness
 * - 20 Hz: Problem solving, decision making
 * - 25 Hz: High alertness, stress response
 * 
 * ALPHA WAVES (8-13 Hz)
 * - 8 Hz: Deep relaxation, meditation, stress relief
 * - 10 Hz: Calm awareness, creativity, learning enhancement
 * - 12 Hz: Relaxed focus, improved memory
 * 
 * THETA WAVES (4-8 Hz)
 * - 4 Hz: Deep meditation, REM sleep, healing
 * - 6 Hz: Deep relaxation, intuition, creativity
 * - 7 Hz: Lucid dreaming, deep meditation
 * 
 * DELTA WAVES (0.5-4 Hz)
 * - 1 Hz: Deep sleep, healing, pain relief
 * - 2 Hz: Deep restorative sleep, immune system boost
 * - 3 Hz: Deep sleep, physical healing
 * 
 * USAGE TIPS:
 * - Start with 10-15 minute sessions
 * - Use in a quiet environment
 * - Close your eyes for better focus
 * - Adjust volume to comfortable level
 * - Be consistent with timing for best results
 */