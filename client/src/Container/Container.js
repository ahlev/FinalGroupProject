// Import React
import React from "react";

// Define component for container (layout/grid component)
const Container = props =>
  <div className={`container${props.fluid ? "-fluid" : ""}`} {...props} />; // WHAT IS THIS LOGIC ***

// export the Container component.
export default Container;

