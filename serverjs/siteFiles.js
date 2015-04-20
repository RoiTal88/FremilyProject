var fs = require('fs');
var path = require('path');

exports.getFile = function(req , res , filePath){
		var fileExt = path.extname(filePath);
		var contentType;
		//taking care of the content type of the response
		switch (fileExt)
		{
			case '.html':
				contentType = 'text/html';
				break;

			case '.css':
				contentType = 'text/css';
				break;

			case '.js':
				contentType = 'text/javascript';
				break;
		}
		//checking if the file is exists in the server
		fs.exists(filePath ,function(isExsist){
			//if the is exsist in the server
			if (isExsist)
			{
				fs.readFile(filePath , function (err , file){
					res.writeHead(200 , {'Content-Type' : contentType});
					res.end(file);	

				});
			}
			else
			{
				res.writeHead(404);
				res.end();
			}

		});
	};

exports.setFamilyNewDirectory = function(familyId){
	fs.mkdir('users/'+familyId);
	fs.mkdir('users/'+familyId+'/profilePic');
	fs.mkdir('users/'+familyId+'/createdEventsPic');
};

