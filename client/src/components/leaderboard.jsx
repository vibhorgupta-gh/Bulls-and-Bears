import React, { Component } from "react";

class LeaderBoard extends Component {
  constructor{
    super();
    this.state{
      list:[]
    };
  }
  componentDidMount() {
    fetch('/leaderboard')
      .then(response => response.json())
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
