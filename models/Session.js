const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  spotify_id: { type: String, required: true },
  current_playlist_id: {type: String},
  name: {type: String}
  
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
