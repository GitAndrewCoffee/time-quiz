//Global Variables
var quizTimeBase = 120; //Time in Seconds for the quiz
var quizTimeLeft = 0; //Time left in Seconds
var quizCorrect = 0; //Number of correct answers
var quizQuestions = []; //A list of questions

//The Questions Object for creating multiple questions

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
        }

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
    
    //reset variables
    quizTimeLeft = quizTimeBase;
    quizCorrect = 0;
}

function runQuiz () {
       
    for (i = 0; i < quizQuestions.length; i++) {

        loopBreaker = 0;

        do {

        } while (loopBreak = 0);

    }
}