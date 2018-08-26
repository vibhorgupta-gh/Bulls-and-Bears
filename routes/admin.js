const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../utils/middleware') ;
const user = require('../model/user');
const util = require('../utils/adminControllers.js')
const company = require('../model/company');

// ----- Company related routes handled by admin ------
router.route('/admin/company/:id')
	.put(util.editCompany)
	.delete(util.deleteCompany)

router.post('/admin/addCompany' , util.addCompany )


// ----- News related routes handled by admin ------

router.route('/admin/company/:id/news/:newsId')
		.put(util.editNews)
		.delete(util.deleteNews)

router.post('/admin/company/:id/addNews' , util.addNews )


module.exports = router ;
