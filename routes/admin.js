const express = require('express');// pass passport for configuration
const router = express.Router();
const { isLoggedIn, isAdmin } = require('../utils/middleware') ;
const user = require('../model/user');
const {
	addCompany,
	editCompany,
	deleteCompany,
	addNews,
	editNews,
	deleteNews
} = require('../utils/admin.js')
const company = require('../model/company');

// ----- Company related routes handled by admin ------
//1. put of /admin/company/id is working
//1. delete of /admin/company/id is working
//1. post of /admin/company/id is working
router.route('/admin/company/:id')
	.put(editCompany)
	.delete(deleteCompany)

router.post('/admin/company', addCompany )


// ----- News related routes handled by admin ------

router.route('/admin/news/:id')
		.put(editNews)
		.delete(deleteNews)

router.post('/admin/news', addNews )


module.exports = router ;
