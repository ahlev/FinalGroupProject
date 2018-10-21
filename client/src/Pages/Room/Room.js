import React, { Component } from "react";
import Row from '../../Row';
import SongChoices from '../../SongChoices';
import ChatBox from '../../ChatBox';
import Container from '../../Container';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class Room extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                image: ''
            }
        }
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
      }
    
    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response) => {
                this.setState({
                    nowPlaying: {
                        name: response.item.name,
                        image: response.item.album.images[0].url
                    }
                })
            })
    }

    getUserPlaylists() {
        spotifyWebApi.getUserPlaylists()
            .then((response) =>{
                console.log("Playlists: ", JSON.stringify(response))
            })
    }

    render() {
        return (
            <div>
                <Container className="body-container" fluid="true" style={{ marginTop: 10 }}>
                    <Row>
                    <SongChoices />
                    <ChatBox />
                    </Row>
                </Container>

                {/* TEST RENDERS using song name + image */}
                <div>Now Playing: { this.state.nowPlaying.name } </div>

                <div>
                    <img src={ this.state.nowPlaying.image } style={{width:100}} />
                </div>

                <button onClick={() => this.getUserPlaylists() + this.getNowPlaying()}>
                    Check Now Playing
                </button>

            </div>
                
        );
      }
    }

export default Room;
