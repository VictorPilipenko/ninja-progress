import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";

const Menu = () => {
  return (
    <div className='menu'>
      <MenuItem exact={true} to="/" name="Dashboard" />

      {/* <MenuItem exact={false} to="/clinics" name="Clinics">
				<MenuItem sub exact={false} to="/clinics/users" name="Users" />
			</MenuItem> */}

      <MenuItem exact={false} to="/projects" name="Projects" />

      <MenuItem exact={false} to="/collaborations" name="Collaborations" />

      {/* <MenuItem exact={false} to="/questionnaires" name="Questionnaires" /> */}

      {/* <MenuItem exact={false} to="/treatments" name="Treatments">
        <MenuItem sub exact={false} to="/treatments/types" name="Types" />
        <MenuItem sub exact={false} to="/treatments/body-parts" name="Body Parts" />
      </MenuItem> */}

      {/* <MenuItem exact={false} to="/reviews" name="Reviews" /> */}
    </div>
  );
}

export default Menu;
