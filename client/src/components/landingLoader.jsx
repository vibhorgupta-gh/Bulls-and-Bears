import React, { Component } from "react";
import { url } from "../config";

class LandingPage extends Component {
 
    render() {
        return (
            <body className="black ">
                <div className="slideLogo">
                    <img id="imgB" src="/assets/images/icon/bnb-white.png" alt="logo" />
                    {/* <img id="leftImg" src="/assets/images/icon/bnb-white-left.png" alt="logo" />
                    <img id="rightImg" src="/assets/images/icon/bnb-white-right.png" alt="logo" /> */}
                </div>

                <div id="myProgress">
                    <div id="myBar">
                        <a href='http://localhost:3000/dashboard'>Click Here</a>
                    </div>
                </div>
            </body>
            );
    }
}

export default LandingPage;
