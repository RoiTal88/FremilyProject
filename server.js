var express = require("express");
var app = express();
var http = require('http');
var queries = require('./databaseQueries.js');
var files = require('./siteFiles');
var bodyParser = require('body-parser');
var multer = require('multer');
var mainFunctions = require("./mainJsFunctions");


//======================Application MiddelWare=======================================================
app.use(function(req, res , next){
    bodyParser.json();
    next();
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next){
    multer({dest: './upload'});
    next();
});
//===================================================================================================

//get requests
app.get('/getAllUsers' , queries.getAllUsers );
app.get('/' , function(req,res){
	console.log("main page loading");
	files.getFile(req,res,'public/index.html');
});

app.get('/signup' , function(req,res)
{
	console.log('loading sign up page');
	files.getFile(req,res,'public/signUpPage.html');
});

app.post('/uploadPicture', mainFunctions.UploadPicture(req, res);

app.get('*', function(req,res){
	console.log("file " + "public"+req.url/*req.url.slice(1 , req.url.length)*/);
	files.getFile(req,res, "public"+req.url/*.slice(1 , req.url.length)*/);
});


//post requests
app.post('/login', queries.userLogin);
app.post('/nLogin' , queries.newUserLogin);
app.post('/signUpNewFamily' , queries.signUpNewFamily);

var server = http.createServer(app);
server.listen(80,function(){
	console.log("Fremily server is listining on port 80 \n");
});
/*app.listen(3000, 'localhost',function(){
	console.log("Fremily server is listining on port 3000 \n");
});*/