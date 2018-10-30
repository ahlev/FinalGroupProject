import React from "react";

import { Jumbotron } from "reactstrap";
import TextLoop from "react-text-loop";

import "./Jumbotron.css";

const MainJumbotron = props => {
  return (
    <div className="header">
      <Jumbotron className="text-center jumbotron">
        <h1 className="display-3">Let the music flow</h1>
        <p className="intro-title">
          Your playlist. Your people. Your{" "}
          <TextLoop
            springConfig={{ stiffness: 300, damping: 10, speed: 170 }}
            // speed= 1000ms;
            children={["party", "hangout", "restaurant", "business", "event"]}
          />
          .
        </p>
      </Jumbotron>
    </div>
  );
};

export default MainJumbotron;
