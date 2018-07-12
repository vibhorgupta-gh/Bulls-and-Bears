const mongoose = require("mongoose");
const parameters = require("../utils/parameters.js");

const UserSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
    isAdmin : { type : Boolean , default : false } ,
    accountBalance : Number ,
    activity : [{
    	company : [{
    		type : mongoose.Schema.Types.ObjectId ,
    		ref : "Company"
    	}] ,
    	timeStamp : { type: Date, default: Date.now	} ,
    	action : String ,
    	quantity : Number ,
    	price : Number
    }] ,

    loan : [ {
    	isPending : { type : Boolean  , default : false } ,
    	amount : { type: Number, max: parameters.maxLoan }
    } ]
});

module.exports = mongoose.model('User',UserSchema);
