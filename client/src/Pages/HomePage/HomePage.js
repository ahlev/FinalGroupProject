import React, { Component } from "react";
import Container from "../../Components/Container";
import Row from "../../Components/Row";
import Col from "../../Components/Col";
import Button from "../../Components/Button";
import Modal from "react-responsive-modal";
import Jumbotron from "../../Components/Jumbotron";

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
                <a href="http://localhost:8888">
                  <Button onClick={this.onOpenModal} center>
                    Launch a room
                  </Button>
                  </a>
                  <h5>Create a room in seconds</h5>
                  <ul>
                    <li>#1) Login with your Spotify account</li>
                    <li>#2) Name your room and choose a master playlist</li>
                    <li>#3) Share your room & let the people vote on the next song</li>
                  </ul>
                </div>
              </Col>

              <Col size="md-1"></Col>

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
          </Container>
        </div>
      </div>
    );
  }
}

export default HomePage;
