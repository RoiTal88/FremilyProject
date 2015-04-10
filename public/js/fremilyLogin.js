var parentsStractureSelected = 0; //[0=undefined, 1=Mother and father, 2=Father and father, 3=Mother and mother, 4=Mother, 5=Father]
var signUpCurrentPhase = 1;
var familyDetails = {
    familyName: "",
    firstParentName: "",
    firstParentBirthday: "",
    secondParentName: "",
    secondParentBirthday: "",
    email: "",
    password: "",
    address: "",
    children: 1
};
var childrenDetils = [];
function child(name, birthday, sex) {
    this.name = name;
    this.birthday = birthday;
    this.sex = sex;
}
;


$(function() {
    $("#slider").responsiveSlides({
        auto: true,
        pager: false,
        nav: true,
        speed: 500,
        maxwidth: 960,
        namespace: "centered-btns"
    });
});

function loginButtonClicked() {
    var emailInserted = document.getElementById("emailInserted").value;
    var pswdInserted = document.getElementById("pswdInserted").value;
    if (emailInserted === "") {
        document.getElementById("emailInserted").className = document.getElementById("emailInserted").className + " noInputAlert";
    }
    else {
        document.getElementById("emailInserted").className = document.getElementById("emailInserted").className.replace(" noInputAlert", "");
    }
    if (pswdInserted === "") {
        document.getElementById("pswdInserted").className = document.getElementById("pswdInserted").className + " noInputAlert";
    }
    else {
        document.getElementById("pswdInserted").className = document.getElementById("pswdInserted").className.replace(" noInputAlert", "");
    }
}

function signupButtonClicked()
{
    window.location = "signUp.html";
}
//-------------Mom Dad-----------------------------
function momDadMouseOver() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momDadPic");
        img.setAttribute("src", "images/momDad.jpg");
    }
}

function momDadMouseOut() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momDadPic");
        img.setAttribute("src", "images/momDadBW.jpg");
    }
}

function momDadMouseClick() {
    replaceImagesToBlackAndWhite(1);
    var img = document.getElementById("momDadPic");
    img.setAttribute("src", "images/momDad.jpg");
}
//--------------------------------------------------
//-------------Dad Dad-----------------------------
function dadDadMouseOver() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("dadDadPic");
        img.setAttribute("src", "images/twoDads.jpg");
    }
}

function dadDadMouseOut() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("dadDadPic");
        img.setAttribute("src", "images/twoDadsBW.jpg");
    }
}

function dadDadMouseClick() {
    replaceImagesToBlackAndWhite(2);
    var img = document.getElementById("dadDadPic");
    img.setAttribute("src", "images/twoDads.jpg");
}
//--------------------------------------------------

//-------------Mom Mom-----------------------------
function momMomMouseOver() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momMomPic");
        img.setAttribute("src", "images/twoMoms.jpg");
    }
}

function momMomMouseOut() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momMomPic");
        img.setAttribute("src", "images/twoMomsBW.jpg");
    }
}

function momMomMouseClick() {
    replaceImagesToBlackAndWhite(3);
    var img = document.getElementById("momMomPic");
    img.setAttribute("src", "images/twoMoms.jpg");
}
//--------------------------------------------------
//-------------Mom --------------------------------
function momMouseOver() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momPic");
        img.setAttribute("src", "images/mom.jpg");
    }
}

function momMouseOut() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("momPic");
        img.setAttribute("src", "images/momBW.jpg");
    }
}

function momMouseClick() {
    replaceImagesToBlackAndWhite(4);
    var img = document.getElementById("momPic");
    img.setAttribute("src", "images/mom.jpg");
}
//--------------------------------------------------
//-------------Dad --------------------------------
function dadMouseOver() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("dadPic");
        img.setAttribute("src", "images/dad.JPG");
    }
}

function dadMouseOut() {
    if (parentsStractureSelected === 0) {
        var img = document.getElementById("dadPic");
        img.setAttribute("src", "images/dadBW.JPG");
    }
}

