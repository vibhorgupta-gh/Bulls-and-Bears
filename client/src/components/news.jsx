import React, { Component } from "react";
import axios from "axios";
import { url } from "../config";
import NavBar from "./navbar";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      createdOn: []
    };
  }

  componentDidMount() {
    const self = this;
    axios
      .get(url + "/news_list", {
        withCredentials: true
      })
      .then(data => {
        // console.log(data.data);
        const arr = [...data.data];
        // const dateArr = [] ;r
        // arr.map((el , index) => {
        //     dateArr.push(el.createdOn);
        // });
        arr.sort(function(a, b) {
          var date1 = new Date(a.publishedOn);
          var date2 = new Date(a.publishedOn);
          return date1 < date2;
        });
        // console.log(arr);
        // // console.log(date.slice(0 , 10))

        // dateArr.map( el => {
        //     console.log(el);
        // })
        self.setState({
          list: arr
          // createdOn : dateArr
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div class="body-bg">
        <div class="horizontal-main-wrapper">
          <NavBar />
          <div class="main-content-inner">
            <div class="sales-report-area mt-5 mb-5">
              <div class="row mt-5 mb-5">
                <div class="col-lg-12 spa">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="header-title">News</h4>
                      <div class="timeline-area">
                        {this.state.list.map((el, index) => {
                          const date = el.publishedOn;

                          const t = new Date(date);

                          const a = JSON.stringify(t);
                          console.log(a);
                          const time = a.slice(16, 20);
                          //console.log(el);
                          // const haha = a.slice(1 ,10);
                          // const total = time + ' ' +haha ;
                          // console.log(total);
                          return (
                            <div class="timeline-task">
                              <div class="icon bg1">
                                <i class="fa fa-newspaper-o" />
                              </div>
                              <div class="tm-title">
                                <h4>{el.newsText}</h4>
                                <span class="time">
                                  <i class="ti-time" />
                                  {time}
                                </span>
                              </div>
                              <p>
                               {el.description || ""}
                              </p>
                            </div>
                          );
                        })}
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

export default News;
