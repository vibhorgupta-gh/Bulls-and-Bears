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



describe('Test for POST request for admin',()=>{
    it('adds company',(done) =>{

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      Company.save((err, company) => {
        chai.request(server)
          .post('/admin/company')
          .send(Company)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            res.should.have.property('error', false)
            done()
          });
      });
    });

    it('adds news',(done) =>{

      let News = new news({
      newsText : 'kejriwal arrested',
      Published : true,
      publishedOn: 10,
      newsImpact: null
      });

      News.save((err, news) => {
        chai.request(server)
          .post('/admin/news')
          .send(News)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            res.should.have.property('error', false)
            done()
          });
      });
    });
})



describe('Test for PUT request for admin',()=>{
    it('updates company',(done) => {

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

    it('updates news',(done) => {

      let News = new news({
      newsText : 'kejriwal arrested',
      newsImpact: null
      });

      News.save((err,news)=>{
        chai.request(server)
          .put('/admin/news/'+ News.id)
          .end((err,res)=>{
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            done();
          });
        });
    });
})


describe('Test for POST request for admin',()=>{
    it('adds company',(done) =>{

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
          .post('/admin/company')
          .send(Company)
          .end((err,res)=>{
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.be.an('object')
            res.should.have.property('error',false)
            done()
          });
      });
    });

    it('adds news',(done) =>{

      let News = new news({
      newsText : 'kejriwal arrested',
      Published : true,
      publishedOn: 10,
      newsImpact: null
      });

      News.save((err,company)=>{
        chai.request(server)
        .post('/admin/news')
        .send(News)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });
})


describe('Test for DELETE request for company', () => {
    it('deletes company', (done) => {

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      Company.save((err, company) => {
        chai.request(server)
        .delete('/admin/company/' + Company.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('string')
          res.should.have.property('error', false)
          done()
        });
      });
    });

    it('deletes news', (done) => {
      let News = new news({
      newsText: 'kejriwal arrested',
      Published: true,
      publishedOn: 10,
      newsImpact: null
      });

      News.save((err,company)=>{
        chai.request(server)
        .delete('/admin/news/'+News.id)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('String')
          done()
        });
      });
    });
})


describe('Test for GET request for company',()=>{

    it('gets company-list',(done)=>{

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
        .get('/company_list')
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('Array')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('gets news-list',(done)=>{

      let News = new news({
      newsText : 'kejriwal arrested',
      Published : true,
      publishedOn: 10,
      newsImpact: null
      });

      News.save((err,news)=>{
        chai.request(server)
        .get('/news_list')
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('Array')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('gets company-details',(done)=>{

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
        .get('/company_detail/' + Company.id)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('gets customer-details',(done)=>{

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
        .get('/customer_detail/' + Company.id)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('gets news-details',(done)=>{

      var News = new news({
      newsText : 'kejriwal arrested',
      newsImpact : null,
      })

      News.save((err,company)=>{
        chai.request(server)
        .get('/newsDetail/' + News.id)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });
})


describe('Test for POST request for company',()=>{
    it('buy-shares',(done)=>{

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      const buy = {
        id: '5b7d863dc1a1b37b5c266f56',
        NoOfShares: 4
      }

      Company.save((err,company)=>{
        chai.request(server)
        .post('/buy/' + Company.id)
        .send(buy)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
      });
    });

    it('sell-shares',(done)=>{

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      var sell = {
        id: '5b7d863dc1a1b37b5c266f56',
        NoOfShares: 4
      }

      Company.save((err,company)=>{
        chai.request(server)
        .post('/sell/' + Company.id)
        .send(sell)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        })
      })
    })

    it('short-shares',(done)=>{

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      var short = {
        id: '5b7d863dc1a1b37b5c266f56',
        NoOfShares: 4
      }

      Company.save((err,company)=>{
        chai.request(server)
        .post('/short/' + Company.id)
        .send(short)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        })
      })
    })

    it('cover-shares',(done)=>{

      let Company = new company({
      name : 'Nivea',
      symbol : 'XYZ',
      description : 'kuch-bhi',
      sharePrice : 100,
      availableQuantity : 2000,
      totalQuantity : 10000,
      marketCap : 500
      });

      var cover = {
        id: '5b7d863dc1a1b37b5c266f56',
        NoOfShares: 4
      }

      Company.save((err,company)=>{
        chai.request(server)
        .post('/cover/' + Company.id)
        .send(cover)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        })
      })
    })

    it('take_loan',(done)=>{

      var Loan = {
        id: '5b7d863dc1a1b37b5c266f56',
        loan: 1000
      }

      chai.request(server)
        .post('/take_loan')
        .send(Loan)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
    });

    it('repay_loan',(done)=>{

      var Loan = {
        id: '5b7d863dc1a1b37b5c266f56',
        Loan: 1000
      }

      chai.request(server)
        .post('/repay_loan')
        .send(Loan)
        .end((err,res)=>{
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error',false)
          done()
        });
    });
})
