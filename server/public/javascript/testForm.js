function submitTestForm() {
    var elements = document.getElementsByClassName("Inpust Field"); //Get all radio buttons and checkbox on the page
    var names = '';
    for(var i=0; i<elements.length; i++) {
        var elementID = elements[i].id;
        //if(){

        //}
        //names += " " + elements[i].;
    }
    //alert(names);
}

function printPage() {
    window.print();
}

function loadDashBoard(){
    //Get request
    //Before load, on server side, check to see if the user has correct level of access to load the page
}