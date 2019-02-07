import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import ScriptTag from "react-script-tag";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./navbar";

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      image: null
    };
  }

  componentDidMount() {
    var self = this;
    axios
      .get(url + "/company_list", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
        self.setState({
          list: data.data
        });
      }).catch((err)=>{
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
                        <h4 class="header-title mb-0">Company List</h4>
                        <select class="custome-select border-0 pr-3">
                          <option selected>Last 24 Hours</option>
                          <option value="0">10 February 2019</option>
                        </select>
                      </div>
                      <div class="market-status-table mt-4">
                        <div class="table-responsive">
                          <table class="dbkit-table">
                            <tr class="heading-td">
                              <td class="mv-icon">Symbol</td>
                              <td class="coin-name">Company Name</td>
                              <td class="trends">Trends</td>
                              <td class="attachments">Shares Available</td>
                              <td class="stats-chart">Share Price</td>
                            </tr>
                            {this.state.list.length==0 ? "Loading .." : ""}
                            {this.state.list.map((el, index) => {
                              var trends = true;
                              if (el.history.length > 1) {
                                trends =
                                  el.history[el.history.length - 1].sharePrice >
                                  el.history[el.history.length - 2].sharePrice;
                              }
                              return (
                                <Link key={index} to={"/company/" + el._id}>
                                  <tr>
                                    <td class="mv-icon">{el.symbol}</td>
                                    <td class="coin-name">{el.name}</td>
                                    <td class="trends">
                                      <img
                                        src={
                                          trends == true
                                            ? "assets/images/icon/market-value/trends-up-icon.png"
                                            : "assets/images/icon/market-value/trends-down-icon.png"
                                        }
                                        alt="icon"
                                      />
                                    </td>
                                    <td class="attachments">
                                      {el.availableQuantity}
                                    </td>
                                    <td class="stats-chart">{el.sharePrice}</td>
                                  </tr>
                                </Link>
                              );
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

export default CompanyList;
