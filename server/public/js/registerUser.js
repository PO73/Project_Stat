function getStudentInput() {
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var emailaddress = document.getElementById('emailadd').value;
    var pswd = document.getElementById('pass').value;
    var confirmpassword = document.getElementById('confirmpass').value;
    var birthdate = document.getElementById('bday').value;
    var state = document.getElementById('state').value;
    var gender = document.getElementById('gender').value;


    const data = {firstname, lastname, emailaddress, pswd, confirmpassword, birthdate, state, gender};

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('/studentregister', options);
}
