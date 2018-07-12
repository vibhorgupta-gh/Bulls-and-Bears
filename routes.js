const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('./utils/middleware')
const user = require('./model/usermodel');

router.get('/users',(req,res,next)=>{
    user.find({},(err,user)=>{
        res.json(user);
    });
  });

router.delete('/users',(req,res,next)=>{
    user.remove({},(err,user)=>{
        res.json(user);
    })
})
module.exports = router;
