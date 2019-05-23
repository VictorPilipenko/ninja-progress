import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../../../../assets/Logo_invert.png"
import "./SidebarSettings.css";

import MenuSettings from "../MenuSettings";

const SidebarSettings = () => {
  return (
    <aside className='sidebar-settings'>
      {/* <Link to="/">
				<img className='logo' src={logo} alt="Funnelsmap" />
			</Link> */}
      <p style={{ color: 'white' }}>Account</p>
      <MenuSettings />
    </aside>
  );
}

export default SidebarSettings;
