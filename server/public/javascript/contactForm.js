async function getInfo() {
    var userName = document.getElementById("name").value;
    var userEmail = document.getElementById("emailAddress").value;
    var userPhoneNumber = document.getElementById("phoneNumber").value;
    var userMessage = document.getElementById("bodyMessage").value;

    const data = {userName, userEmail, userPhoneNumber, userMessage};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    const response = await fetch('/contactPageRequest', options);
    const responseData = await response.json();
    document.getElementById("responseArea").innerHTML = responseData.status;
}