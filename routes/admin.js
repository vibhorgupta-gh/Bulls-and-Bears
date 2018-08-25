const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../utils/middleware') ;
const user = require('../model/user');
const util = require('../utils/adminControllers.js')
const company = require('../model/company');




router.route('/admin/company/:id')
	.put(util.editCompany)
	.delete(util.deleteCompany)

router.post('/admin/addCompany' , util.addCompany )


module.exports = router ;
