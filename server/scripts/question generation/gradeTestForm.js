const gradeQuestions = (req, res) => {  
    const userAnswers = req.body.userSelectedAnswers;
    var feedBack = [];
    var numberOfCorrect = 0;

    userAnswers.forEach(element => {
        var components = element.split("_");
        //components[1] is the question number
        //components[3] is the question option selected
        //Still need to pull lab info from databse
        //Still need to pull the question set info
        console.log(components);
        if(components[0].localeCompare('MC') == 0){
            var correctAnswer = "2";    
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
            }
            feedBack.push("MC");
        }
        else if(components[0].localeCompare('TF') == 0) {
            var correctAnswer = "0";
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
                numberOfCorrect += 1;
            }
            feedBack.push("TF");
        }
        else if(components[0].localeCompare('MS') == 0) {
            var correctAnswer = "1";
            if(components[3].localeCompare(correctAnswer) == 0){
                console.log("Correct");
                numberOfCorrect += 1;
            }
            else{
                console.log("Incorrect");
            }
            feedBack.push("MS");
        }
        else{
            console.log(components); //Someone messed with the client side code
        }
    });

    res.json({
        questionFeedBack: feedBack
    }); 
};

module.exports = {
    gradeQuestions
};