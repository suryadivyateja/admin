const mongoose = require('mongoose');

const org_schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    picture:{
        type:String
    },
    address:{
        type:String,
        required:true
    },
    images:{
        type:Array
    },
    reviews:{
        type:Array
    },
    videos:{
        type:Array
    },
    users:{
        type:Array
    },
    category_id:{
        type:String,
        required:true
    }
});

const org = module.exports = mongoose.model('org',org_schema);