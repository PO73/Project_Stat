const displayTorF = (questionNumber, question) => {
    var TorFDisplayString = "<div id=\"questionDisplay\">";
    TorFDisplayString += questionNumber + ". " + question;
    TorFDisplayString += "<br>";

    TorFDisplayString += "<input type=\"radio\" class=\"Inpust Field\" id=\"TF_" + questionNumber + "OptionalAnswer0\" name=\"optionsFor" + questionNumber + "\" value=\"True\">";
    TorFDisplayString += "<label for=\"TorF_" + questionNumber + "OptionalAnswer0\"> True </label>";

    TorFDisplayString += "<input type=\"radio\" class=\"Inpust Field\" id=\"TF_" + questionNumber + "OptionalAnswer1\" name=\"optionsFor" + questionNumber + "\" value=\"False\">";
    TorFDisplayString += "<label for=\"TorF_" + questionNumber + "OptionalAnswer1\"> False </label>";

    TorFDisplayString += "<br></br>";
    TorFDisplayString += "</div>"
    return TorFDisplayString;
}

module.exports = {
    displayTorF
};