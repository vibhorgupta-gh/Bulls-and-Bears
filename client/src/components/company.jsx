import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import Charts from "./chart";
import NavBar from "./navbar";

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ["company"],
      symbol: ["$#"],
      description: ["Description lorem gghbfjjgjhggbhgyjbg"],
      availableQuantity: 0,
      sharePrice: 0,
      totalQuantity: 0,
      marketCap: 0,
      history: [
        {
          timestamp: {
            type: Date,
            default: Date.now
          },
          sharePrice: 0,
          availableQuantity: 0
        }
      ]
    };
  }

    componentDidMount() {
        var self = this;
        axios
            .get(url + "/company/id:", {
                withCredentials: true
            })
            .then(data => {
                console.log(data.data);
                self.setState({
                    name: data.data.name,
                    symbol: data.data,
                    description: ["Description lorem gghbfjjgjhggbhgyjbg"],
                    availableQuantity: 0,
                    sharePrice: 0,
                    totalQuantity: 0,
                    marketCap: 0,
                });

            });
            .catch(err => {
                  console.log(err);
            })
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
                              <i class="fa fa-money" /> Stock price
                            </div>
                            <h2>{this.state.sharePrice}</h2>
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
                              Stock available
                            </div>
                            <h2>{this.state.availableQuantity}</h2>
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
                              <i class="fa fa-bank" /> Symbol
                            </div>
                            <h2>{this.state.symbol}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-6 col-lg-9 mt-4">
                      <div class="card">
                        <div class="seo-fact sbg4">
                          <div class="p-4 d-flex justify-content-between align-items-center">
                            <div class="seofct-icon">
                              <i class="fa fa-users" /> Total Share
                            </div>
                            <h2>{this.state.availableQuantity}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 mt-3">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title">trade System</h4>
                      <form action="#">
                        <div class="input-form">
                          <input />
                          <span style={{ cursor: "pointer" }}>Buy</span>
                        </div>
                        <br></br>
                        <div class="input-form">
                          <input />
                          <span style={{ cursor: "pointer" }}>Cover</span>
                        </div>
                        <br></br>

                        <div class="input-form">
                          <input />
                          <span style={{ cursor: "pointer" }}>short</span>
                        </div>
                        <br></br>

                        <div class="input-form">
                          <input />
                          <span style={{ cursor: "pointer" }}>sell</span>
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
                        <h4 className="header-title mb-0">History</h4>
                      </div>
                      <Charts />
                    </div>
                  </div>
                </div>
                <br />
                <div className="col-lg-6 mt-sm-22 mt-xs-22">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <h4 className="header-title">Description</h4>
                      </div>
                      <div className="trad-history mt-4">
                        {this.state.description}
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

export default Company;
