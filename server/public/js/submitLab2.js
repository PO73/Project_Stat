function submitLab() {
    var elements = document.getElementsByClassName("Inpust Field");
    var userAnswers = {
        userSelectedAnswers:{}
    };

    var ids = [];
    for(var i=0; i<elements.length; i++) {
        if(elements[i].checked){
            ids.push(elements[i].id);
        }
    }

    userAnswers.userSelectedAnswers = ids;

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAnswers)
    };

    fetch('/user/gradelab2', options);
}