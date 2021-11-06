//
//Global Variables
//

var quizTimeBase = 120; //Time in Seconds for the quiz
var quizTimeLeft = 0; //Time left in Seconds
var currentQuestion = 0; // Current Question
var quizQuestions = []; //A list of questions
var finalScore = 0;
var gameStatus = 0;
var highScoreList = [];

//HTML Element Variables

//Global Elements
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
var submitScoreEl = document.querySelector("#submitScore");

//Quiz Scores Elements
var highScoresEl = document.querySelector("#playerhighScores");

//
//Start
//

gameStatus = 1;
quizTimeLeft = quizTimeBase;

console.log(quizTimeLeft);

buildQuiz();
loadQuestion(quizQuestions[currentQuestion]);
viewSection(activeQuizEl);
var timer = setInterval(function() {

  
    if (quizTimeLeft >= 0 && gameStatus === 1) {
    
        document.getElementById("gameClock").innerHTML = quizTimeLeft.toString();
        quizTimeLeft = quizTimeLeft - 1;
    
    } else if (gameStatus ===1) {

        endGame();        

    } else {
       // Nothing
    }
    
}, 1000);

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


function endGame () {
    
    gameStatus = 0; //end the timer loop
    
    if (quizTimeLeft === quizTimeBase){
        finalScore = quizTimeLeft;
    } else {
        finalScore = quizTimeLeft + 1; //Accounts for time loop, avoids -1 on time out.
    }
    
    quizTimeLeft = 0;
    document.getElementById("gameClock").innerHTML = "Game Over!";
    viewSection(completeQuizEl);
    playerScoreEl.textContent = finalScore.toString();

}

function answerQuestion (playerChoice) {

    var questionResult = 'None';
    console.log(playerChoice);
    console.log(quizQuestions[currentQuestion][5].toString);

    if (quizQuestions[currentQuestion][5] === playerChoice) {

        questionResult = 'Correct!'

    } else {

        questionResult = 'WRONG'
        quizTimeLeft = quizTimeLeft - 10;
        
    }
    
    answerWasEl.textContent = questionResult;

    if (currentQuestion === quizQuestions.length - 1) {
        
        endGame();

    } else {

        currentQuestion = currentQuestion + 1;
        loadQuestion(quizQuestions[currentQuestion]);

    }

}

function submitNewScore (newScore, newInitials) {

    var newEntry = [newScore, newInitials];

    highScoreList.push (newEntry);
    saveHighScores();
    loadHighScores();

    viewSection(quizScoresEl);

}

function saveHighScores(){

    console.log('Saving High Scores');

}

function loadHighScores(){

    console.log('Loading High Scores');

}

//
// Event Listeners
//

quizChoicesEl.addEventListener("click", function() {

    answerQuestion(1);

});

submitScoreEl.addEventListener("click", function() {

    submitNewScore(finalScore);

});
