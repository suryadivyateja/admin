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
    },
    reqs:{
        type:Array
    },
    em_req:{
        type:String
    }

},{
    toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }
  });

  org_schema.virtual('category',{
      ref:'category',
      localField:'category_id',
      foreignField:'_id'
  })
const org = module.exports = mongoose.model('org',org_schema);