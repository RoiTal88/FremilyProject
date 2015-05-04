exports.UserLogin = {
	email : String ,
	password : String,
	familyId : String
};

exports.PersonObj = {
	nameOfPerson : String,
	dateOfBirth : Date,
	gender : String
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
	address : String,
	email : String,
	numberOfChildren : Number ,
	children : [] ,
    //server
	activated : Number,
    profilePictureURL : String,
    privateID : String,
    publicID : String

};