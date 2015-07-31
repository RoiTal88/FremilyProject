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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, CONNECT');
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
app.get('/getAllSPById/:_id', queries.getAllServiceSupplierCreatedById);
app.get('/getAllSPByType/:_id/type', queries.findServiceSupplierByType);
app.get('/findServiceSupplierByType/:_id/:type', queries.findServiceSupplierByType)
app.get('/getBulletin/:_id', queries.getBulletins);
app.get('/getEventsByDistrict/:_id', queries.getEventsByDistrict)
app.get('/getServiceSupplierByDistrict/:_id', queries.getServiceSupplierByDistrict)
app.get('/getAllFamiliesByDistrict/:_id', queries.getAllFamiliesByDistrict)
app.get('/getPassword/:_id', queries.getPassword)

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
app.post('/UpdateEventDetails/:userid/:eventid', update.UpdateEventDetails)
app.post('/deleteFriend/:deleter/:deleted' , queries.deleteFriend);
app.post('/findEvents/:_id', queries.getEvetsByParams);
app.post('/UpdateSPPicture/:_userid/:_serviceid', update.UpdateSPPicture)
app.post('/createNewBulletin/:_id', queries.addBulletin);
app.post('/updatePassword/:_id', queries.updatePassword)
app.delete('/deleteEvent/:_uid/:_eid',queries.deleteEvent);

//to do
/*
function - list created events
function edit event
find event by logic!



*/
//======================================================

var server = http.createServer(app);

server.listen(3000,function(){
	console.log("Fremily server is listining on port  \n");
});
/*app.listen(3000, 'localhost',function(){
	console.log("Fremily server is listining on port 3000 \n");
});*/