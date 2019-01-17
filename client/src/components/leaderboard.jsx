import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[]
    };
  }

  componentDidMount() {
    var self = this;
    var s=[];
    axios.get(url + '/leaderboard')
      .then(response => {
         console.log(typeof(response.data[0].facebook.name))
         for(var i=0;i<response.data.length;i++){
            s.push(response.data[i].facebook.name);
          }
         console.log(response.data[0]);
         self.setState({
           list : s
         });
   })
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
