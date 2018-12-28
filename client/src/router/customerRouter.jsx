import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Leaderboard from "../components/leaderboard";
import CompanyList from "../components/companyList";
import Company from "../components/company";
import ProfilePage from "../components/profilepage";
import News from "../components/news";
import LandingPage from "../components/Landingpage";

class CustomerRoutes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/market" component={CompanyList} />
          <Route exact path="/company/:id" component={Company} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/news" component={News} />
        </div>
      </Router>
    );
  }
}

export default CustomerRoutes;