function dadMouseClick() {
    replaceImagesToBlackAndWhite(5);
    var img = document.getElementById("dadPic");
    img.setAttribute("src", "images/dad.JPG");
}
//--------------------------------------------------
function replaceImagesToBlackAndWhite(newUserChoice) {
    parentsStractureSelected = 0;
    dadDadMouseOut();
    momDadMouseOut();
    momMomMouseOut();
    momMouseOut();
    dadMouseOut();
    parentsStractureSelected = newUserChoice;
}

function signUpNext() {
    if (signUpCurrentPhase === 1) {
        if (clearPhaseOne()) {
            renderPhaseTwo();
            signUpCurrentPhase++;
        }
    }
    else if (signUpCurrentPhase === 2) {
        if (checkPhase2Inputs() === false) {
            document.getElementById("errorFremilyNotSelected").innerHTML = "All Information Is Necessary For Us..";
            document.getElementById("errorFremilyNotSelected").style.visibility = "visible";
        }
        else if (checkPasswordsMatch() === false) {
            document.getElementById("errorFremilyNotSelected").innerHTML = "Unfortunately, Both Passwords Are Not The Same";
            document.getElementById("errorFremilyNotSelected").style.visibility = "visible";
        }
        else {
            document.getElementById("errorFremilyNotSelected").style.visibility = "hidden";
            signUpCurrentPhase++;
            clearPhaseTwo();
            renderPhaseThree();
        }
    }
    else if (signUpCurrentPhase === 3) {
        if (checkPhase3Inputs() === false){
            document.getElementById("errorFremilyNotSelected").innerHTML = "All Information Is Necessary For Us..";
            document.getElementById("errorFremilyNotSelected").style.visibility = "visible";
        }
        else{
            document.getElementById("errorFremilyNotSelected").style.visibility = "hidden";
            sendRequestForSignUp();
            signUpCurrentPhase++;
        }
    }
}

function signUpPrevious() {
    document.getElementById("errorFremilyNotSelected").style.visibility = "hidden";
    if (signUpCurrentPhase === 2) {
        clearPhaseTwo();
        renderPhaseOne();
        signUpCurrentPhase--;
    }
    if (signUpCurrentPhase === 3) {
        clearPhaseThree();
        renderPhaseTwo();
        signUpCurrentPhase--;
    }

}

//------------------Jump Between Phases--------------------

function clearPhaseOne() {
    if (parentsStractureSelected === 0) {
        document.getElementById("errorFremilyNotSelected").style.visibility = "visible";
        return false;
    }
    else {
        document.getElementById("errorFremilyNotSelected").style.visibility = "hidden";
        $('#familyTypeTable').hide();
        return true;
    }
}

function renderPhaseOne() {
    document.getElementById("signUpTitle").innerHTML = "Who Are The Fremily Parents?";
    $('#familyTypeTable').show();
    document.getElementById("previousButton").style.visibility = "hidden";
}

function clearPhaseTwo() {
    $('#signUpTable').hide();
}

function renderPhaseTwo() {
    setParentsDetailsForm();
    document.getElementById("signUpTitle").innerHTML = "Fremily Parents Personal Details";
    document.getElementById("previousButton").style.visibility = "visible";
    $('#signUpTable').show();
}

function clearPhaseThree() {
    document.getElementById("childreninfo").innerHTML = '';
    $('#childreninfo').hide();
}

function renderPhaseThree() {
    document.getElementById("signUpTitle").innerHTML = "Fremily Children Personal Details";
    drawChildrenTable();
}

