import React from "react";
// Import Container component.
import Container from "../Container";
// Import Row component.
import Row from "../Row";
// Import Col component.
import Col from "../Col";
// Import css
import './NowPlaying.css';

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
// Define column component (layout)

const NowPlaying = props => {
    // const size = props.size.split(" ").map(size => "col-" + size).join(" ");

    return (
        <div className="now-playing">
            <h5>Now Playing:
            <br />{props.name}</h5>
            <img src={props.src} style={{width: 100}}/>
        </div>
    )

};

// Export column.
export default NowPlaying;