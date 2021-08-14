const mongoose = require('mongoose');


var propertyDetailsSchema = new mongoose.Schema({
    ownername:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true,
        required:true
    }
    // img:{
    //     data: Buffer,
    //     contentType: String
    // }
})

module.exports = mongoose.model(name="PropertyDetail",propertyDetailsSchema);