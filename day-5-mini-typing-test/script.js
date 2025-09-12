const quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "JavaScript makes websites dynamic and fun.",
  "Coding every day helps you improve step by step.",
  "Patience and practice are keys to success.",
  "Learning never stops in the world of technology."
];

const quoteBox = document.getElementById("quoteBox");
const inputBox = document.getElementById("inputBox");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

let startTime, timerInterval, currentQuote;

// Generate new quote
function newQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  
  // Wrap each character in span for coloring
  quoteBox.innerHTML = "";
  currentQuote.split("").forEach(char => {
    const span = document.createElement("span");
    span.textContent = char;
    quoteBox.appendChild(span);
  });

  inputBox.value = "";
  resultEl.textContent = "";
  timerEl.textContent = "⏱ Time: 0s";

  clearInterval(timerInterval);
  timerInterval = null; // reset timer state
}

// Timer start
function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    let elapsed = Math.floor((new Date() - startTime) / 1000);
    timerEl.textContent = `⏱ Time: ${elapsed}s`;
  }, 1000);
}

// Typing logic
inputBox.addEventListener("input", () => {
  if (inputBox.value.length === 1 && !timerInterval) {
    startTimer();
  }

  const typed = inputBox.value.split("");
  const spans = quoteBox.querySelectorAll("span");
  let correct = true;

  spans.forEach((span, i) => {
    if (typed[i] == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typed[i] === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      correct = false;
    }
  });

  // If complete and correct
  if (typed.length === currentQuote.length && correct) {
    clearInterval(timerInterval);
    let timeTaken = Math.floor((new Date() - startTime) / 1000);
    let words = currentQuote.split(" ").length;
    let wpm = Math.round((words / timeTaken) * 60);

    resultEl.textContent = `✅ Completed in ${timeTaken}s | Speed: ${wpm} WPM`;
  }
});

// Restart
restartBtn.addEventListener("click", newQuote);

// Load first
newQuote();
