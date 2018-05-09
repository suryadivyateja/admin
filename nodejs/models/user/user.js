const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
    },
    firstName:{
        type:String,
        // required:true
    },
    lastName:{
        type:String,
        // required:true
    },
    gender:{
        type:String,
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:Array
    },
    city:{
        type:String
    },
    zip:{
        type:Number
    },
    country:{
        type:String
    },
    picture:{
        type:String
    },
    status:{
        type:Boolean
    }
});

const User = module.exports=mongoose.model('User',userSchema);