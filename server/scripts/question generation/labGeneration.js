const questionDisplay = require('./questionGeneration').generateQuestions;
const Lab = require('../../models/Lab').myLab;
const LabImages = require('../../models/Lab_Images').myLabImages;
const LabQuestions = require('../../models/Lab_Questions').myLabQuestions;

function generalLabInfo(labID){
    return new Promise((resolve, reject) => {
        Lab.findAll({where: { ID: labID }})
        .then(displayLab => { //Lab found
            var labInfo = JSON.stringify(displayLab[0].dataValues); //Return lab info in a json object
            labInfo = JSON.parse(labInfo);
            resolve(labInfo);
        })
        .catch(error => { //Lab not found
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
            reject(null);
        })
    });
}

function getQuestions(labID){
    return new Promise((resolve, reject) => {
        LabQuestions.findAll({where: { LabID: labID }})
        .then(displayLab => { //Lab questions found
            console.log(displayLab.length);
            resolve(labInfo);
        })
        .catch(error => { //Lab quesions not found
            reject(null);
        })
    });
}

async function generateStudentLab (labID)  {  
    try {
        var defualtLabInfo = await generalLabInfo(labID); //Pull the default lab info for the display
        defualtLabInfo.LabImagePaths = await labImages(labID); //Pull the images that will be used in this lab
        defualtLabInfo.Questions = await getQuestions(labID);

        console.log(defualtLabInfo);

        //defualtLabInfo["Questions"] = questionDisplay(labID);
    } catch (error) {
        console.log(error);
    }   
    return null;
}

async function generateTeacherLab (req, res) {
    try {
        var defualtLabInfo = await generalLabInfo(labID); //Pull the default lab info for the display
        console.log(defualtLabInfo);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    generateStudentLab,
    generateTeacherLab
};