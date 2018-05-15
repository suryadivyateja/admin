const mongoose = require('mongoose');

const e_schema = mongoose.Schema({
    org_name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String,
    },
    description:{
        type:String
    }
});

const enroll = module.exports = mongoose.model('enroll',e_schema);