var underscoreJS = require('underscore');
var stringUtils = require('string');
var fs = require('fs');
var dataBase = require('../mongodb/databaseQueries.js');



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

	var path = 'users/'+uploaderID+'/profilePic/'+picture.name;
	
	dataBase.updatePPicture(uploaderID , picture.name , picture.originalname , path,function(value){
		switch(value){
			case 1000:
				fs.writeFile(path, picture.buffer, function(){});
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



};