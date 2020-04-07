async function gradeQuestions(req, res) {  
    const userAnswers = req.body.userSelectedAnswers; //Get the user's answers
    var numberOfCorrect = 0;

    userAnswers.forEach(element => {
        var components = element.split("_"); //Split the json object
        if(components[0].localeCompare('MC') == 0){  
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
            }
        }
        else if(components[0].localeCompare('TF') == 0) {
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
                numberOfCorrect += 1;
            }
        }
        else if(components[0].localeCompare('MS') == 0) {
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
            }
        }
        else{
            console.log(components); //Add a custom error 
        }
    });
};

module.exports = {
    gradeQuestions
};