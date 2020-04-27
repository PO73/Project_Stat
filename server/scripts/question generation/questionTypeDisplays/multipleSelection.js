const displayMS = (questionNumber, question, optionalAnswers, imagePath) => {
    var MSDisplayString = "";
    if(imagePath != null){ //If more than one images is needed in later release, change to for loop 
        MSDisplayString += "<img src=" + imagePath + ">";
        MSDisplayString += "<br>";
    }

    MSDisplayString += "<div id=\"questionDisplay\">";
    MSDisplayString += questionNumber + ". " + question;
    MSDisplayString += "<br>";

    for (const [i, element] of optionalAnswers.entries()) {
        MSDisplayString += "<input type=\"checkbox\" class=\"Inpust Field\" id=\"MS_" + questionNumber + "_OptionalAnswer_" + i + "\" name=\"option" + i + "\" value=\"" + element + "\">";
        MSDisplayString += "<label for=\"MS_" + questionNumber + "_OptionalAnswer_" + i + "\">" + element + "</label><br>";
    }

    MSDisplayString += "<br></br>";
    MSDisplayString += "</div>"
    return MSDisplayString;
}

module.exports = {
    displayMS
};