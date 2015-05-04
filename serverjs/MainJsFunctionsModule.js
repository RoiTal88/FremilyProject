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

