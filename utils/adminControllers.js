
const Company = require("../model/company");
const parameter = require("../utils/parameters");


module.exports = {

  editCompany(req,res){
    const obj = {
      name : req.body.name ,
      symbol : req.body.symbol ,
      description : req.body.description ,
      availableQuantity : req.body.availableQuantity ,
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
        name : req.body.name ,
        symbol : req.body.symbol ,
      	description : req.body.description ,
      	availableQuantity : req.body.availableQuantity ,
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
      })
    }
    };
