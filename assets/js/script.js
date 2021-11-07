//
//Global Variables
//

var quizTimeBase = 120; //Time in Seconds for the quiz
var quizTimeLeft = 0; //Time left in Seconds
var currentQuestion = 0; // Current Question
var quizQuestions = []; //A list of questions
var finalScore = 0; //The players score after the game ends
var gameStatus = 0; //Is the game active?
var highScoreList = []; //A list of high scores.


//HTML Element Variables

//Global Elements
var startQuizEl = document.querySelector("#startQuiz");
var activeQuizEl = document.querySelector("#activeQuiz");
var completeQuizEl = document.querySelector("#completeQuiz");
var quizScoresEl = document.querySelector("#quizScores");

//Header Elements
var scoreLinkEl = document.querySelector("#scoreLink");
//Clock element is linked in startGame/start interval

//Star Quiz Elements
var startButtonEl = document.querySelector("#startButton");

//Quiz Question Elements
var quizQuestionEl = document.querySelector("#quizQuestion");
var quizChoicesEl = document.querySelector("#quizChoices");
var answerWasEl = document.querySelector("#answerWas");

//Quiz Complete Elements
var playerScoreEl = document.querySelector("#playerScore");
var playerInitialsEl = document.querySelector("#playerInitials");
var submitScoreEl = document.querySelector("#submitScore");

//Quiz Scores Elements
var highScoresEl = document.querySelector("#highScores");
var returnToStartEl = document.querySelector("#returnToStart");
var clearScoresEl = document.querySelector("#clearScores");

//
//Start
//

function startGame () {
    gameStatus = 1;
    quizTimeLeft = quizTimeBase;
    currentQuestion = 0;
    loadHighScores()

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
}

//
//Functions n' Things
//

function buildQuiz () {
    
    console.log('buildQuiz Started');

    if (quizQuestions[0] === undefined) {
    quizQuestions.push(["Why","Why Not","Because","I said so","Well, you know",'1']);
    quizQuestions.push(["When","Later","Not Now","Sometime","Tomrrow","2"]);
    quizQuestions.push(["How","Easy","Hard","How come?","now brown cow","3"]);
    quizQuestions.push(["What","for","matters","I said","goes around","4"]);
    quizQuestions.push(["Where","There","Here","Somewhere","for","1"]);
    }

    console.log(quizQuestions);
    
}

function loadQuestion (loadMe) {
    console.log('loadQuestions Started');
    console.log(loadMe);
    
    //clear out current question
    quizChoicesEl.innerHTML = '';

    //build out new question and choices
    quizQuestionEl.innerHTML = loadMe[0];
    
    //Populate question list in UI

    c1El = document.createElement('li');
    c1El.textContent = loadMe[1];
    c1El.id = 'c1';
    c1El.addEventListener("click", function() {

        answerQuestion(1);
    
    });
    quizChoicesEl.appendChild(c1El);

    c2El = document.createElement('li');
    c2El.textContent = loadMe[2];
    quizChoicesEl.appendChild(c2El);
    c2El.id = 'c2';
    c2El.addEventListener("click", function() {

        answerQuestion(2);
    
    });

    c3El = document.createElement('li');
    c3El.textContent = loadMe[3];
    quizChoicesEl.appendChild(c3El);
    c3El.id = 'c3';
    c3El.addEventListener("click", function() {

        answerQuestion(3);
    
    });

    c4El = document.createElement('li');
    c4El.textContent = loadMe[4];
    quizChoicesEl.appendChild(c4El);
    c4El.id = 'c1';
    c4El.addEventListener("click", function() {

        answerQuestion(4);
    
    });     
    
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
    
    if (finalScore === 0){

        viewSection(quizScoresEl);

    } else {

        viewSection(completeQuizEl);
        playerScoreEl.textContent = finalScore.toString();

    }

}

function answerQuestion (playerChoice) {

    var questionResult = 'None';
    console.log('playerChoice started!');
    console.log('playerChoice = ' + playerChoice);
    console.log('Correct Choice = ' + quizQuestions[currentQuestion][5]);

    if (quizQuestions[currentQuestion][5].toString() === playerChoice.toString()) {

        questionResult = 'Correct!'
        
    } else {

        questionResult = 'WRONG'
        quizTimeLeft = quizTimeLeft - 10;
        
    }
    
    console.log(questionResult);
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

    answerWasEl.textContent = 'Game Over'

}

function saveHighScores(){

    console.log('Saving High Scores');
    highScoreList.sort(function(a, b){return b[0] - a[0]});
    localStorage.setItem("scores", JSON.stringify(highScoreList));
}

function loadHighScores(){

    console.log('Loading High Scores');

    //reset list

    highScoresEl.innerHTML = "";

    //load from storage

    var loadScores = localStorage.getItem("scores");

    console.log('loadScores is ' + loadScores);

    highScoreList = [];
    highScoreList = JSON.parse(loadScores);

    //rebuild list

    highScoreList.forEach(function(thisScore){

        console.log('this[0] is ' + thisScore[0]);
        console.log('this[1] is ' + thisScore[1]);

        scoreEl = document.createElement('li');
        scoreEl.textContent = thisScore[0] + " " + thisScore[1];
        highScoresEl.appendChild(scoreEl);

    });
   } 

function goToScores () {

    if (quizTimeLeft > 0) {
    
        console.log("goToScores is running");
        answerWasEl.textContent = "High Scores";
        quizTimeLeft = 0;
        
    } else {

        loadHighScores();
        viewSection(quizScoresEl);

    }
    
}

//
// Event Listeners
//

submitScoreEl.addEventListener("click", function() {
    
    console.log("player initials are: " + playerInitialsEl.value);

    submitNewScore(finalScore, playerInitialsEl.value);

});

startButtonEl.addEventListener("click",function(){

    startGame();

});

returnToStartEl.addEventListener("click",function(){

    viewSection(startQuizEl);
    answerWasEl.textContent = "";

});

clearScoresEl.addEventListener("click",function(){

    highScoreList = [];
    saveHighScores();
    loadHighScores();

});

scoreLinkEl.addEventListener("click",function(){

    goToScores();
    
});