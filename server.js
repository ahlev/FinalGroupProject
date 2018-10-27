const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var socket = require("socket.io");

const PORT = process.env.PORT || 3001;


// Database configuration
// Saving the URL of our database and the name of our collection(s)
var databaseUrl = "soundupdb";
var collections = ["users"]

// use mongojs to hook our database to our db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
  console.log("Database error happening:", console.error)
})










app.use(express.static("./client/public"));

server = app.listen(3001, function() {
  console.log("server is running on port: " + PORT);
});

io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
