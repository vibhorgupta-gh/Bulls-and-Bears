import React, { Component } from 'react';
import axios from "axios";
import { url } from "../config";
import ScriptTag from 'react-script-tag';
import NavBar from "./navbar";

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
        axios.get(url + '/company_list', {
            withCredentials : true
        }).then(data => {
            console.log(data.data);
            self.setState({
                list : data.data
            })         
        })       
    }

    render() {
        return (

        );
      }
    }
    

export default CompanyList;