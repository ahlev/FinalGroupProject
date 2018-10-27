//ON THE ADMIN PAGE on our frontend
//first we choose our playlist, which creates a playlist entry (or finds one if it already exists), and returns
//the ID of the playlist to us on the front end
//-we save the ID of the playist in this.state.currentPlaylistID as soon as we get the playlistID back from the database
//-then, we take the href from the playlist data that we got from spotify initially, and...
// use it to make another api call to spotify to get all the tracks
.then( (response) => {
//assuming response.data is an array of song objects from spotify
let songArray = [];
response.data.forEach((spotifySong) => {
    let dbSongObject;
    dbSongObject.song_name = spotifySong.name;
    dbSongObject.spotify_id = spotifySong.id;
    dbSongObject.vote_count = 0;;
    dbSongObject.played = false;

    songArray.push(dbSongObject)
});

    axios.put(`/playlists/${this.state.currentPlaylistID}`, {
        songs: songArray
    })
});

