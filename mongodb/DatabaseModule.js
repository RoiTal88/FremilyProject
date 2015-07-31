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
var serviceSupplierSchema = new schema(objects.ServiceSupplierSchema);
var bulletinSchema = new schema(objects.BulletinSchema);
//=========================================================

//+++++++++++++++++++MODELS+++++++++++++++++++++++++++++++
//creating the model witch is the collection in the data base
var loginModel = mongoose.model('login' , loginSchema);
var familyModel = mongoose.model('family' , familySchema);
var ppictureModel = mongoose.model('pPictures', ppictureSchema);
var usersInDistrictModel = mongoose.model('usersInDistrict', usersInDistrictSchema);
var eventModel = mongoose.model('events', eventSchema );
var serviceSupplierModel = mongoose.model('serviceSupplier', serviceSupplierSchema);
var bulletinModel = mongoose.model('bulletin', bulletinSchema);
//=========================================================
//====================DATA BASE QUERIS=====================
exports.updatePassword = function(req, res){
	console.log(req.body)

	familyModel.findOne({_id : req.params._id}, function(err, data){
		if (err) {
			res.statusCode =500;
			res.end();
			return;
		}
		else{ 
			data.password = req.body.newPassword;
			data.save(function(err){
			if (err) {
				res.statusCode =500;
				res.end();
				return;
			}else{
				loginModel.findOne({familyId : req.params._id}, function(err, data){
					if (err) {
						res.statusCode =500;
						res.end();
						return;
					} else {
						data.password = req.body.newPassword;
						data.save(function(err){
							if (err) {
								res.statusCode =500;
								res.end();
								return;
							} else {
								res.statusCode =200;
								res.setHeader('Content-Type', 'application/json');
								res.send(err || {password : data.password});
								res.end();	
								return;
							}

						})
						
					}

				})
			
			}
			})
			
		}
	})
}



exports.getPassword = function(req, res){
	familyModel.findOne({_id : req.params._id},function(err, data){
			if (err) res.statusCode =500;
			else res.statusCode =200;
			res.setHeader('Content-Type', 'application/json');
			res.send(err || {password : data.password});
			res.end();
		
	})
}


exports.getAllFamiliesByDistrict = function(req, res){
	familyModel.findOne({_id : req.params._id},{district : 1},function(err,data){
		if (err){
			res.statusCode =500;
			res.end(err);
			return;
		}
		familyModel.find({district : data.district}, function(error, data){
			if (err) res.statusCode =500;
			else res.statusCode =200;
			res.setHeader('Content-Type', 'application/json');
			res.send(err || data);
			res.end();
		})
	})
}


exports.getServiceSupplierByDistrict = function(req, res){
	familyModel.findOne({_id : req.params._id},{district : 1},function(err,data){
		if (err){
			res.statusCode =500;
			res.end(err);
			return;
		}
		serviceSupplierModel.find({district : data.district}, function(error, data){
			if (err) res.statusCode =500;
			else res.statusCode =200;
			res.setHeader('Content-Type', 'application/json');
			res.send(err || data);
			res.end();
		})
	})
}


exports.getEventsByDistrict = function(req, res){
	familyModel.findOne({_id : req.params._id},{district : 1},function(err,data){
		if (err){
			res.statusCode =500;
			res.end(err);
			return;
		}
		eventModel.find({district : data.district}, function(error, data){
			if (err) res.statusCode =500;
			else res.statusCode =200;
			res.setHeader('Content-Type', 'application/json');
			res.send(err || data);
			res.end();
		})
	})
}



exports.getBulletins = function(req, res){
	familyModel.findOne({_id : req.params._id}, function(err, data){
		bulletinModel.find({district : data.district}, {creatorId : 0}, function(err,data){
			if(err) res.statusCode = 500;
			else res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json')
			res.send(err || data);
			res.end();
		})
	})
}


