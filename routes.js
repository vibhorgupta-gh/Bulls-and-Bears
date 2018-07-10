const express = require('express');// pass passport for configuration
const router = express.Router();
var User = require('./model/usermodel');

router.get('/users',(req,res,next)=>{
    User.find({},function(err,user){
        res.json(user);
    });
  });

router.delete('/users',(req,res,next)=>{
    User.remove({},(err,user)=>{
        res.json(user);
    })
})  
module.exports = router;
