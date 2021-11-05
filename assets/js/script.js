//
//Global Variables
//

var quizTimeBase = 60; //Time in Seconds for the quiz
var quizTimeLeft = 0; //Time left in Seconds
var currentQuestion = 0; // Current Question
var quizQuestions = []; //A list of questions

//HTML Element Variables

//Global Elements
var gameClockEl = window.document.querySElector("#gameClock");
var startQuizEl = window.document.querySElector("#startQuiz");
var activeQuizEl = window.document.querySElector("#activeQuiz");
var completeQuizEl = window.document.querySElector("#completeQuiz");
var quizScoresEl = window.document.querySElector("#quizScores");

//Quiz Question Elements
var quizQuestionEl = window.document.querySElector("#quizQuestion");
var quizChoicesEl = window.document.querySElector("#quizChoices");
var answerWasEl = window.document.querySElector("#answerWas");

//Quiz Complete Elements
var playerScoreEl = window.document.querySElector("#playerScore");
var playerInitialsEl = window.document.querySElector("#playerInitials");

//Quiz Scores Elements
var highScoresEl = window.document.querySElector("#playerhighScores");

//
//Code
//

//The Questions class for creating multiple questions

function questionOBJ(qText,c1,c2,c3,c4,qAnswer) {
    
    //Defining the properties of the question object
    this.qText = qText;
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.c4 = c4;
    this.qAnswer = qAnswer;

    //Public Functions of the questionOBJ
    return {
        getQuestion : function() {
            var returnMe = [this.qText, this.c1, this.c2, this.c3, this.c4];
            return returnMe;
        },

        checkAnswer : function(answerNum){
            if (answerNum === this.qAnswer) {
                return "Correct"
            } else {
                return "Incorrect"
            }
        }
    }
}

function buildQuiz () {
    //initiate questions
    quizQuestions.push(questionOBJ("Why","Why Not","Because","I said so","Well, you know",1));
    quizQuestions.push(questionOBJ("When","Later","Not Now","Sometime","Tomrrow",2));
    quizQuestions.push(questionOBJ("How","Easy","Hard","How come?","now brown cow",4));
    quizQuestions.push(questionOBJ("What","for","matters","I said","goes around",3));
    quizQuestions.push(questionOBJ("Where","There","Here","Somewhere","for",4));
        
}

function loadQuestion (loadMe) {
    //clear out current question
    quizChoicesEl.innerHTML = '';

    //build out new question and choices
    quizQuestionEl.innerHTML = loadMe.qText;
    c1El = document.createElement('li', loadMe.c1);
    c1El.parentElement('quizChoicesEl');
    c2El = document.createElement('li', loadMe.c2);
    c2El.parentElement('quizChoicesEl');
    c3El = document.createElement('li', loadMe.c3);
    c3El.parentElement('quizChoicesEl');
    c4El = document.createElement('li', loadMe.c4);
    c4El.parentElement('quizChoicesEl');
    
    
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
}

function runQuiz () {
    //reset variables
    quizTimeLeft = quizTimeBase;
    currentQuestion = 0;

    loadQuestion(quizQuestions[currentQuestion]);
    viewSection(activeQuizEl);
    //startTimer();
    
}