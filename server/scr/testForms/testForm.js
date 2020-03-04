const generation = require('./questionGeneration');
const answerKey = require("./generateAnswerKey");

const generateLab = (req, res) => {  
    //Parse JSON object
        //Get testForm type (Lab, Quiz, Video Questions)
        //Get the exacpt testForm number (e.g. Lab 3)
        //Get user type (Teachers and Admins or just user ID)
    var testFormType = "Lab";

    //Check user type
        //If teacher or admin show everything including feedback/answers
        //Else, only show questions
    var showFeedbackImmediately = false;

    var results = "";
    if(testFormType.localeCompare("Lab") == 0){
        //Get questionSetID
        var questionSetID = 1;
        results = generation.generateQuestions(questionSetID);
    }
    else if(testFormType.localeCompare("Quiz")){
        //Get questionSetID
    }
    else if(testFormType.localeCompare("Video Questions")){
        //Get questionSetID
    }
    else{
        //Show custom error message
        console.log("Error generating testForm");
    }

    if(showFeedbackImmediately){ //An admin or teacher is loading a quiz, lab, or video questions, so display answers/feedback at the bottom of the page 
        results += "<h1>This is the answer key for this " + testFormType + ".</h1>";
        results += answerKey.displayFeedback();
    }
    else{
        results += "<button type=\"submit\" onclick=\"submitTestForm()\" value=\"Submit\">Submit</button>";
    }

    results += "<button type=\"back\" onclick=\"location.href='/index.html';\" value=\"Back\">Back</button>";
    results += "<button type=\"print\" onclick=\"printPage()\" value=\"Print\">Print</button>";

    res.render('labTemplate', {giveMeInfo: results});
};

module.exports = {
    generateLab
};