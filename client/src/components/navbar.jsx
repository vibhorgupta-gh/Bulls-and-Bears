import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      name: ""
    };
  }

  componentDidMount() {
    var self = this;
    axios
      .get(url + "/getcurrentuser", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
        if (data.data.facebook == undefined) {
          self.setState({
            image: data.data.google.id,
            name: data.data.google.name
          });
        } else {
          self.setState({
            image: data.data.facebook.id,
            name: data.data.facebook.name
          });
        }
      });
  }

  render() {
    return (
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
              <div class="clearfix d-md-inline-block d-block">
                <div class="user-profile m-0">
                  <img
                    class="avatar user-thumb"
                    src={`https://graph.facebook.com/${
                      this.state.image
                    }/picture`}
                    alt="avatar"
                  />
                  <h4 class="user-name dropdown-toggle" data-toggle="dropdown">
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
                        <Link to={"/dashboard"}>
                          <i class="ti-dashboard" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/market"}>
                          <i class="ti-dashboard" />
                          <span>market</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/leaderboard"}>
                          <i class="ti-dashboard" />
                          <span>leaderboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/news"}>
                          <i class="ti-dashboard" />
                          <span>News</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div class="col-12 d-block d-lg-none">
                <div id="mobile_menu" >
                <ul id="nav_menu">
                      <li>
                        <Link to={"/dashboard"}>
                          <i class="ti-dashboard" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/market"}>
                          <i class="ti-dashboard" />
                          <span>market</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/leaderboard"}>
                          <i class="ti-dashboard" />
                          <span>leaderboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/news"}>
                          <i class="ti-dashboard" />
                          <span>News</span>
                        </Link>
                      </li>
                    </ul>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
