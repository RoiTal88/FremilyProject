var mainFunctions = require("../serverjs/MainJsFunctionsModule");
var dataBase = require('../mongodb/DatabaseModule.js');
var fs = require('fs');
exports.UpdateMethod = function(req, res){
	switch (req.body.UpdateType)
	{
		case 'ProfilePicture':
			UpdateProfilePicture(req, res);
			break;
		case 'EventPicturs':
			UpdateEventPicture(req, res);
			break;
		case 'FamilyInfo':
			UpdateFamilyInfo(req, res);
		break;
		default:

			break;
	}
}

UpdateFamilyInfo = function(req, res)
{
	dataBase.UpdateFamily(req, res);
}

UpdateEventPicture = function(req, res){
	dataBase.UpdateEventPicture(req, res);
}

exports.UpdateEventMainPicture = function(req, res) {
	var userID = req.params._userid;
	var eventID = req.params._eventid;
	var picture = req.files.eventPic;
	if (!picture)
		res.end();
	else{
		var path = '/users/' + userID + '/createdEventsPic/' + picture.name;
		dataBase.UpdateEventPicture(userID, eventID, path, function (code) {
			switch (code) {
				case 1000:
					fs.writeFile('public/' + path, picture.buffer, function () {
					});
					res.statusCode = 200;
					break;
				case 3000:
					res.statusCode = 500;
					break;
			}
			res.end();
		});
	}
};

exports.UpdateProfilePicture = function(req , res ){
	var uploaderID = req.params._id;
	console.log(uploaderID);
	var picture = req.files.profilePic;
	console.log(picture);
	if(picture == undefined)
	{
		picture = {};
		console.log("empty picture");
		picture.name = "defaultFamilyPicture.jpg";
		picture.originalname ="defaultFamilyPicture.jpg";
		picture.buffer = fs.readFileSync('public/defaults/familyShadowCartoon.jpg');
	}

	var path = '/users/' + uploaderID + '/profilePic/' + picture.name;

	dataBase.updatePPicture(uploaderID , picture.name , picture.originalname , path,function(value){
		switch(value){
			case 1000:
				fs.writeFile('public/'+path, picture.buffer, function(){});
			    res.statusCode = 200;
        		res.setHeader('Content-Type', 'application/json');
				res.end();
				break;
			case 2002:
			    res.statusCode = 404;
    			res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({error : 2002}));
				break;
			case 3000:
       			res.statusCode = 500;
        		res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({error : 3000}));
		}
	});
}

//update existig event
exports.UdateEvent =  function (req, res){
	console.log(req.body.Event);
	dataBase.findEventAndUpDate(function(msg){


	}); //implement

	//find the event by id

};

