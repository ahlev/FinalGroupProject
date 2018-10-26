const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var socket = require("socket.io");

const PORT = process.env.PORT || 3001;

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
