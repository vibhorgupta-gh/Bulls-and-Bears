module.exports = function(app, passport){
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

  app.get('/leaderboard', passport.authenticate(['facebook','google']), getUsers);
  app.get('/company_list', passport.authenticate(['facebook','google']), getCompanies);
  app.get('/customer_detail/:id', passport.authenticate(['facebook','google']), getCustomerDetail);
  app.get('/company_detail/:id', passport.authenticate(['facebook','google']), getCompany);
  app.get('/newsDetail/:id', passport.authenticate(['facebook','google']), getNewsDetail);
  app.get('/news_list', passport.authenticate(['facebook','google']), getNews);
  app.post('/buy/:id', passport.authenticate(['facebook','google']), buyShares);
  app.post('/sell/:id', passport.authenticate(['facebook','google']), sellShares);
  app.post('/short/:id', passport.authenticate(['facebook','google']), shortShares);
  app.post('/cover/:id', passport.authenticate(['facebook','google']), coverShares);
  app.post('/take_loan', passport.authenticate(['facebook','google']), takeloan);
  app.post('/repay_loan', passport.authenticate(['facebook','google']), repayloan);
}