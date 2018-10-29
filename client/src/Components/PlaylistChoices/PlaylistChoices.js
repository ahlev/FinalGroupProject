// eslint-disable-next-line
import React, { Component } from "react";
import "./PlaylistChoices.css";




const PlaylistChoices = props => {
    return (
        <button type="button" class="playlistChoice btn peach-gradient btn-lg" onClick={props.onClick} center>
            {props.children}
            <p>{props.name}</p>
        </button>
    )
}


// RecipeListItem renders a bootstrap list item containing data from the recipe api call
// const SongChoices = ({ _id, handleSaveButton, title, snippet, date, url }) => (

//       <Col size="md-4">
//         <div className="Song">
//         Artist
//         <br />
//         Song
//         <button>VOTE</button>
//         </div>

//         <div className="Song">
//         Artist
//         <br />
//         Song
//         <button>VOTE</button>
//         </div>

//         <div className="Song">
//         Artist
//         <br />
//         Song
//         <button>VOTE</button>
//         </div>

//         <div className="Song">
//         Artist
//         <br />
//         Song
//         <button>VOTE</button>
//         </div>

//       </Col>

// );

// Export search results list component.
export default PlaylistChoices;
