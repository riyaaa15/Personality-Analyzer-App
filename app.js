let startSecction = document.querySelector(".start-section");
let startBtn = document.querySelector(".start-btn");
let questionSection = document.querySelector(".question-section");

let questionText = document.querySelector(".question-text");
let optionsContainer = document.querySelector(".options");
let questionNumber = document.querySelector(".question-number");

const questions = [
  {
    question: "You prefer spending your free time:",
    options: [
      { text: "Reading or watching something alone", type: "introvert" },
      { text: "Hanging out with a big group", type: "leader" },
      { text: "Doing something artistic", type: "creative" },
      { text: "Planning future goals", type: "logical" }
    ]
  },
  {
    question: "When facing a problem, you usually:",
    options: [
      { text: "Think deeply before speaking", type: "introvert" },
      { text: "Take charge and decide quickly", type: "leader" },
      { text: "Look for creative solutions", type: "creative" },
      { text: "Break it down logically", type: "logical" }
    ]
  },
  {
    question: "People often describe you as:",
    options: [
      { text: "Calm and reserved", type: "introvert" },
      { text: "Confident and bold", type: "leader" },
      { text: "Imaginative and unique", type: "creative" },
      { text: "Smart and analytical", type: "logical" }
    ]
  },
  {
    question: "In a team project, you usually:",
    options: [
      { text: "Do your work quietly", type: "introvert" },
      { text: "Lead the team", type: "leader" },
      { text: "Bring fresh ideas", type: "creative" },
      { text: "Organize everything properly", type: "logical" }
    ]
  },
  {
    question: "Your decision making style is:",
    options: [
      { text: "Emotional and thoughtful", type: "introvert" },
      { text: "Fast and confident", type: "leader" },
      { text: "Inspired by imagination", type: "creative" },
      { text: "Based on facts and data", type: "logical" }
    ]
  },
  {
    question: "You feel most energized when:",
    options: [
      { text: "Spending time alone", type: "introvert" },
      { text: "Being around people", type: "leader" },
      { text: "Creating something new", type: "creative" },
      { text: "Solving complex problems", type: "logical" }
    ]
  },
  {
    question: "If given a free weekend, you would:",
    options: [
      { text: "Relax at home", type: "introvert" },
      { text: "Organize an outing", type: "leader" },
      { text: "Work on a hobby project", type: "creative" },
      { text: "Learn something new", type: "logical" }
    ]
  },
  {
    question: "Your strongest skill is:",
    options: [
      { text: "Listening carefully", type: "introvert" },
      { text: "Taking initiative", type: "leader" },
      { text: "Thinking outside the box", type: "creative" },
      { text: "Analyzing situations", type: "logical" }
    ]
  },
  {
  question: "When someone disagrees with you, you:",
  options: [
    { text: "Listen quietly and reflect", type: "introvert" },
    { text: "Defend your point strongly", type: "leader" },
    { text: "Try to find a creative middle ground", type: "creative" },
    { text: "Use logic to explain your reasoning", type: "logical" }
  ]
},
{
  question: "Your ideal work environment is:",
  options: [
    { text: "Peaceful and independent", type: "introvert" },
    { text: "Fast-paced and dynamic", type: "leader" },
    { text: "Flexible and innovative", type: "creative" },
    { text: "Structured and organized", type: "logical" }
  ]
}
];

const resultsData = {
  introvert: {
    title: "The Thoughtful Introvert 🧘",
    description: "You are calm, reflective, and emotionally aware. You prefer meaningful conversations over large gatherings and think deeply before making decisions.",
    strengths: "Good listener, emotionally intelligent, focused, independent.",
    weaknesses: "May overthink, avoid confrontation, low energy in big crowds."
  },

  leader: {
    title: "The Confident Leader 🔥",
    description: "You are bold, decisive, and naturally take charge in situations. People often look to you for direction and motivation.",
    strengths: "Confident, proactive, inspiring, action-oriented.",
    weaknesses: "Can be impatient, dominant, or rush decisions."
  },

  creative: {
    title: "The Creative Dreamer 🎨",
    description: "You think differently from others and enjoy expressing yourself in unique ways. Your imagination is one of your biggest strengths.",
    strengths: "Innovative, expressive, adaptable, visionary.",
    weaknesses: "Can be distracted, inconsistent, or overly idealistic."
  },

  logical: {
    title: "The Logical Strategist 🧠",
    description: "You rely on facts and reasoning. You prefer structure, planning, and analyzing situations before acting.",
    strengths: "Analytical, organized, practical, detail-oriented.",
    weaknesses: "May seem distant, over-critical, or too rigid."
  }
};

let currentQuestionIndex = 0;

let score = {
  introvert: 0,
  leader: 0,
  creative: 0,
  logical: 0
};

let selectedType = null;

function showQuestion() {
    let currentQuestion =  questions[currentQuestionIndex];

    questionText.innerText = currentQuestion.question;
    questionNumber.innerText = 
    `Question ${currentQuestionIndex + 1} / ${questions.length}`;

    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option.text;

        btn.addEventListener("click", () => {
            selectedType = option.type;

            document.querySelectorAll(".options button").forEach(b => {
              b.classList.remove("active");
            });

            btn.classList.add("active");
        });

        optionsContainer.appendChild(btn);
    })
}

startBtn.addEventListener("click", () => {
    questionSection.style.display  = "flex";
    startSecction.style.display = "none";

    showQuestion();
});



let nextBtn = document.querySelector(".next-btn");
let resultSection = document.querySelector(".result-section");

nextBtn.addEventListener("click", () => {

    if(!selectedType) return;

    score[selectedType]++;
    selectedType = null;

    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
    let highestType = null;
    let highestScore = 0;

    for (let type in score) {
        if (score[type] > highestScore) {
            highestScore = score[type];
            highestType = type;
    }
}
    let finalResult = resultsData[highestType];

    document.querySelector(".result-title").innerText = finalResult.title;
    document.querySelector(".result-description").innerText = finalResult.description;

    questionSection.style.display = "none";
    resultSection.style.display = "flex";

    }
});

let restartBtn = document.querySelector(".restart-btn");

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;

  score = {
    introvert: 0,
    leader: 0,
    creative: 0,
    logical: 0
  };

  selectedType = null;

  resultSection.style.display = "none";
  startSecction.style.display  = "flex";

  showQuestion();
});