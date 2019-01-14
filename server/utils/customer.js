const Company = require("../model/company");
const News = require("../model/news");
const User = require("../model/user");
const parameter = require("../utils/parameters");


exports.getUsers = function (req, res) {
  User.find({}).then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Users list")
    })
}

exports.getCurrentUser = function (req, res) {
  User.findById(req.user.id).then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch User details")
    })

}

exports.getCompanies = function (req, res) {
  Company.find({}).then((companies, err) => {
      res.json(companies)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch company list")
    })
}

exports.getCustomerDetail = function (req, res) {
  User.findById(req.params.id).then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch User details")
    })
}

exports.getCompany = function (req, res) {
  Company.findById(req.params.id).then(companyDetails => {
      res.json(companyDetails)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Company details")
    })
}
exports.getNewsDetail = function (req, res) { //yet to be tested
  News.findById(req.params.id).then(newsDetails => {
      res.json(newsDetails)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch News details")
    })
}

exports.getNews = function (req, res) {
  News.find({}).then(newslist => {
      res.json(newslist)
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch news list")
    })
}

exports.buyShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.body.id).then(user => {
          let total = 0;
          for (var i in user.stockHolding) {
            total += i.quantity;
          }
          for (var i in user.stockShorted) {
            total += i.quantity;
          }
          if (total + req.body.NoOfShares > parameter.maxShares) {
            return res.json({
              msg: "kitne khareedega?"
            });
          }

          if (user.accountBalance < company.sharePrice * req.body.NoOfShares) {
            return res.json({
              msg: "itne paise nahi hain"
            });
          }
          if (company.availableQuantity < req.body.NoOfShares) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          var historytemp = {
            sharePrice: company.sharePrice,
            availableQuantity: company.availableQuantity - req.body.NoOfShares
          };
          var activitytemp = {
            company: company._id,
            action: "bought",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          company.history.push(historytemp);
          user.accountBalance -= company.sharePrice * req.body.NoOfShares;
          company.availableQuantity -= req.body.NoOfShares;
          user.activity.push(activitytemp);
          if (user.stockHolding.id(company._id)) {
            user.stockHolding.id(company._id).quantity += req.body.NoOfShares;
          } else {
            user.stockHolding.push({
              _id: company._id,
              quantity: req.body.NoOfShares
            });
          }
          company.save();
          user.save();
          return res.json({
            success: "true",
            Company: company,
            Customer: user
          });
        })
        .catch(err => {
          console.log(err)
          res.send("unable to fetch user details")
        })
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Company details")
    })
}

exports.sellShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.body.id).then(user => {
          if (!user.stockHolding.id(company._id)) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          if (user.stockHolding.id(company._id).quantity < req.body.NoOfShares) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          var historytemp = {
            sharePrice: company.sharePrice,
            availableQuantity: company.availableQuantity + req.body.NoOfShares
          };
          var activitytemp = {
            company: company._id,
            action: "sold",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          company.history.push(historytemp);
          user.accountBalance += company.sharePrice * req.body.NoOfShares;
          company.availableQuantity = (+company.availableQuantity) + (+req.body.NoOfShares);
          user.activity.push(activitytemp);
          if (user.stockHolding.id(company._id)) {
            user.stockHolding.id(company._id).quantity -= (+req.body.NoOfShares);
          }
          company.save();
          user.save();
          return res.json({
            success: "true",
            Company: company,
            Customer: user
          });
        })
        .catch(err => {
          console.log(err)
          res.send("unable to fetch user details")
        })
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Company details")
    })
}

exports.shortShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.body.id).then(user => {
          let total = 0;
          for (var i in user.stockHolding) {
            total += i.quantity;
          }
          for (var i in user.stockShorted) {
            total += i.quantity;
          }
          if (total + req.body.NoOfShares > parameter.maxShares) {
            return res.json({
              msg: "kitne khareedega?"
            });
          }
          var historytemp = {
            sharePrice: company.sharePrice,
            availableQuantity: (+company.availableQuantity) + (+req.body.NoOfShares)
          };
          var activitytemp = {
            company: company._id,
            action: "shorted",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          company.history.push(historytemp);
          company.availableQuantity = (+company.availableQuantity) + (+req.body.NoOfShares);
          user.activity.push(activitytemp);
          if (user.stockShorted.id(company._id)) {
            user.stockShorted.id(company._id).TotalPrice +=
              req.body.NoOfShares * company.sharePrice;
            user.stockShorted.id(company._id).TotalStock += (+req.body.NoOfShares);
          } else {
            user.stockShorted.push({
              _id: company._id,
              TotalPrice: req.body.NoOfShares * company.sharePrice,
              TotalStock: req.body.NoOfShares
            });
          }
          company.save();
          user.save();
          return res.json({
            success: "true",
            Company: company,
            Customer: user
          });
        })
        .catch(err => {
          console.log(err)
          res.send("unable to fetch user details")
        })
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Company details")
    })
}

exports.coverShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.body.id).then(user => {
          if (!user.stockShorted.id(company._id)) {
            return res.json({
              msg: "shorted stock nahi hain"
            });
          }
          if (user.stockShorted.id(company._id).TotalStock < req.body.NoOfShares) {
            return res.json({
              msg: "itne shorted stock nahi hain"
            });
          }
          var historytemp = {
            sharePrice: company.sharePrice,
            availableQuantity: company.availableQuantity - req.body.NoOfShares
          };
          var activitytemp = {
            company: company._id,
            action: "covered",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          company.history.push(historytemp);
          let temp = user.stockShorted.id(company._id);
          user.accountBalance += Math.round(
            (temp.TotalPrice * req.body.NoOfShares) / temp.TotalStock -
            company.sharePrice * req.body.NoOfShares
          );
          company.availableQuantity -= req.body.NoOfShares;
          user.activity.push(activitytemp);
          if (user.stockShorted.id(company._id)) {
            user.stockShorted.id(company._id).TotalPrice = Math.round(
              temp.TotalPrice * (1 - req.body.NoOfShares / temp.TotalStock)
            );
            user.stockShorted.id(company._id).TotalStock -= req.body.NoOfShares;
          }
          company.save();
          user.save();
          return res.json({
            success: "true",
            Company: company,
            Customer: user
          });
        })
        .catch(err => {
          console.log(err)
          res.send("unable to fetch user details")
        })
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch Company details")
    })
}

exports.takeloan = function (req, res) {
  User.findById(req.body.id).then(user => {
      if (user.loan.amount + req.body.amount > parameter.maxLoan) {
        return res.json({
          msg: "aur nahi"
        });
      }
      user.loan.isPending = true;
      user.loan.amount += req.body.amount;
      user.accountBalance += req.body.amount;
      user.save();
      res.json({
        Customer: user
      });
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch User details")
    })
}

exports.repayloan = function (req, res) {
  User.findById(req.body.id).then(user => {
      if (user.loan.amount - req.body.loan < 0) {
        return res.json({
          msg: "zyada paise dene ka shock hai?"
        });
      }
      if (user.accountBalance < req.body.loan) {
        return res.json({
          msg: "kama toh le"
        });
      }
      user.loan.amount -= req.body.loan;
      user.accountBalance -= req.body.loan;
      if (user.loan.amount == 0) {
        user.loan.isPending = false;
      }
      user.save();
      res.json({
        Customer: user
      });
    })
    .catch(err => {
      console.log(err)
      res.send("unable to fetch User details")
    })
}
