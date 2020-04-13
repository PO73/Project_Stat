const LabQuestionOptions = require('../../models/Lab_Question_Options').myLabQuestionOption;

//Pull each question's options to check to see if the user answered the questions correctly
function getQuestionOptions(labID, questionNumber){
    return new Promise((resolve, reject) => {
        LabQuestionOptions.findAll({where: { LabID: labID, LabquestionID: questionNumber, Correctanswer: 1}})
        .then(QuestionOptions => { //Lab question's options found        
            var isCorrect = [];
            QuestionOptions.forEach((element,i) => {
                isCorrect.push(element.dataValues.Order);
                isCorrect.push(element.dataValues.Feedback);
           });
           resolve(isCorrect);
        })
        .catch(error => { //Lab quesion's options not found
            reject(null);
        })
    });
}

async function gradeQuestions(labNumber, userAnswers) {  
    const checkTheseAnswers = userAnswers.userSelectedAnswers;
    for (var UQ in checkTheseAnswers) {
        var components = checkTheseAnswers[UQ].split("_");
        if(components.length != 4){ //User has edited HTML code before sending request
            return null; 
        }

        try {
            var correctAnswer = await getQuestionOptions(labNumber, components[1]);
            if(correctAnswer[0] == components[3]){
                console.log("Correct");
            } else{
                console.log("Incorrect");
            }
        }
        catch (error) {
            console.log("!@");
            return null;
        }
    }
};

module.exports = {
    gradeQuestions
};