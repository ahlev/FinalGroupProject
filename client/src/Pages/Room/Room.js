import React, { Component } from "react";
import Row from "../../Components/Row";
import PlaylistChoices from "../../Components/PlaylistChoices"
import SongChoices from "../../Components/SongChoices";
import Container from "../../Components/Container";
import Spotify from "spotify-web-api-js";
import OptionsPanel from "../../Components/OptionsPanel";
import NowPlaying from "../../Components/NowPlaying";
import Button from "../../Components/Button";
import axios from "axios";


const spotifyWebApi = new Spotify();

class Room extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      sessionName: '',

      userPlaylists: [],
      activePlaylist: '05V9ZNCIMJfDhmYY6KhfUu',
      activePlaylistTracks: [],
      voteOptions: [],

      nowPlaying: {
        name: "",
        image: ''
      },

      user: {
        spotify_id: '',
        db_id: ''
      },
    };

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
  }

  checkState() {
    console.log(this.state)
  }

  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  // Function to query the API and return currently-playing data for authenticated user
  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then(response => {
      console.log("Now playing: ", response)
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      });
    });
  }

  // Function to query the API and return playlists data for authenticated user
  getUserPlaylists() {
    spotifyWebApi.getUserPlaylists().then(response => {
      this.setState({
        userPlaylists: response.items
        // user: {
        //   spotify_id : response.spotify_id //this may not exactly be coming from the response or be the right name
        // }
      });
      console.log("Playlists returned: ", response)

      //TODO: in this function we are gonna set the state of state.
      // console.log("SET TO STATE: ",this.setState.userPlaylists);
    });
    console.log(this.state)
  }

  // Function to query the Spotify API and return the tracks for a given playlist ID (activePlaylist // currently hardCoded due to DB issues)
  getPlaylistTracks() {
    var activePlaylist = this.state.activePlaylist;
    var spotify_id = this.state.spotify_id;
    spotifyWebApi.getPlaylistTracks(spotify_id, activePlaylist).then(response => {
      this.setState({
        activePlaylistTracks: response.items
      })
      console.log("Tracks returned: ", response)
    })
  }

  // Function to set the spotify_id (returned from authentication) to the active state as a property of user
  setActiveUser() {
    // Get the authenticated user
      spotifyWebApi.getMe().then(response => {
        this.setState({
          user: {
            spotify_id: response.id
          }
        })
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  }

  // Function to query the Spotify API for tracks when a playlist is clicked
    // then use that id to query the tracks on the playlist
     // THEN 
  setActivePlaylistDetails() {
    console.log("Clicked on playlist");
    var activePlaylist = this.state.activePlaylist;
    const spotify_id = this.state.spotify_id;

    spotifyWebApi.getPlaylistTracks(spotify_id, activePlaylist).then(response => {
      this.setState({
        activePlaylistTracks: response.items
      })
      console.log("Tracks returned: ", response)
    })
    // .then() WRITE CODE FOR RANDOMLY PICKING 5 and SETTING TO VOTE OPTIONS ***
  }

  
   // Function to run POST request and create a Session (in MongoDB)
   createNewSession() {
    return axios.post('/session', {
      spotify_id: this.state.user.spotify_id,
      sessionName: this.state.sessionName,
      current_playlist_id : "" 
    })
    .then( res => {
     //  if (err) {
     //     console.log(err)
     //  } else {
        // this.setState({
        //   sessionName : response.sessionName
        // })
        console.log("response from POSTING new Session: ", res)
        //this.getUserPlaylists();
     //  }
    }).catch(err => console.log("from room.js...", err)) //FIRING AHHHHHH
}

  componentDidMount() {
    this.getUserPlaylists();
    this.setActiveUser();
    this.getNowPlaying();
    // this.loadRoomHistory(); *** DB
  }

  render() {
    return (
      <div>
      
        <NowPlaying
          name={this.state.nowPlaying.name}
          artist={this.state.nowPlaying.artist}
          src={this.state.nowPlaying.image}
          style={{ width: 50 }}
        />

          {/* <Button onClick={() => this.createNewSession() + this.getUserPlaylists() + this.setActiveUser()} className="api-check-btn">
          Check My Music
        </Button> */}

        <Container
          className="body-container"
          fluid="true"
          style={{ marginTop: 20 }}
        >
          <Row>
            <OptionsPanel size="md-12" name="Pick Your Master Playlist">
              {this.state.userPlaylists.map(playlist => {
                return (
                  
                  <PlaylistChoices onClick={() => this.setActivePlaylistDetails() + this.createNewSession() + this.checkState()}

                    key={playlist.id}
                    name={playlist.name}
                    setActive={this.setActivePlaylistDetails}
                    id={playlist.id}
                    // onClick={this.getPlaylistSongs}
                    // image = {playlist.images[2].url}
                  />
                );
              })}
            </OptionsPanel>

            <OptionsPanel size="md-12" name="Vote Options for Next Song">
              {this.state.activePlaylistTracks.map(track => {
                return (
                  <SongChoices
                    key={track.track.id}
                    name={track.track.name}
                    artist={track.track.artists[0].name}
                    id={track.id}
                  />
                );
              })}
            </OptionsPanel>

          
          </Row>
        </Container>
      </div>
    );
  }
}

export default Room;
