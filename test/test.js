var mongoose = require('mongoose');
var news = require('../model/news.js');

var company = require('../model/company.js');

var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var should = require('should');
var server = require('../server.js');

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('test for put requests',()=>{

  it('/admin/company/:id',(done)=>{

    var Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500

    });

     Company.save((err,company)=>{
       chai.request(server)
       .put('/admin/company/'+ Company.id)
       .end((err,res)=>{
         res.should.have.status(200);
        res.body.should.be.a('object');

         done();
       });
     });
  });


})
