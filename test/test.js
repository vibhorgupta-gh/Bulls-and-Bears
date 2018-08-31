const mongoose = require('mongoose');
const news = require('../model/news.js');

const company = require('../model/company.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const should = require('should');
const server = require('../server.js');

chai.use(chaiHttp);
process.env.NODE_ENV = 'test';

describe('Test for PUT requests',()=>{

  it('adds company',(done) => {

    let Company = new company({
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
         expect(res.statusCode).to.equal(200)
         expect(res.body).to.be.an('object')
         done();
       });
     });
  });


})
