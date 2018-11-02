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


const spotifyWebApi = new Spotify();

class VisitorRoom extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    this.state = {
      sessionName: '',

      activePlaylist: '05V9ZNCIMJfDhmYY6KhfUu',
      voteOptions: [],
      initialVoteCounters: [],
      updatedVoteCounter: [],

      nowPlaying: {
        name: "",
        image: ''
      },
    };


  }

  handleVotes (event) {
    // needs to handle +1 to respective counter when a user taps to vote on a song
  }

  handleSongChange(event) {
  // needs to handle passing vote data back to admin so that admin view can trigger correct API call to queue winning song
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
      console.log("NOW PLAYING DATA: " , response)
      console.log("Now playing: ", response)
      if( this.state.nowPlaying )
      this.setState({
        nowPlaying: {
          name: response.item.name,
          artist: response.item.artists[0].name,
          image: response.item.album.images[0].url
        }
      });
      
    })
  }


  // Function to query the database (each song) for vote options (randomized by admin and passed into Session document)
  getVoteOptions() {

  }

  
   // Function to run POST request and update the Session data with new vote counts (in MongoDB)
   updateSession() {
    return axios.post('/session', {
      spotify_id: this.state.user.spotify_id,
      sessionName: this.state.sessionName,
      current_playlist_id : "" ,
      voteCounts: [] // needs to pass vote data (from users) back to admin
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
    this.getVoteOptions(); 
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
          <Row>
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
      </div>
    );
  }
}

export default VisitorRoom;
