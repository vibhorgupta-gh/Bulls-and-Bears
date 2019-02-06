const Company = require("../model/company");
const News = require("../model/news");
const User = require("../model/user");
const parameter = require("../utils/parameters");


exports.getUsers = function (req, res) {
  User.find({}).populate('activity.company').populate('stockShorted.company_name').populate('stockHolding.company_name').then(users => {
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch User list"});
    })
}

exports.getCurrentUser = function (req, res) {
  User.findById(req.user.id).populate('activity.company').populate('stockShorted.company_name').populate('stockHolding.company_name').then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch User details"});
    })

}

exports.getCompanies = function (req, res) {
  Company.find({}).then((companies, err) => {
      res.json(companies)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch company details"});
    })
}

exports.getCustomerDetail = function (req, res) {
  User.findById(req.params.id).then(customerDetails => {
      res.json(customerDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch User details"});
    })
}

exports.getCompany = function (req, res) {
  Company.findById(req.params.id).then(companyDetails => {
      res.json(companyDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch company details"});
    })
}
exports.getNewsDetail = function (req, res) { //yet to be tested
  News.findById(req.params.id).then(newsDetails => {
      res.json(newsDetails)
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch News details"})
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
      res.send({msg:"unable to fetch news list"})
    })
}

exports.buyShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          let total = 0;
          for (var i in user.stockHolding) {
            total += i.quantity;
          }
          if (total + req.body.NoOfShares > 100) {
            return res.json({
              msg: "kitne khareedega?"
            });
          }
          if(req.body.NoOfShares<0)
          {
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
          if (user.stockHolding.id(company._id)) {
            user.stockHolding.id(company._id).quantity += req.body.NoOfShares;
          } else {
            user.stockHolding.push({
              _id: company._id,
              company_name: company._id,
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
          res.send({msg:"unable to fetch User details"});
        })
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch company details"});
    })
}

exports.sellShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
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
          if(req.body.NoOfShares<0)
          {
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
          res.send({msg:"unable to fetch User details"});
        })
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch company details"});
    })
}

exports.shortShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
          let total = 0;
          for (var i in user.stockShorted) {
            total += i.quantity;
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
          if(req.body.NoOfShares<0)
          {
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
              TotalStock: req.body.NoOfShares,
              company_name: company._id,
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
          res.send({msg:"unable to fetch User details"});
        })
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch Company details"});
    })
}

exports.coverShares = function (req, res) {
  Company.findById(req.params.id).then(company => {
      User.findById(req.user.id).then(user => {
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
          if(req.body.NoOfShares<0)
          {
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
          res.send({msg:"unable to fetch User details"});
        })
    })
    .catch(err => {
      console.log(err)
      res.send({msg:"unable to fetch company details"});
    })
}

exports.takeloan = function (req, res) {
  User.findById(req.user.id).then(user => {
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
      res.send({msg:"unable to fetch User details"});
    })
}

exports.repayloan = function (req, res) {
  User.findById(req.user.id).then(user => {
      if (user.loan.amount - req.body.amount < 0) {
        return res.json({
          msg: "zyada paise dene ka shock hai?"
        });
      }
      if (user.accountBalance < req.body.amount) {
        return res.json({
          msg: "kama toh le"
        });
      }
      user.loan.amount -= req.body.amount;
      user.accountBalance -= req.body.amount;
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
      res.send({msg:"unable to fetch User details"});
    })
}