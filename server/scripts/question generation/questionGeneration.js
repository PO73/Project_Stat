const MC = require('./questionTypeDisplays/multipleChoice');
const TorF = require('./questionTypeDisplays/trueOrFalse');
const MS = require('./questionTypeDisplays/multipleSelection');

function generateQuestions(jsonQuestions) {
    var result = [];
    for (var questionNumber in jsonQuestions) {

        if(jsonQuestions[questionNumber].QuestionType.localeCompare('MC') == 0) {
            var order = -1;
            (jsonQuestions[questionNumber].Order) ? order = jsonQuestions[questionNumber].Order : order = questionNumber;

            if(jsonQuestions[questionNumber].Images != null){
                result.push(MC.displayMC(order, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options, jsonQuestions[questionNumber].Images));
            } else{
                result.push(MC.displayMC(order, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options, null));
            }
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('TorF') == 0) {
            var order = -1;
            (jsonQuestions[questionNumber].Order) ? order = jsonQuestions[questionNumber].Order : order = questionNumber;

            if(jsonQuestions[questionNumber].Images != null){
                result.push(TorF.displayTorF(order, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Images));
            } else{
                result.push(TorF.displayTorF(order, jsonQuestions[questionNumber].Question, null));
            }
            
        }
        else if(jsonQuestions[questionNumber].QuestionType.localeCompare('MS') == 0) {
            var order = -1;
            (jsonQuestions[questionNumber].Order) ? order = jsonQuestions[questionNumber].Order : order = questionNumber;

            if(jsonQuestions[questionNumber].Images != null){
                result.push(MS.displayMS(order, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options, jsonQuestions[questionNumber].Images));
            } else{
                result.push(MS.displayMS(order, jsonQuestions[questionNumber].Question, jsonQuestions[questionNumber].Options, null));
            }
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
        var order = -1;
        (jsonQuestions[questionNumber].Order) ? order = jsonQuestions[questionNumber].Order : order = questionNumber;

        var displayString = "<div id=\"questionDisplay\">" + order + ". " + jsonQuestions[questionNumber].Question + "<br></div>";
        result.push(displayString);
    }
    return result;
}

module.exports = {
    generateQuestions,
    showJustQuestion
};