const questionDisplay = require('./questionGeneration');
const Lab = require('../../models/Lab').myLab;
const LabImages = require('../../models/Lab_Images').myLabImages;
const LabQuestions = require('../../models/Lab_Questions').myLabQuestions;
const LabQuestionOptions = require('../../models/Lab_Question_Options').myLabQuestionOption;

//The below four functions can be written in a single join query (Will be refactor later)
/////////////////////////////////////////////////////////////////////////////////////
function generalLabInfo(labID){
    return new Promise((resolve, reject) => {
        Lab.findAll({where: { ID: labID }})
        .then(displayLab => { //Lab found
            var labInfo = JSON.stringify(displayLab[0].dataValues); //Return lab info in a json object
            labInfo = JSON.parse(labInfo);
            resolve(labInfo);
        })
        .catch(error => { //Lab not found
            console.log("Lab not found!");
            reject(null);
        })
    });
}

function labImages(labID){
    return new Promise((resolve, reject) => {
        LabImages.findAll({where: { LabID: labID }})
        .then(displayLab => { //Lab images found
            var labInfo = [];
            displayLab.forEach(element => {
                labInfo.push(element.dataValues.Imagepath);
            });
            resolve(labInfo);
        })
        .catch(error => { //Lab images not found
            console.log("Lab imagesnot found!");
            reject(null);
        })
    });
}

function getQuestionOptions(labID, questionNumber){
    return new Promise((resolve, reject) => {
        LabQuestionOptions.findAll({where: { LabID: labID, LabquestionID: questionNumber}})
        .then(QuestionOptions => { //Lab question's options found
            var options = [];
            QuestionOptions.forEach((element,i) => {
                options.push(element.dataValues.Text);
           });
           resolve(options);
        })
        .catch(error => { //Lab quesion's options not found
            console.log("Lab options not found!");
            reject(null);
        })
    });
}

function getQuestions(labID){
    return new Promise((resolve, reject) => {
        LabQuestions.findAll({where: { LabID: labID }, order: [['Order', 'ASC']]})
        .then(displayLab => { //Lab questions found
            var questionSet = {};
            displayLab.forEach(element => {
                questionSet[element.dataValues.Order] = {};
                questionSet[element.dataValues.Order].QuestionType = element.dataValues.Questiontype;
                questionSet[element.dataValues.Order].Question = element.dataValues.Question;
            });
            resolve(questionSet);
        })
        .catch(error => { //Lab quesions not found
            reject(null);
        })
    });
}
/////////////////////////////////////////////////////////////////////////////////////


async function generateStudentLab (labID)  {  
    var returnThis = [];
    try {
        var defualtLabInfo = await generalLabInfo(labID); //Pull the default lab info for the display
        defualtLabInfo.LabImagePaths = await labImages(labID); //Pull the images that will be used in this lab
        defualtLabInfo.Questions = await getQuestions(labID); //Pull the question, order, and type
        for (var questionNumber in defualtLabInfo.Questions) {
            if (defualtLabInfo.Questions.hasOwnProperty(questionNumber)) {
                defualtLabInfo.Questions[questionNumber].Options = await getQuestionOptions(labID, questionNumber, defualtLabInfo); //Pull the question options
            }
        }
        var display = questionDisplay.generateQuestions(defualtLabInfo.Questions);
        
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