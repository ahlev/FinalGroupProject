const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var socket = require("socket.io");
var mongoose = require("mongoose")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var dbase = require('./models');

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);


// =============================== ROUTES ======================================
// app.get('*', middleware);
// 1) Create a Session (mongo entry) when we launch a room (POST)
app.post('/session', (req, res) => {
  console.log('this is working');
    
  var session = {
    spotify_id: req.body.spotify_id, // spotify_id is on state ...
    sessionName: req.body.sessionName, // this will be a form field that isn't yet active
    current_playlist_id: '' // this will be the ID of the playlist once clicked on
  };

  dbase.Session.create(session) // use the variable defined above to create a new Session
  .then( session => {
    res.send(session)
    console.log("testing session info...", session)
   })
  .catch(err => res.send(err) )   

  // The ROOM page uses this to first initiate a document representing the session
  // later, we need to PUT the current_playlist into this document when a playlist is selected as master (onClick)
  });


  shuffleSongs = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  // Used like so
  var arr = ["cat", "dog", "fish", "owl", "whale"];
  arr = shuffle(arr);
  console.log(arr);


// 2) Update an existing Session when we pick a playlist -- specifically, setting the current_playlist field (placeholder until now) equal to the req.body.playlistID
app.put('/sessions/:id', (req, res) => {
  let sessionName = req.params.sessionName; // confused about req.params and req.body here 

  // find the Session (document) where _id = sessionID (confused per above), then sets the current_playlist on that document equal to req.body.playlistID (where's this coming from again?)
  db.Session.findOneAndUpdate({sessionName: req.body.sessionName}, {$set: {current_playlist : req.body.playlistID }}, {new: true})
            .then( (session) => res.send(session) )
            .catch(err => res.send(err) ) 
})




// 3) Create a playlist document when we select our active Playlist (will use this onClick of Playlist)
app.post('/playlist', (req, res) => {

var playlistData = {
  name: req.body.playlist.name,
  spotify_id: req.body.playlist.id,
  songs: []

};
// the ROOM page uses this to create a Playlist collection when we select a playlist as active (onClick)
dbase.Playlist.create(playlistData)
  .then( playlist  => {
    res.send({
      message: "playlist created succesfully",
      playlist: playlist
    })
  })
});



// Update a Session and set songs (previously a placeholder) to req.body.songs
app.put('/playlists/:id/', (req, res) => {
  let playlistID = req.params.id;

  // then respond with the data
  db.Session.findOneAndUpdate({_id: playlistID}, {$set: {songs: req.body.songs }}, {new: true})
  .then( (session) => res.send(session) )
  .catch(err => res.send(err) ) 
});

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
