const MC = require('./questionTypeDisplays/multipleChoice');
const TorF = require('./questionTypeDisplays/trueOrFalse');
const MS = require('./questionTypeDisplays/multipleSelection');

function generateQuestions(jsonQuestions) {
    var result = "";
    for (var questionNumber in jsonQuestions) {
        if(jsonQuestions[questionNumber].QuestionType.localeCompare('MC') == 0) {
            result += MC.displayMC(questionNumber, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options);
            //result += "<div class=\"feedBack\"></div>";
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('TorF') == 0) {
            result += TorF.displayTorF(questionNumber, jsonQuestions[questionNumber].Question);
            //result += "<div class=\"feedBack\"></div>";
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('MS') == 0) {
            result += MS.displayMS(questionNumber, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options);
            //result += "<div class=\"feedBack\"></div>";
        }
        else{
            console.log("Error generating testForm");
        }
    }
    return result;
}

module.exports = {
    generateQuestions
};