import React from "react";
// Import Container component.
import Container from "../Container";
// Import Row component.
import Row from "../Row";
// Import Col component.
import Col from "../Col";
// Import css
import './OptionsPanel.css';

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
// Define column component (layout)
const OptionsPanel = props => {
    const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return (
        <Col size="md-4">
        <div className="options-panel">
            <h5>{props.name}</h5>
            <div className={size + "options-panel"}  {...props}>
            </div>
        </div>
        </Col>
    )
};

// Export column.
export default OptionsPanel;