function renderLastPhase(){
    $('#childreninfo').hide();
    $('#signUpTitle').hide();
    document.getElementById("signUpTitle").innerHTML = "Welcome To Fremily "+familyDetails.familyName+" Family!";   
}
//---------------------------------------------------------
function checkPhase2Inputs() {
    var familyName = document.getElementById("familyname").childNodes[1].value;
    var firstParentName = document.getElementById("parent1name").childNodes[1].value;
    var firstParentBirthday = document.getElementById("parent1dob").childNodes[1].value;
    var emailAddress = document.getElementById("emailAddress").childNodes[1].value;
    var pswd = document.getElementById("pswd").childNodes[1].value;
    var pswd2 = document.getElementById("pswd2").childNodes[1].value;
    var childrenAmmount = document.getElementById("numofchildren").childNodes[1].value;
    var address = document.getElementById("address").childNodes[1].value;

    if (parentsStractureSelected !== 4 && parentsStractureSelected !== 5) {
        var secondParentName = document.getElementById("parent2name").childNodes[1].value;
        var secondParentBirthday = document.getElementById("parent2dob").childNodes[1].value;
        if ((secondParentName === "") || (secondParentBirthday === "")) {
            return false;
        }
    }
    if ((familyName === "") || (firstParentName === "") || (firstParentBirthday === "") || (emailAddress === "")
            || (pswd === "") || (address === "") || (pswd2 === "") || (childrenAmmount < 1) || (childrenAmmount > 20)) {
        return false;
    }
    else {
        fillDetailsOfFamily(familyName, firstParentName, firstParentBirthday, secondParentName, secondParentBirthday, emailAddress, pswd, childrenAmmount, address);
        return true;
    }
}

function checkPasswordsMatch() {
    var pswd = document.getElementById("pswd").childNodes[1].value;
    var pswd2 = document.getElementById("pswd2").childNodes[1].value;
    if (pswd === pswd2) {
        return true;
    }
    else {
        return false;
    }
}

function fillDetailsOfFamily(familyName, firstParentName, firstParentBirthday, secondParentName,
        secondParentBirthday, email, pswd, children, address) {
    familyDetails.familyName = familyName;
    familyDetails.firstParentName = firstParentName;
    familyDetails.firstParentBirthday = firstParentBirthday;
    familyDetails.secondParentName = secondParentName;
    familyDetails.secondParentBirthday = secondParentBirthday;
    familyDetails.email = email;
    familyDetails.password = pswd;
    familyDetails.children = children;
    familyDetails.address = address;
}

function drawChildrenTable() {
    var table = document.getElementById("childreninfo");
    var childrenAmmount = parseInt(familyDetails.children);
    var row;
    var cell;
    for (var i = 0; i < childrenAmmount; i++) {
        row = table.insertRow(i);
        cell = row.insertCell(0);
        cell.setAttribute("id", "child" + (i + 1) + "name");
        cell.innerHTML = 'Child ' + (i + 1) + ' - Name:' + '<input type="text" id="child'+i+'NameInput" size ="13"  class="inputText" style="border:1px solid #000000">';
        cell = row.insertCell(1);
        cell.setAttribute("id", "child" + (i + 1) + "dob");
        cell.innerHTML = 'Child ' + (i + 1) + ' - Birthday:' + '<input id="child'+i+'DateInput" type="date" size ="16"  class="inputText" style="border:1px solid #000000">';
        cell = row.insertCell(2);
        cell.setAttribute("id", "child" + (i + 1) + "sex");
        cell.innerHTML = 'Sex:' + '<br><select id="child'+i+'SexInput"><option value="Sex">Sex</option><option value="Boy">Boy</option><option value="Girl">Girl</option></select>';
    }
    $('#childreninfo').show();
}

function checkPhase3Inputs() {
    var childrenAmmount = familyDetails.children;
    for (var i = 1; i <= childrenAmmount; i++) {
        var idName = "child" + i + "name";
        var idBirthday = "child" + i + "dob";
        var idSex = "child" + i + "sex";
        var name = document.getElementById(idName).childNodes[1].value;
        var birthday = document.getElementById(idBirthday).childNodes[1].value;
        var sex = document.getElementById(idSex).childNodes[2].value;
        if ((name === "") || (birthday === "") || (sex === "Sex")) {
            return false;
        }
        else {
            var tempChild = new child(name, birthday, sex);
            childrenDetils.push(tempChild);
        }
    }
    return true;
}

function loginUser(){
            var roi = {};
        roi.email = "roital88@gmail.com";
        roi.password = "123456";
    $.ajax({

        url : "/login" ,
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(roi),
        success : function(){console.log("OKKKK");},
        error : function(){console.log("NOOOOOO");}
    });   
}

