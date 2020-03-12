async function submitTestForm() {
    var elements = document.getElementsByClassName("Inpust Field"); //Get all radio buttons and checkbox on the page
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
    
    const response = await fetch('/gradeTestForm', options);
    const responseData = await response.json();    

    var feedbackElements = document.getElementsByClassName("feedBack");
    for(i=0; i<feedbackElements.length; i++) {
        feedbackElements[i].innerHTML += ("You answered " + responseData.status[i] + "<br>" );
        feedbackElements[i].innerHTML += ("Feedback: " + responseData.feedback[i] + "<br>");
        //feedbackElements.innerHTML
    }
}

function printPage() {
    window.print();
}