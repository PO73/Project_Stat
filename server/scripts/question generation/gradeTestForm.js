const LabQuestionOptions = require('../../models/Lab_Question_Options').myLabQuestionOption;

function getLabQuestions(labID){
    return new Promise((resolve, reject) => {
        LabQuestionOptions.findAll({where: { LabID: labID, Correctanswer: 1}}) //Pull all the correct answers to each question in the lab
        .then(QuestionOptions => { //Questions answers found
            var isCorrect = [];
            var info = [];
            QuestionOptions.forEach(element => {
                info.push(element.dataValues.LabquestionID);
                info.push(element.dataValues.Feedback);
                info.push(element.dataValues.Text);
                isCorrect.push(info);
                info = [];
           });
           resolve(isCorrect);
        })
        .catch(error => { //Questions answers not found
            reject(null);
        })
    });
}

function getFeedback(labID, questionNumber, textFromClient){
    return new Promise((resolve, reject) => {
        LabQuestionOptions.findAll({where: { LabID: labID, Order: questionNumber, Text: textFromClient}}) //Pull the answer the user selected from the DB
        .then(QuestionOptions => { //Questions answers found
            var isCorrect = [];
            var info = [];
            QuestionOptions.forEach(element => {
                info.push(element.dataValues.Correctanswer);
                info.push(element.dataValues.Feedback);
                info.push(element.dataValues.Text);
                isCorrect.push(info);
                info = [];
           });
           resolve(isCorrect);
        })
        .catch(error => { //Questions answers not found
            reject(null);
        })
    });
}

async function gradeQuestions(labNumber, userAnswers) {  //Should've just pulled the options in all and looped throught them to prevent double call to DB
    var size = 0;
    for (x in userAnswers) { //Check to see if the user answered any of the questions
        size += 1;
    }

    var correctAnswers = await getLabQuestions(labNumber);

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
                if(correctAnswers[correct][0] == questionNumber){ //User answer a particular question
                    if(correctAnswers[correct][2].localeCompare(userAnswers[userAttempt]) == 0){ //User answered the question correctly
                        userFeedback.push([1, userAnswers[userAttempt], userAnswers[userAttempt], correctAnswers[correct][1]]);
                    }
                    else{ //User answered the question incorrectly
                        userFeedback.push([0, userAnswers[userAttempt], correctAnswers[correct][2], correctAnswers[correct][1]]);
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
    return userFeedback;
};

module.exports = {
    gradeQuestions
};