exports.addBulletin = function(req, res){
	familyModel.findOne({_id : req.params._id}, function(err, data){
		var newBulletin = new bulletinModel({
												creatorId : req.params._id,
												time : req.body.time,
												creator : req.body.creator,
												content : req.body.content,
												district : data.district
											})
		newBulletin.save(function(err){
			if(err) res.statusCode = 500;
			else res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end();
		});
	})
	
}

exports.deleteEvent = function(req, res){
	console.log("delet#$%^%$#@@#$%^&*()",req.params._uid , "   ", req.params._eid)
	eventModel.findOneAndRemove({_id : req.params._eid, creatorOfEvent : req.params._uid},function(err, d, data){

		if (err){
			res.statusCode = 500;
			res.setHeader("Content-Type", "application/json")
			res.send(JSON.stringify({err : "cant delete"}));
			res.end();
		}
		else{
			console.log(d, data)
			res.statusCode =200;
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify({ok :1}));					
		}
		
	})
}


exports.getEvetsByParams = function(req, res){
	var type = req.body.type , dateArray = req.body.date, date= [];
	var dateFrom = dateArray[0];
	var dateTo = dateArray[1];
	

	var d1 = dateFrom.split("-");
	var d2 = dateTo.split("-");
	
	var from = new Date(d1[2], d1[1]-1, d1[0]);  // -1 because months are from 0 to 11
	var to   = new Date(d2[2], d2[1]-1, d2[0]);
	date.push(from);
	date.push(to);
		
	familyModel.findOne({_id : req.params._id},{district:1, email:1}, function(err, data){
		if(err || !type || !date){
			res.statusCode =404;
			res.end();
		}
		console.log(date)
		var query = eventModel.find() , dist = [];
		dist.push(data.district);
		query.where('EventType').in(type);
		//query.where('Date').gte(date[0]).lte(date[1]);
		query.where('district').in(dist);
		/*query.where('')
		query.where*/
		query.exec(function(err, result){
			//console.log("this is the event results", result)
			var eventResult = []
			for(var i = 0 ; i< result.length; i++){
				if(result[i].Privacy != 'CLOSED' || result[i].participants.indexOf(data.email) != -1){
					console.log(Date.parse(result[i].date))
					if(date[0] <= Date.parse(result[i].Date) && date[1] >= Date.parse(result[i].Date) )
						eventResult.push(result[i]);
				}
			}
			res.setHeader("Content-Type", "application/json");
			res.statusCode = 200;
			res.send(eventResult);
			res.end();
			return;
		})
	})



}


// app.delete
exports.deleteFriend = function(req, res){
	var deleter = req.body.deleter;
	var deleted = req.body.deleted;
	familyModel.find({ _id : deleter }, function(err, data){
		if(err)	{
			console.log("error", error)
			res.statusCode = 500;
			res.end();
		}
		else {
			delete data.friendList[deleted];
			data.save(function(err){
				err ? console.log('deleted!') : console.log(err);
				res.statusCode = err ? 500 : 200;
				res();
			});
		}
	});
} 

//     /getAllServiceSupplierCreatedById/_id
exports.getAllServiceSupplierCreatedById = function(req, res){
	var creatorid = req.params._id;
	serviceSupplierModele.find({creator : creatorid}, function(err, data){
		if(err){
			console.log(err)
			res.statusCode = 500;
			res.end();
		}
		else {
			res.setHeader('Content-Type', 'application/json')		
			res.statusCode =200;
			res.end(data);
		}
	})
}

//     /findServiceSupplierByType/_id/type
exports.findServiceSupplierByType = function(req, res){
	var finderId = req.params._id;
	var stype = req.params.type;
	familyModel.findOne({_id : finderId},{district: 1},function(err, data){
		serviceSupplierModel.find({type : stype, district : data.district},function(err, data){
			console.log(data);
			if(err){
				console.log(err)
				res.statusCode = 500;
				res.end();
			}
			else{
				res.setHeader('Content-Type', 'application/json')		
				res.statusCode =200;
				res.send(data)
				res.end();
			}
		})
	})
}

