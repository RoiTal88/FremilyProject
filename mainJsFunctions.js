var underscoreJS = require('underscore');
var stringUtils = require('string');
var fs = require('fs');
var dataBase = require('./databaseQueries');



exports.checkPasswordsValidity = function (str1 , str2)
{
	var validPassword;
	if(str1 != str2)
	{
		validPassword  = false;
	}
	else
	{
		var lenOfPassword = str1.length;
		var currentChar;
		for(var i = 0 ; i < lenOfPassword ; i++)
		{
			currentChar = str1.charAt(i);
			if(((currentChar >= 'a')&&(currentChar <= 'z') ) || 
			    ((currentChar >= 'A')&&(currentChar <= 'Z')) ||
			    ( (currentChar >= '0')&&(currentChar <= '9') ))
			{
				continue;
			}
			else
			{
				validPassword = false;
				break;
			}
		}
	}
	return validPassword;


};

exports.ProfilePicture = function(req , res ){
	var uploaderID = req.params.id;
	var picture = req.files.profilePicture;


	fs.writeFile('users/'+uploaderID+'/profilePic/'+picture.name,picture.buffer);
	dataBase.updatePPicture(uploaderID ,picture.name , picture.originalname);



};