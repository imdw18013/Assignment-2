const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: "123456"
    },
    type:{
        type:String,
        required:true,
        default:"user"
    }
})

module.exports = mongoose.model(name = "User", userSchema);