import React from 'react';
import './Navbar.css';



const Navbar = (props) => {
	return(
		<nav class="navbar navbar-light bg-light">
		
		<a class="navbar-logo" href="#">
			<div width="" height="30" alt="" />
		</a>
		<a class="navbar-brand" href="/">SoundUp</a>
		<ul>
			<li className="nav-item">Login</li>
		</ul>
	  </nav>
	)
}



export default Navbar;

