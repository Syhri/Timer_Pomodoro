const [timerLabel, startPauseBtn, resetBtn] = 
    ['timerLabel', 'startPauseBtn', 'resetBtn']
        .map(id => document.getElementById(id));

let timeLeft   = 1500; // 25 minutes
let intervalId = null;
const breakTime = 300; // 5 minutes
let isBreak    = false;
let isRunning  = false;

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (timeLeft % 60)
        .toString()
        .padStart(2, '0');

    timerLabel.textContent = `${minutes}:${seconds}`;

    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(intervalId);
        if (!isBreak) {
            // Switch to break
            timeLeft   = breakTime;
            isBreak    = true;
            startPauseBtn.textContent = 'Pause';
            startTimer();
        } else {
            // End cycle
            isBreak    = false;
            isRunning  = false;
            timeLeft   = 1500;
            startPauseBtn.textContent = 'Start';
        }
    }
};

const startTimer = () => {
    if (!isRunning) {
        intervalId = setInterval(updateTimer, 1000);
        isRunning  = true;
        startPauseBtn.textContent = 'Pause';
    }
};

const pauseTimer = () => {
    clearInterval(intervalId);
    isRunning = false;
    startPauseBtn.textContent = 'Start';
};

const resetTimer = () => {
    clearInterval(intervalId);
    isRunning  = false;
    isBreak    = false;
    timeLeft   = 1500;
    timerLabel.textContent    = '25:00';
    startPauseBtn.textContent = 'Start';
};

startPauseBtn.addEventListener('click', () =>
    isRunning ? pauseTimer() : startTimer()
);
resetBtn.addEventListener('click', resetTimer);
