import React from "react";
// Import Container component.
import Container from "../Container";
// Import Row component.
import Row from "../Row";
// Import Col component.
import Col from "../Col";
// Import css
import './Song.css';

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
const Song = ({ _id, handleSaveButton, title, snippet, date, url }) => (
    <Container>
        <Col size="md-8">
          <div className="Song">
          <ul>
              <li>Artist</li>
              <li>Song</li>
              <button>VOTE</button>
          </ul>
          </div>
        </Col>
    </Container>
  );

// Export search results list component.
export default Song;
