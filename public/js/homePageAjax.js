
$(document).ready(function () {
    console.log("Start loading contect!");
    var id = localStorage.getItem('id');
    $.ajax({
        type: "GET",
        url: serverAddress + '/GetUserInfo/'+id,
        success: function (dataFromServer) {
            proccessAllInfoFromServer(dataFromServer);
            updateSite();
            var path = dataFromServer.profilePictureURL;
            loadprofile(path);
        },
        error: function(){
          console.log("ERROR");
        }
    });
});

function loadprofile(path){
    console.log("Update profile");
    document.getElementById("familyPicture").firstChild.setAttribute("src",serverAddress +path);
}

function proccessAllInfoFromServer(dataFromServer){
    familyDetails.familyName = dataFromServer.familyName;
    familyDetails.address = dataFromServer.address;
    familyDetails.city =dataFromServer.city;
    familyDetails.country=dataFromServer.country;
    familyDetails.district=dataFromServer.district;
    familyDetails.email=dataFromServer.email;
    familyDetails.parents=dataFromServer.parents;
    familyDetails.children=dataFromServer.children;
    familyDetails.numberOfChildren=dataFromServer.numberOfChildren;
}

function updateSite(){
    var familyName = familyDetails.familyName;
    familyName += "'s";
    document.getElementById('familysidebar').firstChild.firstChild.innerHTML = familyName;
    familyName += " Family";
    document.getElementById('familyNameToolbar').firstChild.firstChild.innerHTML = familyName;
    address = familyDetails.address;
}