var objects = require('../serverjs/ObjectsModule.js');
var mongoose = require('mongoose');
var siteFiles = require('../serverjs/SiteFilesModule.js');
var mainFunctions = require('../serverjs/MainJsFunctionsModule.js');

mongoose.connect('mongodb://localhost/DataBase');



//schema object to create new collection in the data base
var schema = mongoose.Schema;

//+++++++++++++++++++SCHEMAS+++++++++++++++++++++++++++++++
//creating the new schema design
var loginSchema = new schema(objects.UserLogin);
var familySchema = new schema(objects.FamilyObject);
var ppictureSchema = new schema(objects.PPicture);
//=========================================================

//+++++++++++++++++++MODELS+++++++++++++++++++++++++++++++
//creating the model witch is the collection in the data base
var loginModel = mongoose.model('login' , loginSchema);
var familyModel = mongoose.model('family' , familySchema);
var ppictureModel = mongoose.model('pPictures', ppictureSchema);
//=========================================================
//====================DATA BASE QUERIS=====================
exports.getUserDetails = function(req,res){
	//implemented with cookie
};




exports.SignUpNewFamily = function(req,res){
/*	console.log("signing up new family");
	console.log(req.body);*/
    //check password validity
    console.log(req.body);
    req.body.email = req.body.email.toLowerCase();
    if(mainFunctions.checkPasswordsValidity(req.body.password1 , req.body.password2) == false)
    {
        res.statusCode = 406;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error : 2001}));
        return;
    }

	//check for duplicate emails
	var duplicateAnswer;
	utilityFunction.checkForDuplicatesEmail(req.body.email, function(returndValue){
		console.log("in the duplicate callback");
		duplicateAnswer = returndValue;
		if(duplicateAnswer) 
		{
	        res.statusCode = 406;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({error : 2000}));
			return;
		}
		else if(duplicateAnswer == {})
		{	//return the error object mgs
	        res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify({error : 3000 , msg : duplicateAnswer.message}));
			return;
		}
		//everything is cool :] signing up family
		

		var newFamily = new familyModel({});
		newFamily.familyName = req.body.familyName;
		newFamily.email = req.body.email;
		newFamily.password = req.body.password1;
		newFamily.district = req.body.district;
		newFamily.address = req.body.address;
		newFamily.numberOfChildren = req.body.numberOfChildren;
		newFamily.activated = 1;
		//set the parents
		
		for (var i = 0 ;  i < 2 ; i++)
		{
			if(req.body.parents[i] == null)
				break;
			newFamily.parents[i] = new objects.PersonObj(
				req.body.parents[i].nameOfPerson,
				req.body.parents[i].dateOfBirth,
				req.body.parents[i].gender
				);

		}

		//set the children of the family
		for(var i = 0 ; i < req.body.numberOfChildren ; i++)
		{
			newFamily.children[i] = new objects.PersonObj(
				req.body.children[i].nameOfPerson,
				req.body.children[i].dateOfBirth,
				req.body.children[i].gender
				);
		}
		newFamily.save();
		//creating new log in the log in collection for future logins
		var newLogin = new loginModel({email : req.body.email, 
									   password : req.body.password1,
									   familyId : newFamily._id});
		newLogin.save();
		

		//setting family directory for files and pictures
		siteFiles.setFamilyNewDirectory(newFamily._id);
		console.log(newFamily._id.toString());
		res.cookie('_id',newFamily._id.toString(),{maxAge : 1000*60*10});
		res.send(JSON.stringify({ id : newFamily._id}));
	});
};


exports.userLogin = function(req , res){
	loginModel.findOne({email : req.body.email , password : req.body.password } , function(err , doc){
		if(doc)
		{
			res.setHeader('Content-Type', 'application/json');
			res.cookie('id',doc.familyId,{maxAge : 1000*60*10}); //10 minuts cookie
			res.send( JSON.stringify({ id : doc.familyId}));
		}
		else
		{
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({id : null}));
		}
	});
};

exports.newUserLogin = function (req,res){

	var matchFound = 0;
	loginModel.findOne({email : req.body.email},function(err , data){
		if(data != null)
		{
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({id : null}));
			
		}
		else
		{
			var newLogin = new loginModel({email : req.body.email , password : req.body.password});
			newLogin.save();
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify({ id :newLogin._id}));
		}
		
	});
};

exports.getAllUsers = function (req,res){
	loginModel.find({},function(err , docs){
		if(err) docs = err;
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(docs));
	});
};

exports.updatePPicture = function(userID , name , realName, path, callback){
	ppictureModel.findOne({familyId : userID}, function(err, doc){
		if(err)
		{

		}
		else
		{
			if (doc == null)
			{
				doc = new ppictureModel();
				doc.familyId = userID;
			}
			doc.pictureOriginalName = realName;
			doc.pictureDBName = name;
			doc.save();
		}
		familyModel.findOne({_id : userID},function(err , data){
			if(err)
			{
				callback(3000);
			}
			else
			{
				if(data)
				{
					data.profilePictureURL = path;
					console.log("profile picture has been upadted \n" + data.profilePictureURL);
					data.save();
					callback(1000);
				}
				else
				{
					callback(2002);
				}
			}
		});
	});
};


exports.createNewEvent = function(req, res){
	//need an event object to implement

};

exports.GetFamilyInfo = function(req, res){
	familyModel.findOne({
							_id : req.params._id
						}, 
/*						[
							'familyName', 'parents' ,'address', 'email',
							'numberOfChildren', 'children', 'profilePictureURL', 'district'
						],*/
						function(error, data){
							if(data)
							{
								console.log(data);
								res.setHeader('Content-Type' , 'application/json');
								res.statusCode=200;
								res.end(JSON.stringify(data));
							}
							else
							{
								res.statusCode =404;
								res.end();
							}
						});
	var querie = familyModel.findOne();

}

exports.UpdateFamily = function(req, res){
	familyModel.findOne({_id : req.cookies._id} ,function(error , data){
		if(data)
		{
			//family found - implement updateing info
		}
		else
		{
			//the family hasnt found
		}
	});
}


//=========================================================

//=====================UTILITY FUNCTIONS===================
var utilityFunction = {};

//this function is checking for duplicate email 
//if there is a duplicate email  the function will return true 
//if the email is not duplicate jthe functuon will return false
utilityFunction.checkForDuplicatesEmail = function(emailString, callback){
	var valueToReturn;
	loginModel.findOne({email : emailString}, function(err , data){
		if(err) valueToReturn = err;
		else if(data) valueToReturn = true;
		else valueToReturn = false;	
		callback(valueToReturn);
	});
};




//=========================================================