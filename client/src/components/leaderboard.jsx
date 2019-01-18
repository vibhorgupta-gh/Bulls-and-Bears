import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state={
      list:[],
      balances:[],
      rank:1
    };
  }

  componentDidMount() {
    var self = this;
    var s=[];
    var d=[];
    var r=0;
    axios.get(url + '/leaderboard')
      .then(response => {
         console.log(typeof(response.data[0].facebook.name))
         for(var i=0;i<response.data.length;i++){
            d.push(response.data[i].accountBalance);
          }
          d.sort(function(a, b){return b - a});
          console.log(d);
         console.log(response.data[0]);
         axios.get(url+'/getcurrentuser',{
           withCredentials: true
         }).then(data => {
         for(var i=0;i<d.length;i++){
           for(var j=0;j<response.data.length;j++){
             if(response.data[j].accountBalance===d[i]){
               s.push(response.data[j].facebook.name);
               break;
             }
           }if(data.data.accountBalance===d[i]){
             r=i+1;
           }
          }
         })
         self.setState({
           list : s,
           balances : d,
           rank :r
         });
   })
}
  render() {
    return(
      <div>
         <div class="main-content">

            <div class="header-area">
                <div class="row align-items-center">

                        <div class="search-box pull-left">

                            <h1 styles="font-style:verdana;margin-left:100%">Leaderboard</h1>
                        </div>

                    <div class="col-md-12 col-sm-4 clearfix">
                        <ul class="notification-area pull-right">

                            <li id="full-view-exit"><i class="ti-zoom-out"></i></li>
                            <li class="dropdown">
                                <i class="ti-bell dropdown-toggle" data-toggle="dropdown">
                                    <span>2</span>
                                </i>
                                <div class="dropdown-menu bell-notify-box notify-box">
                                    <span class="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                                    <div class="nofity-list">
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-comments-smiley btn-info"></i></div>
                                            <div class="notify-text">
                                                <p>New Commetns On Post</p>
                                                <span>30 Seconds ago</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-primary"></i></div>
                                            <div class="notify-text">
                                                <p>Some special like you</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-comments-smiley btn-info"></i></div>
                                            <div class="notify-text">
                                                <p>New Commetns On Post</p>
                                                <span>30 Seconds ago</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-primary"></i></div>
                                            <div class="notify-text">
                                                <p>Some special like you</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                                                  </ul>
                    </div>
                </div>
            </div>

            <div class="page-title-area">
                <div class="row align-items-center">
                    <div class="col-sm-6">
                        <div class="breadcrumbs-area clearfix">
                            <h4 class="page-title pull-left">Your rank : {this.state.rank}</h4>

                              <div class="container">
                                <div class="row align-items-center">
                                  <div class="col-lg-12  d-none d-lg-block">
                                    <div class="horizontal-menu">
                                      <nav>
                                        <ul id="nav_menu">
                                          <li>
                                            <a href="dashboard">
                                              <i class="ti-dashboard" />
                                              <span>Dashboard</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="news">
                                              <span>News</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="leaderboard">
                                              <span>Leaderboard</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </nav>
                                    </div>
                                  </div>
                                  <div class="col-12 d-block d-lg-none">
                                    <div id="mobile_menu" />
                                  </div>
                                </div>
                              </div>

                        </div>
                    </div>
                    <div class="col-sm-6 clearfix">
                        <div class="user-profile pull-right">
                            <img class="avatar user-thumb" src="assets/images/author/avatar.png" alt="avatar"/>
                            <h4 class="user-name dropdown-toggle" data-toggle="dropdown">Kumkum Rai <i class="fa fa-angle-down"></i></h4>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Message</a>
                                <a class="dropdown-item" href="#">Settings</a>
                                <a class="dropdown-item" href="#">Log Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-content-inner">
                <div class="row">

                    <div class="col-lg-12 mt-5" >

                        <div class="card" >
                            <div class="card-body" >
                                <h4 class="header-title">Leaderboard</h4>
                                <div class="single-table" styles="width:106px">
                                    <div class="table-responsive">
                                        <table class="table text-dark text-center">
                                            <thead class="text-uppercase">
                                                <tr class="table-active">
                                                    <th scope="col">Rank</th>
                                                    <th scope="col">Author</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Worth</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-primary">
                                                    <th scope="row">1</th>
                                                    <td>Mark</td>
                                                    <td>{this.state.list[0]}</td>
                                                    <td>{this.state.balances[0]}</td>

                                                </tr>
                                                <tr class="bg-secondary">

                                                    <th scope="row">2</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[1]}</td>
                                                    <td>{this.state.balances[1]}</td>

                                                </tr>
                                                <tr class="bg-success">
                                                    <th scope="row">3</th>
                                                    <td>Mark</td>
                                                    <td>{this.state.list[2]}</td>
                                                    <td>{this.state.balances[2]}</td>

                                                </tr>
                                                <tr class="bg-danger">
                                                    <th scope="row">4</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[3]}</td>
                                                    <td>{this.state.balances[3]}</td>

                                                </tr>
                                                <tr class="bg-warning">
                                                    <th scope="row">5</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[4]}</td>
                                                    <td>{this.state.balances[4]}</td>

                                                </tr>
                                                <tr class="bg-info">
                                                    <th scope="row">6</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[5]}</td>
                                                    <td>{this.state.balances[5]}</td>

                                                </tr>
                                                <tr class="bg-light">
                                                    <th scope="row">7</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[6]}</td>
                                                    <td>{this.state.balances[6]}</td>

                                                </tr>
                                                <tr class="bg-dark text-white">
                                                    <th scope="row">8</th>
                                                    <td>jone</td>
                                                    <td>{this.state.list[7]}</td>
                                                    <td>{this.state.balances[7]}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                            </div>
                        </div>
                      </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    );

  }
}

export default LeaderBoard;
