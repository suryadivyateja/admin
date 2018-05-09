const mongoose = require('mongoose');
//model schema
const adminSchema = mongoose.Schema({
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
    }
});

const admin = module.exports=mongoose.model('admin',adminSchema);