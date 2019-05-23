import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <div className='menu'>
      <MenuItem exact={true} to="/" name="Dashboard" />
      <MenuItem exact={false} to="/projects" name="Projects" />
      <MenuItem exact={false} to="/collaborations" name="Collaborations" />
      <MenuItem exact={false} to="/settings" name="Settings" />


      {/* <MenuItem exact={false} to="/" name="Settings"> */}
        {/* <MenuItem sub exact={false} to="/settings/account-details" name="account-details" /> */}
        {/* <MenuItem sub exact={false} to="/settings/users" name="users" /> */}
      {/* </MenuItem> */}

    </div>
  );
}

export default Menu;
