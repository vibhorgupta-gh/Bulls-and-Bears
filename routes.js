const express = require('express');// pass passport for configuration
const router = express.Router();
var User = require('./model/usermodel');

router.get('/users',(req,res,next)=>{
    console.log("on users page")
    User.find({},function(err,user){
        res.json(user);
    });
  });

router.get('/', (req, res) => {
    //login_page
    res.send("\n\n\t\tBNB- Under Development");
});

router.get('/scoreboard', (req, res) => {
    //scoreboard
    res.send("scoreboard`s empty");
});

router.get('/game', (req, res) => {
    //game_page
    res.send(" it will all happen here.Just wait\n All good things take time");
});
router.get('/feedback', (req, res) => {
    //feedback form
    res.send(" Woah hold your horses. \n games not live yet");
});
router.post('/buy',,(req,res)=>{
    res.send('foodbar buy ');
});
router.post('/sell',(req,res)=>{
    res.send('foodbar sell');
});
router.post('/takeloan',(req,res)=>{
    res.send('foodbar take loan');
});
router.post('/repayloan',(req,res)=>{
    res.send('foodbar repay loan');
});
/*router.delete('/users',(req,res,next)=>{
    User.remove({},(err,user)=>{
        res.json(user);
    })
});*/

module.exports = router;
