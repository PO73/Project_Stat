const MC = require('./questionTypeDisplays/multipleChoice');
const TorF = require('./questionTypeDisplays/trueOrFalse');
const MS = require('./questionTypeDisplays/multipleSelection');

function generateQuestions(jsonQuestions) {
    var result = [];
    for (var questionNumber in jsonQuestions) {
        if(jsonQuestions[questionNumber].QuestionType.localeCompare('MC') == 0) {
            result.push(MC.displayMC(questionNumber, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options));
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('TorF') == 0) {
            result.push(TorF.displayTorF(questionNumber, jsonQuestions[questionNumber].Question));
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('MS') == 0) {
            result.push(MS.displayMS(questionNumber, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options));
        }
        else{
            console.log("Error generating testForm");
        }
    }
    return result;
}

function showJustQuestion(jsonQuestions){
    var result = [];
    for (var questionNumber in jsonQuestions) {
        var displayString = "<div id=\"questionDisplay\">" + questionNumber + ". " + jsonQuestions[questionNumber].Question + "<br></div>";
        result.push(displayString);
    }
    return result;
}

module.exports = {
    generateQuestions,
    showJustQuestion
};