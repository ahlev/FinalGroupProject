const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: { type: String, required: true },
spotify_id: { type: String },
songs: [
  {
    song_name: { type: String },
    spotify_id: { type: String },
    vote_count: { type: Number },
    played: { type: Boolean }
  }
]

});

const Playlist = mongoose.model("Playlist", userSchema);

module.exports = Playlist;
