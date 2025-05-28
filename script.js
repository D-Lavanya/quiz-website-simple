const quizData = [
  {
    question: "Which is the largest planet in our solar system?",
    options: { a: "Earth", b: "Mars", c: "Jupiter", d: "Venus" },
    correct: "c"
  },
  {
    question: "Which language is used for styling web pages?",
    options: { a: "HTML", b: "CSS", c: "Python", d: "Java" },
    correct: "b"
  },
  {
    question: "What year was JavaScript created?",
    options: { a: "1991", b: "1995", c: "2001", d: "1989" },
    correct: "b"
  },
  {
  question: "Which keyword is used to declare a variable in JavaScript?",
  options: {
    a: "int",
    b: "var",
    c: "define",
    d: "let"
  },
  correct: "b"
},
  {
    question: "Which property is used in CSS to change text color?",
    options: { a: "font-color", b: "text-color", c: "color", d: "text-style" },
    correct: "c"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const progressEl = document.getElementById("progress");
const optionsContainer = document.getElementById("options-container");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  progressEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  optionsContainer.innerHTML = "";

  for (const [key, value] of Object.entries(q.options)) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${key}"> ${value}`;
    optionsContainer.appendChild(label);
  }

  resultEl.textContent = "";
}

function getSelectedAnswer() {
  const answers = document.querySelectorAll('input[name="answer"]');
  for (const ans of answers) {
    if (ans.checked) {
      return ans.value;
    }
  }
  return null;
}

nextBtn.addEventListener("click", () => {
  if (nextBtn.textContent === "Restart") {
    currentQuestion = 0;
    score = 0;
    nextBtn.textContent = "Next";
    loadQuestion();  // <--- Important: Reload first question
    return;
  }

  const selected = getSelectedAnswer();
  if (!selected) {
    alert("Please select an answer before continuing.");
    return;
  }

  const q = quizData[currentQuestion];
  if (selected === q.correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionEl.textContent = "Quiz Completed!";
  progressEl.textContent = "";
  optionsContainer.innerHTML = "";

  const percent = (score / quizData.length) * 100;
  resultEl.innerHTML = `
    <p>You scored <strong>${score}</strong> out of <strong>${quizData.length}</strong></p>
    <div style="background:#eee;width:100%;height:20px;border-radius:5px;overflow:hidden;margin-top:10px;">
      <div style="width:${percent}%;background:#2ecc71;height:100%;text-align:center;color:white;">
        ${percent.toFixed(0)}%
      </div>
    </div>
  `;

  nextBtn.textContent = "Restart";
}

// ✅ Call this to show the first question on page load
loadQuestion();
