const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }
    admin : { type : Boolean , default : false} ,
    accountBalance : Number ,
    activity : [{
    	keys-company : [{
    		type : mongoose.Schema.Types.ObjectId ,
    		ref : "Company"
    	}] ,
    	timeStamp : { type: Date, default: Date.now	} ,
    	action : String ,
    	quantity : Number ,
    	price : Number 
    }] ,

    loan : [ {
    	pending : {type : Boolean  , default : false} ,
    	amount : Number 
    } ]
});

params : loan_params() ;

module.exports = mongoose.model('User',UserSchema);

