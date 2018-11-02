import React, { Component } from "react";
import Row from "../../Components/Row";
import PlaylistChoices from "../../Components/PlaylistChoices"
import SongChoices from "../../Components/SongChoices";
import Container from "../../Components/Container";
import Spotify from "spotify-web-api-js";
import OptionsPanel from "../../Components/OptionsPanel";
import NowPlaying from "../../Components/NowPlaying";
import Button from "../../Components/Button";
import Modal from 'react-responsive-modal';
import axios from "axios";
import "./Room.css";


var shuffledTracks = [];
var voteOptions = [];

const spotifyWebApi = new Spotify();

class Room extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      sessionName: '',

      open: true,

      userPlaylists: [],
      activePlaylist: '05V9ZNCIMJfDhmYY6KhfUu',
      activePlaylistTracks: [],
      shuffledPlaylistTracks: [],
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({sessionName: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.sessionName);
    // event.preventDefault();
  }

  checkState() {
    console.log(this.state)
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  

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
      console.log("NOW PLAYING DATA: " , response)
      console.log("Now playing: ", response)
      if ( response ) {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      });
    }
    })
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
 
  }



  // Function to query the Spotify API and return the tracks for a given playlist ID (activePlaylist // currently hardCoded due to DB issues)
  getPlaylistTracks() {
    var activePlaylist = this.state.activePlaylist;
    var spotify_id = this.state.spotify_id;
    spotifyWebApi.getPlaylistTracks(spotify_id, activePlaylist).then(response => {
      let songChoices = response.items; // *****
      this.setState({
        activePlaylistTracks: response.items,
      })
   
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

// generateRoomUrl = () => {
//   roomURL = "https://localhost:3000/" + this.state.spotify_id + "/" + this.state.activePlaylist + "/";
//   this.setState({
//     roomURL: roomURL
//   })
// }

  
getRandom = (arr, n) => {
    var voteOptions = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        voteOptions[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    // return result;
    
    this.setState({voteOptions: voteOptions})
    console.log("randomized songs!", voteOptions)
}

  // Function to query the Spotify API for tracks when a playlist is clicked
    // then use that id to query the tracks on the playlist
     // THEN 
  setActivePlaylistDetails() {
    var activePlaylist = this.state.activePlaylist;
    const spotify_id = this.state.spotify_id;
    var activePlaylistTracks = this.state.activePlaylistTracks
    console.log("Clicked on playlist")
    // WRITE CODE TO START THIS PLAYLIST PLAYBACK (RANDOM?)
    
    // spotifyWebApi.play(activePlaylist).then(

    spotifyWebApi.getPlaylistTracks(spotify_id, activePlaylist).then(response => {
      this.setState({
        activePlaylistTracks: response.items
      })
      console.log("Tracks returned: ", response)
      // .then(getRandom(this.state.activePlaylistTracks, 3000))
    })
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
    this.getNowPlaying()

    // this.loadRoomHistory(); *** DB
  }

  render() {
    const { open } = this.state;

    return (
      <div>
      <h4 className="sessionName">Current Room:<br /> {this.state.sessionName}</h4>
        <NowPlaying
          name={this.state.nowPlaying.name}
          artist={this.state.nowPlaying.artist}
          src={this.state.nowPlaying.image}
          style={{ width: 50 }}
        />

          {/* <Button onClick={() => this.createNewSession() + this.getUserPlaylists() + this.setActiveUser()} className="api-check-btn">
          Check My Music
        </Button> */}
           <p className="instructions">FIRST Choose your playlist, THEN click below to generate your shareable URL</p>
        <button className="createSession" onClick={() => this.getRandom(this.state.activePlaylistTracks, 6) + this.createNewSession()}>
        Launch your room to let the people vote!</button>
     
        <Container fluid="false"
        className="body-container"
        style={{ marginTop: 20 }}
        >
          <Row>
            <OptionsPanel size="md-12" name="Pick Your Master Playlist">
              {this.state.userPlaylists.map(playlist => {
                return (
                  
                  <PlaylistChoices onClick={() => this.setActivePlaylistDetails()  + this.checkState() }

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
              {this.state.voteOptions.map(track => {
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
          <Row>
          <Modal open={open} onClose={this.onCloseModal} center>
           <br />
                <h7 className="currentRoom">Name your room</h7>
                <form className="mainForm">
                  <div className="logo-transparent" />

                  <p className="form-brand-name">SoundUp</p>
                  {/* *** this form should be component*/}
                  <div className="form-group">
                    <input
                      value={this.state.value} 
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      id="room-name"
                      aria-describedby="room-name"
                      placeholder="Name your room"
                      required
                      // required
                    />
                  </div>
                  <br />
                

                </form>
                <button  
                  onClick={() => this.onCloseModal()}
                  >Rock on</button>
        </Modal>
            </Row> 
        </Container>
      </div>
    );
  }
}

export default Room;
