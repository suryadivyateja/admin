const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const admin = require('../models/admin/admin');
const User = require('../models/user/user');

//post admin details
router.post('/admin_det',(req,res)=>{
    let newAdmin = new admin({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,10)
    });
    newAdmin.save((err,user)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:user});
    });
});
//authenticate admin
router.post('/auth_admin',(req,res)=>{
    admin.findOne({email:req.body.email},(err,user)=>{
        if(err) res.json({success:false,msg:err});
        else if(!user){
            res.json({success:false,msg:`sorry,no user found with this email : ${req.body.email}`});
        }
        else if(user){
            bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                if(err1) res.json({success:false,msg:err1});
                else if(!match) res.json({success:false,msg:'please check the password you entered'});
                else if(match){
                    const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                    res.json({success:true,token:token,msg:{
                        id:user._id,
                        email:user.email
                    }
                });
                }
            });
        }
    });
});
//get all users
router.get('/get_all_users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})
module.exports = router;