var mainFunctions = require("../serverjs/MainJsFunctionsModule");
var dataBase = require('../mongodb/DatabaseModule.js');
exports.UpdateMethod = function(req, res){
	switch (req.body.UpdateType)
	{
		case 'ProfilePicture':
			UpdateProfilePicture(req, res);
			break;
		case 'EventPicturs':
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



UpdateProfilePicture = function(req , res ){
	var uploaderID = req.cookies._id;
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
}