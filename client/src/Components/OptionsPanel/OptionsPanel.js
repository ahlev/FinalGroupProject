import React from "react";
import Col from "../Col";
import "./OptionsPanel.css";

const OptionsPanel = props => {
  const size = props.size
    .split(" ")
    .map(size => "col-" + size)
    .join(" ");

  return (
    <Col size="md-6">
      <div className="options-panel">
        <h5>{props.name}</h5>
        <div className={size + "options-panel"} {...props} />
      </div>
    </Col>
  );
};

export default OptionsPanel;
