var Queries = require('../mongodb/DatabaseModule.js');

exports.CreateMethod = function(req, res)
{
	var validityValue;
	switch (req.body.CreateType)
	{
		case 'Family':
			console.log("new family");
			CreateNewFemily(req, res);
		break;

		case 'Event':
			console.log("Creating New Events - createModule");
			CreateNewEvent(req,res);
		break;

		case 'ServiceSupplier':
			CreateNewServiceSupplier(req, res);
		break;
	}

	return;
}


CreateNewFemily = function(req, res)
{
	Queries.SignUpNewFamily(req, res);
	return;
}

CreateNewEvent = function(req, res)
{
	Queries.CreateNewEvent(req, res);
}

exports.CreateNewServiceSupplier = function(req, res)
{
	console.log("creating new service supplier")
	Queries.CreateNewServiceSupplier(req, res);
}

CheckFemilyRequestValidity = function(req, res)
{
	//check for cookie: if user has a cookie so he must log out first.
	if(req.cookies._id)
	{
		res.setHeader('Content-Type','application/json');
		res.statusCode(406);
		res.end(JSON.stringify({error : 2003 , msg : 'user must logout first'}));
	}
}




//create new service supplier
//needed to create object first
//the district of the service supplier is determined according


