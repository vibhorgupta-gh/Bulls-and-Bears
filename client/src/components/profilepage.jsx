import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { url } from "../config";
import NavBar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      rank: 0,
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
        var arr = data.data.stockHolding.map(x =>
          Object.assign(x, data.data.stockShorted.find(y => y._id == x._id))
        );
        var networth = 0;
        console.log("arr", arr);
        for (var i in arr) {
          networth +=
            ((arr[i].quantity || 0) + (arr[i].TotalStock || 0)) *
            arr[i].company_name.sharePrice - (arr[i].TotalPrice || 0);
        }
        console.log("networth", networth);
        if (data.data.facebook == undefined) {
          self.setState({
            loan: data.data.loan.amount,
            image: data.data.google.id,
            name: data.data.google.name,
            balance: data.data.accountBalance,
            activity: data.data.activity,
            res: arr,
            netWorth: networth + data.data.accountBalance - data.data.loan.amount,
          });
        } else {
          self.setState({
            loan: data.data.loan.amount,
            image: data.data.facebook.id,
            name: data.data.facebook.name,
            balance: data.data.accountBalance,
            activity: data.data.activity,
            res: arr,
            netWorth: networth + data.data.accountBalance - data.data.loan.amount
          });
        }
        axios
          .get(url + "/leaderboards", {
            withCredentials: true
          })
          .then(data => {
            const arr = [...data.data];

            // console.log('This is the new array --> ' + Object.keys(arr[0]));
            arr.sort(function(a, b) {
              var arr1 = a.stockHolding.map(x =>
                Object.assign(x, a.stockShorted.find(y => y._id == x._id))
              );
              var networth1 = a.accountBalance;
              //console.log("arr1", arr1);
              for (var i in arr1) {
                networth1 +=
                  ((arr1[i].quantity || 0) + (arr1[i].TotalStock || 0)) *
                  arr1[i].company_name.sharePrice - (arr1[i].TotalPrice || 0);
                  //console.log((arr1[i].quantity||0),arr1[i].company_name.sharePrice,arr1[i].TotalStock,arr1[i].TotalPrices);
    
              }
              var arr2 = b.stockHolding.map(x =>
                Object.assign(x, b.stockShorted.find(y => y._id == x._id))
              );
              var networth2 = b.accountBalance;
             // console.log("arr2", arr2);
              for (var i in arr2) {
                networth2 +=
                  ((arr2[i].quantity || 0) + (arr2[i].TotalStock || 0)) *
                  arr2[i].company_name.sharePrice - (arr2[i].TotalPrice || 0);
              }
              return (networth2-b.loan.amount) -(networth1-a.loan.amount);
            });
            var index = arr
              .map(function(e) {
                return e.facebook != undefined ? e.facebook.id : e.google.id;
              })
              .indexOf(this.state.image);
            console.log("rank", index);
            self.setState({
              rank: index
            });
          })
          .catch(err => {
            console.log(err);
          });
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
        if (data.data.msg != undefined) {
          toast.error("Loan limit exceeded");
          this.setState({
            amount: 0
          });
        } else {
          this.setState({
            loan: data.data.Customer.loan.amount,
            balance: data.data.Customer.accountBalance,
            amount: 0
          });
          toast.success("loan granted successfully");
        }
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
        if (data.data.msg != undefined) {
          toast.error("Unable to repay loan");
          this.setState({
            repay: 0
          });
        } else {
          this.setState({
            loan: data.data.Customer.loan.amount,
            balance: data.data.Customer.accountBalance,
            repay: 0
          });
          toast.success("Loan repaid successfully");
        }
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
          <NavBar />
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
                            <h2>{this.state.netWorth}</h2>
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
                            <h2>{this.state.rank + 1}</h2>
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
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => this.takeLoan()}
                          >
                            Take Loan
                          </span>
                        </div>
                        <br />
                        <div class="input-form">
                          <input
                            value={this.state.repay}
                            type="number"
                            onChange={this.handleChange2}
                          />
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => this.repayLoan()}
                          >
                            Repay Loan
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-lg-6 mt-sm-22 mt-xs-22">
                  <div className="card" style={{ marginBottom: "20px" }}>
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
                          <div
                            class="table-responsive"
                            style={{ maxHeight: "350px" }}
                          >
                            <table class="table table-hover text-center">
                              <thead class="text-uppercase">
                                <tr>
                                  <th scope="col">Company</th>
                                  <th scope="col">Shorted</th>
                                  <th scope="col">Holdings</th>
                                  <th scope="col">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.res.map((value, index) => {
                                  return (
                                    <tr style={{ cursor: "pointer" }} onClick={()=>{this.props.history.push("/company/" + value._id)}}>
                                      <th scope="row">
                                        {value.company_name.name}
                                      </th>
                                      <td>{value.TotalStock || 0}</td>
                                      <td>{value.quantity || 0}</td>
                                      <td>{value.company_name.sharePrice}</td>
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
                                className={
                                  this.state.choice == "bought" ? "active" : ""
                                }
                                style={{ cursor: "pointer" }}
                                data-toggle="tab"
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
                                className={
                                  this.state.choice == "sold" ? "active" : ""
                                }
                                style={{ cursor: "pointer" }}
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
                                className={
                                  this.state.choice == "shorted" ? "active" : ""
                                }
                                style={{ cursor: "pointer" }}
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
                                className={
                                  this.state.choice == "covered" ? "active" : ""
                                }
                                style={{ cursor: "pointer" }}
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
                              <div
                                class="table-responsive"
                                style={{ maxHeight: "350px" }}
                              >
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
                                            <th scope="row">
                                              {value.company.name}
                                            </th>
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
        <ToastContainer />
      </div>
    );
  }
}

export default Profile;
