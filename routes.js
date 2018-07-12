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

 router.get('/leaderboard',(req,res,next)=>{
    user.find({},(err,user)=>{
        res.send("foobar");
    });
  });

  router.get('/companylist',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.get('/costumerdetail',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.get('/companydetail',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });  
  });

  router.get('/newslist',(req,res,next)=>{
    user.find({},(err,news)=>{
        res.send("foobar");
    });
  });

  router.post('/buy',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.post('/sell',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.post('/short',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.post('/cover',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.post('/takeloan',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  router.post('/repayloan',(req,res,next)=>{
    user.find({},(err,company)=>{
        res.send("foobar");
    });
  });

  module.exports = router;