var Queries = require('../mongodb/DatabaseModule.js');

exports.CreateMethod = function(req, res)
{
	var validityValue;
	switch (req.body.CreateType)
	{
		case 'Family':
			CreateNewFemily(req, res);
		break;

		case 'Event':
			CreateNewEvent(req,res);
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

CheckEventRequestValidity = function(req, res)
{
	//not implemented
	return 1001;
}