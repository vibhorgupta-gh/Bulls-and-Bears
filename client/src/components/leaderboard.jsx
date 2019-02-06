import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import NavBar from "./navbar";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    const self = this;
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
          var networth1 = 0;
          //console.log("arr", arr);
          for (var i in arr) {
            networth1 +=
              ((arr1[i].quantity || 0) + (arr1[i].TotalStock || 0)) *
              arr1[i].company_name.sharePrice - (arr1[i].TotalPrice || 0);
          }
          var arr2 = b.stockHolding.map(x =>
            Object.assign(x, b.stockShorted.find(y => y._id == x._id))
          );
          var networth2 = 0;
          //console.log("arr", arr);
          for (var i in arr) {
            networth2 +=
              ((arr2[i].quantity || 0) + (arr2[i].TotalStock || 0)) *
              arr2[i].company_name.sharePrice - (arr2[i].TotalPrice || 0);
          }
          return (networth2-b.loan.amount) -(networth1-a.loan.amount);
        });

        self.setState({
          list: arr
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div class="body-bg">
        <div class="horizontal-main-wrapper">
          <NavBar />
          <div class="main-content-inner">
            <div class="sales-report-area mt-5 mb-5">
              <div class="row mt-5 mb-5">
                <div class="col-lg-12 spa">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-sm-flex justify-content-between align-items-center">
                        <h4 class="header-title mb-0">Leaderboard</h4>
                        <select class="custome-select border-0 pr-3">
                          <option selected>Last 24 Hours</option>
                          <option value="0">10 February 2019</option>
                        </select>
                      </div>
                      <div class="market-status-table mt-4">
                        <div class="table-responsive">
                          <table class="dbkit-table">
                            <tr class="heading-td">
                              <td class="mv-icon">Rank</td>
                              <td class="mv-icon">Photo</td>
                              <td class="coin-name">Name</td>
                              <td class="buy">Worth</td>
                            </tr>

                            {this.state.list.map((el, index) => {
                              console.log("This is the el --> ", el);
                              var arr = el.stockHolding.map(x =>
                                Object.assign(x, el.stockShorted.find(y => y._id == x._id))
                              );
                              var networth = 0;
                              console.log("arr", arr);
                              for (var i in arr) {
                                networth +=
                                  ((arr[i].quantity || 0) + (arr[i].TotalStock || 0)) *
                                  arr[i].company_name.sharePrice - (arr[i].TotalPrice || 0);
                              }
                              if (el.facebook === undefined) {
                                return (
                                  <tr>
                                    <td class="mv-icon">{index + 1}</td>
                                    <img
                                      class="avatar user-thumb"
                                      src={el.google.ph}
                                      alt="avatar"
                                    />
                                 
                                    <td class="coin-name">{el.google.name}</td>

                                    <td class="buy">{networth-el.loan.amount}</td>
                                  </tr>
                                );
                              } else {
                                return (
                                  <tr>
                                    <td class="mv-icon">{index + 1}</td>
                                    <img
                                      class="avatar user-thumb"
                                      src={`https://graph.facebook.com/${
                                        el.facebook.id
                                      }/picture`}
                                      alt="avatar"
                                    />
                                    <td class="coin-name">
                                      {el.facebook.name}
                                    </td>

                                    <td class="buy">{el.accountBalance}</td>
                                  </tr>
                                );
                              }
                            })}
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
    );
  }
}

export default LeaderBoard;
