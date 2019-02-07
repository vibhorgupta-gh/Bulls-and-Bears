const Company = require("../model/company");
const News = require("../model/news");
const User = require("../model/user");
const parameter = require("../utils/parameters");


exports.getUsers = function (req, res) {
  User.find({}).populate('activity.company').populate('portfolio.company_name').then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch User list"
      });
    })
}

exports.getCurrentUser = function (req, res) {
  User.findById(req.user.id).populate('activity.company').populate('portfolio.company_name').then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch User details"
      });
    })

}

exports.getCompanies = function (req, res) {
  Company.find({}).then((companies, err) => {
      var i = 0;
      while (i < 20) {
        companies[i].history = companies[i].history.slice(Math.max(companies[i].length - 2, 1));
        i++;
        if (i >= 20) {
          res.json(companies)
          break;
        }
      }
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch company details"
      });
    })
}

exports.getCustomerDetail = function (req, res) {
  User.findById(req.params.id).then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch User details"
      });
    })
}

exports.getCompany = function (req, res) {
  Company.findById(req.params.id).then(companyDetails => {
      res.json(companyDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch company details"
      });
    })
}
exports.getNewsDetail = function (req, res) { //yet to be tested
  News.findById(req.params.id).then(newsDetails => {
      res.json(newsDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch News details"
      })
    })
}

exports.getNews = function (req, res) {
  News.find({
      flag: {
        $ne: "0"
      }
    }).then(newslist => {
      res.json(newslist)
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch news list"
      })
    })
}

exports.buyShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          let total = 0;
          for (var i = 0; i < user.portfolio.length; i++) {
            // console.log(i);
            total += user.portfolio[i].stockHolding.quantity;
          }
          if (total + req.body.NoOfShares > parameter.heldLimit) {
            return res.json({
              msg: "kitne khareedega?"
            });
          }
          if (req.body.NoOfShares < 0) {
            return res.json({
              msg: "negative shares not allowed"
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
          // var historytemp = {
          //   sharePrice: company.sharePrice,
          //   availableQuantity: company.availableQuantity - req.body.NoOfShares
          // };
          var activitytemp = {
            company: company._id,
            action: "bought",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          //company.history.push(historytemp);
          user.accountBalance -= company.sharePrice * req.body.NoOfShares;
          company.availableQuantity -= req.body.NoOfShares;
          user.activity.push(activitytemp);
          if (user.portfolio.id(company._id)) {
            user.portfolio.id(company._id).stockHolding.quantity += req.body.NoOfShares;
          } else {
            user.portfolio.push({
              _id: company._id,
              company_name: company._id,
              stockHolding: {
                quantity: req.body.NoOfShares
              },
              stockShorted: {
                TotalPrice: 0,
                TotalStock: 0,
              },
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
          res.send({
            msg: "unable to fetch User details"
          });
        })
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch company details"
      });
    })
}

exports.sellShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          if (!user.portfolio.id(company._id)) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          if (user.portfolio.id(company._id).stockHolding.quantity < req.body.NoOfShares) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          if (req.body.NoOfShares < 0) {
            return res.json({
              msg: "negative shares not allowed"
            });
          }
          // var historytemp = {
          //   sharePrice: company.sharePrice,
          //   availableQuantity: company.availableQuantity + req.body.NoOfShares
          // };
          var activitytemp = {
            company: company._id,
            action: "sold",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          //company.history.push(historytemp);
          user.accountBalance += company.sharePrice * req.body.NoOfShares;
          company.availableQuantity = company.availableQuantity + req.body.NoOfShares;
          user.activity.push(activitytemp);
          if (user.portfolio.id(company._id)) {
            user.portfolio.id(company._id).stockHolding.quantity -= req.body.NoOfShares;
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
          res.send({
            msg: "unable to fetch User details"
          });
        })
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch company details"
      });
    })
}

