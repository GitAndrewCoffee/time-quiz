//
//Global Variables
//

var quizTimeBase = 60; //Time in Seconds for the quiz
var quizTimeLeft = 0; //Time left in Seconds
var currentQuestion = 0; // Current Question
var quizQuestions = []; //A list of questions

//HTML Element Variables

//Global Elements
var gameClockEl = document.querySelector("#gameClock");
var startQuizEl = document.querySelector("#startQuiz");
var activeQuizEl = document.querySelector("#activeQuiz");
var completeQuizEl = document.querySelector("#completeQuiz");
var quizScoresEl = document.querySelector("#quizScores");

//Quiz Question Elements
var quizQuestionEl = document.querySelector("#quizQuestion");
var quizChoicesEl = document.querySelector("#quizChoices");
var answerWasEl = document.querySelector("#answerWas");

//Quiz Complete Elements
var playerScoreEl = document.querySelector("#playerScore");
var playerInitialsEl = document.querySelector("#playerInitials");

//Quiz Scores Elements
var highScoresEl = document.querySelector("#playerhighScores");

//
//Start
//

buildQuiz();
loadQuestion(quizQuestions[currentQuestion]);
viewSection(activeQuizEl);

//
//Functions n' Things
//

function buildQuiz () {
    console.log('buildQuiz Started');
    
    //initiate questions
    quizQuestions.push(["Why","Why Not","Because","I said so","Well, you know",'1']);
    quizQuestions.push(["When","Later","Not Now","Sometime","Tomrrow","2"]);
    quizQuestions.push(["How","Easy","Hard","How come?","now brown cow","4"]);
    quizQuestions.push(["What","for","matters","I said","goes around","3"]);
    quizQuestions.push(["Where","There","Here","Somewhere","for","4"]);
        
    console.log(quizQuestions);
}

function loadQuestion (loadMe) {
    console.log('loadQuestions Started');
    console.log(loadMe);
    
    //clear out current question
    quizChoicesEl.innerHTML = '';

    //build out new question and choices
    quizQuestionEl.innerHTML = loadMe[0];
    c1El = document.createElement('li');
    c1El.textContent = loadMe[1];
    quizChoicesEl.appendChild(c1El);
    c2El = document.createElement('li');
    c2El.textContent = loadMe[2];
    quizChoicesEl.appendChild(c2El);
    c3El = document.createElement('li');
    c3El.textContent = loadMe[3];
    quizChoicesEl.appendChild(c3El);
    c4El = document.createElement('li');
    c4El.textContent = loadMe[4];
    quizChoicesEl.appendChild(c4El);
    
    
}

function viewSection (viewMe) {
    
    //Add inactiveSection CSS to hide sections
    startQuizEl.classList.add("inactiveSection");
    activeQuizEl.classList.add("inactiveSection");
    completeQuizEl.classList.add("inactiveSection");
    quizScoresEl.classList.add("inactiveSection");
    
    //Remove activeSection CSS
    startQuizEl.classList.remove("activeSection");
    activeQuizEl.classList.remove("activeSection");
    completeQuizEl.classList.remove("activeSection");
    quizScoresEl.classList.remove("activeSection");

    //Make viewMe an activeSection
    viewMe.classList.add("activeSection");
    viewMe.classList.remove("inactiveSection");
}

function runQuiz () {
    //reset variables
    quizTimeLeft = quizTimeBase;
    currentQuestion = 0;

    loadQuestion(quizQuestions[currentQuestion]);
    viewSection(activeQuizEl);
    //startTimer();
    
}