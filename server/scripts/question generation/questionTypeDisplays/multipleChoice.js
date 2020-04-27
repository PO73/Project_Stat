const displayMC = (questionNumber, question, optionalAnswers, imagePath) => {
    var mcDisplayString = "";
    if(imagePath != null){ //If more than one images is needed in later release, change to for loop 
        mcDisplayString += "<img src=" + imagePath + ">";
        mcDisplayString += "<br>";
    }

    mcDisplayString += "<div id=\"questionDisplay\">";
    mcDisplayString += questionNumber + ". " + question;
    mcDisplayString += "<br>";
    for (const [i, element] of optionalAnswers.entries()) {
        mcDisplayString += "<input type=\"radio\" class=\"Inpust Field\" id=\"MC_" + questionNumber + "_OptionalAnswer_" + i + "\" name=\"optionsFor" + questionNumber + "\" value=\"" + element + "\">";
        mcDisplayString += "<label for=\"MC_" + questionNumber + "_OptionalAnswer_" + i + "\">" + element + "</label><br>";
    }

    mcDisplayString += "<br></br>";
    mcDisplayString += "</div>"
    return mcDisplayString;
}

module.exports = {
    displayMC
};