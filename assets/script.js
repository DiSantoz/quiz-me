// timer DOM element
var timerEl = document.querySelector("#timer");
// question DOM element
var questionEl = document.querySelector("#question");
// choices DOM element (multiple choice)
var choicesEl = document.querySelector("#choices");
// results DOM element (correct or incorrect)
var resultEl = document.querySelector("#result");

var questionIndex = 0;
var highScore = 0;

var time = 20;
var intervalId;


// array of all questions
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
];

// function to display question from array
function displayQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalId = setInterval(updateTime, 1000);

    questionEl.textContent = questions[questionIndex].question;

    choicesEl.innerHTML = "";
    resultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        choicesEl.append(questionListItem);
    }
}
// next question will display as long as timer is not 0 or no questions remain
function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        endQuiz();
    }
    displayQuestion();
}

// verify if question is correct or incorrect and increase score or decrease time
function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            resultEl.textContent = "Correct";
            highScore++;
        } else {
            resultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

// function to end the quiz and show score
function endQuiz() {
    clearInterval(intervalId);
    document.body.innerHTML = "Game over, You scored " + highScore;
}
// time will decrease by 1 second
function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

displayQuestion();
choicesEl.addEventListener("click", checkAnswer);