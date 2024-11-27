// Global Tone.js Transport setup
Tone.Transport.bpm.value = 126;

// State to track if the Transport has started
let transportStarted = false;

// Store individual instrument loops to manage their state
const instrumentLoops = {};

// Define the function to create instruments and their individual buttons
function createInstrument(instrumentId, instrumentType, notes) {
    let synth;
    let loop;
    let isPlaying = false;

    const button = document.getElementById(instrumentId);
    button.style.color = "transparent"; // Start buttons as transparent

    // Create instrument based on type
    if (instrumentType === "kick") {
        synth = new Tone.MembraneSynth({
            pitchDecay: 0.05,
            octaves: 10,
            oscillator: { type: "sine" },
            envelope: {
                attack: 0.001,
                decay: 0.4,
                sustain: 0.01,
                release: 1.4,
                attackCurve: "exponential"
            }
        }).toDestination();
        synth.volume.value = 3; // Increased volume for Kick
    } else if (instrumentType === "snare") {
        synth = new Tone.NoiseSynth({
            noise: { type: "white" },
            envelope: { attack: 0.001, decay: 0.2, sustain: 0 },
            volume: -7 // Increased volume for Snare
        }).toDestination();
    } else if (instrumentType === "hihat") {
        synth = new Tone.MetalSynth({
            frequency: 200,
            envelope: {
                attack: 0.001,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1.5
        }).toDestination();
        synth.volume.value = -15; // Lowered volume for Hi-hats
    } else if (instrumentType === "bass") {
        synth = new Tone.MembraneSynth({
            pitchDecay: 0.2,
            octaves: 4,
            oscillator: { type: "triangle" },
            envelope: {
                attack: 0.05,
                decay: 0.5,
                sustain: 0.5,
                release: 1.2
            }
        }).toDestination();
    } else if (instrumentType === "pad") {
        synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "triangle" }, // Changed to triangle wave for a gentler pad
            envelope: { attack: 0.5, decay: 1, sustain: 0.6, release: 2 }
        }).toDestination();
        synth.volume.value = -20; // Significantly reduced volume for PAD
    } else if (instrumentType === "randomMelody") {
        synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sine" },
            envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.5 }
        }).toDestination();
        synth.volume.value = -12; // Adjusted volume for Random Melody
    } else if (instrumentType === "ambientPad") {
        synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: { type: "sawtooth" },
            envelope: { attack: 2, decay: 2, sustain: 0.8, release: 4 }
        }).toDestination();
        synth.volume.value = -10; // Balanced volume for Ambient Pad
    } else {
        synth = new Tone.PolySynth(Tone.Synth).toDestination();
    }

    // Toggle play/stop for individual buttons
    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            isPlaying = false;
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                if (instrumentType === "kick") {
                    synth.triggerAttackRelease("C1", "8n", time);
                } else if (instrumentType === "snare") {
                    synth.triggerAttackRelease("16n", time);
                } else if (instrumentType === "hihat") {
                    synth.triggerAttackRelease("C7", "16n", time);
                } else if (instrumentType === "bass") {
                    synth.triggerAttackRelease("C1", "4n", time);
                } else if (instrumentType === "pad") {
                    synth.triggerAttackRelease(notes, "1m", time);
                } else if (instrumentType === "randomMelody") {
                    const randomNote = notes[Math.floor(Math.random() * notes.length)];
                    synth.triggerAttackRelease(randomNote, "16n", time);
                } else if (instrumentType === "ambientPad") {
                    synth.triggerAttackRelease(notes, "4m", time);
                }
            }, "4n");

            loop.start(0);
            isPlaying = true;
            button.style.color = "white";
        }

        // Store the loop reference
        instrumentLoops[instrumentId] = loop;
    };

    button.addEventListener("click", toggleLoop);
}

// Define instruments
createInstrument("instrument_1", "kick", []);
createInstrument("instrument_2", "snare", []);
createInstrument("instrument_3", "poly", ["C4", "E4", "G4"]);
createInstrument("instrument_4", "poly", ["F4", "A4", "C5"]);
createInstrument("instrument_5", "hihat", []);
createInstrument("instrument_6", "bass", []);
createInstrument("instrument_7", "pad", ["C4", "E4", "G4", "B4"]);
createInstrument("instrument_8", "randomMelody", ["C5", "D5", "E5", "G5", "A5"]);
createInstrument("instrument_9", "poly", ["C5", "E5", "G5", "B5"]);
createInstrument("instrument_10", "ambientPad", ["C2", "E2", "G2", "B2"]);

// Carillon button functionality
document.getElementById("carillonButton").addEventListener("click", () => {
    // Stop all individual instrument loops if playing
    for (const id in instrumentLoops) {
        instrumentLoops[id]?.stop();
    }

    // Start the Carillon song
    playCarillon();
});
