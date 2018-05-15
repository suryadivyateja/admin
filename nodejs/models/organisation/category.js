const mongoose = require('mongoose');

const cat_schema = mongoose.Schema({
  cat_name:{
    type:String,
    required:true
  },
  picture:{
    type:String,
  },
  description:{
    type:String
  }
});

const category = module.exports = mongoose.model('category',cat_schema);