const displayMC = (questionNumber, question, optionalAnswers) => {
    var mcDisplayString = "<div id=\"questionDisplay\">";
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