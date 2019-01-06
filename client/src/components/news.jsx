import React, { Component } from 'react';

class News extends Component{
  constructor(props) {
    super(props);
    this.state{
      news_list:[]
      news:{}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get(url + '/news_list', { withCredentials: true })
      .then(response => {
        response.json()
        console.log(response);
      })
      .then((news_list) => { this.setState({ news_list }); });
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

  },
  handleSubmit:function(){
    console.log(this.refs.Item);
    axios.get(url + '/newsDetail/' + this.refs.Item.value, { withCredentials: true })
    .then(response => {
      response.json()
      console.log(response);
    })
    .then((news) => { this.setState({ news }); });
  }
}


export default News;
