async function getUserInput() {
    var emailaddress = document.getElementById('emailadd').value;
    var pswd = document.getElementById('pass').value;

    const data = {emailaddress, pswd};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/loginPage', options);
    const responseData = await response.json();
    document.getElementById("responseArea").innerHTML = responseData.status;

    var x = '/' + responseData.URL;
    location.href = x;
}