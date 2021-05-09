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
  
  function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
  }
  
  function updateTime() {
    time--;
    timerEl.textContent = 'Time: ' + time;
    if (time <= 0) {
      endQuiz();
    }
  }
  
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
  
  function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
      time = 0;
    }
    displayQuestion();
  }
  
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
    setTimeout(nextQuestion, 2000);
  }
  
  displayQuestion();
  multipleChoiceEl.addEventListener("click", checkAnswer);
  