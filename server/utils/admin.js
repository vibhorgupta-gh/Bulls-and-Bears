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
  Company.findByIdAndUpdate(req.params.id).then(company =>{
    res.json(company);
  })
  .catch(err =>{
    res.json(err);
  })
},

deleteCompany(req, res) {
  Company.findByIdAndRemove(req.params.id).then(company =>{
    res.json("Company was deleted!");
  })
  .catch(err =>{
    res.json(err);
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
  Company.create(obj).then(company =>{
    company.save();
    res.json(company);
  })
  .catch(err =>{
    res.json(err);
  });
},

editNews(req,res){
  const obj = {
    newsText: req.body.newsText,
    publishedOn: req.body.publishedOn,
    newsImpact: null
  };
  News.findByIdAndUpdate(req.params.id).then(news =>{
    res.json(news);
  })
  .catch(err =>{
    res.json(err);
  });
},

deleteNews(req,res){
  News.findByIdAndRemove(req.params.id).then(news =>{
    res.json("News was deleted!");
  })
  .catch(err =>{
    res.json(err);
  });
},

addNews(req, res) {
  const obj = {
    newsText: req.body.newsText,
    publishedOn: req.body.publishedOn,
    newsImpact: Company
  };
  News.create(obj).then(news =>{
    news.save();
    res.json(news);
  })
  .catch(err =>{
    res.json(err);
  });
}

};
