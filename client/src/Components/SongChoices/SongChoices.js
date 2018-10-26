// eslint-disable-next-line
import React, { Component } from "react";
import Col from "../Col";
import "./SongChoices.css";

const SongChoices = props => (
  <Col size="md-12">
    <li className="list-group-item card option-button">
      <div
        onClick={props.setActive}
        className="row"
        id={props.id}
        name={props.name}
      >
        <p>{props.name}</p>
        {/* <p>{props.artist}</p> */}
        {/* <p>{props.id}</p> */}
        {/* <img src={props.image} style= {{ width: 100}}/> */}
        <br />
        {/* <button onClick={props.setActive}>VOTE NEXT</button>  */}
        {/* add function onClick to add this.stuff to an array as an object, then setState update that array */}
      </div>
    </li>
  </Col>
);

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
export default SongChoices;
