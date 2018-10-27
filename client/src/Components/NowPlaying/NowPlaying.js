import React from "react";
import "./NowPlaying.css";

const NowPlaying = props => {
  // const size = props.size.split(" ").map(size => "col-" + size).join(" ");

  return (
    <div className="now-playing">
      <h5>
        Now Playing:
        <br />
        {props.name}
      </h5>
      <img src={props.src} style={{ width: 150 }} />
    </div>
  );
};

export default NowPlaying;
