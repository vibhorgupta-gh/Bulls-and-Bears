const News = require("../model/news");
const User = require("../model/user");
const Company = require("../model/company");
const parameter = require("../utils/parameters");


module.exports = {

  editCompany(req,res){
    const obj = {
      name : req.body.name,
      symbol : req.body.symbol,
      description : req.body.description,
      availableQuantity : req.body.availableQuantity,
      sharePrice : req.body.sharePrice,
      totalQuantity : req.body.totalQuantity,
      marketCap : req.body.marketCap,
      history : req.body.history
    } ;
    Company.findByIdAndUpdate(req.params.id , {$set: obj} ,function(err , company){
          if(err){
            res.json(err);
          } else {
            res.json(company);
          }
      });
  } ,

  deleteCompany(req,res){

      Company.findByIdAndRemove(req.params.id , function(err){
        if(err){
           res.json(err);
         } else {
           res.json("Company was deleted !");
         }
      });
  },

    addCompany(req,res){
      const obj = {
        name : req.body.name,
        symbol : req.body.symbol,
      	description : req.body.description,
      	availableQuantity : req.body.availableQuantity,
      	sharePrice : req.body.sharePrice,
      	totalQuantity : req.body.totalQuantity,
      	marketCap : req.body.marketCap,
      	history : req.body.history
      } ;
      Company.create(obj , function(err , company){
        if(err){
          res.json(err);
        } else {
            company.save();
            res.json(company);
          }
      });
    }  ,

    editNews(req,res){
      Company.findById(req.params.id , function(err , company){
          if(err){
            console.log(err);
          } else {
            const obj = {
              newsText: req.body.newstext,
              publishedOn: req.body.publishedDate,
              newsImpact: company
            } ;
            News.findByIdAndUpdate(req.params.newsId , {$set: obj} ,function(err , news){
                  if(err){
                    res.json(err);
                  } else {
                    res.json(news);
                  }
              });
          }
      })

    } ,

    deleteNews(req,res){
        News.findByIdAndRemove(req.params.newsId , function(err){
          if(err){
             res.json(err);
           } else {
             res.json("News was deleted !");
           }
        });
    },


    addNews(req,res){
      Company.findById(req.params.id , function(err , company){
            if(err){
              console.log(err);
            } else {
              const obj = {
                newsText: req.body.newsText,
                publishedOn: req.body.publishedDate,
                newsImpact: company
              } ;
              News.create(obj , function(err , news){
                if(err){
                  res.json(err);
                } else {
                    news.save();
                    res.json(news);
                  }
              });

            }

      });

    }

};
