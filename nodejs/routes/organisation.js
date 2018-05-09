const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const org = require('../models/organisation/organisation');

//org registration
router.post('/register_org',(req,res)=>{
    org.findOne({email:req.body.email},(err,user)=>{
        if(err) res.status(500).json({success:false,msg:err});
       else if(user) res.status(400).json({success:false,msg:'email already exists'});
       else if(!user){
           let obj = new org({
               email:req.body.email,
               name:req.body.name,
               phone:req.body.phone,
               password:bcrypt.hashSync(req.body.password,10),
               address:req.body.address,
               status:false
           });
           obj.save((err1,u)=>{
               if(err1) res.status(500).json({success:false,msg:err1});
               else res.status(202).json({success:true,msg:u});
           });
       }
    });
});

//authorize org
router.post('/org_auth',(req,res)=>{
    org.findOne({email:req.body.email},(err,user)=>{
        if(err) res.status(500).json({success:false,msg:err});
        else if(!user) res.status(400).json({success:false,msg:'organisation not found'});
        else if(user){
            bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                if(err1) res.status(500).json({success:false,msg:err1});
                else if(!match) res.json({success:false,msg:'please check the password you entered'});
                else if(match){
                    const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                    res.status(200).json({success:true,token:token,msg:{
                        id:user._id,
                        email:user.email
                    }
                });
                }
            });
        }
    });
});

//forgot password
router.post("/forgot_orgPassword", (req, res) => {
    org.findOne({ email: req.body.email }, (err, user) => {
        if(err) res.json({success:false,msg:err});
        else if (!user) {
            res.json({ success: false, msg: 'no organisation registerd with the email provided' });
        } else if(user){
            var password_token = jwt.sign({ email: req.body.email }, config.secret, { expiresIn: '10h' });
            org.findOneAndUpdate({ email: req.body.email }, { $set: { password_token: password_token } }, (err1, u) => {
                if (err1) {
                    res.json({ success: false, msg: err1 });
                } else {
                    res.json({success:true,msg:password_token})
                }
            });
        }
   });
}); 

//verify token for forgot password
router.post('/verifyToken_org', (req, res, next) => {
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
//find org by id
router.get('/find_org_by_id/:id',(req,res)=>{
    org.findById({_id:req.params.id},(err,o)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:o}); 
    })
})
//find org by email
router.get('/find_org_by_email/:email',(req,res)=>{
    org.findOne({email:req.params.email},(err,user)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:user});
    });
});

//update password
router.post("/authPassword_org", (req, res, next) => {

    const org_id = req.body.org_id;
    const password = req.body.password;
    var newPassword = req.body.newPassword;
       org.findById({_id:org_id},(err, user) => {
        if (err) {
            res.json({ success: false, msg: err });
        } else {
            org.findByIdAndUpdate({_id:org_id},{$set:{password:bcrypt.hashSync(req.body.newPassword,10)}}).exec((err1,u)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:'password changed successfully'});
        });
    }
    });
});
//get all reviews by organisation
router.get('/find_reviews_by_org/:id',(req,res)=>{
    org.findById({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else if(data){
            res.json({success:true,msg:data.reviews});
        }
    });
});
//delete organisation
router.get('/delete_org/:id',(req,res)=>{
    org.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'successfully deleted'});
    })
})




module.exports = router;