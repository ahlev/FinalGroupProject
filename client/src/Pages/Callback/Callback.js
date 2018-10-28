import React, { Component } from 'react';

class Callback extends Component {

    render() {
        return(
            <div class="container">
            <div id="login">
              <h1>Authenticate with Spotify to select your master playlist</h1>
              <a href="/login" class="btn btn-primary">Log in with Spotify</a> 
            </div>
            <div id="loggedin">
              <div id="user-profile">
              </div>
              <div id="oauth">
              </div>
              <button class="btn btn-default" id="obtain-new-token">Obtain new token using the refresh token</button>
            </div>
          </div>
        )
    }
}

export default Callback;