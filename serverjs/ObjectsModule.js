exports.UserLogin = function(email, password, familyId){
	this.email = email;
	this.password = password;
	this.familyId = familyId;
};
exports.UserLoginSchema = {
	email : String ,
	password : String,
	familyId : String
};

exports.PersonObj = function(name, date, gender){
	this.nameOfPerson = name;
	this.dateOfBirth = date;
	this.gender = gender;
};

exports.PPicture = function(originalName, databaseName, familyId )
{
	this.pictureOriginalName = originalName;
	this.pictureDBName = databaseName;
	this.familyId = familyId;
};

exports.PPictureSchema = {
	pictureOriginalName : String ,
	pictureDBName :String ,
	familyId : String
};



exports.FamilyObject = function(
								familyName ,/* parents ,*/  email, password,
								district, address, city, country, street, numberOfChildren /*children*/
								){
    //client
	this.familyName = familyName;
	this.parents = [];
	this.password = password;
	this.address = address;
	this.district = district;
	this.email  = email;
	this.numberOfChildren = numberOfChildren;
	this.children = [];
	this.city = city;
	this.country = country;
	this.street = street;
    //server
	this.activated = 1;
	this.profilePictureURL = "";
	this.freindList = [];
};


exports.FamilyObjectSchema = {
	//client
	familyName : String,
	parents : [] ,
	password1 :String,
	password2 :String,
	password : String,
	address : String,
	district : String,
	city : String,
	country : String,
	street : String,
	email : String,
	numberOfChildren : Number ,
	children : [] ,
	//server
	activated : Number,
	profilePictureURL : String,
	privateID : String,
	publicID : String,
	friendList : [],
	createdEvents : [],
	createdServiceSupplier : []

};

exports.UsereInDistrictSchema = {
	district : String,
	usersInDistrict : [],
	usersCount : Number
}

exports.UsereInDistrict = function(districtName){
	this.district = districtName;
	this.usersInDistrict = [];
	this.usersCount = 0;
}

exports.EventSchema =  {
	creatorOfEvent : String,
	title : String,
	description : String,
	EventType : String,
	Privacy : String,
	Date : String,
	Time : String,
	Location : String,
	mainEventPicture : String,
	participants : [],
	relatedPictures : []
}

exports.EventsObject = function(creatorOfEvent, description, accessModifier, country, district, city,title,dateOfEvent, address, typeOfEvent) {
	this.creatorOfEvent = creatorOfEvent;
	this.description = description;
	this.title = title;
	this.accessModifier = accessModifier;
	this.country = country;
	this.district = district;
	this.city = city;
	this.dateOfEvent = dateOfEvent;
	this.address = address;
	this.typeOfEvent = typeOfEvent;

}

exports.ServiceSupplierSchema = {
	creator : String,
	type : String,
	name : String,
	address : String,
	phoneNumber : String,
	description : String,
	pictureURL : String,
	recomendedBy : [String],
	comments : [{name : String, comment: String}]
};

exports.ServiceSupplierObject = function(creator, type, name, address, phoneNumber, description){
	this.creator = creator;
	this.type = type;
	this.name = name;
	this.address = address;
	this.phoneNumber = phoneNumber;
	this.description = description;
	this.pictureUrl = "";
	this.recomendedBy = [];
	this.comments = [];

};
