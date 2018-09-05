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

    
    Company.findByIdAndUpdate(req.params.id, {
      $set: obj
    }, function (err, company) {
      if (err) {
        res.json(err);
      } else {
        res.json(company);
      }
    });
  },


  deleteCompany(req, res) {
    Company.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json("Company was deleted!");
      }
    });
  },


  addCompany (req, res) {

    const obj = {
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      availableQuantity: req.body.availableQuantity,
      sharePrice: req.body.sharePrice,
      totalQuantity: req.body.totalQuantity,
      marketCap: req.body.marketCap,
    };

    Company.create(obj, function (err, company) {
      if (err) {
        res.json(err);
      } else {
        company.save();
        res.json(company);
      }
    });
  },


  editNews(req, res) {

    const obj = {
      newsText: req.body.newsText,
      publishedOn: req.body.publishedOn,
      createdOn: req.body.createdOn,
      newsImpact: null
    };

    News.findByIdAndUpdate(req.params.id, {
      $set: obj
    }, function (err, news) {
      if (err) {
        res.json(err);
      } else {
        res.json(news);
      }
    });
  },

  deleteNews(req, res) {
    News.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.json(err);
      } else {
        res.json("News was deleted!");
      }
    });
  },


  addNews(req, res) {

    const obj = {
      newsText: req.body.newsText,
      publishedOn: req.body.publishedOn,
      newsImpact: Company
    };

    News.create(obj, function (err, news) {
      if (err) {
        res.json(err);
      } else {
        news.save();
        res.json(news);
      }
    });
  }

};