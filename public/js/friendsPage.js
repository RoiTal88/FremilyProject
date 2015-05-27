$(document).ready(function () {
    console.log("requesting friends");
    $.ajax({
        type: "GET",
        url: serverAddress + '/getUserFriends/' + localStorage.getItem("id"),
        success: function (dataFromServer) {
            console.log(dataFromServer);
        },
        error: function () {
            console.log("ERROR");
        }
    });
});


