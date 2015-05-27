var serverAddress = "";

function signUpAjax() {
    $.ajax({
        type: "POST",
        url: serverAddress + '/Create',
        contentType: 'application/json',
        data: JSON.stringify(familyDetails),
        success: function (responseFromServer) {
            var id = JSON.parse(responseFromServer).id;
            uploadProfilePicture(id);
        }
    });
}

function signInAjax(username, pswd) {
    var userInput = {
        email: username,
        password: pswd
    };
    $.ajax({
        type: "POST",
        url: serverAddress + '/login',
        contentType: 'application/json',
        data: JSON.stringify(userInput),
        success: function (dataFromServer) {
            var id = dataFromServer.id;
            if (id !== null) {
                localStorage.setItem("id", id);
                window.location = "homePage.html";
            }
        }
    });
}


function uploadProfilePicture(id)
{
    setTimeout(function () {
        var data = new FormData();
        data.append('profilePic', profilepicture);
        $.ajax({
            type: "POST",
            url: serverAddress + '/UpdatePP/' + id,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            data: data,
            success: function (dataFromServer) {
            }
        });
    }, 500);
}