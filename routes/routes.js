const express = require('express'); // pass passport for configuration
const router = express.Router();
const UserController = require('../utils/controller.js');
const {
  isLoggedIn,
  isAdmin
} = require('../utils/middleware')
const user = require('../model/user');
const company = require('../model/company');



router.get('/leaderboard', UserController.getUsers);
router.get('/company_list', UserController.getCompanies);
router.get('/customer_detail/:id', UserController.getCustomerDetail);
router.get('/company_detail/:id', UserController.getCompany);
router.get('/newsDetail/:id', UserController.getNewsDetail);
router.get('/news_list', UserController.getNews);
router.post('/buy/:id', UserController.buyShares);
router.post('/sell/:id', UserController.sellShares);
router.post('/short/:id', UserController.shortShares);
router.post('/cover/:id', UserController.coverShares);
router.post('/take_loan', UserController.takeloan);
router.post('/repay_loan', UserController.repayloan);

module.exports = router;
