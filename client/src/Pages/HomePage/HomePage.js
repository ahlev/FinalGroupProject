import React, { Component } from "react";
import Container from "../../Components/Container";
import Row from "../../Components/Row";
import Col from "../../Components/Col";
import Button from "../../Components/Button";
import Modal from "react-responsive-modal";
import Jumbotron from "../../Components/Jumbotron";
import axios from 'axios';
import querystring from 'querystring';
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var state = generateRandomString(16);
var client_id = 'a8860cd039fd43b9809a7bca7c35fa54';
var scope = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-modify-public streaming';
const stringUrl = querystring.stringify({
  response_type: 'code',
  client_id: client_id,
  scope: scope,
  redirect_uri: "https://localhost:3000/room",
  state: state
})

class HomePage extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  loginGetRequest = () => {
    console.log("This button works")
    axios.get('/login', () => {
      console.log("Doing its thing")
    }
    )
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <Jumbotron />
        <div>
          <Container
            className="body-container"
            fluid="true"
            style={{ marginTop: 10 }}
          >
            <Row>
              <Col size="md-5">
                <div className="action-panel">
                  <Button onClick={this.onOpenModal} center>
                    Launch a room
                  </Button>
                  <h5>Create a room in seconds</h5>
                  <ul>
                    <li>#1) Pick a room name + a Spotify playlist</li>
                    <li>#2) Share a unique link with friends or customers</li>
                    <li>#3) Let the people vote and bask in social music</li>
                  </ul>
                </div>
              </Col>

              <Col size="md-1" />

              <Col size="md-6">
                <div className="info-panel">
                  <h4 class="featurette-heading">
                    Listen together. Vote on the next song. Give every listener
                    a voice.
                  </h4>
                  <p class="lead">
                    Take your listening to the next level. Let the group or
                    crowd easily participate in shaping your playlist. Throw a
                    better party, please your customers or have more fun in the
                    car with your friends.
                  </p>
                </div>
              </Col>
            </Row>

            <Row>
              <Modal open={open} onClose={this.onCloseModal} center>
                {/* Try to make this a component. It uses react-responsive-modal */}
                <br />
                <h5>Create your room</h5>
                <form className="mainForm">
                  <div className="logo-transparent" />

                  <p className="form-brand-name">SoundUp</p>
                  {/* *** this form should be component*/}
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="room-name"
                      aria-describedby="room-name"
                      placeholder="Name your room"
                      required
                    />
                  </div>
                  <br />
                </form>

                {/* This a href is being used in dev mode to redirect to the auth-server for Spotify login *** */}
                {/* Basically, it redirects to that other app (server) and then should bounce back to the react app with an access key */}
              
                  <Button onClick={this.loginGetRequest}>Start with Spotify</Button>
              
              </Modal>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default HomePage;
