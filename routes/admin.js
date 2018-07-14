const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('./utils/middleware') ;
const user = require('./model/usermodel');



// router.delete('/admin/users',(req,res,next)=>{
//     user.remove({},(err,user)=>{
//         res.json(user);
//     })
// });

router.get("/admin/addCompany" , (req,res) => {
	res.send("foobar");
});


router.get("/admin/deleteCompany" , (req,res) => {
	res.send("foobar");
});


router.get("/admin/editNews" , (req,res) => {
	res.send("foobar");
});

router.get("/admin/editCompany" , (req,res) => {
	res.send("foobar");
});