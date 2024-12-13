// Global Tone.js Transport setup
Tone.Transport.bpm.value = 126;

// State to track if the Transport has started
let transportStarted = false;

// Store individual instrument loops for management
const instrumentLoops = {};

// ** Section: Core Instruments (untouched by updates) **

// Kick - unchanged
function createKick(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.MembraneSynth({
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

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease("C1", "8n", time);
            }, "4n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Snare - beats on 2 and 4
function createSnare(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
    }).toDestination();

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                if (Tone.Transport.position.split(":")[1] % 2 === 1) {
                    synth.triggerAttackRelease("16n", time);
                }
            }, "4n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Hi-Hats - double the rate of the kick
function createHiHat(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.MetalSynth({
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
    synth.volume.value = -12; // Slightly increased volume

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease("C7", "16n", time);
            }, "8n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// PAD instrument
function createPad(id, notes) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.5, decay: 1, sustain: 0.6, release: 2 }
    }).toDestination();
    synth.volume.value = -5; // Increased volume for PAD

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease(notes, "1m", time);
            }, "1m");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Random Melody instrument
function createRandomMelody(id, notes) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.5 }
    }).toDestination();
    synth.volume.value = 5; // Increased volume for Random Melody

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                const randomNote = notes[Math.floor(Math.random() * notes.length)];
                synth.triggerAttackRelease(randomNote, "16n", time);
            }, "16n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// ** End of Core Instruments **

// Piano 1 and Piano 2 instruments
function createPiano(id, chords) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.6, release: 0.8 }
    }).toDestination();

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                // First beat: chord1, two half-beat durations
                synth.triggerAttackRelease(chords[0], "8n", time);
                synth.triggerAttackRelease(chords[0], "8n", time + Tone.Time("8n"));

                // Second beat: chord2, two half-beat durations
                synth.triggerAttackRelease(chords[1], "8n", time + Tone.Time("4n"));
                synth.triggerAttackRelease(chords[1], "8n", time + Tone.Time("4n") + Tone.Time("8n"));

                // Third and Fourth beats: chord3, adjusted timing
                const chord3Timings = [
                    Tone.Time("2n"),
                    Tone.Time("2n") + Tone.Time("16n") * 3,
                    Tone.Time("2n") + Tone.Time("16n") * 6
                ];
                chord3Timings.forEach((offset) => {
                    synth.triggerAttackRelease(chords[2], "8n", time + offset);
                });
            }, "1m");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Death Instrument
function createDeath(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.NoiseSynth({
        noise: { type: "white" },
        envelope: { attack: 0.01, decay: 3, sustain: 1, release: 5 }
    }).toDestination();

    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            synth.triggerRelease();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            synth.triggerAttack();
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Swag Instrument
function createSwag(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        oscillator: { type: "square" },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.5, release: 1 }
    }).toDestination();

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease("C2", "2n", time);
            }, "4n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Bass Instrument with Melody
function createBass(id) {
    const button = document.getElementById(id);
    button.style.color = "transparent";

    const synth = new Tone.MembraneSynth({
        pitchDecay: 0.2,
        octaves: 2,
        oscillator: { type: "sine" },
        envelope: {
            attack: 0.01,
            decay: 0.4,
            sustain: 0.3,
            release: 1.2
        }
    }).toDestination();
    synth.volume.value = 5; // Increased volume for Bass

    let loop;
    let isPlaying = false;

    const toggleLoop = () => {
        if (isPlaying) {
            loop.stop();
            button.style.color = "transparent";
        } else {
            if (!transportStarted) {
                Tone.Transport.start();
                transportStarted = true;
            }

            const melody = ["C1", "D1", "E1", "G1", "A1"];
            let noteIndex = 0;

            loop = new Tone.Loop((time) => {
                synth.triggerAttackRelease(melody[noteIndex], "4n", time);
                noteIndex = (noteIndex + 1) % melody.length;
            }, "4n");

            loop.start(0);
            button.style.color = "white";
        }
        isPlaying = !isPlaying;
    };

    button.addEventListener("click", toggleLoop);
}

