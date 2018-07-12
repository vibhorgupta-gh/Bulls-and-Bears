const mongoose = require("mongoose");

const companySchema = mongoose.Schema({
	name : String ,
	symbol : String , 
	description : String ,
	sharePrice : Number ,
	totalQuantity : Number ,
	marketCap : Number ,
	history : [{
		timestamp : { type : Date , default : Date.now } ,
		sharePrice : Number ,
		availableQuantity: Number 
	} ]

});

module.exports = mongoose.model("Company" , companySchema);