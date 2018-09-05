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

describe('Test for PUT requests', () => {
  it('updates company', (done) => {
    setTimeout(done, 3000);
    let Company = new company({
      name: 'Nivea',
      symbol: 'XYZ',
      description: 'kuch-bhi',
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    Company.save((err, company) => {
      chai.request(server)
        .put('/admin/company/' + Company.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          done();
        });
    });
  });

  it('updates news', (done) => {
    setTimeout(done, 3000);
    let News = new news({
      newsText: 'kejriwal arrested',
      publishedOn: 20,
      createdOn: 10,
      newsImpact: null
    });

    News.save((err, news) => {
      chai.request(server)
        .put('/admin/news/' + News.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('object')
          res.should.have.property('error', false)
          done();
        });
    });
  });
})

describe('TEST FOR POST REQUEST', () => {
  it('adds company', (done) => {
    setTimeout(done, 3000);
    let Company = new company({
      name: 'Nivea',
      symbol: 'XYZ',
      description: 'kuch-bhi',
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
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

  it('adds news', (done) => {
    setTimeout(done, 3000);
    let News = new news({
      newsText: 'kejriwal arrested',
      publishedOn: 20,
      createdOn: 10,
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

describe('TEST FOR DELETE REQUEST', () => {
  it('deletes company', (done) => {
    setTimeout(done, 3000);
    let Company = new company({
      name: 'Nivea',
      symbol: 'XYZ',
      description: 'kuch-bhi',
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
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
    setTimeout(done, 3000);
    let News = new news({
      newsText: 'kejriwal arrested',
      Published: true,
      publishedOn: 10,
      newsImpact: null
    });

    News.save((err, company) => {
      chai.request(server)
        .delete('/admin/news/' + News.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.be.an('string')
          res.should.have.property('error', false)
          done()
        });
    });
  });
})