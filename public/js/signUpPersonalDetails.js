function setParentsDetailsForm() {
    $('#parent2name').show();
    $('#parent2dob').show();
    switch (parentsStractureSelected) {
        case 1:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input id="parent1nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input id="parent1dobInput" type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Fathers name: <input id="parent2nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Fathers Birthday: <input id="parent2dobInput" type="date"   class="inputText" style="border:1px solid #000000">';
            typeOfFamily = 1;
            break;
        case 2:
            document.getElementById("parent1name").innerHTML = 'Fathers name: <input id="parent1nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Fathers Birthday: <input id="parent1dobInput" type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Fathers name: <input id="parent2nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Fathers Birthday: <input id="parent2dobInput" type="date"   class="inputText" style="border:1px solid #000000">';
            typeOfFamily = 2;
            break;
        case 3:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input id="parent1nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input id="parent1dobInput" type="date"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2name").innerHTML = 'Mothers name: <input id="parent2nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent2dob").innerHTML = 'Mothers Birthday: <input id="parent2dobInput" type="date"   class="inputText" style="border:1px solid #000000">';
            typeOfFamily = 3;
            break;
        case 4:
            document.getElementById("parent1name").innerHTML = 'Mothers name: <input id="parent1nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Mothers Birthday: <input id="parent1dobInput" type="date"  class="inputText" style="border:1px solid #000000">';
            typeOfFamily = 4;
            $('#parent2name').hide();
            $('#parent2dob').hide();
            break;
        case 5:
            document.getElementById("parent1name").innerHTML = 'Fathers name: <input id="parent1nameInput" type="text" size ="20"  class="inputText" style="border:1px solid #000000">';
            document.getElementById("parent1dob").innerHTML = 'Fathers Birthday: <input id="parent1dobInput" type="date"  class="inputText" style="border:1px solid #000000">';
            typeOfFamily = 5;
            $('#parent2name').hide();
            $('#parent2dob').hide();
            break;
    }
}

function sendRequestForSignUp(){
/*    var signUp = {
            familyName : String,
            parents : [{name : String , gender : String , dateOfBirth : Date },
                       {name : String , gender : String , dateOfBirth : Date}],
            password :String,
            address : String,
            numberOfChildren : Number ,
            proifilePicture : {}
    };*/
    var signUp = {};
    signUp.familyname = $("#familynameInput").val();
    signUp.parent1 = {};
    signUp.parent2 = {};
    signUp.parent1.dateOfBirth = {};
    signUp.parent2.dateOfBirth = {};
    switch (typeOfFamily)
    {
        //parent 1 is Male parent 2 Fmale
        case 1:
            signUp.parent1.parentName = $("#parent1nameInput").val();
            signUp.parent1.parentGender = "Female";
            signUp.parent1.dateOfBirth = $("#parent1dobInput").val();
            signUp.parent2.parentName = $("#parent2nameInput").val();
            signUp.parent2.parentGender = "Male";
            signUp.parent2.dateOfBirth = $("#parent2dobInput").val();
        break;

        //parent 1 is male parent 2 is female
        case 2:
            signUp.parent1.parentName = $("#parent1nameInput").val();
            signUp.parent1.parentGender = "Male";
            signUp.parent1.dateOfBirth = $("#parent1dobInput").val();
            signUp.parent2.parentName = $("#parent2nameInput").val();
            signUp.parent2.parentGender = "Male";
            signUp.parent2.dateOfBirth = $("#parent2dobInput").val();
        break;

        //parent 1 is female parent 2 is female
        case 3:
            signUp.parent1.parentName = $("#parent1nameInput").val();
            signUp.parent1.parentGender = "Female";
            signUp.parent1.dateOfBirth = $("#parent1dobInput").val();
            signUp.parent2.parentName = $("#parent2nameInput").val();
            signUp.parent2.parentGender = "Female";
            signUp.parent2.dateOfBirth = $("#parent2dobInput").val();
        break;

        //parent 1 is female parent 2 is null
        case 4:
            signUp.parent1.parentName = $("#parent1nameInput").val();
            signUp.parent1.parentGender = "Female";
            signUp.parent1.dateOfBirth = $("#parent1dobInput").val();
            signUp.parent2.parentName = null;
            signUp.parent2.parentGender = null;
            signUp.parent2.dateOfBirth = null;        
        break;

        //parent 1 is male parent 2 is null
        case 5:
            signUp.parent1.parentName = $("#parent1nameInput").val();
            signUp.parent1.parentGender = "Male";
            signUp.parent1.dateOfBirth = $("#parent1dobInput").val();
            signUp.parent2.parentName = null;
            signUp.parent2.parentGender = null;
            signUp.parent2.dateOfBirth = null;        
        break;

/*        case default:
            //not suposed to happen
            //but if yes to tell the user
        break;*/
    }
    signUp.email = $("#emailAddressInput").val();
    signUp.password1 = $("#pswdInput").val();
    signUp.password2 = $("#pswd2Input").val();
    signUp.address = $("#addressInput").val();
    signUp.numberOfChildren = parseInt($("#numofchildrenInput").val());
    signUp.familyPicture = {};
    signUp.familyPicture = $("#familyphotoInput").val();
    signUp.childern = [signUp.numberOfChildren];
    var i;
    for(i = 0 ; i < signUp.numberOfChildren ; i++)
    {
        signUp.childern[i] = {};
        signUp.childern[i].nameOfChild = $('#child'+i+'NameInput').val();
        signUp.childern[i].childBirthDay = {};
        signUp.childern[i].childBirthDay = $('#child'+i+'DateInput').val();
        signUp.childern[i].gender = $('#child'+i+'SexInput').val();
    }
    console.log(signUp);

    $.ajax({
        url : "/signUpNewFamily" ,
        type : 'POST',
        contentType : "application/json",
        data : JSON.stringify(signUp),
        success : function(){console.log("OKKKK");},
        error : function(){console.log("NOOOOOO");}
    });

}
