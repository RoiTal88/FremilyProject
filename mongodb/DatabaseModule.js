var objects = require('../serverjs/ObjectsModule.js');
var mongoose = require('mongoose');
var siteFiles = require('../serverjs/SiteFilesModule.js');
var mainFunctions = require('../serverjs/MainJsFunctionsModule.js');


mongoose.connect('mongodb://127.0.0.1:27017/DataBase');



//schema object to create new collection in the data base
var schema = mongoose.Schema;

//+++++++++++++++++++SCHEMAS+++++++++++++++++++++++++++++++
//creating the new schema design
var loginSchema = new schema( objects.UserLoginSchema);
var familySchema = new schema( objects.FamilyObjectSchema);
var ppictureSchema = new schema( objects.PPictureSchema);
var usersInDistrictSchema = new schema( objects.UsereInDistrictSchema);
var eventSchema = new schema (objects.EventSchema);
//=========================================================

//+++++++++++++++++++MODELS+++++++++++++++++++++++++++++++
//creating the model witch is the collection in the data base
var loginModel = mongoose.model('login' , loginSchema);
var familyModel = mongoose.model('family' , familySchema);
var ppictureModel = mongoose.model('pPictures', ppictureSchema);
var usersInDistrictModel = mongoose.model('usersInDistrict', usersInDistrictSchema);
var eventModel = mongoose.model('events', eventSchema );
//=========================================================
//====================DATA BASE QUERIS=====================

exports.CreateNewEvent = function(req, res){
	var newEvent = new eventModel({
									creatorOfEvent : req.params._id,
									description : req.body.description,
									title : req.body.title,
									accessModifier : req.body.accessModifier,
									country : req.body.country,
									district : req.body.district,
									city : req.body.city,
									dateOfEvent : req.body.dateOfEvent,
									address : req.body.address,
									typeOfEvent : req.body.typeOfEvent,
									mainEventPicture : req.body.mainEventPicture
								  });
	console.log("Creating New Event");
	var qurey = familyModel.find({ _id : req.params._id});
	query.select('friendList');
	query.exec(function(err, data){
		for(var i = 0; i < data.length ; i++){
			newEvent.participants.push(data[i]);
		}
	});
	newEvent.save();
	res.setHeader({'Content-Type' : 'application/json'});
	res.send(JSON.stringify({_id : newEvent._id}));
	res.end();

}

exports.getUserFriendsById = function(req, res){
	console.log('in get friends');
	var friendData = [];
	var query = familyModel.findOne({_id : req.params._id});
	query.select('friendList');
	query.exec(function(err, userFriends){
		//console.log(userFriends);
			//the email is the key

		var innerQuery = familyModel.find({email : {$in : userFriends.friendList }});
		innerQuery.select('city district email country parents children numberOfChildren profilePictureURL familyName address');
		innerQuery.exec(function(err, friendsData){
			console.log(friendsData);
			for(var i = 0 ; i < friendsData.length ; i++)
			{
				if(friendsData[i]._id == req.params._id)
				{
					friendsData.splice(i, 1);
				}
				friendsData[i]._id = null;
			}
			res.setHeader('Content-Type','application/json');
			res.statusCode = 200;
			res.send(JSON.stringify(friendsData));
			res.end();
		});
	});
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
		

		var newFamily = new familyModel(new objects.FamilyObject(
			req.body.familyName,
			req.body.email,
			req.body.password1,
			req.body.district,
			req.body.address,
			req.body.city,
			req.body.country,
			req.body.street,
			req.body.numberOfChildren
		));
	//set the parents
		var i;
		for (i = 0 ;  i < 2 ; i++)
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
		for(i = 0 ; i < req.body.numberOfChildren ; i++)
		{
			newFamily.children[i] = new objects.PersonObj(
				req.body.children[i].nameOfPerson,
				req.body.children[i].dateOfBirth,
				req.body.children[i].gender
				);
		}
		newFamily.save();
		//creating new log in the log in collection for future logins
		//on the fly object
		var newLogin = new loginModel({email : req.body.email, 
									   password : req.body.password1,
									   familyId : newFamily._id});
		newLogin.save();

		//add user to distrcit users
		//add user to each distric member


		//setting family directory for files and pictures
		siteFiles.setFamilyNewDirectory(newFamily._id);
		//console.log(newFamily._id.toString());
		utilityFunction.addNewUserToDistrictMembers(newFamily._id, req.body.email ,req.body.district);
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
	var query = familyModel.findOne();
	query.where({'_id' : req.params._id});
	query.select('familyName parents address email numberOfChildren children profilePictureURL district city country street');
	query.exec(function(error , data){
		if(data)
		{
			console.log(data);
			res.setHeader('Content-Type' , 'application/json');
			res.statusCode=200;
			res.end(JSON.stringify(data));
		}
		else
		{
			res.statusCode = 404;
			res.end();
		}
	});


};

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

utilityFunction.addNewUserToDistrictMembers = function(userId, userEmail, districtName){
	usersInDistrictModel.findOne({district : districtName},function(err, currentDistrictCollection){
		if(currentDistrictCollection == null){//need to create the district document
			currentDistrictCollection = new usersInDistrictModel(new objects.UsereInDistrict(districtName));
		}
		currentDistrictCollection.usersInDistrict.push(userId);
		currentDistrictCollection.save();
		familyModel.find({district : currentDistrictCollection.district}, function(err, usersInDistrict) {
			for (var i = 0; i < usersInDistrict.length; i++) {
				if (usersInDistrict[i].email != userEmail) {
					usersInDistrict[i].friendList.push(userEmail);
					usersInDistrict[i].save();
				}
			}

			familyModel.findOne({_id : userId}, function(err , user){
				for(var i = 0 ; i < usersInDistrict.length ; i++)
				{
					user.friendList.push(usersInDistrict[i].email);
				}
				user.save();
			});
		});

	});
};



//=========================================================