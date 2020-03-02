function getQuestions(questionSetID){
    var jsonQuestions = [{}];

    //Pull all questions types (MC, MS, TorF) that are assigned to the questionSetID. Store info in a json object
    //Pull optionalAnswerID from each question type table at the given questionSetID
    //Pull all possible answer options from the optionalAnswer table at optionalAnswerID
    //Pull the correct answers to each of the questions
    //Pull the feedback for each of the questions
    //Use info retrieved above to populate a json object like below
    jsonQuestions = [
        { "Question Type": "MC", "Question Number": 1, "Question": "2 + 2 = ?", "Correct Answer": "4", "Question Feedback": "It be addition" },
        { "Question Type": "TorF", "Question Number": 2, "Question": "10 * 10 = 100, true or false?", "Correct Answer": "True", "Question Feedback": "It be multiplication" },
        { "Question Type": "MS", "Question Number": 3, "Question": "Pick all the even numbers from the list below:", "Correct Answer": ["2", "4"], "Question Feedback": "These are the even numbers" }
    ];

    return jsonQuestions;
}

const displayFeedback = (questionSetID) => {
    var result = "";

    var jsonQuestions = getQuestions(questionSetID);

    jsonQuestions.forEach(element => {
        result += "<div id=\"questionFeedbackDisplay\">";
        
        result += element["Question Number"] + ". " + element["Question"] + "<br>";
        result += "Correct Answer: " + element["Correct Answer"] + "<br>";
        result += "Answer Explanation: " + element["Question Feedback"] + "<br>";

        result += "<br></br>"
        result += "</div>";
    });
    return result;
}

module.exports = {
    displayFeedback
};