//big one with lot of logic
exports.FindEvents = function(req, res){

}



exports.UpdateEventDetails = function(uid, eid, event, cb){
	console.log('event update database model');
	eventModel.update({_id : eid , creatorOfEvent : uid}, {$set : event}, function(err, data){
		console.log("event data _id", data);
		if(err) cb({error : "server error"})
		else if(data == null) cb({data : "not found"})
		else cb(eid || data);
	})
}

exports.CreateNewServiceSupplier = function(req, res){
	familyModel.findOne({_id : req.body.creator},{district :1}, function(err,data){
		console.log(data.district);
		var newServiceSupplier = new serviceSupplierModel({	creator : req.body.creator,
															type : req.body.type,
															name : req.body.name,
															address : req.body.address,
															phoneNumber : req.body.phoneNumber,
															description : req.body.description,
															district : data.district,
															pictureURL : "",
															recomendedBy : [],
															comments : []
														});
		console.log("created new Service supplier");
		newServiceSupplier.save();
		console.log(newServiceSupplier);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify({id : newServiceSupplier._id}));
		res.end();
	})
}

/*exports.EditEvent = function(req, res){
	var idOfCreator = req.params.UserId;
	var idOfEvent = req.params.EventId;
	eventModel.findOne({_id : idOfEvent , "creatorOfEvent" : idOfCreator},funnction(err, data){
		res.setHdeaders('Content-Type', 'application/json');
		if(err){

			res.send(JSON.stringify({err : err }));
		}
		else{

		}


	});
};*/


exports.getEventsById = function(req, res){
	console.log(req.params._id);
	eventModel.find({creatorOfEvent: req.params._id}, function(err, data){

		res.statusCode=200;
		if(err)
			res.end(JSON.stringify({error : 3000}));
		else{
			console.log(data);
			res.setHeader('Content-Type', 'application/json');
			res.send(data);
			res.end();
		}


	})
};


exports.UpdateServicePicture = function(creatorid, serviceid, path, callback ){
	serviceSupplierModel.findOne({_id : serviceid, creator : creatorid}, function(err, data){
		if(data.creator !== creatorid)
			callback(3000);
		else {
			if (err)
				callback(3000);
			else {
				console.log("$$#%$%#$picture path", path)
				data.pictureURL = path;
				data.save();
				callback(1000);
			}
		}
	});

};

exports.UpdateEventPicture = function(creatorid, eventid, path, callback ){
	eventModel.findOne({_id : eventid, creatorOfEvent : creatorid}, function(err, data){
		if(data.creatorOfEvent !== creatorid)
			callback(3000);
		else {
			if (err)
				callback(3000);
			else {
				console.log("$$#%$%#$picture path", path)
				data.mainEventPicture = path;
				data.save();
				callback(1000);
			}
		}
	});

};


exports.CreateNewEvent = function(req, res){
	
	
	console.log("+++++++++++++++++++++++++++++++++++++++++++Creating New Event");
	var query = familyModel.findOne({ _id : req.params._id});
	query.select('friendList');
	query.select('district');
	query.exec(function(err, data){

		var newEvent = new eventModel({
									Title : req.body.Title || 'not specified',
									creatorOfEvent : req.params._id,
									description : req.body.Description,
									EventType : req.body.EventType,
									district : data.district,
									Privacy : req.body.Privacy,
									Date : req.body.Date,
									Time : req.body.Time,
									Location : req.body.Location,
									mainEventPicture : ""
								  });

		console.log("district is::::::",data.district);
		newEvent.district = data.district;
		if(req.body.Privacy == 'CLOSED'){
			for(var i = 0; i < data.friendList.length ; i++){
				//console.log(data[i])
				newEvent.participants.push(data.friendList[i]);
			}
		}
		newEvent.save();
		res.setHeader('Content-Type' , 'application/json');
		res.send(JSON.stringify({_id : newEvent._id}));
		res.end();
	});
	

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
					friendsData.splice(i, 1);
				else
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
		console.log(doc)
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