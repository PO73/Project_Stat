const displayTorF = (questionNumber, question, imagePath) => {
    var TorFDisplayString = "";
    if(imagePath != null){ //If more than one images is needed in later release, change to for loop 
        TorFDisplayString += "<img src=" + imagePath + ">";
        TorFDisplayString += "<br>";
    }

    TorFDisplayString += "<div id=\"questionDisplay\">";
    TorFDisplayString += questionNumber + ". " + question;
    TorFDisplayString += "<br>";

    TorFDisplayString += "<input type=\"radio\" class=\"Inpust Field\" id=\"TF_" + questionNumber + "_OptionalAnswer_0\" name=\"optionsFor" + questionNumber + "\" value=\"True\">";
    TorFDisplayString += "<label for=\"TorF_" + questionNumber + "_OptionalAnswer_0\"> True </label>";

    TorFDisplayString += "<input type=\"radio\" class=\"Inpust Field\" id=\"TF_" + questionNumber + "_OptionalAnswer_1\" name=\"optionsFor" + questionNumber + "\" value=\"False\">";
    TorFDisplayString += "<label for=\"TorF_" + questionNumber + "_OptionalAnswer_1\"> False </label>";

    TorFDisplayString += "<br></br>";
    TorFDisplayString += "</div>"
    return TorFDisplayString;
}

module.exports = {
    displayTorF
};