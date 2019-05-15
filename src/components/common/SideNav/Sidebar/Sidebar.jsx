import React from "react";
import { Link } from "react-router-dom";

import logo from "../../../../assets/Logo_invert.png"
import "./Sidebar.css";

import Menu from "../Menu";

const Sidebar = () => {
	return(
		<aside className='sidebar'>
			<Link to="/">
				<img className='logo' src={logo} alt="Medical Outcomes" />
			</Link>
			<Menu />
		</aside>
	);
}

export default Sidebar;
