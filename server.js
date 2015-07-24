var express = require("express");
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var bodyParser = require('body-parser');
var multer = require('multer');

var mainFunctions = require("./serverjs/MainJsFunctionsModule");
var create = require('./serverjs/CreateModule.js');
var update = require('./serverjs/UpdateModule.js');
var queries = require('./mongodb/DatabaseModule.js');
var files = require('./serverjs/SiteFilesModule.js');


//======================Application MiddelWare=======================================================
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next) {
  res.header("X-powered-by", "RoiTal");
  next();
});

app.use(multer({dest: './upload' , inMemory : true}));
//===================================================================================================

//get requests
//app.get('/getAllUsers' , queries.getAllUsers );
app.get('/' , function(req,res){
	files.getFile(req,res,'public/index.html');
});
app.get('/GetUserInfo/:_id', queries.GetFamilyInfo);
app.get('/signup' , function(req,res){
	files.getFile(req,res,'/public/signUpPage.html');
});
app.get('/getUserFriends/:_id', queries.getUserFriendsById );
app.get('/getEventCreatedByUser/:_id', queries.getEventsById);
//update event




//======================For Files======================
app.get('*', function(req,res){
	files.getFile(req,res, "./public"+req.url);
});
//======================================================


//======================Post_Requests===================
app.post('/login', queries.userLogin);
//app.post('/nLogin' , queries.newUserLogin);
app.post('/Update', update.UpdateMethod);
app.post('/UpdatePP/:_id' , update.UpdateProfilePicture);
app.post('/UpdateEventPicture/:_userid/:_eventid', update.UpdateEventMainPicture);
app.post('/Create', create.CreateMethod);
app.post('/familyInfo', queries.GetFamilyInfo);
app.post('/CreateNewEvent/:_id', create.CreateMethod);
//app.post('/EditEvent', update.UpdateEvent);
app.post('/CreateNewServiceSupplier/', queries.CreateNewServiceSupplier)
app.post('/UpdateEventDetails/:_userid/:eventid', update.UpdateEventDetails)
app.post('/deleteFriend/:deleter/:deleted' , queries.deleteFriend);
//to do
/*
function - list created events
function edit event
find event by logic!



*/
//======================================================

var server = http.createServer(app);

server.listen(80,function(){
	console.log("Fremily server is listining on port  \n");
});
/*app.listen(3000, 'localhost',function(){
	console.log("Fremily server is listining on port 3000 \n");
});*/