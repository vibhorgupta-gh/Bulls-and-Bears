import React, { Component } from 'react';
import axios from "axios";
import { url } from "../config";

class News extends Component{
  constructor(props) {
    super(props);
    this.state={
      news_list:[],
      news:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var s=[];
    axios.get(url + '/news_list')
      .then(response => {
        //console.log(typeof(response.data[0].newsText))
        for(var i=0;i<response.data.length;i++){
           s.push(response.data[i].newsText);
         }
        //console.log(response.data[0]);
        this.setState({
          news_list : s
        });
         //console.log(typeof(response.data[0].newsText))
        //console.log(response);

      })

  }
  render() {
    return(
      <div>
         <h1>News list goes here!</h1>
         <p>{this.state.news_list}</p>
         <form id="add_id" onSubmit={this.handleSubmit}>
           <input type="text" required ref="Item" />
           <input type="submit" value="hit me" />
         </form>
         <p>{this.state.news}</p>
      </div>
    );

  }
  handleSubmit=function(){
    var s=[];
    console.log(this.refs.Item);
    axios.get(url + '/newsDetail/' + this.refs.Item.value, { withCredentials: true })
    .then(response => {

    //  console.log(typeof(response.data[0].newsText))
      for(var i=0;i<response.data.length;i++){
         s.push(response.data[i].newsText);
       }
      console.log(response);
      this.setState({
        news : s
      });
    })

  }
}


export default News;
