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
    //console.log(responseData.body);
    var feedbackElements = document.getElementsByClassName("feedBack");
    //for(var i=0; i<feedbackElements.length; i++) {
    
    //}
}

function printPage() {
    window.print();
}

function loadDashBoard(){
    //Get request
    //Before load, on server side, check to see if the user has correct level of access to load the page
}