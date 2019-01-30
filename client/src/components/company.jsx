import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import NavBar from "./navbar";
var LineChart = require("react-chartjs");

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: 0,
      sell: 0,
      cover: 0,
      short: 0,
      id: "",
      name: "company",
      symbol: "$#",
      description: "Description lorem gghbfjjgjhggbhgyjbg",
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
      ],
      chartData: {
        labels: [],
        datasets: [
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.8)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: []
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
				title: {
					display: true,
					text: 'Chart.js Line Chart'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};
  }
  buystock() {
    console.log(`${url}/buy/${this.state.id}`);
    axios
      .post(
        `${url}/buy/${this.state.id}`,
        {
          NoOfShares: this.state.buy
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data);
        this.setState({
          buy: 0
        });
      });
  }
  sellstock() {
    console.log(`${url}/sell/${this.state.id}`);
    axios
      .post(
        `${url}/sell/${this.state.id}`,
        {
          NoOfShares: this.state.sell
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data);
        this.setState({
          sell: 0
        });
      });
  }
  shortstock() {
    console.log(`${url}/short/${this.state.id}`);
    axios
      .post(
        `${url}/short/${this.state.id}`,
        {
          NoOfShares: this.state.short
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data);
        this.setState({
          short: 0
        });
      });
  }
  coverstock() {
    console.log(`${url}/cover/${this.state.id}`);
    axios
      .post(
        `${url}/cover/${this.state.id}`,
        {
          NoOfShares: this.state.cover
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data);
        this.setState({
          cover: 0
        });
      });
  }

  componentDidMount() {
    let self = this;

    axios
      .get(url + "/company_detail/5c501fbb90ffc3115b2d0107", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
        self.setState({
          name: data.data.name,
          symbol: data.data.symbol,
          description: data.data.description,
          availableQuantity: data.data.availableQuantity,
          sharePrice: data.data.sharePrice,
          totalQuantity: data.data.totalQuantity,
          history: data.data.history,
          id: data.data._id,
          chartData: {
            labels: data.data.history.map(a => a.timestamp),
            datasets: [
              {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: data.data.history.map(a => a.sharePrice)
              }
            ]
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Chart.js Line Chart"
            },
            tooltips: {
              mode: "index",
              intersect: false
            },
            hover: {
              mode: "nearest",
              intersect: true
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Month"
                  }
                }
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Value"
                  }
                }
              ]
            }
          }
        });
      });
  }
  handlechange(e) {
    this.setState({
      [e.target.id]: parseInt(e.target.value)
    });
    console.log(e.target.value);
  }
  render() {
    return (
      <div class="body-bg">
        <div class="horizontal-main-wrapper">
          <NavBar />
          <div className="main-content-inner">
            <div className="container">
              <br />
              <div className="row">
                <div class="col-xl-8 col-lg-12 mt-6">
                  <div className="card" style={{ height: "350px" }}>
                    <div className="card-body">
                      <LineChart.Line
                        data={this.state.chartData}
                        options={this.state.options}
                      />
                    </div>
                  </div>
                </div>
                <div class="col-xl-4 col-lg-6 mt-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <h4 className="header-title">Description</h4>
                      </div>
                      <div className="trad-history mt-4">
                        {this.state.description}
                      </div>
                      <br />
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
                      <br />
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
                </div>
              </div>
              <div className="row mt-5 mb-5">
                <div className="col-12">
                  <div class="card">
                    <div
                      class="card-body"
                      style={{
                        verticalAlign: "middle",
                        lineHeight: "20px",
                        display: "inline"
                      }}
                    >
                      <h4 class="header-title">Trade System</h4>
                      <div class="row mt-5 mb-5">
                        <div class="col-lg-3 col-md-6">
                          <div class="input-form">
                            <input
                              type="number"
                              id="buy"
                              value={this.state.buy}
                              onChange={e => this.handlechange(e)}
                            />
                            <span
                              onClick={() => this.buystock()}
                              style={{ cursor: "pointer" }}
                            >
                              Buy
                            </span>
                          </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                          <div class="input-form">
                            <input
                              type="number"
                              id="sell"
                              value={this.state.sell}
                              onChange={e => this.handlechange(e)}
                            />
                            <span
                              onClick={() => this.sellstock()}
                              style={{ cursor: "pointer" }}
                            >
                              Sell
                            </span>
                          </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                          <div class="input-form">
                            <input
                              type="number"
                              id="short"
                              value={this.state.short}
                              onChange={e => this.handlechange(e)}
                            />
                            <span
                              onClick={() => this.shortstock()}
                              style={{ cursor: "pointer" }}
                            >
                              Short
                            </span>
                          </div>
                        </div>

                        <div class="col-lg-3 col-md-6">
                          <div class="input-form">
                            <input
                              type="number"
                              id="cover"
                              value={this.state.cover}
                              onChange={e => this.handlechange(e)}
                            />
                            <span
                              onClick={() => this.coverstock()}
                              style={{ cursor: "pointer" }}
                            >
                              Cover
                            </span>
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

export default Company;
