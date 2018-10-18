import React from "react";
// Import Container component.
import Container from "../Container";
// Import Row component.
import Row from "../Row";
// Import Col component.
import Col from "../Col";
// Import css
import './SongChoices.css';

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
const SongChoices = ({ _id, handleSaveButton, title, snippet, date, url }) => (

      <Col size="md-4">
        <div className="Song">
        Artist
        <br />
        Song
        <button>VOTE</button>
        </div>

        <div className="Song">
        Artist
        <br />
        Song
        <button>VOTE</button>
        </div>

        <div className="Song">
        Artist
        <br />
        Song
        <button>VOTE</button>
        </div>

        <div className="Song">
        Artist
        <br />
        Song
        <button>VOTE</button>
        </div>

        
        
        
      </Col>

);

// Export search results list component.
export default SongChoices;
