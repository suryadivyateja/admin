const mongoose = require('mongoose');

const s_schema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    org_id:{
        type:String,
        required:true
    },
    sharings:{
        type:Array,
        required:true
    }
});

const sharing = module.exports = mongoose.model('sharing',s_schema);