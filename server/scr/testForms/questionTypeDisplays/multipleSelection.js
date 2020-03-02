const displayMS = (questionNumber, question, optionalAnswers) => {
    var MSDisplayString = "<div id=\"questionDisplay\">";
    MSDisplayString += questionNumber + ". " + question;
    MSDisplayString += "<br>";

    for (const [i, element] of optionalAnswers.entries()) {
        MSDisplayString += "<input type=\"checkbox\" class=\"Inpust Field\" id=\"MS_" + questionNumber + "OptionalAnswer" + i + "\" name=\"option" + i + "\" value=\"" + element + "\">";
        MSDisplayString += "<label for=\"MS_" + questionNumber + "OptionalAnswer" + i + "\">" + element + "</label><br>";
    }

    MSDisplayString += "<br></br>";
    MSDisplayString += "</div>"
    return MSDisplayString;
}

module.exports = {
    displayMS
};