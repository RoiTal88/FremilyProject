var objects = require('./objects.js');
var mongoose = require('mongoose');
var siteFiles = require('./siteFiles.js');
var mainFunctions = require('./mainJsFunctions.js');
mongoose.conmainJsFunctionsnect('mongodb://localhost/FremilyDataBase');



//schema object to create new collection in the data base
var schema = mongoose.Schema;

//+++++++++++++++++++SCHEMAS+++++++++++++++++++++++++++++++
//creating the new schema design
var loginSchema = new schema(objects.UserLogin);
var familySchema = new schema(objects.FamilyObject);
//=========================================================

//+++++++++++++++++++MODELS+++++++++++++++++++++++++++++++
//creating the model witch is the collection in the data base
var loginModel = mongoose.model('login' , loginSchema);
var familyModel = mongoose.model('family' , familySchema);
//=========================================================
//====================DATA BASE QUERIS=====================
exports.signUpNewFamily = function(req,res){
	console.log("signing up new family");
	console.log(req.body);
    //check password validity
    if(mainFunctions.checkPasswordsValidity(req.body.password1 , req.body.password2) == false)
    {
        res.statusCode = 406;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({error : 2001}));
        return;
    }

	//check for duplicate emails
	var duplicateAnswer = utilityFunction.checkForDuplicatesEmail(req.body.eamil);
    console.log("answer" + duplicateAnswer);

	if(duplicateAnswer === true) // booleanObject
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
		res.end(JSON.stringify({error : 3000 , msg : duplicateAnswer}));
		return;
	}
	//everything is cool :] signing up family

	var newFamily = new familyModel({
		familyName : req.body.familyname,
		email : req.body.email,
		password : req.body.password1,
		address : req.body.adsress,
		numberOfChildren : req.body.numberOfChildren,
		//children : req.body.children,
		activated :1 //change it afterwards to mail athentication
	});
	//set the parents
	//just checking the source controlvf;
	for (var i = 0 ;  i < 2 ; i++)
	{
		newFamily.parents[i] = objects.PersonObj;
		newFamily.parents[i].nameOfPerson = req.body.parents[i].nameOfParent;
		newFamily.parents[i].dateOfBirth = req.body.parents[i].dateOfBirth;
		newFamily.parents[i].gender = req.body.parents[i].gender;
	}
    console.log(newFamily.numberOfChildren);
    console.log(newFamily.parents);

	//set the children of the family
	for(var i = 0 ; i < newFamily.numberOfChildren ; i++)
	{
		newFamily.children[i] = objects.PersonObj;
		newFamily.children[i].nameOfPerson = req.body.children[i].nameOfChild;
		newFamily.children[i].dateOfBirth = req.body.children[i].dateOfBirth;
		newFamily.children[i].gender = req.body.children[i].gender;
	}
	newFamily.save();
	//creating new log in the log in collection for future logins
	var newLogin = new loginModel({email : req.body.email , password : req.body.password1});
	newLogin.save();
	

	//setting family directory for files and pictures
	siteFiles.setFamilyNewDirectory(newLogin._id);
	res.send(JSON.stringify({ id : newLogin._id}));
};


exports.userLogin = function(req , res){
	//check if the mail is already exsist
	console.log(req.body + "RELAX BARAK EVERYTHING IS OK");
	loginModel.findOne({email : req.body.email , password : req.body.password } , function(err , doc){
		if(doc)
		{
			res.setHeader('Content-Type', 'application/json');
			res.send( JSON.stringify({ id : doc._id}));
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
		console.log(data+" relax BARKAK");
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
	console.log(req.url);
	loginModel.find({},function(err , docs){
		if(err) docs = err;
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(docs));
	});
};
//=========================================================

//=====================UTILITY FUNCTIONS===================
var utilityFunction = {};
utilityFunction.checkForDuplicatesEmail = function(emailString){
	var isDuplicate = false;
	loginModel.findOne({email : emailString} , function(error , data)
	{
		if(error == null)
		{
			//this is a data base error sent back to the client
			isDuplicate = error;
		}
		else
		{
			if(data != null)
			{
				isDuplicate = true;
			}
			else
			{
				isDuplicate = false;
			}
		}
	});
    return isDuplicate;
};

//=========================================================