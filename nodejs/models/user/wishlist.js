const mongoose = require('mongoose');

const wishlist_schema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    wishlist:{
        type:Array,
        required:true
    }
});

const Wishlist = module.exports = mongoose.model('Wishlist',wishlist_schema);