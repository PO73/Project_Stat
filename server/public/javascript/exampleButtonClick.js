function getInfo() {
    var myData = document.getElementById("data").value;
    var moreInfo = "If you need more info";
    const data = {myData, moreInfo};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    fetch('/giveMeData', options);
}

function sendEmail(){
    var fromEmail = "user email";
    var subject = "given subject line";
    var body = " given body";
    const data = {fromEmail, subject, body};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('/sendEmail', options);
}