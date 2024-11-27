// Reference the play button
const button = document.getElementById('playButton');

// Add a click event to play music
button.addEventListener('click', () => {
    // Create a synthesizer and connect it to the master output
    const synth = new Tone.Synth().toDestination();

    // Define the sequence of notes
    const notes = ["C4", "E4", "G4", "B4"];

    // Play the notes in sequence with a 0.5-second gap
    notes.forEach((note, index) => {
        synth.triggerAttackRelease(note, "8n", Tone.now() + index * 0.5);
    });
});
