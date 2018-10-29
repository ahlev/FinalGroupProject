import React from 'react';
import './SongChoices.css'

const SongChoices = (props) => {
    return (
        <button type="button" class="songChoice btn blue-gradient btn-lg" onClick={props.onClick} center>
            {props.name} by {props.artist}
        </button>
    )
}



export default SongChoices;