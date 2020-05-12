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
            myJson.Question = questionObject.text
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

async function generateTeacherLab (req, res) {
    try {
        var defualtLabInfo = await generalLabInfo(labID); //Pull the default lab info for the display
        console.log(defualtLabInfo);
    } catch (error) {
        console.log(error);
    }
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

    var returnThis = [];
    try {
        var defualtLabInfo = await generalLabInfo(labID); //Pull the default lab info for the display
        defualtLabInfo.LabImagePaths = await labImages(labID); //Pull the images that will be used in this lab
        defualtLabInfo.Questions = await getQuestions(labID); //Pull the question, order, and type

        var display = questionDisplay.showJustQuestion(defualtLabInfo.Questions);
        
        returnThis.push(defualtLabInfo.Title);
        returnThis.push(defualtLabInfo.Researchscenario);
        returnThis.push(defualtLabInfo.Directions);
        returnThis.push(defualtLabInfo.LabImagePaths);
        returnThis.push(display);
    } catch (error) {
        console.log(error);
        returnThis = null;
    }   
    return returnThis;
}

module.exports = {
    generateStudentLab,
    generateTeacherLab,
    displaySubmittedLab
};