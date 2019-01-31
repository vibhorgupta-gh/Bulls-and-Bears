import React, { Component } from "react";
import { url } from "../config";

class LandingPage extends Component {
  render() {
    return (
        <div class="login-area login-bg">
          <div class="container">
            <div class="login-box ptb--100">
              <form>
                <div class="login-form-head">
                  <h4>BULLS AND BEARS</h4>
                  <p>
                    Hello there, Sign in and start managing your Admin Template
                  </p>

                  <div class="submit-btn-area">

                    <div class="login-other row mt-4">
                      <div class="col-6">
                        <a class="fb-login" href={url + "/auth/facebook"}>
                          Log in with <i class="fa fa-facebook" />
                        </a>
                      </div>
                      <div class="col-6">
                        <a class="google-login" href={url + "/auth/google"}>
                          Log in with <i class="fa fa-google" />
                        </a>
                    </div>
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default LandingPage;
