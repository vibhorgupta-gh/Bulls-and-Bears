const mongoose = require("mongoose");
const news = require("../model/news.js");
const config = require('../config');
const company = require("../model/company.js");
const User = require("../model/user.js");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const should = require("should");
const server = require("../server.js");

chai.use(chaiHttp);
process.env.NODE_ENV = "test";
after(function (done) {
  mongoose.connect(config.SECRETS.database.url,{ useNewUrlParser: true }, (err) => {
    mongoose.connection.collections['companies'].drop(function (err) {
      mongoose.connection.collections['news'].drop(function (err) {
        done();
      });
    });
  })
});
describe("Test for POST request for admin", () => {
  it("adds company", done => {
    let Companytemp = {
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    };

    chai
      .request(server)
      .post("/admin/company")
      .send(Companytemp)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        res.should.have.property("error", false);
        done();
      });

  });

  it("adds news", done => {
    let Newstemp = {
      newsText: "kejriwal arrested",
      Published: true,
      publishedOn: 10,
      newsImpact: null
    };

    chai
      .request(server)
      .post("/admin/news")
      .send(Newstemp)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        res.should.have.property("error", false);
        done();
      });
  });
});

describe("Test for PUT request for admin", () => {
  it("updates company", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 510
    });
    let Companytemp = {
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    };
    Company.save((err, company) => {
      chai
        .request(server)
        .put("/admin/company/" + company.id)
        .send(Companytemp)
        .end((err, res) => {
          expect(res.body.marketCap).to.equal(500);
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });

  it("updates news", done => {
    let News = new news({
      newsText: "kejriwal arrested",
      newsImpact: null
    });
    let newstemp = {
      newsText: "kejriwal arrest",
      newsImpact: null
    };
    News.save((err, news) => {
      chai
        .request(server)
        .put("/admin/news/" + news.id)
        .send(newstemp)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          done();
        });
    });
  });
});

describe("Test for DELETE request for admin", () => {
  it("deletes company", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    Company.save((err, company) => {
      chai
        .request(server)
        .delete("/admin/company/" + company.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("string");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("deletes news", done => {
    let News = new news({
      newsText: "kejriwal arrested",
      Published: true,
      publishedOn: 10,
      newsImpact: null
    });

    News.save((err, news) => {
      chai
        .request(server)
        .delete("/admin/news/" + news.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("String");
          done();
        });
    });
  });
});

describe("Test for GET request for company", () => {
  it("gets company-list", done => {

    chai
      .request(server)
      .get("/company_list")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("Array");
        res.should.have.property("error", false);
        done();
      });
  });

  it("gets news-list", done => {
    chai
      .request(server)
      .get("/news_list")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("Array");
        res.should.have.property("error", false);
        done();
      });
  });

  it("gets company-details", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    Company.save((err, company) => {
      chai
        .request(server)
        .get("/company_detail/" + company.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("gets customer-details", done => {
    let user = new User({
      facebook: {
        id: "1234",
        token: "234",
        email: "34",
        name: "4"
      },
      google: {
        id: "1234",
        token: "234",
        email: "34",
        name: "4"
      },
      isAdmin: false,
      accountBalance: 200,
      stockShorted: {
        TotalPrice: 100,
        TotalPrice: 200
      }
    });
    user.save((err, user) => {
      chai
        .request(server)
        .get("/customer_detail/" + user.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("gets news-details", done => {
    var News = new news({
      newsText: "kejriwal arrested",
      newsImpact: null
    });

    News.save((err, News) => {
      chai
        .request(server)
        .get("/newsDetail/" + News.id)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });
});

describe("Test for POST request for company", () => {
  it("buy-shares", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    const buy = {
      id: "5c0c935d9b448a41a47b6c68",
      NoOfShares: 4
    };

    Company.save((err, company) => {
      chai
        .request(server)
        .post("/buy/" + company.id)
        .send(buy)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("sell-shares", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    var sell = {
      id: "5c0c935d9b448a41a47b6c68",
      NoOfShares: 4
    };

    Company.save((err, company) => {
      chai
        .request(server)
        .post("/sell/" + company.id)
        .send(sell)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("short-shares", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    var short = {
      id: "5c0c935d9b448a41a47b6c68",
      NoOfShares: 4
    };

    Company.save((err, company) => {
      chai
        .request(server)
        .post("/short/" + company.id)
        .send(short)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("cover-shares", done => {
    let Company = new company({
      name: "Nivea",
      symbol: "XYZ",
      description: "kuch-bhi",
      sharePrice: 100,
      availableQuantity: 2000,
      totalQuantity: 10000,
      marketCap: 500
    });

    var cover = {
      id: "5c0c935d9b448a41a47b6c68",
      NoOfShares: 4
    };

    Company.save((err, company) => {
      chai
        .request(server)
        .post("/cover/" + company.id)
        .send(cover)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an("object");
          res.should.have.property("error", false);
          done();
        });
    });
  });

  it("take_loan", done => {
    var Loan = {
      id: "5c0c935d9b448a41a47b6c68",
      loan: 1000
    };

    chai
      .request(server)
      .post("/take_loan")
      .send(Loan)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        res.should.have.property("error", false);
        done();
      });
  });

  it("repay_loan", done => {
    var Loan = {
      id: "5c0c935d9b448a41a47b6c68",
      loan: 1000
    };

    chai
      .request(server)
      .post("/repay_loan")
      .send(Loan)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        res.should.have.property("error", false);
        done();
      });
  });
});