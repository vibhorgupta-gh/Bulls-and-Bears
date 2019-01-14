module.exports = function (app, passport) {
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
    repayloan,
    getCurrentUser
  } = require('../utils/customer.js');

  const {isLoggedIn } = require('../utils/middleware');
  const user = require('../model/user');
  const company = require('../model/company');

  app.get('/leaderboard', isLoggedIn, getUsers);
  app.get('/getcurrentuser',isLoggedIn,getCurrentUser);
  app.get('/company_list', isLoggedIn, getCompanies);
  app.get('/customer_detail/:id', isLoggedIn, getCustomerDetail);
  app.get('/company_detail/:id', isLoggedIn, getCompany);
  app.get('/newsDetail/:id', isLoggedIn, getNewsDetail);
  app.get('/news_list', isLoggedIn, getNews);
  app.post('/buy/:id', isLoggedIn, buyShares);
  app.post('/sell/:id', isLoggedIn, sellShares);
  app.post('/short/:id', isLoggedIn, shortShares);
  app.post('/cover/:id', isLoggedIn, coverShares);
  app.post('/take_loan', isLoggedIn, takeloan);
  app.post('/repay_loan', isLoggedIn, repayloan);
}