const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var socket = require("socket.io");
var mongoose = require("mongoose");
var morgan = require("morgan");



const PORT = process.env.PORT || 3001;
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
var dbase = require('./models');

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

app.use(morgan("dev"))

// =============================== ROUTES ======================================

// 1) Create a Session (mongo entry) when we launch a room (POST)
app.post('/session', (req, res) => {
  console.log('this is working');
    
  var session = {
    spotify_id: req.body.spotify_id, // spotify_id is on state ...
    sessionName: req.body.sessionName, // this will be a form field that isn't yet active
    current_playlist: '' // this will be the ID of the playlist once clicked on
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




// 2) Update an existing Session when we pick a playlist -- specifically, setting the current_playlist field (placeholder until now) equal to the req.body.playlistID
app.put('/sessions/:id', (req, res) => {
  let sessionID = req.params.id; // confused about req.params and req.body here 

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









// THIS IS THE CODE COMING FROM CLIENT_CREDENTIALS IN AUTH DIR

var request = require('request'); // "Request" library

var client_id = 'CLIENT_ID'; // Your client id
var client_secret = 'CLIENT_SECRET'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/users/jmperezperez',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});

// END OF CODE COMING FROM CLIENT_CREDENTIALS IN AUTH DIR





//
// THIS IS CODE FROM AUTHORIZATION_CODE IN AUTH DIR

var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = 'a8860cd039fd43b9809a7bca7c35fa54'; // Your client id
var client_secret = '1398329e9f0142d081e857162db4e0b6'; // Your secret
var redirect_uri = 'https://localhost:3000/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

app.use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {
  console.log("Hitting the back end route")
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  console.log(res)
  // your application requests authorization
    // scope = set of permissions we're requesting from Spotify and controls what we're able to access + interact with
    // I added most of these SCOPEs based on what we're trying to do... missed some (or some extras)  maybe? ***
  var scope = 'user-read-private user-read-email user-read-playback-state user-read-currently-playing playlist-read-collaborative playlist-modify-public streaming';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
  console.log(res)
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        });

        // we can also pass the token to the browser to make requests from there
        // The localhost redirect bounces us back to the react app hosted (dev) on port 3000 
        res.redirect("http://localhost:3000/room#" +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }

});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

app.get('https://api.spotify.com/v1/me', function (req,res) {
  this.setState({
    user: res.id
  })
  console.log("get request and set user ID = " + this.state.user)
})

console.log('Listening on 8888');
app.listen(8888);

// END OF CODE FROM AUTHROIZATION_CODE IN AUTH DIR
///
///




server = app.listen(3001, function() {
  console.log("server is running on port: " + PORT);
});

