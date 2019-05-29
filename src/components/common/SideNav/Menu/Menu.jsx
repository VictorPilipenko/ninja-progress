import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";
import { ReactComponent as ProjectSVG } from '../../../../assets/Projects.svg';
import { ReactComponent as CollaborationsSVG } from '../../../../assets/Collaborations.svg';
import { ReactComponent as SettingsSVG } from '../../../../assets/Settings.svg';


const Menu = () => {
  return (
    <div className='menu'>
      <MenuItem exact={true} to="/" name="Projects" icon={<ProjectSVG />} />
      <MenuItem exact={false} to="/collaborations" name="Collaborations" icon={<CollaborationsSVG />} />
      <MenuItem exact={false} to="/settings" name="Settings" icon={<SettingsSVG />} />

      {/* <MenuItem exact={false} to="/" name="Settings"> */}
        {/* <MenuItem sub exact={false} to="/settings/account-details" name="account-details" /> */}
        {/* <MenuItem sub exact={false} to="/settings/users" name="users" /> */}
      {/* </MenuItem> */}
    </div>
  );
}

export default Menu;
