import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import NavBar from "./navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        labels: [1, 2, 3],
        datasets: [
          {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.8)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [1, 2, 3]
          }
        ]
      },
      options: {
        responsive: true,
        scaleShowLabels: true,
        scaleLabel: "Rs. <%=value%>",
        scaleFontColor: "#666"
      }
    };
  }
  buystock() {
    toast.info("your request is being processed!");
    //console.log(`${url}/buy/${this.state.id}`);
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
        if(data.data.msg!=undefined)
        {
          toast.error("Can't buy stock due to some reason");
        }
        else
        {
          toast.success("successfully bought the stocks!")
        }
        this.setState({
          buy: 0
        });
      });
  }
  sellstock() {
    toast.info("your request is being processed!");
    //console.log(`${url}/sell/${this.state.id}`);
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
        if(data.data.msg!=undefined)
        {
          toast.error("Can't sell stock due to some reason");
        }
        else
        {
          toast.success("successfully sold the stocks!")
        }
        this.setState({
          sell: 0
        });
      });
  }
  shortstock() {
    toast.info("your request is being processed!");
    //console.log(`${url}/short/${this.state.id}`);
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
        if(data.data.msg!=undefined)
        {
          toast.error("Can't buy short due to some reason");
        }
        else
        {
          toast.success("successfully shorted the stocks!")
        }
        this.setState({
          short: 0
        });
      });
  }
  coverstock() {
    toast.info("your request is being processed!");
   // console.log(`${url}/cover/${this.state.id}`);
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
        if(data.data.msg!=undefined)
        {
          toast.error("Can't cover stock due to some reason");
        }
        else
        {
          toast.success("successfully covered the stocks!")
        }
        this.setState({
          cover: 0
        });
      });
  }

  componentDidMount() {
    console.log("props", this.props);
    let self = this;
    axios
      .get(url + "/company_detail/" + this.props.match.params.id, {
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
            labels:
              data.data.history.length != 0
                ? Array.from(
                    new Array(data.data.history.length),
                    (val, index) => index
                  ).filter((_,i) => i % 5 == 0)
                : [1, 2, 3],
            datasets: [
              {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data:
                  data.data.history.length != 0
                    ? data.data.history.map(a => a.sharePrice).filter((_,i) => i % 5 == 0)
                    : [1, 2, 3]
              }
            ]
          },
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
                  <div className="card">
                    <div className="card-body">
                      <div className="d-sm-flex justify-content-between align-items-center">
                        <h4 className="header-title">Stock Statistics</h4>
                        <h4 className="header-title">{this.state.name}</h4>
                      </div>
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
        <ToastContainer></ToastContainer>
      </div>
    );
  }
}

export default Company;
