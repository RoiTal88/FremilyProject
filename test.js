var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();


app.use(cookieParser());

app.get('/' , function(req, res){
	console.log(req.cookies.name);
	res.end();
});

app.get('/dir/:user' , function(req, res){
	console.log(req.params.user);
	res.cookie('name',req.params.user, {maxAge : 1000*60*10});
	res.end();
});

app.get('/favicon.ico', function(req, res){
	res.end();
});

app.listen(3000);