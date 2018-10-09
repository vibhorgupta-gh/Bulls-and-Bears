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
router.route('/admin/company/:id')
	 .put(editCompany)//1. put of /admin/company/id is working
	 .delete(deleteCompany)//1. delete of /admin/company/id is working

router.post('/admin/company', addCompany )//1. post of /admin/company/id is working


// ----- News related routes handled by admin ------
router.route('/admin/news/:id')
		.put(editNews)//1. put of /admin/news/id is working
		.delete(deleteNews)//1. delete of /admin/news/id is working

router.post('/admin/news', addNews )//1. post of /admin/news/id is working


module.exports = router ;
