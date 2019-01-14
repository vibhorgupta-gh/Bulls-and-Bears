module.exports = function(app, passport){
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
	app.route('/admin/company/:id')
		 .put(editCompany)//1. put of /admin/company/id is working
		 .delete(deleteCompany)//1. delete of /admin/company/id is working

	app.post('/admin/company', addCompany)//1. post of /admin/company/id is working


	// ----- News related routes handled by admin ------
	app.route('/admin/news/:id')
			.put(editNews)//1. put of /admin/news/id is working
			.delete(deleteNews)//1. delete of /admin/news/id is working

	app.post('/admin/news', addNews)//1. post of /admin/news/id is working
}