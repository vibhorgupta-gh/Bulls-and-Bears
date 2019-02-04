import React, { Component } from "react";
import { BrowserRouter , Route,Switch } from "react-router-dom";
 import Leaderboard from "../components/leaderboard";
import CompanyList from "../components/companyList";
import Company from "../components/company";
import ProfilePage from "../components/profilepage";
import News from "../components/news";
import LandingPage from "../components/Landingpage";
import LandingLoader from '../components/landingLoader';

class CustomerRoutes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/landing" component={LandingLoader} />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route exact path="/market" component={CompanyList} />
          <Route  path="/company/:id" component={Company} />
          <Route exact path="/dashboard" component={ProfilePage} />
          <Route exact path="/news" component={News} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default CustomerRoutes;
