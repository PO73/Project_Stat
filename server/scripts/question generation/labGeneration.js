const questionDisplay = require('./questionGeneration');
const Lab = require('../../models/Lab').myLab;
const LabQuestion = require('../../models/Lab_Questions').myLabQuestions;
const LabQuestionOption = require('../../models/Option_Set').myOption;

function generateLab(labID){
    return new Promise((resolve, reject) => {
        Lab.findAll({where: { ID: labID }, attributes: ['title', 'research_scenario', 'directions', 'image_path'],
                        include:[{model: LabQuestion, attributes:['text', 'order', 'question_type', 'option_set']}]
                    })
        .then(info => { //Found Lab
            resolve(info);
        })
        .catch(error => { //Didn't find lab
            reject(null);
        })
    });
}

function LabQuestionSetup(optionSet){
    return new Promise((resolve, reject) => {
        LabQuestionOption.findAll({where: {setID: optionSet}, attributes:['text']})
        .then(LabOptions => {
            var question = []
            for (x in LabOptions) {
                question.push(LabOptions[x].dataValues.text);
            }
            resolve(question);
        })
        .catch(error => {
            reject(null);
        })
    });
}

function LabAnswers(labID){
    return new Promise((resolve, reject) => {
        LabQuestion.findAll({where: { lab_id: labID }, attributes: ['correct_answer', 'feedback']})
        .then(info => { //Found Lab
            resolve(info);
        })
        .catch(error => { //Didn't find lab
            reject(null);
        })
    });
}

async function generateStudentLab (labID)  {  
    var returnThis = [];
    try {
        var labInfo = await generateLab(labID);
        labInfo = labInfo[0].dataValues;
        var questions = labInfo['lab questions'];

        returnThis.push(labInfo.title);
        returnThis.push(labInfo.research_scenario);
        returnThis.push(labInfo.directions);
        returnThis.push(labInfo.image_path);
        var questionSet = [];
        for(var i = 0; i < questions.length; ++i){
            var questionObject = questions[i].dataValues;
            var myJson = {};
            myJson.QuestionType = questionObject.question_type;
            myJson.Question = questionObject.text;
            myJson.Order = questionObject.order;
            try {
                myJson.Options = await LabQuestionSetup(questionObject.option_set);
            } catch (error) {
                return null;
            }
            questionSet.push(myJson);
        }
        var displayThis = questionDisplay.generateQuestions(questionSet);
        returnThis.push(displayThis);
        return returnThis;
    } catch (error) {
        return null;
    }
}

async function generateTeacherLab (labID) {
    var displayKey = {};
    displayKey.StudentView = await generateStudentLab(labID);
    displayKey.TeacherQuestions = await displaySubmittedLab(labID);
    var labInfo = await LabAnswers(labID);
    var info = [];
    for (var i = 0; i<labInfo.length; ++i){
        var temp = [2];
        temp[0] = (labInfo[i].dataValues.correct_answer);
        temp[1] = (labInfo[i].dataValues.feedback);
        info.push(temp);
    }
    displayKey.TeacherQuestionKey = info;
    return displayKey;
}


async function displaySubmittedLab(labID){
    var returnThis = [];
    try {
        var labInfo = await generateLab(labID);
        labInfo = labInfo[0].dataValues;
        var questions = labInfo['lab questions'];

        returnThis.push(labInfo.title);
        returnThis.push(labInfo.research_scenario);
        returnThis.push(labInfo.directions);
        returnThis.push(labInfo.image_path);
        var questionSet = [];
        for(var i = 0; i < questions.length; ++i){
            var questionObject = questions[i].dataValues;
            var myJson = {};
            myJson.QuestionType = questionObject.question_type;
            myJson.Question = questionObject.text
            myJson.Order = questionObject.order;
            questionSet.push(myJson);
        }
        var displayThis = questionDisplay.showJustQuestion(questionSet);
        returnThis.push(displayThis);
        return returnThis;
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateStudentLab,
    generateTeacherLab,
    displaySubmittedLab
};