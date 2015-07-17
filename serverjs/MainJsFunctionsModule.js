var underscoreJS = require('underscore');
var stringUtils = require('string');
var fs = require('fs');
var dataBase = require('../mongodb/DatabaseModule.js');
var files = require('../serverjs/SiteFilesModule.js');



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


//find Event By id
//get type of event and date
// return events according to the level of privacy in the district of the sercher
exports.FindEvent = function (req,res){
	dataBase.FindEvent(function(code){

	});
};

//
exports.FindAvialableEventsToAttend = function (req,res){

};
exports.FindServiceSupplierByType = function(req, res){


};

exports.GetAllCreatedServiceSupplierById = function(req, res){

};

//this function get _id of the deleter and the email of the deleted
exports.DeleteFriend = function(req, res){


};

exports.AddFriend = function(req, res){


};