exports.shortShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          let total = 0;
          for (var i = 0; i < user.portfolio.length; i++) {
            //console.log(i);
            total += user.portfolio[i].stockShorted.TotalStock;
          }
          if (total + req.body.NoOfShares > 100) {
            return res.json({
              msg: "kitne khareedega?"
            });
          }
          if (company.availableQuantity < req.body.NoOfShares) {
            return res.json({
              msg: "itne stock nahi hain"
            });
          }
          if (req.body.NoOfShares < 0) {
            return res.json({
              msg: "negative shares not allowed"
            });
          }
          // var historytemp = {
          //   sharePrice: company.sharePrice,
          //   availableQuantity: (+company.availableQuantity) + (+req.body.NoOfShares)
          // };
          var activitytemp = {
            company: company._id,
            action: "shorted",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          //company.history.push(historytemp);
          company.availableQuantity = company.availableQuantity - (req.body.NoOfShares);
          user.activity.push(activitytemp);
          if (user.portfolio.id(company._id)) {
            user.portfolio.id(company._id).stockShorted.TotalPrice += req.body.NoOfShares * company.sharePrice;
            user.portfolio.id(company._id).stockShorted.TotalStock += req.body.NoOfShares;
          } else {
            user.portfolio.push({
              _id: company._id,
              company_name: company._id,
              stockHolding: {
                quantity: 0
              },
              stockShorted: {
                TotalPrice: req.body.NoOfShares * company.sharePrice,
                TotalStock: req.body.NoOfShares,
              },
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
          res.send({
            msg: "unable to fetch User details"
          });
        })
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch Company details"
      });
    })
}

exports.coverShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          if (!user.portfolio.id(company._id)) {
            return res.json({
              msg: "shorted stock nahi hain"
            });
          }
          if (user.portfolio.id(company._id).stockShorted.TotalStock < req.body.NoOfShares) {
            return res.json({
              msg: "itne shorted stock nahi hain"
            });
          }
          if (req.body.NoOfShares < 0) {
            return res.json({
              msg: "negative shares not allowed"
            });
          }
          // var historytemp = {
          //   sharePrice: company.sharePrice,
          //   availableQuantity: company.availableQuantity - req.body.NoOfShares
          // };
          var activitytemp = {
            company: company._id,
            action: "covered",
            quantity: req.body.NoOfShares,
            price: company.sharePrice
          };
          //company.history.push(historytemp);
          let temp = user.portfolio.id(company._id).stockShorted;
          user.accountBalance += Math.round(
            (temp.TotalPrice * req.body.NoOfShares) / temp.TotalStock -
            company.sharePrice * req.body.NoOfShares
          );
          company.availableQuantity += req.body.NoOfShares;
          user.activity.push(activitytemp);
          if (user.portfolio.id(company._id)) {
            user.portfolio.id(company._id).stockShorted.TotalPrice = Math.round(
              temp.TotalPrice * (1 - req.body.NoOfShares / temp.TotalStock)
            );
            user.portfolio.id(company._id).stockShorted.TotalStock -= req.body.NoOfShares;
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
          res.send({
            msg: "unable to fetch User details"
          });
        })
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch company details"
      });
    })
}

exports.takeloan = function (req, res) {
  User.findById(req.user.id).then(user => {
      if (user.loan.isPending) {
        return res.json({
          msg: "aur nahi"
        });
      }
      user.loan.isPending = true;
      user.loan.amount += 5600;
      user.accountBalance += 5000;
      user.save();
      res.json({
        Customer: user
      });
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch User details"
      });
    })
}

exports.repayloan = function (req, res) {
  User.findById(req.user.id).then(user => {

      if (user.accountBalance < 5600) {
        return res.json({
          msg: "kama toh le"
        });
      }
      if (user.loan.isPending == false) {
        return res.json({
          msg: "kama toh le"
        });
      }
      user.loan.amount = 0;
      user.accountBalance -= 5600;
      user.loan.isPending = false;
      user.save();
      res.json({
        Customer: user
      });
    })
    .catch(err => {
      console.log(err)
      res.send({
        msg: "unable to fetch User details"
      });
    })
}