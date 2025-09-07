let quizData = [];
let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const quizEl = document.getElementById("quiz");

// Fetch questions from API
async function fetchQuestions() {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
    const data = await res.json();
    quizData = data.results.map(q => {
      const allOptions = [...q.incorrect_answers];
      const answerIndex = Math.floor(Math.random() * 4);
      allOptions.splice(answerIndex, 0, q.correct_answer);
      return {
        question: decodeHTML(q.question),
        options: allOptions.map(opt => decodeHTML(opt)),
        answer: answerIndex
      };
    });
    loadQuestion();
  } catch (err) {
    questionEl.textContent = "⚠️ Failed to load questions. Please try again.";
    console.error(err);
  }
}

// Decode HTML entities from API
function decodeHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  optionButtons.forEach((btn, index) => {
    btn.textContent = currentQuiz.options[index];
    btn.disabled = false;
    btn.style.background = "#f4f4f4";
  });
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
}

optionButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const currentQuiz = quizData[currentQuestion];
    if (index === currentQuiz.answer) {
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.style.color = "green";
      score++;
    } else {
      feedbackEl.textContent = "❌ Wrong!";
      feedbackEl.style.color = "red";
    }

    optionButtons.forEach((b, i) => {
      b.disabled = true;
      if (i === currentQuiz.answer) {
        b.style.background = "#c8e6c9"; // green
      } else if (i === index) {
        b.style.background = "#ffcdd2"; // red
      }
    });

    nextBtn.style.display = "inline-block";
  });
});

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizEl.classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  quizEl.classList.remove("hidden");
  resultEl.classList.add("hidden");
  fetchQuestions();
});

// Load first set
fetchQuestions();
