exports.UserLogin = {
	email : String ,
	password : String
};

exports.PersonObj = {
	nameOfPerson : String,
	dateOfBirth : Date,
	gender : String
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
    profilePictureURL : String

};