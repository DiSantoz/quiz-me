//list of questions to ask the user
var questions = [
  {
    question: "JavaScipt is a ___ - side programming language:",
    choices: ["client", "server", "both", "coffee"],
    answer: "both",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<scripting>", "<javascript>", "<js>"],
    answer: "<script>",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "How to insert a comment that has more than one line?",
    choices: ["//Like this//", "/*Like this*/", "<!--Like this-->"],
    answer: "//Like this//",
  },
  {
    question: "Which of the following will write the message 'Hello World!' in an alert box?",
    choices: ["alertbox('Hello World!')", "alert('Hello World!')", "displayalert('Hello World!')", "msg('Hello World!')"],
    answer: "alert('Hello World!')",

  },
  {
    question: "In JavaScript to create an array you use:",
    choices: ["parenthese", "curly brackets", "arr()", "square brackets"],
    answer: "square brackets",
  }
];

var questionEl = document.querySelector("#question");
var multipleChoiceEl = document.querySelector("#multipleChoice");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;

var time = 30;
var intervalId;

//player enters name at end of quiz
function playerName() {
  var inputName = document.createElement("input");
  inputName.className = "input";
  var btn = document.createElement("BUTTON")
  btn.className = "btn";
  btn.innerHTML = "Submit!";
  //local storage of name and high score
  var highScore = JSON.parse(localStorage.getItem("highScore")) || [];
  btn.addEventListener("click", function (event) {
    console.log(inputName.value);
    var newScore = { score: correctCount, initials: inputName.value };
    highScore.push(newScore);
    localStorage.setItem("highScore", JSON.stringify(highScore));
  });

  inputName.setAttribute("type", "text");
  document.body.appendChild(inputName);
  document.body.appendChild(btn);

}

//function to end the quiz if time is 0 or questions are completed
function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.className = "gameOver";
  body.innerHTML = "Game over, You scored " + correctCount + "<br />" + "Enter your initials below: ";
  playerName();
}

function updateTime() {
  time--;
  timerEl.textContent = 'Time: ' + time;
  if (time <= 0) {
    endQuiz();
  }
}

//function to display the question and choices on screen
function displayQuestion() {

  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);

  questionEl.textContent = questions[questionIndex].question;

  multipleChoiceEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.className = ("choices-list");
    questionListItem.textContent = choices[i];
    multipleChoiceEl.append(questionListItem);
  }
}
//function to generate next question
function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  displayQuestion();
}
//verifies if quesiton is correct, deducts time if incorrect
function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 4;
      timerEl.textContent = "Time: " + time;
    }
  }
  setTimeout(nextQuestion, 1000);
}

displayQuestion();
multipleChoiceEl.addEventListener("click", checkAnswer);
