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

//Section Elements for visibility control
var startQuizEl = document.querySelector("#startQuiz");
var activeQuizEl = document.querySelector("#activeQuiz");
var completeQuizEl = document.querySelector("#completeQuiz");
var quizScoresEl = document.querySelector("#quizScores");

//Header and footer Elements
var scoreLinkEl = document.querySelector("#scoreLink");
var answerWasEl = document.querySelector("#answerWas");
//Clock element is linked in startGame/start interval

//Star Quiz Elements
var startButtonEl = document.querySelector("#startButton");

//Quiz Question Elements
var quizQuestionEl = document.querySelector("#quizQuestion");
var quizChoicesEl = document.querySelector("#quizChoices");

//Quiz Complete Elements
var playerScoreEl = document.querySelector("#playerScore");
var playerInitialsEl = document.querySelector("#playerInitials");
var submitScoreEl = document.querySelector("#submitScore");

//Quiz Scores Elements
var highScoresEl = document.querySelector("#highScores");
var returnToStartEl = document.querySelector("#returnToStart");
var clearScoresEl = document.querySelector("#clearScores");

//
//Main function
//

function startGame () {
    
    //reset game variables
    gameStatus = 1;
    quizTimeLeft = quizTimeBase;
    currentQuestion = 0;
    loadHighScores()

    console.log(quizTimeLeft);

    //Call functions to build out the questions, load the first question into the HTML and make the quiz section visible
    buildQuiz();
    loadQuestion(quizQuestions[currentQuestion]);
    viewSection(activeQuizEl);

    //run the game timer
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
//Functions
//

//Build the quiz questions into an array
function buildQuiz () {
    
    console.log('buildQuiz Started');

    if (quizQuestions[0] === undefined) { //The if statement avoids adding the questions to the array in later attempts.
    
        quizQuestions.push(["Which of the following does not make a comment in HTML, CSS or JavaScript?","//","<!-- --!>","/* */","<* *>",'4']);
        
        quizQuestions.push(["Which one of these file would require a DOCTYPE in the header?","style.css","index.html","script.js","screen_shot.jpg","2"]);
        
        quizQuestions.push(["Which one of these is a type of loop in JavaScript?","Four","Do Until","Do While","loopWhile","3"]);
        
        quizQuestions.push(["To which one of these HTML elements can you attach an event listener?","<button></button>","<a></a>","<hero></hero>","All of the above","4"]);
        
        quizQuestions.push(["Why do we add comments to our code?","To make our code more readable","To get a better grade","Because I was told to","It is faster to write","1"]);
    }

    console.log(quizQuestions);
    
}

// load a specific question into the HTML
function loadQuestion (loadMe) {
    
    console.log('loadQuestions Started');
    console.log(loadMe);
    
    //clear out current question
    quizChoicesEl.innerHTML = '';

    //Populate the question
    quizQuestionEl.innerHTML = loadMe[0];
    
    //Populate player choice list in UI

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

//This function makes the viewMe section visible and all other dynamic section invisible
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

//This function handles the end of the game for time or questions answered
function endGame () {
    
    gameStatus = 0; //end the timer loop
    
    //This accounts for the game clock going to 0 before ending the game.
    if (quizTimeLeft === quizTimeBase){
        finalScore = quizTimeLeft;
    } else {
        finalScore = quizTimeLeft + 1; //Accounts for time loop, avoids -1 on time out.
    }
    
    //end the game clock
    quizTimeLeft = 0;
    document.getElementById("gameClock").innerHTML = "Game Over!";
    
    //route to entering initials if the score is greater than 0 or just to the high scores if 0 or less
    if (finalScore < 1){

        answerWasEl.textContet = "Out of time - GAME OVER"
        viewSection(quizScoresEl);

    } else {

        viewSection(completeQuizEl);
        playerScoreEl.textContent = finalScore.toString();

    }

}

//This checks the player choice against the question's correct answer
function answerQuestion (playerChoice) {

    var questionResult = 'None';
    console.log('playerChoice started!');
    console.log('playerChoice = ' + playerChoice);
    console.log('Correct Choice = ' + quizQuestions[currentQuestion][5]);

    //evaluate the answer
    if (quizQuestions[currentQuestion][5].toString() === playerChoice.toString()) {

        questionResult = 'Correct!'
        
    } else {

        questionResult = 'WRONG'
        quizTimeLeft = quizTimeLeft - 10;
        
    }
    
    //update the footer with the result
    console.log(questionResult);
    answerWasEl.textContent = questionResult;

    //if this was the last question, end the game.  Otherwise move on to the next question.
    if (currentQuestion === quizQuestions.length - 1) {
        
        endGame();

    } else {

        currentQuestion = currentQuestion + 1;
        loadQuestion(quizQuestions[currentQuestion]);

    }

}

//capture player initials and add to high score list
function submitNewScore (newScore, newInitials) {

    var newEntry = [newScore, newInitials];

    //Add to highscore list
    highScoreList.push (newEntry);
    
    //Save high scores
    saveHighScores();    
    
    //Refresh the scores in the HTML
    loadHighScores();

    //make the high score section visible
    viewSection(quizScoresEl);

    answerWasEl.textContent = 'Game Over'

}

//Save and store high score list
function saveHighScores(){

    console.log('Saving High Scores');

    //Sort the high scores numerically by score
    highScoreList.sort(function(a, b){return b[0] - a[0]});

    //save to local storage
    localStorage.setItem("scores", JSON.stringify(highScoreList));
}

//load high scores from local storage and update HTML
function loadHighScores(){

    console.log('Loading High Scores');

    //reset list

    highScoresEl.innerHTML = "";

    //load from storage

    var loadScores = localStorage.getItem("scores");

    console.log('loadScores is ' + loadScores);

    //reset highScoreList variable and repopulate with list from local storage
    highScoreList = [];

    //check to see if anything was loaded from local storage and then update the high score array
    if (loadScores !== null) {
    
        highScoreList = JSON.parse(loadScores);

    }

    //rebuild list in HTML

    if (highScoreList[0] !== undefined) {
        highScoreList.forEach(function(thisScore){

            console.log('this[0] is ' + thisScore[0]);
            console.log('this[1] is ' + thisScore[1]);

            scoreEl = document.createElement('li');
            scoreEl.textContent = thisScore[0] + " " + thisScore[1];
            highScoresEl.appendChild(scoreEl);

        });
    }
   } 

//navigate to high scores if user clicks header link
function goToScores () {

    //check to see if the game was running and end it if it was
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