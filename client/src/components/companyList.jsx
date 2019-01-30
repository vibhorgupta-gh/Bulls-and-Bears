import React, { Component } from 'react';
import axios from "axios";
import { url } from "../config";

class CompanyList extends Component{
    constructor(props) {
        super(props);
        this.state = {
          list : [] ,
          image: null 
        };
      }


    componentDidMount() {
        var self = this;
        var n=[];
        var s=[];
        axios.get(url + '/company_list', {
            withCredentials : true
        }).then(data => {
            console.log(data.data);
            self.setState({
                list : data.data
            })         
        })       
    }

    render()
    {
        return (

            <div>
                <div className="main-content">

                    <div className="header-area">
                        <div className="row align-items-center">

                            <div className="search-box pull-left">

                                <h1 styles="font-style:verdana;margin-left:100%">Leaderboard</h1>
                            </div>

                            <div className="col-md-12 col-sm-4 clearfix">
                                <ul className="notification-area pull-right">

                                    <li id="full-view-exit"><i className="ti-zoom-out"></i></li>
                                    <li className="dropdown">
                                        <i className="ti-bell dropdown-toggle" data-toggle="dropdown">
                                            <span>2</span>
                                        </i>
                                        <div className="dropdown-menu bell-notify-box notify-box">
                                            <span className="notify-title">You have 3 new notifications <a href="#">view all</a></span>
                                            <div className="nofity-list">
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i className="ti-key btn-danger"></i>
                                                    </div>
                                                    <div className="notify-text">
                                                        <p>You have Changed Your Password</p>
                                                        <span>Just Now</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i
                                                        className="ti-comments-smiley btn-info"></i></div>
                                                    <div className="notify-text">
                                                        <p>New Commetns On Post</p>
                                                        <span>30 Seconds ago</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i className="ti-key btn-primary"></i>
                                                    </div>
                                                    <div className="notify-text">
                                                        <p>Some special like you</p>
                                                        <span>Just Now</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i
                                                        className="ti-comments-smiley btn-info"></i></div>
                                                    <div className="notify-text">
                                                        <p>New Commetns On Post</p>
                                                        <span>30 Seconds ago</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i className="ti-key btn-primary"></i>
                                                    </div>
                                                    <div className="notify-text">
                                                        <p>Some special like you</p>
                                                        <span>Just Now</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i className="ti-key btn-danger"></i>
                                                    </div>
                                                    <div className="notify-text">
                                                        <p>You have Changed Your Password</p>
                                                        <span>Just Now</span>
                                                    </div>
                                                </a>
                                                <a href="#" className="notify-item">
                                                    <div className="notify-thumb"><i className="ti-key btn-danger"></i>
                                                    </div>
                                                    <div className="notify-text">
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

                    <div className="page-title-area">
                        <div className="row align-items-center">
                            <div className="col-sm-6">
                                <div className="breadcrumbs-area clearfix">
                                    <h4 className="page-title pull-left">Your rank : {this.state.rank}</h4>

                                    <div className="container">
                                        <div className="row align-items-center">
                                            <div className="col-lg-12  d-none d-lg-block">
                                                <div className="horizontal-menu">
                                                    <nav>
                                                        <ul id="nav_menu">
                                                            <li>
                                                                <a href="dashboard">
                                                                    <i className="ti-dashboard"/>
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
                                            <div className="col-12 d-block d-lg-none">
                                                <div id="mobile_menu"/>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-sm-6 clearfix">
                                <div className="user-profile pull-right">
                                    <img className="avatar user-thumb" src="assets/images/author/avatar.png"
                                         alt="avatar"/>
                                    <h4 className="user-name dropdown-toggle" data-toggle="dropdown">Kumkum Rai <i
                                        className="fa fa-angle-down"></i></h4>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">Message</a>
                                        <a className="dropdown-item" href="#">Settings</a>
                                        <a className="dropdown-item" href="#">Log Out</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-content-inner">
                        <div className="row">

                            <div className="col-lg-12 mt-5">

                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="header-title">Leaderboard</h4>
                                        <div className="single-table" styles="width:106px">
                                            <div className="table-responsive">
                                                <table className="table text-dark text-center">
                                                    <thead className="text-uppercase">
                                                    <tr className="table-active">
                                                        <th scope="col">Rank</th>
                                                        <th scope="col">Author</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Worth</th>

                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr className="bg-primary">
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>{this.state.list[0]}</td>
                                                        <td>{this.state.balances[0]}</td>

                                                    </tr>
                                                    <tr className="bg-secondary">

                                                        <th scope="row">2</th>
                                                        <td>jone</td>
                                                        <td>{this.state.list[1]}</td>
                                                        <td>{this.state.balances[1]}</td>

                                                    </tr>
                                                    <tr className="bg-success">
                                                        <th scope="row">3</th>
                                                        <td>Mark</td>
                                                        <td>{this.state.list[2]}</td>
                                                        <td>{this.state.balances[2]}</td>

                                                    </tr>
                                                    <tr className="bg-danger">
                                                        <th scope="row">4</th>
                                                        <td>jone</td>
                                                        <td>{this.state.list[3]}</td>
                                                        <td>{this.state.balances[3]}</td>

                                                    </tr>
                                                    <tr className="bg-warning">
                                                        <th scope="row">5</th>
                                                        <td>jone</td>
                                                        <td>{this.state.list[4]}</td>
                                                        <td>{this.state.balances[4]}</td>

                                                    </tr>
                                                    <tr className="bg-info">
                                                        <th scope="row">6</th>
                                                        <td>jone</td>
                                                        <td>{this.state.list[5]}</td>
                                                        <td>{this.state.balances[5]}</td>

                                                    </tr>
                                                    <tr className="bg-light">
                                                        <th scope="row">7</th>
                                                        <td>jone</td>
                                                        <td>{this.state.list[6]}</td>
                                                        <td>{this.state.balances[6]}</td>

                                                    </tr>
                                                    <tr className="bg-dark text-white">
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


export default CompanyList;