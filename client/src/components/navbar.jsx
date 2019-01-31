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
        <div className="mainheader-area">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-1">
                        <div className="logo">
                            <a href="/d">
                                <img src="assets/images/icon/bnb.png" alt="logo"/>

                            </a>


                        </div>
                    </div>
                    <div className="col-md-4">
                        <a href="/dashboard" style={{align: "left"}}>
                            <img src="assets/images/icon/Bulls N Bears.png" alt="logo"/>

                        </a>
                    </div>
                    <div className="col-md-7 clearfix text-right">
                        <div className="clearfix d-md-inline-block d-block">
                            <div className="user-profile ">
                                <img
                                    className="avatar user-thumb"
                                    src={`https://graph.facebook.com/${
                                        this.state.image
                                        }/picture`}
                                    alt="avatar"
                                />
                                <h4 className="user-name dropdown-toggle" data-toggle="dropdown">
                                    {this.state.name} <i className="fa fa-angle-down"></i>
                                </h4>

                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Message</a>
                                    <a className="dropdown-item" href="http://localhost:8080/logout">Log Out</a>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-area header-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-9  d-none d-lg-block">
                            <div className="horizontal-menu">
                                <nav>
                                    <ul id="nav_menu">
                                        <li>
                                            <Link to={"/dashboard"}>
                                                <i className="ti-dashboard"/>
                                                <span>Dashboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/market"}>
                                                <i className="ti-dashboard"/>
                                                <span>market</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/leaderboard"}>
                                                <i className="ti-dashboard"/>
                                                <span>leaderboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/news"}>
                                                <i className="ti-dashboard"/>
                                                <span>News</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div className="col-12 d-block d-lg-none">
                            <div id="mobile_menu">
                                <ul id="nav_menu">
                                    <li>
                                        <Link to={"/dashboard"}>
                                            <i className="ti-dashboard"/>
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/market"}>
                                            <i className="ti-dashboard"/>
                                            <span>market</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/leaderboard"}>
                                            <i className="ti-dashboard"/>
                                            <span>leaderboard</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/news"}>
                                            <i className="ti-dashboard"/>
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
