const Company = require("../model/company");
const News = require("../model/news");
const User = require("../model/user");
const parameter = require("../utils/parameters");
module.exports = {
    getUsers(req, res) {
        User.find({}, (err, data) => {
            return res.json({
                Customers: data
            });
        });
    },

    getCompanies(req, res) {
        Company.find({}, (err, companies) => {
            if (err) res.json(err);
            res.json(companies);
        });
    },

    getCompany(req, res) {
        Company.findById(req.params.id, (err, data) => {
            if (err) res.json(err);
            res.json({
                compDetails: data
            });
        });
    },

    getNews(req, res) {
        News.find({}, (err, news) => {
            if (err) res.json(err);
            res.json(news);
        });
    },

    getNewsDetail(req, res) {
        News.findById(req.params.id, (err, data) => {
            if (err) res.json(err);
            res.json(data);
        });
    },

    getCustomerDetail(req, res) {
        User.findById(req.params.id, (err, data) => {
            res.json({
                Customer: data
            });
        });
    },

    buyShares(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
            let total = 0;
            for (var i in user.stockHolding) {
                total += i.quantity;
            }
            for (var i in user.stockShorted) {
                total += i.quantity;
            }
            if (total + req.body.NoOfShares > parameter.maxShares) {
                return res.json({
                    msg: "kitne kareedega?"
                });
            }
        });

        Company.findById(req.params.id, (err, company) => {
            if (err) res.json(err);
            if (user.accountBalance < company.sharePrice * req.body.NoOfShares) {
                return res.json({
                    msg: "itne paise nhi he"
                });
            }
            if (company.availableQuantity < req.body.NoOfShares) {
                return res.json({
                    msg: "itne stock nhi he"
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
        });
    },
    sellShares(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
            Company.findById(req.params.id, (err, company) => {
                if (err) res.json(err);
                if (!user.stockHolding.id(company._id)) {
                    return res.json({
                        msg: "itne stock nhi he"
                    });
                }
                if (user.stockHolding.id(company._id).quantity < req.body.NoOfShares) {
                    return res.json({
                        msg: "itne stock nhi he"
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
                company.availableQuantity += req.body.NoOfShares;
                user.activity.push(activitytemp);
                if (user.stockHolding.id(company._id)) {
                    user.stockHolding.id(company._id).quantity -= req.body.NoOfShares;
                }

                company.save();
                user.save();
                return res.json({
                    success: "true",
                    Company: company,
                    Customer: user
                });
            });
        });


    },
    shortShares(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
            let total = 0;
            for (var i in user.stockHolding) {
                total += i.quantity;
            }
            for (var i in user.stockShorted) {
                total += i.quantity;
            }
            if (total + req.body.NoOfShares > parameter.maxShares) {
                return res.json({
                    msg: "kitne kareedega?"
                });
            }
        });
        Company.findById(req.params.id, (err, company) => {
            if (err) res.json(err);

            var historytemp = {
                sharePrice: company.sharePrice,
                availableQuantity: company.availableQuantity + req.body.NoOfShares
            };
            var activitytemp = {
                company: company._id,
                action: "shorted",
                quantity: req.body.NoOfShares,
                price: company.sharePrice
            };
            company.history.push(historytemp);
            company.availableQuantity += req.body.NoOfShares;
            user.activity.push(activitytemp);
            if (user.stockShorted.id(company._id)) {
                user.stockShorted.id(company._id).TotalPrice +=
                    req.body.NoOfShares * company.sharePrice;
                user.stockShorted.id(company._id).TotalStock += req.body.NoOfShares;
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
        });
    },
    coverShares(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
        });

        Company.findById(req.params.id, (err, company) => {
            if (err) res.json(err);
            if (!user.stockShorted.id(company._id)) {
                return res.json({
                    msg: "shorted stock nhi he"
                });
            }
            if (user.stockShorted.id(company._id).TotalStock < req.body.NoOfShares) {
                return res.json({
                    msg: "itne shorted stock nhi he"
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
        });
    },
    takeloan(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
            if (user.loan.amount + req.body.loan > parameter.maxLoan) {
                return res.json({
                    msg: "aur nhi "
                });
            }
            user.loan.isPending = true;
            user.loan.amount += req.body.loan;
            user.accountBalance += req.body.loan;
            user.save();
            res.json({
                Customer: data
            });
        });
    },
    repayloan(req, res) {
        let user;
        User.findById(req.body.id, (err, data) => {
            if (err) throw err;
            user = data;
            if (user.loan.amount - req.body.loan < 0) {
                return res.json({
                    msg: "zyada paise dene ka shock he "
                });
            }
            if (user.accountBalance < req.body.loan) {
                return res.json({
                    msg: "kama toh le  "
                });
            }
            user.loan.amount -= req.body.loan;
            user.accountBalance -= req.body.loan;
            if (user.loan.amount == 0) {
                user.loan.isPending = false;
            }
            user.save();
            res.json({
                Customer: data
            });
        });
    }
};
