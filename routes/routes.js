const express = require('express'); // pass passport for configuration
const router = express.Router();
const {
  getUsers,
  getCompanies,
  getCustomerDetail,
  getCompany,
  getNewsDetail,
  getNews,
  buyShares,
  sellShares,
  shortShares,
  coverShares,
  takeloan,
  repayloan
} = require('../utils/customer.js');
const { isLoggedIn, isAdmin } = require('../utils/middleware')
const user = require('../model/user');
const company = require('../model/company');



router.get('/leaderboard', getUsers);
router.get('/company_list', getCompanies);
router.get('/customer_detail/:id', getCustomerDetail);
router.get('/company_detail/:id', getCompany);
router.get('/newsDetail/:id', getNewsDetail);
router.get('/news_list', getNews);
router.post('/buy/:id', buyShares);
router.post('/sell/:id', sellShares);
router.post('/short/:id', shortShares);
router.post('/cover/:id', coverShares);
router.post('/take_loan', takeloan);
router.post('/repay_loan', repayloan);

module.exports = router;
