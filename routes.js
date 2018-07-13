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

      
 //GET 

 router.get('/leaderboard',(req,res)=>{
        res.send("foobar");
    });

  router.get('/company_list',(req,res)=>{
        res.send("foobar");
    });
  

  router.get('/customer_detail',(req,res)=>{
        res.send("foobar");
    });


  router.get('/company_detail',(req,res)=>{
        res.send("foobar");
  }); 

  router.get('/news_list',(req,res)=>{
        res.send("foobar");
  });

  router.post('/buy',(req,res)=>{
        res.send("foobar");
    });


  router.post('/sell',(req,res)=>{
        res.send("foobar");
    });


  router.post('/short',(req,res)=>{
        res.send("foobar");
    });
  

  router.post('/cover',(req,res)=>{
        res.send("foobar");
    });


  router.post('/take_loan',(req,rest)=>{
        res.send("foobar");
    });
 

  router.post('/repay_loan',(req,res)=>{   
        res.send("foobar");
    });

  module.exports = router;