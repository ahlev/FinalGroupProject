import React from "react";
import "./VotingComponent.css";
import "../SongChoices";
var io = require("socket.io-client");
console.log("is this working even?");
class VotingComponent extends React.Component {
  getInitialState() {
    return {
      status: "disconnected"
    };
  }

  componentWillMount() {
    this.socket = io("http://localhost:3001");
    this.socket.on("connect", this.connect);
    console.log(this.socket);
  }
  connect() {
    // alert("Connected on: " + this.socket.id);
  }

  render() {
    return <h1> Hi Haters </h1>;
  }
}
console.log("idk");
export default VotingComponent;
