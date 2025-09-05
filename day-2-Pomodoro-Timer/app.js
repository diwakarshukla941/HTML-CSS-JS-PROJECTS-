let timer;
let timeLeft = 25 * 60; // 25 minutes
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// Update the timer display
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Start the timer
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    statusText.textContent = "Focus time! 🔥";
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        statusText.textContent = "Break time! 🎉";
        alert("Pomodoro session completed! Take a break. 🥳");
      }
    }, 1000);
  }
});

// Pause the timer
pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    statusText.textContent = "Paused ⏸️";
  }
});

// Reset the timer
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
  statusText.textContent = "Ready to work! 💪";
});

// Initialize display
updateDisplay();
