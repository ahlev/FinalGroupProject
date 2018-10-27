const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  spotify_id: { type: String, required: true },
  rooms: { type : Array , "default" : []}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
