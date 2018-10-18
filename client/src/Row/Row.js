// Import React
import React from "react";

// Row component
const Row = props =>
    <div className={`row${props.fluid ? "-fluid" : ""}`} {...props} />;

// export Row component.
export default Row;
