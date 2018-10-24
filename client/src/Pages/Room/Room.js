import React, { Component } from "react";
import Row from '../../Row';
import SongChoices from '../../SongChoices';
import ChatBox from '../../ChatBox';
import Container from '../../Container';
import Spotify from 'spotify-web-api-js';
import Col from '../../Col';
import OptionsPanel from '../../OptionsPanel';
import NowPlaying from '../../NowPlaying';
import Button from '../../Button';

const spotifyWebApi = new Spotify();

class Room extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,

            userPlaylists: [],
            activePlaylist: [],
            voteOptions: [],

            nowPlaying: {
                name: '',
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
                this.setState({
                    userPlaylists: response.items
                    }
                )
                console.log("State userPlaylists: ", (this.state.userPlaylists))
                // console.log("SET TO STATE: ",this.setState.userPlaylists);
            })
    }

    // USE THE ID ON THE MAPPED SONGCHOICES... WHEN ONE IS CLICKED, GET ITS SONGS
    // getPlaylistSongs(id) {

    //     .then((response) => {
    //         this.setState({
    //             chosenPlaylistSongs: response.items
    //         })
    //     })
    // }

    setActive() {
        console.log("Clicked on playlist")
        // this.setState({
        //     activePlaylist: this.state.activePlaylist.id;
        // })
        
    }

    render() {
        return (
            <div>
                <Button onClick={() => 
                    this.getUserPlaylists() + 
                    this.getNowPlaying()
                    }>
                    Check My Music
                </Button>

                <NowPlaying 
                    name= {this.state.nowPlaying.name}
                    src= {this.state.nowPlaying.image}
                    style={{width:100}} 
                    />
            
                <Container className="body-container" fluid="true" style={{ marginTop: 10 }}>
                    <Row>
                        <OptionsPanel size="md-12" name="Pick Your Master Playlist">
                            {this.state.userPlaylists.map(playlist => {
                                return(
                                    <SongChoices
                                        key = {playlist.id}
                                        name = {playlist.name}
                                        setActive = {this.setActive}
                                        id = {playlist.id}
                                        onClick={this.getPlaylistSongs}
                                        // image = {playlist.images[2].url}
                                        >
                                            </SongChoices>
                                        );
                                    })
                                }
                            </OptionsPanel>

                            <OptionsPanel size="md-12" name="VOTE FOR THE NEXT SONG">
                            {this.state.activePlaylist.map(song => {
                                return(
                                    <SongChoices
                                        key = {song.id}
                                        name = {song.name}
                                        id = {song.id}
                                        image = {song.images[2].url}
                                        >
                                     </SongChoices>
                                        );
                                    })
                                }
                            </OptionsPanel>

                    <ChatBox />
                    </Row>
                </Container>

            </div>
                
        );
      }
    }

export default Room;
