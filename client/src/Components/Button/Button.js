import React from 'react';
import './Button.css'

const Button = (props) => {
    return (
        <button type="button" class="btn peach-gradient btn-lg" onClick={props.onClick} center>
            {props.children}
        </button>
    )
}



export default Button;