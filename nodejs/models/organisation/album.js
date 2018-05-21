const mongoose = require('mongoose');

const album_schema = mongoose.Schema({
    org_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    images:{
        type:Array
    }
});

const album = module.exports = mongoose.model('album',album_schema);
