exports.UserLogin = {
	email : String ,
	password : String,
	familyId : String
};

exports.PersonObj = function(name, date, gender){
	this.nameOfPerson = name;
	this.dateOfBirth = date;
	this.gender = gender;
};

exports.PPicture = {
	pictureOriginalName : String ,
	pictureDBName :String ,
	familyId : String
};



exports.FamilyObject = {
    //client
	familyName : String,
	parents : [] ,
	password1 :String,
	password2 :String,
	password : String,
	address : String,
	district : String,
	email : String,
	numberOfChildren : Number ,
	children : [] ,
    //server
	activated : Number,
    profilePictureURL : String,
    privateID : String,
    publicID : String

};