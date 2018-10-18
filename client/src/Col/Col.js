// Import React 
import React from "react";
import './Col.css'

// Define column component (layout)
const Col = props => {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");
    return <div className={size} {...props} />;
};

// Export column.
export default Col;
