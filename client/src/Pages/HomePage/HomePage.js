import React, { Component } from "react";
import Container from "../../Container";
import Row from "../../Row";
import Col from "../../Col";
import Button from "../../Button";
import Modal from "react-responsive-modal";
import Jumbotron from "../../Jumbotron";

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
                      aria-describedby="emailHelp"
                      placeholder="Name your room"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      id="room-password"
                      placeholder="Room password (optional)"
                    />
                  </div>
                  <br />
                </form>
              </Modal>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default HomePage;
