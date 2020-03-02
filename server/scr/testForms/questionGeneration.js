const MC = require('./questionTypeDisplays/multipleChoice');
const TorF = require('./questionTypeDisplays/trueOrFalse');
const MS = require('./questionTypeDisplays/multipleSelection');

function getQuestions(questionSetID){
    var jsonQuestions = [{}];

    //Pull all questions types (MC, MS, TorF) that are assigned to the questionSetID. Store info in a json object
    //Pull optionalAnswerID from each question type table at the given questionSetID
    //Pull all possible answer options from the optionalAnswer table at optionalAnswerID
    //Use info retrieved above to populate a json object like below
    jsonQuestions = [
        { "Question Type": "MC", "Question Number": 1, "Question": "2 + 2 = ?", "Question Options": ["-4", "10", "4", "2"] },
        { "Question Type": "TorF", "Question Number": 2, "Question": "10 * 10 = 100, true or false?" },
        { "Question Type": "MS", "Question Number": 3, "Question": "Pick all the even numbers from the list below:", "Question Options": ["13", "2", "4", "9", "17"] }
    ];

    return jsonQuestions;
}

const generateQuestions = (questionSetID) => {
    var result = "";

    var jsonQuestions = getQuestions(questionSetID); //Pull all question info

    jsonQuestions.forEach(element => {
        if(element["Question Type"].localeCompare("MC") == 0) {
            result += MC.displayMC(element["Question Number"], element["Question"], element["Question Options"]);
        }
        else if(element["Question Type"].localeCompare("TorF") == 0) {
            result += TorF.displayTorF(element["Question Number"], element["Question"]);
        }
        else if(element["Question Type"].localeCompare("MS") == 0) {
            result += MS.displayMS(element["Question Number"], element["Question"], element["Question Options"]);
        }
        else{
            console.log("Error generating testForm");
        }
    });
    return result;
}

module.exports = {
    generateQuestions
};