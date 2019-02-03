const News = require("../model/news");
const User = require("../model/user");
const Company = require("../model/company");
const parameter = require("../utils/parameters");


module.exports = {

  editCompany(req, res) {
    const obj = {
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      availableQuantity: req.body.availableQuantity,
      sharePrice: req.body.sharePrice,
      totalQuantity: req.body.totalQuantity,
      marketCap: req.body.marketCap,
    };
    Company.findByIdAndUpdate(req.params.id, obj, {
        new: true
      }).then(company => {
        res.json(company);
      })
      .catch(err => {
        res.json(err);
      })
  },
  changeprice(req, res) {
    Company.findById(req.params.id, (err, company) => {
      company.sharePrice = req.body.price;
      company.history.push({
        timestamp: Date.now(),
        sharePrice: company.sharePrice,
        availableQuantity: company.availableQuantity,
      })
      company.save().then(() => {
        res.json({
          "status": "sucess"
        });
      });
    });

  },

  deleteCompany(req, res) {
    Company.findByIdAndRemove(req.params.id).then(() => {
        res.json("Company was deleted!");
      })
      .catch(err => {
        res.json(err);
      });
  },

  addCompany(req, res) {
    const obj = {
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      availableQuantity: req.body.availableQuantity,
      sharePrice: req.body.sharePrice,
      totalQuantity: req.body.totalQuantity,
      marketCap: req.body.marketCap,
    };
    Company.create(obj).then(company => {
        company.save();
        res.json(company);
      })
      .catch(err => {
        res.json(err);
      });
  },

  editNews(req, res) {
    const obj = {
      newsText: req.body.newsText,
      publishedOn: req.body.publishedOn,
      flag: req.body.flag,
      newsImpact: {
        company: req.body.newsImpact.company,
        impact: req.body.newsImpact.impact,
      },
      description: req.body.description
    };
    News.findByIdAndUpdate(req.params.id, obj, {
        new: true
      }).then(news => {
        res.json(news);
      })
      .catch(err => {
        res.json(err);
      });
  },

  deleteNews(req, res) {
    News.findByIdAndRemove(req.params.id).then(news => {
        res.json("News was deleted!");
      })
      .catch(err => {
        res.json(err);
      });
  },

  addNews(req, res) {
    const obj = {
      newsText: req.body.newsText,
      publishedOn: Date.now(),
      flag: req.body.flag,
      newsImpact: {
        company: req.body.newsImpact.company,
        impact: req.body.newsImpact.impact,
      },
      description: req.body.description
    };
    News.create(obj).then(news => {
        news.save();
        res.json(news);
      })
      .catch(err => {
        res.json(err);
      });
  }

};