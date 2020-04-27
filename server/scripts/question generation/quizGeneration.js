const Quiz = require('../../models/Quiz').myQuiz;
const QuizSection = require('../../models/Quiz_Section').myQuizSection;
const QuizSectionInstructions = require('../../models/Quiz_Section_Instructions').myQuizSectionInstructions;
const QuizQuestions = require('../../models/Quiz_Question').myQuizQuestion;
const QuizQuestionOptions = require('../../models/Quiz_Question_Options').myQuizQuestionOptions;
const questionDisplay = require('./questionGeneration');

//The below functions can be written in a single join query (Will be refactor later if time permits)
/////////////////////////////////////////////////////////////////////////////////////
function generalQuizInfo(quizID){
    return new Promise((resolve, reject) => {
        Quiz.findAll({where: { ID: quizID }})
        .then(displayQuiz => { //Quiz found
            var quizTitle = displayQuiz[0].dataValues.Title;
            resolve(quizTitle);
        })
        .catch(error => { //Quiz not found
            reject(null);
        })
    });
}

function getQuestionOptions(questionID, quizID){
    return new Promise((resolve, reject) => {
        QuizQuestionOptions.findAll({where: { QuestionID: questionID, QuizID: quizID }})
        .then(QuestionsOptions => { //Get all question options 
            var question = [];
            for (x in QuestionsOptions) {
                question.push(QuestionsOptions[x].dataValues.Text);
            }
            resolve(question);
        })
        .catch(error => { //Failed to get all question options
            reject(null);
        })
    });
}

function getQuestions(sectionID, instrictionID, showOptions, quizID){
    return new Promise((resolve, reject) => {
        QuizQuestions.findAll({where: { QuizsectionID: sectionID, QuizsectioninstructionID: instrictionID }, order: [['Order', 'ASC']]})
        .then(async (Questions) => { //Get all the questions in a section
            var jsonQuestion = [];
            for (x in Questions) {
                tempJson = {};
                tempJson.QuestionType = Questions[x].dataValues.Questiontype;
                tempJson.Question = Questions[x].dataValues.Text;
                tempJson.Images = Questions[x].dataValues.Imagepath;
                tempJson.Order = Questions[x].dataValues.Order;
                if(!showOptions){
                    tempJson.Options = await getQuestionOptions(Questions[x].dataValues.Order, quizID);
                }
                jsonQuestion.push(tempJson);
            }
            var display = [];
            if(!showOptions){
                display = questionDisplay.generateQuestions(jsonQuestion);
            }
            else{
                display = questionDisplay.showJustQuestion(jsonQuestion);
            }
            resolve(display);
        })
        .catch(error => { //Failed to get the questions for a section
            reject(null);
        })
    });
}

function getSectionInstructions(sectionID, showOptions, quizID){
    return new Promise((resolve, reject) => {
        QuizSectionInstructions.findAll({where: { QuizsectionID: sectionID }})
        .then(async (SI) => { //Section instructions found
            var myInstruct = {};
            for (x in SI) {
                myInstruct[SI[x].dataValues.ID] = { };
                myInstruct[SI[x].dataValues.ID].Title = SI[x].dataValues.Instructiontext;
                myInstruct[SI[x].dataValues.ID].Questions = await getQuestions(sectionID, SI[x].dataValues.ID, showOptions, quizID);
            }
            resolve(myInstruct);
        })
        .catch(error => { //Section instructions not found
            reject(null);
        })
    });
}

async function sectionQuizInfo(quizID, showOptions){
    return new Promise((resolve, reject) => {
        QuizSection.findAll({where: { QuizID: quizID }})
        .then(async (sections) => { //Quiz sections found
            var mySection = {};
            for (x in sections) { //Check to see if Sections have multiple subsections/instructions of many different questions
                try {
                    mySection[sections[x].dataValues.Section] = await getSectionInstructions(sections[x].dataValues.ID, showOptions, quizID); //Get the section's instructions
                } catch (error) {
                    mySection = null;
                }
            }
            resolve(mySection);
        })
        .catch(error => { //Quiz sections not found
            reject(null);
        })
    });
}
/////////////////////////////////////////////////////////////////////////////////////

async function generateStudentQuiz (quizID)  {  
    const displayQuiz = {};
    try {
        displayQuiz.Title = await generalQuizInfo(quizID); //Get quiz title
    } catch (error) {
        console.log(error);
    }

    try {
        displayQuiz.Section = await sectionQuizInfo(quizID ,false); //This is what happens with a bad SDD and the deadline is approaching
    } catch (error) {
        console.log(error);
    }
    return displayQuiz;
}

async function displaySubmittedQuiz(quizID){
    const displayQuiz = {};
    try {
        displayQuiz.Title = await generalQuizInfo(quizID); //Get quiz title
    } catch (error) {
        console.log(error);
    }

    try {
        displayQuiz.Section = await sectionQuizInfo(quizID, true); //This is what happens with a bad SDD and the deadline is approaching
    } catch (error) {
        console.log(error);
    }
    return displayQuiz;
}

module.exports = {
    generateStudentQuiz,
    displaySubmittedQuiz
}