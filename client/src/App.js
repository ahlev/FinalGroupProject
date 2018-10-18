// Import React
import React, { Component } from "react";
// import Navbar from '../src/Navbar'
// Import Container component.
import Container from "./Container";
// Import Row component.
import Row from "./Row";
// Import Col component.
import Col from "./Col";
// Import navbar
import Navbar from "./Navbar";
// import NavigationBar from "../src/NavigationBar";
import Button from "./Button";
// Import Modal***
import Modal from "react-responsive-modal";
// Import Jumbotron component.
import Jumbotron from './Jumbotron';
// Import SearchForm component.
import LoginForm from './LoginForm'

import ChatBox from './ChatBox'

// Import ResultsList component. ***
import SongChoices from './SongChoices'

// Import Footer component.
import Footer from './Footer'
import './App.css';


// // Still need to import API (?)



class App extends Component {
    
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
        const {open} = this.state

        return (
            <div>
                <Navbar />
                {/* Index view */}
                <Jumbotron />
                <div>
                <Container className="body-container" fluid="true" style={{ marginTop:10 }}>
                    <Row>
                        <Col size="md-5">
                        <div className="action-panel">
                            <Button onClick={this.onOpenModal} center>Launch a room</Button>
                            <h5>Create a room in seconds</h5>
                            <ul>
                                <li>#1) Pick a room name + a Spotify playlist</li>
                                <li>#2) Share a unique link with friends or customers</li>
                                <li>#3) Let the people vote & bask in social music</li>
                            </ul>
                            </div>
                        </Col>
                       

                        <Col size="md-1" />
                            
                        <Col size="md-6">
                        <div className="info-panel">
                            <h4 class="featurette-heading">Listen together. Vote on the next song. Give every listener a voice.</h4>
                            <p class="lead">Take your listening to the next level. Let the group or crowd easily participate in shaping your playlist. Throw a better party, please your customers or have more fun in the car with your friends.</p>
                        </div>
                        </Col>
                    </Row>

                    <Row>
                        <Modal open={open} onClose={this.onCloseModal} center>

                        {/* Try to make this a component. It uses react-responsive-modal */}
                        <br >
                        </br><h5>Create your room</h5>
                        <form className ="mainForm">
                        <div className="logo-transparent" />

                            <p className="form-brand-name">SoundUp</p>
                            {/* *** this form should be component*/}
                                <div className="form-group">
                                    <input type="text" className="form-control" id="room-name" aria-describedby="emailHelp" placeholder="Name your room" required />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="room-password" placeholder="Room password (optional)" />
                                </div>
                                <br />
                            
                                {/* THIS BUTTON *** should be the onClick facilitator for 
                                connecting to spotify API for login, and ultimately picking a playlist.

                                Once a playlist is chosen, that returned object should be used to 
                                populate (.map) <Song>s in a <Playlist>* - need to make a player somehow -
                                
                                Then we'll randomize vote options (5) from that same object and sync them to socket.io activity.
                                The ID of the winning song will be used to queue it as "next up" (via Spotify API)
                                and reset the random voting options function. 
                                (which has socket.io session data and accesses Spotify playlist)*/}

                                 <Button onClick={this.onOpenModal}> 
                                Select Playlist
                            </Button>
                            
                        </form>

                        </Modal>
                    </Row>
                </Container>


             {/* Room view (rough placeholders)*/}
                <Container className="body-container" fluid="true" style={{ marginTop:10 }}>
                    <Row>
                        <SongChoices />
                        <ChatBox />
                    </Row>
                </Container>
            </div>
            <Footer />
        </div>
        );
    }
    }

    export default App;
