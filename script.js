const timerLabel = document.getElementById('timerLabel');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let timeLeft = 1500; // 25 minutes in seconds
let intervalId = null;
const breakTime = 300; // 5 minutes in seconds
let isBreak = false;
let isRunning = false;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerLabel.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(intervalId);
        if (!isBreak) {
            // Switch to break
            timeLeft = breakTime;
            isBreak = true;
            startPauseBtn.textContent = 'Pause';
            startTimer();
        } else {
            // End cycle
            isBreak = false;
            isRunning = false;
            timeLeft = 1500;
            startPauseBtn.textContent = 'Start';
        }
    }
}

function startTimer() {
    if (!isRunning) {
        intervalId = setInterval(updateTimer, 1000);
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
    }
}

function pauseTimer() {
    clearInterval(intervalId);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
}

function resetTimer() {
    clearInterval(intervalId);
    isRunning = false;
    isBreak = false;
    timeLeft = 1500;
    timerLabel.textContent = '25:00';
    startPauseBtn.textContent = 'Start';
}

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