// Initialize instruments
createKick("instrument_1");
createSnare("instrument_2");
createHiHat("instrument_5");
createPad("instrument_7", ["C4", "E4", "G4", "B4"]);
createPiano("instrument_3", [["C4", "E4", "G4"], ["D4", "F4", "A4"], ["E4", "G4", "B4"]]);
createPiano("instrument_4", [["F4", "A4", "C5"], ["G4", "B4", "D5"], ["A4", "C5", "E5"]]);
createDeath("instrument_10");
createSwag("instrument_9");
createBass("instrument_6");
createRandomMelody("instrument_8", ["C5", "D5", "E5", "G5", "A5"]);
  //HERE CARRILLON

// Carillon Feature
let carillonActive = false;
let carillonTimeouts = [];

// Simulate Button Press with Visual Feedback
function simulateButtonPress(buttonIds) {
    buttonIds.forEach((buttonId) => {
        const button = document.getElementById(buttonId);
        if (!button) {
            console.error(`Button with ID "${buttonId}" not found.`);
            return;
        }
        button.style.backgroundColor = "lightgrey"; // Highlight the button in light grey
        button.click(); // Simulate click
        setTimeout(() => {
            button.style.backgroundColor = ""; // Reset after 200ms
        }, 200);
    });
}

// Stop the Carillon
function stopCarillon() {
    carillonActive = false;
    carillonTimeouts.forEach((timeout) => clearTimeout(timeout));
    carillonTimeouts = [];
    alert("Carillon ended."); // Notify user
}

// Start the Carillon
function startCarillon() {
    if (carillonActive) {
        stopCarillon();
        return;
    }

    carillonActive = true;

    const sectionDuration = 15240; // 32 beats at 126 BPM (15.24 seconds)

    // Define the sequence of button combinations
    const sequence = [
        // Intro (15.24 seconds)
        { time: 0, buttons: ["instrument_1", "instrument_5", "instrument_2", "instrument_8"] }, // Kick, Hi-Hat, Snare, Droplets

        // Bridge (15.24 seconds)
        { time: sectionDuration, buttons: ["instrument_3"] }, // Piano 1

        // Breakdown (15.24 seconds)
        { time: 2 * sectionDuration, buttons: ["instrument_3", "instrument_4", "instrument_7", "instrument_1", "instrument_5", "instrument_2"] }, // Pianos, Pad, Kick, Hi-Hat, Snare

        // Build-up (15.24 seconds)
        {
            time: 3 * sectionDuration,
            buttons: ["instrument_1", "instrument_5", "instrument_3", "instrument_4"] // Kick, Hi-Hat, Pianos
        },

        // Main Drop (15.24 seconds)
        {
            time: 4 * sectionDuration,
            buttons: ["instrument_1", "instrument_5", "instrument_3", "instrument_6", "instrument_7"] // Kick, Hi-Hat, Piano 1, Bass, Pad
        },

        // Outro (15.24 seconds)
        { time: 5 * sectionDuration, buttons: ["instrument_1", "instrument_2", "instrument_3", "instrument_4", "instrument_5", "instrument_7", "instrument_8"] }, // No instruments triggered at start of Outro
    ];

    // Schedule button presses
    sequence.forEach(({ time, buttons }) => {
        const timeout = setTimeout(() => {
            if (carillonActive) simulateButtonPress(buttons);
        }, time);
        carillonTimeouts.push(timeout);
    });

    // Gradually mute all active instruments during Outro
    const outroStartTime = 5 * sectionDuration; // Start of Outro
    const outroIntervals = 2 * (600000 / (Tone.Transport.bpm.value * 4)); // Two beats in milliseconds at current BPM
    const outroInstruments = ["instrument_1", "instrument_2", "instrument_3", "instrument_4", "instrument_5", "instrument_6", "instrument_7", "instrument_8"];

    outroInstruments.forEach((instrument, index) => {
        const muteTime = outroStartTime + index * outroIntervals;

        const muteTimeout = setTimeout(() => {
            if (carillonActive) simulateButtonPress([instrument]); // Press button to toggle off
        }, muteTime);

        carillonTimeouts.push(muteTimeout);
    });

    // Automatically end Carillon after the song finishes
    const endTime = 6 * sectionDuration; // Total duration of the song
    const endTimeout = setTimeout(() => {
        stopCarillon();
    }, endTime);

    carillonTimeouts.push(endTimeout);
}

// Initialize Carillon Button
document.getElementById("carillonButton").addEventListener("click", () => {
    if (carillonActive) {
        stopCarillon();
    } else {
        startCarillon();
    }
});
