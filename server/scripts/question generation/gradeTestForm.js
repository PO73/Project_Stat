const LabQuestion = require('../../models/Lab_Questions').myLabQuestions;
const QuizQuestion = require('../../models/Quiz_Question').myQuizQuestion;

function getLabQuestions(labID){
    return new Promise((resolve, reject) => {
        LabQuestion.findAll({where: { lab_id: labID},attributes:['correct_answer', 'feedback']}) //Pull all the correct answers to each question in the lab
        .then(correctAnswers => { //Questions answers found
           resolve(correctAnswers);
        })
        .catch(error => { //Questions answers not found
            reject(null);
        })
    });
}

function getQuizQuestions(quizID){
    return new Promise((resolve, reject) => {
        QuizQuestion.findAll({where: { quiz_id: quizID}, attributes:['correct_answer']}) //Pull all the correct answers to each question in the quiz
        .then(correctAnswers => { //Questions answers found
           resolve(correctAnswers);
        })
        .catch(error => { //Questions answers not found
            console.log(error);
            reject(null);
        })
    });
}

async function gradeLabQuestions(labNumber, userAnswers) {  //Should've just pulled the options in all and looped throught them to prevent double call to DB
    var size = 0;
    for (x in userAnswers) { //Check to see if the user answered any of the questions
        size += 1;
    }
    var correctAnswers = [];
    try {
        correctAnswers = await getLabQuestions(labNumber);
    } catch (error) {
        return null;
    }
    var numCorrect = 0;
    const userFeedback = []; //Holds the feedback that will be given to the user
    if(size == 0){ //The user didn't answer any of the questions
        return null;
    }
    else{ //The user answered at least one of the questions
        for (correct in correctAnswers){
            var wasAnswered = false;
            for (userAttempt in userAnswers){
                var questionNumber = userAttempt.match(/\d/g); //Strip all no digits from the string
                questionNumber = questionNumber.join("");
                if((parseInt(correct) + 1) == questionNumber){ //User answer a particular question
                    if(correctAnswers[correct].dataValues.correct_answer.localeCompare(userAnswers[userAttempt]) == 0){ //User answered the question correctly
                        numCorrect += 1;
                        userFeedback.push([1, userAnswers[userAttempt], userAnswers[userAttempt], correctAnswers[correct].dataValues.feedback]);
                    }
                    else{ //User answered the question incorrectly
                        userFeedback.push([0, userAnswers[userAttempt], correctAnswers[correct].dataValues.correct_answer, correctAnswers[correct].dataValues.feedback]);
                    }
                    wasAnswered = true;
                    continue;
                }
            }
            if(!wasAnswered){ //User didn't answer a particular question the question
            userFeedback.push([0, "No answer was selected for this question...", "", ""]);
            }
        }
    }
    const myResultsObject = {};
    myResultsObject.feedback = userFeedback;
    myResultsObject.correct = numCorrect;
    return myResultsObject;
};

async function gradeQuizQuestions(quizNumber, userAnswers){
    var size = 0;
    for (x in userAnswers) { //Check to see if the user answered any of the questions
        size += 1;
    }

    var numCorrect = 0;
    var quizAnswers = [];
    try {
        quizAnswers = await getQuizQuestions(quizNumber); //Get the questions and their answers for the quiz
    } catch (error) {
        return null;
    }
    
    const userFeedback = []; //Holds the feedback that will be given to the user
    if(size == 0){ //The user didn't answer any of the questions
        return null;
    }
    else{ //The user answered at least one of the questions
        for (correct in quizAnswers){
            var wasAnswered = false;
            for (userAttempt in userAnswers){
                var questionNumber = userAttempt.match(/\d/g); //Strip all no digits from the string
                questionNumber = questionNumber.join("");
                if((parseInt(correct) + 1) == questionNumber){ //User answer a particular question
                    if(quizAnswers[correct].dataValues.correct_answer.localeCompare(userAnswers[userAttempt]) == 0){ //User answered the question correctly
                        numCorrect += 1;
                        userFeedback.push([1, userAnswers[userAttempt]]);
                    }
                    else{ //User answered the question incorrectly
                        userFeedback.push([0, userAnswers[userAttempt]]);
                    }
                    wasAnswered = true;
                    continue;
                }
            }
            if(!wasAnswered){ //User didn't answer a particular question the question
            userFeedback.push([0, "No answer was selected for this question...", "", ""]);
            }
        }
    }
    const myResultsObject = {};
    myResultsObject.feedback = userFeedback;
    myResultsObject.correct = numCorrect;
    return myResultsObject;
}

module.exports = {
    gradeLabQuestions,
    gradeQuizQuestions
};
