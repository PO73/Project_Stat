const Quiz = require('../../models/Quiz').myQuiz;
const QuizSection = require('../../models/Quiz_Section').myQuizSection;
const QuizSectionInstruction = require('../../models/Quiz_Section_Instructions').myQuizSectionInstructions;
const QuizQuestion = require('../../models/Quiz_Question').myQuizQuestion;
const QuizQuestionOptions = require('../../models/Option_Set').myOption;
const questionDisplay = require('./questionGeneration');

//Call as many times as their are questions (each json object contains all info all higher tables)
async function QuizFormatSetup(quizID){ //A hierarchical database model was not a pro gamer choice for this website
    return new Promise((resolve, reject) => {
        Quiz.findAll({where: {ID: quizID}, attributes: ['title'],
                        include:[{model: QuizSection, attributes:['text'],
                            include:[{model: QuizSectionInstruction, attributes:['quiz_section_instruction'],
                                include:[{model: QuizQuestion, attributes:['text', 'question_type', 'image_path', 'order', 'option_set_id']}]
                            }]
                        }]
                    })
        .then(quiz => {
            resolve(quiz);
        })
        .catch(error => {
            console.log(error);
            reject(null);
        })
    });
}

function QuizQuestionSetup(optionSet){
    return new Promise((resolve, reject) => {
        QuizQuestionOptions.findAll({where: {setID: optionSet}, attributes:['text']})
        .then(QuestionOptions => {
            var question = []
            for (x in QuestionOptions) {
                question.push(QuestionOptions[x].dataValues.text);
            }
            resolve(question);
        })
        .catch(error => {
            console.log(error);
            reject(null);
        })
    });
}

async function generateStudentQuiz (quizID)  {  
    const displayQuiz = {};
    try {
        var quizGeneralInfo  = await QuizFormatSetup(quizID); //Get quiz title, sections, instructions for sections, and question for each instruction
        if(quizGeneralInfo != null){
            displayQuiz.Title = quizGeneralInfo[0].dataValues.title;
            displayQuiz.Section = {}; 

            const displayThis = [{}];
            for(var i = 0; i < quizGeneralInfo.length; ++i){ //Populate each section with instructions and questions
                var sectionTitle = quizGeneralInfo[i]['quiz section'].dataValues.text;
                var sectionInstruction = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues.quiz_section_instruction;
                
                if(!displayQuiz.Section.hasOwnProperty(sectionTitle)){ //New section that needs to be added to the JSON object
                    displayQuiz.Section[sectionTitle] = {};
                }

                if(!displayQuiz.Section[sectionTitle].hasOwnProperty(sectionInstruction)){ //New section instruction that needs to be added to the JSON object       
                    displayQuiz.Section[sectionTitle][sectionInstruction] = []; //Create question set
                    var questionObject = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues['quiz question'].dataValues; //Question object from SQL
                    try {
                        var questionOptions = await QuizQuestionSetup(questionObject.option_set_id); //Get the options for the question
                        displayThis[0].QuestionType = questionObject.question_type;
                        displayThis[0].Images = questionObject.image_path;
                        displayThis[0].Question = questionObject.text
                        displayThis[0].Options = questionOptions;
                        displayThis[0].Order = questionObject.order;
                        displayQuiz.Section[sectionTitle][sectionInstruction].push(questionDisplay.generateQuestions(displayThis)); //Generate question display
                    } catch (error) {
                        console.log("Custom error message");
                    }
                }
                else{ //Display the rest of the questions for an instruction set
                    var questionObject = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues['quiz question'].dataValues; //Question object from SQL
                    try {
                        var questionOptions = await QuizQuestionSetup(questionObject.option_set_id); //Get the options for the question
                        displayThis[0].QuestionType = questionObject.question_type;
                        displayThis[0].Images = questionObject.image_path;
                        displayThis[0].Question = questionObject.text
                        displayThis[0].Options = questionOptions;
                        displayThis[0].Order = questionObject.order;
                        displayQuiz.Section[sectionTitle][sectionInstruction].push(questionDisplay.generateQuestions(displayThis)); //Generate question display
                    } catch (error) {
                        console.log("Custom error message");
                    }
                }
            }
                
        }else{
            console.log("Custom error message");
        }
    } catch (error) {
        console.log(error);
    }
    return displayQuiz;
}

async function displaySubmittedQuiz(quizID){
    const displayQuiz = {};
    try {
        var quizGeneralInfo  = await QuizFormatSetup(quizID); //Get quiz title, sections, instructions for sections, and question for each instruction
        if(quizGeneralInfo != null){
            displayQuiz.Title = quizGeneralInfo[0].dataValues.title;
            displayQuiz.Section = {}; 

            const displayThis = [{}];
            for(var i = 0; i < quizGeneralInfo.length; ++i){ //Populate each section with instructions and questions
                var sectionTitle = quizGeneralInfo[i]['quiz section'].dataValues.text;
                var sectionInstruction = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues.quiz_section_instruction;
                
                if(!displayQuiz.Section.hasOwnProperty(sectionTitle)){ //New section that needs to be added to the JSON object
                    displayQuiz.Section[sectionTitle] = {};
                }

                if(!displayQuiz.Section[sectionTitle].hasOwnProperty(sectionInstruction)){ //New section instruction that needs to be added to the JSON object       
                    displayQuiz.Section[sectionTitle][sectionInstruction] = []; //Create question set
                    var questionObject = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues['quiz question'].dataValues; //Question object from SQL
                    try {
                        displayThis[0].Question = questionObject.text
                        displayThis[0].Order = questionObject.order;
                        displayQuiz.Section[sectionTitle][sectionInstruction].push(questionDisplay.showJustQuestion(displayThis)); //Generate question display
                    } catch (error) {
                        console.log("Custom error message");
                    }
                }
                else{ //Display the rest of the questions for an instruction set
                    var questionObject = quizGeneralInfo[i]['quiz section'].dataValues['quiz section instruction'].dataValues['quiz question'].dataValues; //Question object from SQL
                    try {
                        displayThis[0].Question = questionObject.text
                        displayThis[0].Order = questionObject.order;
                        displayQuiz.Section[sectionTitle][sectionInstruction].push(questionDisplay.showJustQuestion(displayThis)); //Generate question display
                    } catch (error) {
                        console.log("Custom error message");
                    }
                }
            }
                
        }else{
            console.log("Custom error message");
        }
    } catch (error) {
        console.log(error);
    }
    return displayQuiz;
}

module.exports = {
    generateStudentQuiz,
    displaySubmittedQuiz
}