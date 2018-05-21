const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const multer = require('multer');
const path = require('path');
const config = require('../config/database');
const User = require('../models/user/user');
const org = require('../models/organisation/organisation');
const Wishlist = require('../models/user/wishlist');
const sharing = require('../models/user/sharing');

//user registration
router.post('/register',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            let obj = new User({
                email:req.body.email,
                userName:req.body.userName,
                phone:req.body.phone,
                password:bcrypt.hashSync(req.body.password,10),
                address:req.body.address,
                status:false
            });
            obj.save((er1,u)=>{
                if(er1) res.json({success:false,msg:er1});
                else if(u){
                    User.findOne({email:u.email},(err,user)=>{
                        if(!user) res.json({success:false,msg:'user not found'});
                        else if(user){
                            bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                                if(err1) res.status(500).json({success:false,msg:err1});
                                else if(!match) res.json({success:false,msg:'please check the password you entered'});
                                else if(match){
                                    const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                                    res.json({success:true,token:token,msg:{
                                        id:user._id,
                                        email:user.email,
                                        userName:user.userName
                                    }
                                });
                                }
                            });
                        }else{
                            res.json({success:false,msg:err});
                        }
                    });
                        
                    }
                });
        }
        else if(user) res.json({success:false,msg:'email already exists'});
        else  res.json({success:false,msg:err}); 
          
    });
});

//authorize user
router.post('/user_auth',(req,res)=>{
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user) res.json({success:false,msg:'user not found'});
        else if(user){
            bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                if(err1) res.status(500).json({success:false,msg:err1});
                else if(!match) res.json({success:false,msg:'please check the password you entered'});
                else if(match){
                    const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                    res.json({success:true,token:token,msg:{
                        id:user._id,
                        email:user.email,
                        userName:user.userName
                    }
                });
                }
            });
        }else{
            res.json({success:false,msg:err});
        }
    });
});

//forgot password
router.post("/forgot_password", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            res.json({ success: false, msg: 'no user registerd with the email provided' });
        } else if(user){
            var password_token = jwt.sign({ email: req.body.email }, config.secret, { expiresIn: '10h' });
            User.findOneAndUpdate({ email: req.body.email }, { $set: { password_token: password_token } }, (err1, u) => {
                if (err1) {
                    res.json({ success: false, msg: err1 });
                } else {
                    res.json({success:true,msg:password_token})
                }
            });
        }else{
             res.json({success:false,msg:err});
        }
   });
}); 

//verify token for forgot password
router.post('/verifyToken', (req, res, next) => {
    var token = req.body.token;
    console.log(token);
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            // console.log(decoded.email);
            var email = decoded.email
            res.json({ success: true, msg: email });
        }
    });
});
//find user by email
router.get('/find_user_by_email/:email',(req,res)=>{
    User.findOne({email:req.params.email},(err,user)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:user});
    });
});
//find user by id
router.get('/find_user_by_id/:id',(req,res)=>{
    User.findById({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})

//update password
router.post("/authPassword", (req, res, next) => {

    const user_id = req.body.user_id;
    const password = req.body.password;
    var newPassword = req.body.newPassword;
    User.findById({_id:user_id},(err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            User.findByIdAndUpdate({_id:user_id},{$set:{password:bcrypt.hashSync(req.body.newPassword,10)}}).exec((err1,u)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:'password changed successfully'});
        });
    }
    });
});
//update user details
router.post("/update_user_det",(req,res)=>{
    User.findById({_id:req.body.id},(err,user)=>{
        if(!user){
            res.json({success:false,msg:'user not found'});
        }
        else if(user){
            User.findByIdAndUpdate({_id:req.body.id},{$set:{
                firstName:req.body.userName,
                lastName:req.body.lastName,
                userName:req.body.userName,
                phone:req.body.phone,
                city:req.body.city,
                country:req.body.country,
                zip:req.body.zip,
                picture:req.body.picture 
            }}).exec((err1,data)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:'updated successfully'});
            });
        }else res.json({success:false,msg:err});
    });
});
//post review
router.post('/post_review',(req,res)=>{
    var obj = {
        id:shortid.generate(),
        user_id:req.body.user_id,
        title:req.body.title,
        description:req.body.description,
        rating:req.body.rating
    };
    org.findByIdAndUpdate({_id:req.body._id},{$push:{reviews:obj}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'review posted successfully'});
    });
});
//delete user
router.get('/delete_user/:id',(req,res)=>{
    User.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'successfully deleted'});
    });
});
//Add address
router.post('/post_address',(req,res)=>{
    var obj={
        id:shortid.generate(),
        title:req.body.title,
        address : req.body.address,
    }
    User.findByIdAndUpdate({_id:req.body._id},{$push:{address:obj}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'address added successfully'});
    });
});
//delete address
router.post('/delete_address',(req,res)=>{
    User.findByIdAndUpdate({_id:req.body.user_id},{$pull:{address:{id:req.body.id}}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'successfully deleted'});
    });
});
//add organisation to wishlist
router.post('/post_org_to_wishlist',(req,res)=>{
    var obj = {
        id : shortid.generate(),
        org_id : req.body.org_id
    };
    Wishlist.findOne({'wishlist.id':req.body.org_id},(er,u)=>{
        if(er) res.json({success:false,msg:er});
        else if(u){
            res.json({success:false,msg:'organisation already exists'});
        }else if(!u){
            Wishlist.findOneAndUpdate({user_id:req.body._id},{$push:{wishlist:obj}}).exec((err,data)=>{
                if(err) res.json({success:false,msg:err});
                else res.json({success:true,msg:'successfully added to wishlist'});
            });
        }
    })
   
});
//remove organisation from wishlist
router.post('/delete_org_from_wishlist',(req,res)=>{
    Wishlist.findOneAndUpdate({user_id:req.body._id},{$pull:{wishlist:{id:req.body.o_id}}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'deleted successfully'});
    });
});
//sharing history 
router.post('/sharing_history',(req,res)=>{
    var obj = {
        id: shortid.generate(),
        sharing:req.body.sharing
    };
    sharing.find({_id:req.body.u_id},(err,data)=>{
        
        if(data.length === 0){
            var s = new sharing({
                user_id:req.body.user_id,
                org_id:req.body.org_id,
            });
            s.save((er,d)=>{
                if(d){
                    console.log(d);
                    sharing.findByIdAndUpdate({_id:d._id},{$push:{sharings:obj}},(er2,da)=>{
                        if(er2) res.json({success:false,msg:er2});
                        else res.json({success:true,msg:da});
                    });
                }else res.json({success:false,msg:er});
            });
        } else if(data.length > 0){
            sharing.findByIdAndUpdate({_id:req.body.u_id},{$push:{sharings:obj}},(er3,dat)=>{
                if(er3) res.json({success:false,msg:er3});
                else res.json({success:true,msg:dat});
            });
        } else{
            if(err) res.json({success:false,msg:err});
        }
    });
});
//delete sharing history 
router.post('/delete_sharing_history',(req,res)=>{
    sharing.findByIdAndUpdate({_id:req.body._id},{$pull:{sharings:{id:req.body.s_id}}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'deleted successfully'});
    });
});


module.exports = router;