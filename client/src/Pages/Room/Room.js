import React, { Component } from "react";
import Row from "../../Components/Row";
import SongChoices from "../../Components/SongChoices";
import Container from "../../Components/Container";
import Spotify from "spotify-web-api-js";
import OptionsPanel from "../../Components/OptionsPanel";
import NowPlaying from "../../Components/NowPlaying";
import Button from "../../Components/Button";
import ChatBox from "../../Components/ChatBox";

// import API from "../../Utils"

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
        name: "",
        image: ''
      },

      user: {
        spotify_id: '',
        db_id: ''
      }
    };

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token);
    }
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

  getNowPlaying() {
    spotifyWebApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url
        }
      });
    });
  }

  getUserPlaylists() {
    spotifyWebApi.getUserPlaylists().then(response => {
      this.setState({
        userPlaylists: response.items,
      });
      // console.log("SET TO STATE: ",this.setState.userPlaylists);
    });
    console.log(this.state)
  }


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
  // USE THE ID ON THE MAPPED SONGCHOICES... WHEN ONE IS CLICKED, GET ITS SONGS
  // getPlaylistSongs(id) {

  //     .then((response) => {
  //         this.setState({
  //             chosenPlaylistSongs: response.items
  //         })
  //     })
  // }

  setActivePlaylist() {
    console.log("Clicked on playlist");
    // using playlist ID, get songs, pick a random song, start playback
    // AND populate 5 random options into middle container as voting divs

  }



// Mongo struggles starting here

  componentDidMount() {
    this.getUserPlaylists();
    this.setActiveUser();
    this.getNowPlaying();
    // this.loadRoomHistory(); *** DB
  }

  // loadRoomHistory = (id) => {
  //   API.getUser(spotify_id)
    // if spotify_id and access_token = true
    // then get "rooms" array from user document where spotify_id = this.state.spotify_id
  



  render() {
    return (
      <div>
      

        <NowPlaying
          name={this.state.nowPlaying.name}
          src={this.state.nowPlaying.image}
          style={{ width: 50 }}
        />

          <Button onClick={() => this.getUserPlaylists() + this.setActiveUser()} className="api-check-btn">
          Check My Music
        </Button>

        <Container
          className="body-container"
          fluid="true"
          style={{ marginTop: 20 }}
        >
          <Row>
            <OptionsPanel size="md-12" name="Pick Your Master Playlist">
              {this.state.userPlaylists.map(playlist => {
                return (
                  
                  <SongChoices
                    key={playlist.id}
                    name={playlist.name}
                    setActive={this.setActivePlaylist}
                    id={playlist.id}
                    onClick={this.getPlaylistSongs}
                    // image = {playlist.images[2].url}
                  />
                );
              })}
            </OptionsPanel>

            <OptionsPanel size="md-12" name="VOTE FOR THE NEXT SONG">
              {this.state.activePlaylist.map(song => {
                return (
                  <SongChoices
                    key={song.id}
                    name={song.name}
                    id={song.id}
                    image={song.images[2].url}
                  />
                );
              })}
            </OptionsPanel>

            <ChatBox />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Room;
