import React, { Component } from 'react';
import axios from "axios";
import { url } from "../config";

class Company extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: ['company'],
            symbol: ['$#'],
            description: ['Description lorem gghbfjjgjhggbhgyjbg'],
            availableQuantity: 0,
            sharePrice: 0,
            totalQuantity: 0,
            marketCap: 0,
            history: [{
                timestamp: {
                    type: Date,
                    default: Date.now
                },
                sharePrice: 0,
                availableQuantity: 0

            }]
        }
    };


    render()
    {
        return (

            <div>
                <div className="page-container">
                    <div className="main-content">

                        <div className="page-title-area">
                            <div className="header-area header-bottom">
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-9  d-none d-lg-block">
                                            <div className="horizontal-menu">
                                                <nav>
                                                    <h4 className="page-title pull-left">Company</h4>
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
                                                            <a href="javascript:void(0)">
                                                                <span>Leaderboard</span>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="market">
                                                                <span>Market</span>
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

                        <div className="main-content-inner">
                            <div className="row">
                                <div className="col-lg-4 mt-5">
                                    <div className="card">
                                        <div className="card-body pb-0">
                                            <h2 className="header-title">{this.state.name}</h2>

                                            <button type="button" className="btn btn-rounded btn-primary mb-3">Buy
                                            </button>
                                            <button type="button" className="btn btn-rounded btn-danger mb-3">Sell
                                            </button>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-md-6 mt-5 mb-3">
                                            <div className="card">
                                                <div className="seo-fact sbg1">
                                                    <div
                                                        className="p-4 d-flex justify-content-between align-items-center">
                                                        <div className="seofct-icon"> Stock price</div>
                                                        <h2>{this.state.sharePrice}</h2>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mt-md-5 mb-3">
                                            <div className="card">
                                                <div className="seo-fact sbg2">
                                                    <div
                                                        className="p-4 d-flex justify-content-between align-items-center">
                                                        <div className="seofct-icon"> Stock available</div>
                                                        <h2>{this.state.availableQuantity}</h2>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3 mb-lg-0">
                                            <div className="card">
                                                <div className="seo-fact sbg3">
                                                    <div
                                                        className="p-4 d-flex justify-content-between align-items-center">
                                                        <div className="seofct-icon">Market Cap</div>
                                                        <h2>{this.state.marketCap}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card">
                                                <div className="seo-fact sbg4">
                                                    <div
                                                        className="p-4 d-flex justify-content-between align-items-center">
                                                        <div className="seofct-icon">Total Shares</div>
                                                        <h2>{this.state.totalQuantity}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-8 mt-5">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title">Description</h4>
                                            <p height="233">{this.state.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-4 mt-5">
                                    <div className="card h-full">
                                        <div className="card-body">
                                            <h4 className="header-title">History come here</h4>
                                            {this.state.history}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <footer>
                        <div className="footer-area">
                            <p>© Copyright 2019. All right reserved. <a href="http://ieeedtu.com/">IEEE DTU</a>.</p>
                        </div>
                    </footer>

                </div>
            </div>

        );

    }
}


export default Company;