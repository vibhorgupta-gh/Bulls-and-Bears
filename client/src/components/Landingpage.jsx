import React, { Component } from "react";
import { url } from "../config";

class LandingPage extends Component {
  render() {
    return (
      <h1>
        <a href={url + "/auth/facebook"}>LOGIN FB</a>
        <br />
        <a href={url + "/auth/google"}>LOGIN GOOGLE</a>
      </h1>
    );
  }
}

export default LandingPage;
