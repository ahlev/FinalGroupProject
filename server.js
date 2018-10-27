const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var socket = require("socket.io");
var mongoose = require("mongoose")


const PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var dbase = require('./models');

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


// Create a session when we launch a room (POST)
// ADMIN uses this
app.post('/session', (req, res, next) => {
    
  var session = {
    admin_id: req.body.spotify_id, // spotify_id is on state ...
    name: req.body.sessionName,
    current_playlist: ''
  };

  dbase.Session.create(session);
   res.send('session document added successfully');
  });

//Update a session
app.put('/sessions/:id', (req, res) => {
  let sessionID = req.params.id;

  db.Session.findOneAndUpdate({_id: sessionID}, {$set: {current_playlist : req.body.playlistID }}, {new: true})
            .then( (session) => {
              res.send(session);
            }).catch(err) {
              res.send(err);
            }

})

// Add a playlist to collection when we select our active Playlist (onClick)
// ADMIN uses this
app.post('/playlist', (req, res, next) => {

var playlistData = {
  name: req.body.playlist.name,
  spotify_id: req.body.playlist.id,
  songs: []

};

dbase.Playlist.create(playlistData).then( playlist ) => {
  res.send({
    message: "playlist created succesfully",
    playlist: playlist
  });
};

});


//Update a session
app.put('/playlists/:id/', (req, res) => {
  let playlistID = req.params.id;

  db.Session.findOneAndUpdate({_id: playlistID}, {$set: {songs: req.body.songs }}, {new: true})
            .then( (session) => {
              res.send(session);
            }).catch(err) {
              res.send(err);
            }

})

// Get all songs from a playlist (GET)
// USER uses this
app.get('/playlists/:id', (req, res) => {

});




app.use(express.static("./client/public"));

server = app.listen(3001, function() {
  console.log("server is running on port: " + PORT);
});

// io = socket(server);

// io.on("connection", socket => {
//   console.log(socket.id);

//   socket.on("SEND_MESSAGE", function(data) {
//     io.emit("RECEIVE_MESSAGE", data);
//   });
// });
