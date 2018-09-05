const News = require("../model/news");
const User = require("../model/user");
const Company = require("../model/company");
const parameter = require("../utils/parameters");


module.exports = {

<<<<<<< HEAD
  editCompany(req,res){

||||||| merged common ancestors
  editCompany(req,res){
    
=======
  editCompany(req, res) {

>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
    const obj = {
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      availableQuantity: req.body.availableQuantity,
      sharePrice: req.body.sharePrice,
      totalQuantity: req.body.totalQuantity,
      marketCap: req.body.marketCap,
    };
<<<<<<< HEAD

    Company.findByIdAndUpdate(req.params.id, {$set: obj}, function(err, company){
        if(err){
          res.json(err);
        } else {
          res.json(company);
        }
||||||| merged common ancestors
    
    Company.findByIdAndUpdate(req.params.id, {$set: obj}, function(err, company){
        if(err){
          res.json(err);
        } else {
          res.json(company);
        }
=======

    Company.findByIdAndUpdate(req.params.id, {
      $set: obj
    }, function (err, company) {
      if (err) {
        res.json(err);
      } else {
        res.json(company);
      }
>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
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


<<<<<<< HEAD
  addCompany(req,res){

||||||| merged common ancestors
  addCompany(req,res){
    
=======
  addCompany(req, res) {

>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
    const obj = {
      name: req.body.name,
      symbol: req.body.symbol,
      description: req.body.description,
      availableQuantity: req.body.availableQuantity,
      sharePrice: req.body.sharePrice,
      totalQuantity: req.body.totalQuantity,
      marketCap: req.body.marketCap,
    };
<<<<<<< HEAD

    Company.create(obj, function(err, company){
      if(err){
||||||| merged common ancestors
    
    Company.create(obj, function(err, company){
      if(err){
=======

    Company.create(obj, function (err, company) {
      if (err) {
>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
        res.json(err);
      } else {
        company.save();
        res.json(company);
      }
    });
  },


<<<<<<< HEAD
  editNews(req,res){

||||||| merged common ancestors
  editNews(req,res){  
      
=======
  editNews(req, res) {

    console.log(req.body);
>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
    const obj = {
      newsText: req.body.newsText,
      publishedOn: req.body.publishedOn,
      createdOn: req.body.createdOn,
      newsImpact: null
    };
<<<<<<< HEAD

    News.findByIdAndUpdate(req.params.newsId, {$set: obj}, function(err, news){
          if(err){
            res.json(err);
          } else {
            res.json(news);
          }
      });
||||||| merged common ancestors
    
    News.findByIdAndUpdate(req.params.newsId, {$set: obj}, function(err, news){
          if(err){
            res.json(err);
          } else {
            res.json(news);
          }
      });
=======

    News.findByIdAndUpdate(req.params.id, {
      $set: obj
    }, function (err, news) {
      if (err) {
        res.json(err);
      } else {
        res.json(news);
      }
    });
>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
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


<<<<<<< HEAD
  addNews(req,res){

||||||| merged common ancestors
  addNews(req,res){
        
=======
  addNews(req, res) {

>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
    const obj = {
      newsText: req.body.newsText,
      publishedOn: req.body.publishedOn,
      createdOn: req.body.createdOn,
      newsImpact: null
    };
<<<<<<< HEAD

    News.create(obj , function(err , news){
      if(err){
||||||| merged common ancestors
    
    News.create(obj , function(err , news){
      if(err){
=======

    News.create(obj, function (err, news) {
      if (err) {
>>>>>>> 007c6f8661c90c2cfb2d37a0f26256685e79cd07
        res.json(err);
      } else {
        news.save();
        res.json(news);
      }
    });
  }

};