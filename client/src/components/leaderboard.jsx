import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state{
      list:[]
    };
  }
  componentDidMount() {
    axios.get(url + '/leaderboard')
      .then(response => {
        response.json()
        console.log(response);
      })
      .then((list) => { this.setState({ list }); });
  }
  render() {
    return(
<div>
      <h1>LeaderBoard goes here!</h1>
      <p>{this.state.list}</p>
</div>
    );

  }
}

export default LeaderBoard;
