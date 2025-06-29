const [timerLabel, startPauseBtn, resetBtn] =
    ['timerLabel', 'startPauseBtn', 'resetBtn']
        .map(id => document.getElementById(id));

// New elements for customizable time
const focusMinutesInput = document.getElementById('focusMinutes');
const focusSecondsInput = document.getElementById('focusSeconds');
const breakMinutesInput = document.getElementById('breakMinutes');
const breakSecondsInput = document.getElementById('breakSeconds');

let timeLeft = 0; // Waktu yang tersisa untuk sesi saat ini (fokus atau istirahat)
let intervalId = null;
let isBreak = false; // Menunjukkan apakah saat ini waktu istirahat
let isRunning = false; // Menunjukkan apakah timer sedang berjalan

// Fungsi untuk menghitung total detik dari input menit dan detik
const getTotalSeconds = (minutesInput, secondsInput) => {
    // Pastikan nilai input adalah angka dan tidak null/undefined
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    // Pastikan detik tidak lebih dari 59 dan menit tidak negatif
    return (Math.max(0, minutes) * 60) + Math.max(0, Math.min(59, seconds));
};

// Fungsi untuk memperbarui tampilan timer
const updateDisplay = () => {
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeLeft % 60)
        .toString()
        .padStart(2, '0');
    timerLabel.textContent = `${minutes}:${seconds}`;
};

// Fungsi untuk menginisialisasi atau mengatur ulang timer berdasarkan nilai input
const initializeTimer = () => {
    clearInterval(intervalId); // Hentikan interval jika ada
    isRunning = false;
    isBreak = false; // Selalu kembali ke mode fokus saat inisialisasi/reset
    timeLeft = getTotalSeconds(focusMinutesInput, focusSecondsInput); // Set ke waktu fokus
    startPauseBtn.textContent = 'Start'; // Pastikan tombol menunjukkan 'Start'
    updateDisplay(); // Perbarui tampilan segera
};

// Fungsi untuk memperbarui tampilan timer
const updateTimer = () => {
    updateDisplay();

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        // Waktu habis
        clearInterval(intervalId);
        isRunning = false;  // <<-- tambahkan ini supaya startTimer bisa jalan kembali

        if (!isBreak) {
            // Jika waktu fokus habis, beralih ke waktu istirahat
            isBreak = true;
            timeLeft = getTotalSeconds(breakMinutesInput, breakSecondsInput);

            if (timeLeft === 0) {
                // Jika break time = 0, langsung kembali ke fokus
                isBreak = false;
                timeLeft = getTotalSeconds(focusMinutesInput, focusSecondsInput);
                startPauseBtn.textContent = 'Start';
                updateDisplay();
                return;
            }

            startTimer();  // sekarang akan memulai interval baru
        } else {
            // Jika waktu istirahat habis, kembali ke waktu fokus
            isBreak = false;
            timeLeft = getTotalSeconds(focusMinutesInput, focusSecondsInput);
            startPauseBtn.textContent = 'Start';
            updateDisplay();
        }
    }
};

const startTimer = () => {
    if (!isRunning) {
        // Pastikan timeLeft memiliki nilai yang benar saat memulai
        if (timeLeft === 0 && !isBreak) { // Jika baru pertama kali start atau reset dan waktu fokus 0
            timeLeft = getTotalSeconds(focusMinutesInput, focusSecondsInput);
        } else if (timeLeft === 0 && isBreak) { // Jika baru pertama kali start atau reset dan waktu break 0
            timeLeft = getTotalSeconds(breakMinutesInput, breakSecondsInput);
        }

        // Jika timeLeft masih 0 setelah mencoba mendapatkan dari input, jangan mulai timer
        if (timeLeft === 0) {
            updateDisplay(); // Pastikan display menunjukkan 00:00
            return;
        }

        intervalId = setInterval(updateTimer, 1000);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        updateDisplay(); // Perbarui tampilan segera setelah start
    }
};

const pauseTimer = () => {
    clearInterval(intervalId);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
};

const resetTimer = () => {
    initializeTimer(); // Memanggil inisialisasi untuk mereset semua ke keadaan awal
};

// Event listeners for buttons
startPauseBtn.addEventListener('click', () =>
    isRunning ? pauseTimer() : startTimer()
);
resetBtn.addEventListener('click', resetTimer);

// Event listeners for input changes to re-initialize timer if values change
// Ini penting agar timer di-reset setiap kali user mengubah waktu
focusMinutesInput.addEventListener('change', initializeTimer);
focusSecondsInput.addEventListener('change', initializeTimer);
breakMinutesInput.addEventListener('change', initializeTimer);
breakSecondsInput.addEventListener('change', initializeTimer);


// Initial setup when the page loads
initializeTimer();