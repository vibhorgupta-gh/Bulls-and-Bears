const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('./utils/middleware') ;
const user = require('./model/usermodel');



// router.delete('/admin/users',(req,res,next)=>{
//     user.remove({},(err,user)=>{
//         res.json(user);
//     })
// });

router.get("admin/companies", (req,res)=> {
	res.send("foobar");
});

router.post("/admin/add_company" , (req,res) => {
	res.send("foobar");
});

router.post("/admin/delete_company" , (req,res) => {
	res.send("foobar");
});


router.post("/admin/edit_news" , (req,res) => {
	res.send("foobar");
});

router.post("/admin/edit_company" , (req,res) => {
	res.send("foobar");
});