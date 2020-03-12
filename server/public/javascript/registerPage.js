async function getUserInput() {
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var emailaddress = document.getElementById('emailadd').value;
    var pswd = document.getElementById('pass').value;
    var confirmpassword = document.getElementById('confirmpass').value;
    var birthdate = document.getElementById('bday').value;
    var state = document.getElementById('state').value;
    var genderMale = document.getElementById('Male').checked;
    var genderFemale = document.getElementById('Female').checked;


    const data = {firstname, lastname, emailaddress, pswd, confirmpassword, birthdate, state, genderMale, genderFemale};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const response = await fetch('/registerStudent', options);
    const responseData = await response.json();
    document.getElementById("responseArea").innerHTML = responseData.status;

    var x = '/' + responseData.URL;
    location.href = x;
}
