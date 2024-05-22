const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const voiceSelect = document.getElementById("voiceSelect");
const error = document.querySelector('.error-para');
let voices = [];

function populateVoiceList() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Select Voice';
    defaultOption.value = '';
    voiceSelect.appendChild(defaultOption);

    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.value = voice.name;
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

convertBtn.addEventListener('click', function () {
    const speechSynth = window.speechSynthesis;
    const enteredText = text.value;

    if (!enteredText.trim().length) {
        error.textContent = "Are you kidding me? There's nothing to convert! Enter text in the text area.";
        return;
    }

    const selectedVoiceName = voiceSelect.value;
    if (!selectedVoiceName) {
        error.textContent = "Please select a voice.";
        return;
    }

    error.textContent = "";
    const newUtterance = new SpeechSynthesisUtterance(enteredText);
    const selectedVoice = voices.find(voice => voice.name === selectedVoiceName);
    newUtterance.voice = selectedVoice;

    speechSynth.speak(newUtterance);
    convertBtn.textContent = "Sound is Playing...";

    newUtterance.onend = () => {
        convertBtn.textContent = "Play Converted Sound";
    };
});
