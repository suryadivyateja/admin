const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Path = require('path');
const shortid = require('shortid');
const config = require('../config/database');
const org = require('../models/organisation/organisation');
const category = require('../models/organisation/category');
const enroll = require('../models/organisation/enroll');
const album = require('../models/organisation/album');

var storage = multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+Path.extname(file.originalname));
    }
  });
  var upload = multer({ storage: storage });

  router.post('/upload_pro',upload.array('pics[]'),(req,res)=>{
      var data=[];
    req.files.forEach(element=>{
       data.push({image:`http://localhost:3000/image/${element.filename}`});
    })
    res.json({success:true,msg:data});
})
//org registration
router.post('/register_org',(req,res)=>{
    console.log(req.body);
    org.findOne({email:req.body.email},(err,user)=>{
       if(user) res.json({success:false,msg:'email already exists'});
       else if(!user){
           let obj = new org({
               email:req.body.email,
               name:req.body.name,
               phone:req.body.phone,
               password:bcrypt.hashSync(req.body.password,10),
               lat:req.body.lat,
               lon:req.body.lon,
               category_id:req.body.category_id,
               status:false
           });
           obj.save((er1,u)=>{
               if(u){
                org.findOne({email:u.email},(err,user)=>{
                    if(!user) res.json({success:false,msg:'organisation not found'});
                    else if(user){
                        bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                            if(err1) res.json({success:false,msg:err1});
                            else if(!match) res.json({success:false,msg:'please check the password you entered'});
                            else if(match){
                                const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                                res.json({success:true,token:token,msg:{
                                    id:user._id,
                                    email:user.email,
                                    name:user.name
                                }
                            });
                            }
                        });
                    }else res.json({success:false,msg:err});
                });
           
       } else res.json({success:false,msg:er1});
    });
}
else res.json({success:false,msg:err});

});
});

//authorize org
router.post('/org_auth',(req,res)=>{
    org.findOne({email:req.body.email},(err,user)=>{
        if(!user) res.json({success:false,msg:'organisation not found'});
        else if(user){
            bcrypt.compare(req.body.password,user.password,(err1,match)=>{
                if(err1) res.json({success:false,msg:err1});
                else if(!match) res.json({success:false,msg:'please check the password you entered'});
                else if(match){
                    const token = jwt.sign({data:user},config.secret,{expiresIn:604800});
                    res.json({success:true,token:token,msg:{
                        id:user._id,
                        email:user.email,
                        name:user.name
                    }
                });
                }
            });
        }else res.json({success:false,msg:err});
    });
});

//forgot password
router.post("/forgot_orgPassword", (req, res) => {
    org.findOne({ email: req.body.email }, (err, user) => {
         if (!user) {
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
        }else res.json({success:false,msg:err});
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
    org.findById({_id:req.params.id}).populate('category').exec((err,o)=>{
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
//get all organisations
router.get('/get_all_orgs',(req,res)=>{
    org.find({}).populate('category').exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    })
})
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
router.post("/update_org_det",(req,res)=>{
    console.log(req.body);
    org.findById({_id:req.body.id},(err,user)=>{
        if(!user){
            res.json({success:false,msg:'user not found'});
        }
        else if(user){
            org.findByIdAndUpdate({_id:req.body.id},{$set:{
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                category_id:req.body.category_id,
                picture:req.body.picture 
            }}).exec((err1,data)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:'updated successfully'});
            });
        }else res.json({success:false,msg:err});
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
    });
});
// add an category
router.post('/post_category',(req,res)=>{
    category.findOne({cat_name:req.body.cat_name},(err,data)=>{
        
        if(data) res.json({success:false,msg:'category already exists'});
        else if(!data){
            var obj = new category({
                cat_name : req.body.cat_name,
                picture : req.body.picture,
                description : req.body.description
            });
            obj.save((err1,c)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:c});
            });
        }else res.json({success:false,msg:err});
    });
});
//get all category
router.get('/get_all_categories',(req,res)=>{
    category.find({},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    });
});
//get category by id
router.get('/get_category_by_id/:id',(req,res)=>{
    category.findById({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else if(data) res.json({success:true,msg:data});
    });
});
//get category by name
router.get('/get_category_by_name/:name',(req,res)=>{
    category.findOne({cat_name:req.params.name},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else if(data) res.json({success:true,msg:data});
    });
});
//delete category
router.get('/delete_category/:id',(req,res)=>{
    category.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'succcessfully deleted'});
    });
});
//edit category
router.post('/edit_category',(req,res)=>{
    category.findByIdAndUpdate({_id:req.body.id},{$set:{cat_name:req.body.cat_name,picture:req.body.cat_picture,
    description:req.body.description}}).exec((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'updated successfully'});
    })
})
//enroll organisation
router.post('/enroll_org',(req,res)=>{
    var obj = new enroll({
        org_name:req.body.org_name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        description:req.body.description
    });
    obj.save((err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:data});
    });
});
//delete enrolled organisation
router.get('/delete_enrolled/:id',(req,res)=>{
    enroll.findByIdAndRemove({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'deleted successfully'});
    });
});
//create albums
router.post('/create_album',(req,res)=>{
    console.log(req.body);
            var obj= new album({
                org_id:req.body.org_id,
                name:req.body.name,
            });
            obj.save((err2,da)=>{
                if(err2) res.json({success:false,msg:err2});
                else {
                    res.json({success:true,msg:da})
                }
            });
        });
//get albums
router.get('/get_albums_by_org_id/:id',(req,res)=>{
    album.find({org_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else {
            res.json(({success:true,msg:data}));
        }
    });
});
//upload to albums
router.post('/upload_pics_to_album',(req,res)=>{
    console.log(req.body);
    var pics=[];
     req.body.pics.forEach(element=>{
        element.id = shortid.generate();
        pics.push(element);
    });
    album.findOne({org_id:req.body.org_id},(err,data)=>{
        if(data){
            album.findByIdAndUpdate({_id:req.body.id},{$pushAll:{images:pics}},(err1,d)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:'successfully uploaded'});
            })
        }else{
            res.json({success:false,smg:err});
        }
    })
});
//get album by album id
router.get('/get_albums_by_id/:id',(req,res)=>{
    album.findById({_id:req.params.id},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else {
            res.json(({success:true,msg:data}));
        }
    });
});
//get album by album id
router.get('/get_albums_by_name/:name',(req,res)=>{
    album.findOne({name:req.params.name},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else {
            res.json(({success:true,msg:data}));
        }
    });
});
//delete pics from album by id
router.post('/delete_pic_by_id',(req,res)=>{
    album.findOne({org_id:req.body.org_id},(err,data)=>{
        if(data){
            album.findByIdAndUpdate({_id:req.body.id},{$pull:{images:{id:req.body.p_id}}},(err1,d)=>{
                if(err1) res.json({success:false,msg:err1});
                else res.json({success:true,msg:d});
            });
        }
    });
});
//emergency requirement
router.post('/em_req',(req,res)=>{
    org.findByIdAndUpdate({_id:req.body._id},{$set:{em_req:req.body.em_req}},(err,data)=>{
        if(err) res.json({success:false,msg:err});
        else res.json({success:true,msg:'successfully updated'});
    })
})


module.exports = router;