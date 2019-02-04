import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, NavItem } from "react-bootstrap";

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
        if (data.data.facebook != undefined) {
          self.setState({
            image: data.data.facebook.id,
            name: data.data.facebook.name
          });
        } else {
          if (data.data.google != undefined) {
            self.setState({
              image: data.data.google.ph,
              name: data.data.google.name
            });
          } else {
            console.log("hello");
            window.location.href='http://localhost:3000'
          }
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
                  <img src="/assets/images/icon/bnb.png" alt="logo" />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <a href="/dashboard" style={{ align: "left" }}>
                <img src="/assets/images/icon/Bulls N Bears.png" alt="logo" />
              </a>
            </div>
            <div className="col-md-7 clearfix text-right">
              <div className="clearfix d-md-inline-block d-block">
                <div className="user-profile ">
                  <img
                    className="avatar user-thumb"
                    alt="avatar"
                    src={`https://graph.facebook.com/${
                      this.state.image
                    }/picture`}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = this.state.image;
                    }}
                  />

                  <h4
                    className="user-name dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    {this.state.name}
                  </h4>
                </div>
               
              </div>
            </div>
            <div className="col-12 d-block d-lg-none">
              <div id="mobile_menu">
                <Navbar collapseOnSelect expand="lg" bg>
                  <Navbar.Brand href="#home">Menu</Navbar.Brand>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                      <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                      <Nav.Link href="/market">Market</Nav.Link>
                      <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                      <Nav.Link href="/news">News</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </Navbar>
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
                          <i className="ti-dashboard" />
                          <span>Dashboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/market"}>
                          <i className="fa fa-shopping-cart" />
                          <span>market</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/leaderboard"}>
                          <i className="fa fa-users" />
                          <span>leaderboard</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={"/news"}>
                          <i className="fa fa-newspaper-o" />
                          <span>News</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
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
