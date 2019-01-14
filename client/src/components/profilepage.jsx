import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      loan: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get(url + "/getcurrentuser", {
        withCredentials: true
      })
      .then(data => {
        console.log(data.data);
        self.setState({
          loan: data.data.loan.amount
        });
      });
  }
  takeLoan() {
    console.log(this.state.amount);
    var self = this;
    axios
      .post(
        url + "/take_loan",
        {
          amount: self.state.amount
        },
        {
          withCredentials: true
        }
      )
      .then(data => {
        console.log(data.data);
        this.setState({
          loan: data.data.Customer.loan.amount
        });
      });
  }
  handleChange(e) {
    console.log("k", e.target.value);
    this.setState({
      amount: isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)
    });
  }
  render() {
    return (
      <div>
        <h1> Loan is {this.state.loan} </h1>
        <input
          value={this.state.amount}
          type="number"
          step="100"
          onChange={this.handleChange}
        />
        <button onClick={() => this.takeLoan()}> Take Loan </button>{" "}
      </div>
    );
  }
}

export default Profile;
