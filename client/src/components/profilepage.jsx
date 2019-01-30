import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import jquery from "jquery";
import ScriptTag from "react-script-tag";
import NavBar from "./navbar";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      loan: 0,
      image: null,
      name: "",
      balance: 0,
      worth: 0,
      rank : 1,
      repay: 0,
      activity: [],
      choice: "bought",
      res: [],
      netWorth: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get(url + "/getcurrentuser", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
<<<<<<< HEAD
        self.setState({
          loan: data.data.loan.amount,
          image: data.data.google.id,
          name: data.data.google.name,
          balance: data.data.accountBalance,
          activity: data.data.activity
        });
=======
        var arr = data.data.stockHolding.map(x =>
          Object.assign(x, data.data.stockShorted.find(y => y._id == x._id))
        );
        var networth = 0;
        console.log("arr",arr);
        for (var i in arr) {
          networth += (i.quantity + i.TotalStock) * i.sharePrice;
        }
        console.log("networth",networth);
        if (data.data.facebook == undefined) {
          self.setState({
            loan: data.data.loan.amount,
            image: data.data.google.id,
            name: data.data.google.name,
            balance: data.data.accountBalance,
            activity: data.data.activity,
            res: arr,
            netWorth: networth + data.data.accountBalance
          });
        } else {
          self.setState({
            loan: data.data.loan.amount,
            image: data.data.facebook.id,
            name: data.data.facebook.name,
            balance: data.data.accountBalance,
            activity: data.data.activity,
            res: arr,
            netWorth: networth + data.data.loan.amount
          });
        }
        axios
      .get(url + "/leaderboard", {
        withCredentials: true
      })
      .then(data => {
        const arr = [...data.data];

        // console.log('This is the new array --> ' + Object.keys(arr[0]));
        arr.sort(function(a, b) {
          return b.accountBalance - a.accountBalance;
        });
        var index = arr.map(function(e) { return e.facebook!=undefined ? e.facebook.id : e.google.id; }).indexOf(this.state.image);
        console.log("rank",index);
        self.setState({
          rank: index
        });
      })
      .catch(err => {
        console.log(err);
      });
>>>>>>> 791ddc5d8551f6eae7367571822d856f70549804
      });
    
  }
  takeLoan() {
    console.log(this.state.amount);
    var self = this;
    axios
      .post(
        url + "/take_loan",
        {
          amount: self.state.amount
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data.data);
        this.setState({
          loan: data.data.Customer.loan.amount,
          balance:data.data.Customer.accountBalance,
          amount:0,
        });
      });
  }
  repayLoan() {
    console.log(this.state.repay);
    var self = this;
    axios
      .post(
        url + "/repay_loan",
        {
          amount: self.state.repay
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data.data);
        this.setState({
          loan: data.data.Customer.loan.amount,
          balance:data.data.Customer.accountBalance,
          repay:0,
        });
      });
  }
  handleChange(e) {
    console.log("k", parseInt(e.target.value));
    this.setState({
      amount: parseInt(e.target.value)
    });
  }
  handleChange2(e) {
    console.log("k", parseInt(e.target.value));
    this.setState({
      repay: parseInt(e.target.value)
    });
  }
  render() {
    return (
      <div class="body-bg">
        <div class="horizontal-main-wrapper">
<<<<<<< HEAD
          <div class="mainheader-area">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <div class="logo">
                    <a href="index.html">
                      <img src="assets/images/icon/logo2.png" alt="logo" />
                    </a>
                  </div>
                </div>
                <div class="col-md-9 clearfix text-right">
                  <div class="d-md-inline-block d-block mr-md-4">
                    <ul class="notification-area">
                      <li class="dropdown">
                        <i
                          class="ti-bell dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <span>2</span>
                        </i>
                        <div class="dropdown-menu bell-notify-box notify-box">
                          <span class="notify-title">
                            You have 3 new notifications{" "}
                            <a href="#">view all</a>
                          </span>
                          <div class="nofity-list">
                            <a href="#" class="notify-item">
                              <div class="notify-thumb">
                                <i class="ti-key btn-danger" />
                              </div>
                              <div class="notify-text">
                                <p>You have Changed Your Password</p>
                                <span>Just Now</span>
                              </div>
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="clearfix d-md-inline-block d-block">
                    <div class="user-profile m-0">
                      <img
                        class="avatar user-thumb"
                        src={`https://graph.google.com/${
                          this.state.image
                        }/picture`}
                        alt="avatar"
                      />
                      <h4
                        class="user-name dropdown-toggle"
                        data-toggle="dropdown"
                      >
                        {this.state.name} <i class="fa fa-angle-down" />
                      </h4>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                          Message
                        </a>
                        <a class="dropdown-item" href="#">
                          Settings
                        </a>
                        <a class="dropdown-item" href="#">
                          Log Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="header-area header-bottom">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-lg-9  d-none d-lg-block">
                    <div class="horizontal-menu">
                      <nav>
                        <ul id="nav_menu">
                          <li>
                            <a href="javascript:void(0)">
                              <i class="ti-dashboard" />
                              <span>Dashboard</span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">
                              <span>News</span>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">
                              <span>Leaderboard</span>
                            </a>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div class="col-12 d-block d-lg-none">
                    <div id="mobile_menu" />
                  </div>
                </div>
              </div>
            </div>
          </div>
=======
          <NavBar />
>>>>>>> 791ddc5d8551f6eae7367571822d856f70549804
          <div className="main-content-inner">
            <div className="container">
              <div className="row">
                <div class="col-xl-8 col-lg-12 mt-6">
                  <div class="row">
                    <div class="col-xl-6 col-lg-9 mt-4">
                      <div class="card">
                        <div class="seo-fact sbg1">
                          <div class="p-4 d-flex justify-content-between align-items-center">
                            <div class="seofct-icon">
                              <i class="fa fa-money" /> Balance
                            </div>
                            <h2>{this.state.balance}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-9 mt-4">
                      <div class="card">
                        <div class="seo-fact sbg2">
                          <div class="p-4 d-flex justify-content-between align-items-center">
                            <div class="seofct-icon">
                              <i class="fa fa-rupee" />
                              Net Worth
                            </div>
                            <h2>0</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xl-6 col-lg-9 mt-4">
                      <div class="card">
                        <div class="seo-fact sbg3">
                          <div class="p-4 d-flex justify-content-between align-items-center">
                            <div class="seofct-icon">
                              <i class="fa fa-bank" /> Loan
                            </div>
                            <h2>{this.state.loan}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-9 mt-4">
                      <div class="card">
                        <div class="seo-fact sbg4">
                          <div class="p-4 d-flex justify-content-between align-items-center">
                            <div class="seofct-icon">
                              <i class="fa fa-users" /> Rank
                            </div>
                            <h2>{this.state.rank+1}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 mt-3">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title">Loan System</h4>
                      <form action="#">
                        <div class="input-form">
                          <input
                            value={this.state.amount}
                            type="number"
                            onChange={this.handleChange}
                          />
                          <span style={{cursor:"pointer"}} onClick={() => this.takeLoan()}>Take Loan</span>
                        </div>
                        <br />
                        <div class="input-form">
                          <input value={this.state.repay}
                            type="number"
                            onChange={this.handleChange2} />
                          <span style={{cursor:"pointer"}} onClick={() => this.repayLoan()}>Repay Loan</span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-lg-6 mt-sm-22 mt-xs-22">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <h4 className="header-title mb-0">Portfolio</h4>
                        <select className="custome-select border-0 pr-3">
                          <option selected>Last 24 Hours</option>
                          <option value="0">01 July 2018</option>
                        </select>
                      </div>
                      <div className="market-status-table mt-4">
                        <div class="single-table">
                          <div class="table-responsive">
                            <table class="table table-hover text-center">
                              <thead class="text-uppercase">
                                <tr>
                                  <th scope="col">Company</th>
                                  <th scope="col">Holding</th>
                                  <th scope="col">Shorted</th>
                                  <th scope="col">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>09 / 07 / 2018</td>
                                  <td>$120</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>jone</td>
                                  <td>09 / 07 / 2018</td>
                                  <td>$150</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>Mark</td>
                                  <td>09 / 07 / 2018</td>
                                  <td>$120</td>
                                </tr>
                                <tr>
                                  <th scope="row">1</th>
                                  <td>jone</td>
                                  <td>09 / 07 / 2018</td>
                                  <td>$150</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="col-lg-6 mt-sm-22 mt-xs-22">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <h4 className="header-title">Trading History</h4>
                        <div className="trd-history-tabs">
                          <ul className="nav" role="tablist">
                            <li>
                              <a
                                className="active"
                                data-toggle="tab"
                                href="#buy_order"
                                role="tab"
                                onClick={() => {
                                  this.setState({ choice: "bought" });
                                }}
                              >
                                Buy
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tab"
                                href="#sell_order"
                                role="tab"
                                onClick={() => {
                                  this.setState({ choice: "sold" });
                                }}
                              >
                                Sell
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tab"
                                href="#sell_order"
                                role="tab"
                                onClick={() => {
                                  this.setState({ choice: "shorted" });
                                }}
                              >
                                Short
                              </a>
                            </li>
                            <li>
                              <a
                                data-toggle="tab"
                                href="#sell_order"
                                role="tab"
                                onClick={() => {
                                  this.setState({ choice: "covered" });
                                }}
                              >
                                Cover
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="trad-history mt-4">
                        <div className="tab-content" id="myTabContent">
                          <div
                            className="tab-pane fade show active"
                            id="buy_order"
                            role="tabpanel"
                          >
                            <div class="single-table">
                              <div class="table-responsive">
                                <table class="table table-hover text-center">
                                  <thead class="text-uppercase">
                                    <tr>
                                      <th scope="col">Company</th>
                                      <th scope="col">Price</th>
                                      <th scope="col">Quantity</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.activity
                                      .filter(value => {
                                        return (
                                          value.action === this.state.choice
                                        );
                                      })
                                      .map((value, index) => {
                                        return (
                                          <tr>
                                            <th scope="row">{value.company.name}</th>
                                            <td>{value.price}</td>
                                            <td>{value.quantity}</td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
