var express = require("express");
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var http = require('http');
var queries = require('./mongodb/databaseQueries.js');
var files = require('./serverjs/siteFiles');
var bodyParser = require('body-parser');
var multer = require('multer');
var mainFunctions = require("./serverjs/mainJsFunctions");


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
app.get('/getAllUsers' , queries.getAllUsers );
app.get('/' , function(req,res){
	files.getFile(req,res,'public/index.html');
});
app.get('/signup' , function(req,res){
	files.getFile(req,res,'public/signUpPage.html');
});
app.get('/user/:id', );
app.get('verifiyNewUser')


//======================For Files======================
app.get('*', function(req,res){
	files.getFile(req,res, __dirname+req.url);
});



//post requests
app.post('/login', queries.userLogin);
app.post('/nLogin' , queries.newUserLogin);
app.post('/signUpNewFamily' , queries.signUpNewFamily);
app.post('/profilePicture/:id', mainFunctions.ProfilePicture);

var server = http.createServer(app);

server.listen(80,function(){
	console.log("Fremily server is listining on port 80 \n");
});
/*app.listen(3000, 'localhost',function(){
	console.log("Fremily server is listining on port 3000 \n");
});*/