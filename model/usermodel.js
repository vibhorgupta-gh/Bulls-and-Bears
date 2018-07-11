const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});


const User = module.exports = mongoose.model('User',UserSchema);

