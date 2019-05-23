import React from "react";
import "./MenuSettingsItem.css";
import { NavLink } from "react-router-dom";

const MenuSettingsItem = ({ to, name, exact, sub, children }) => (
  <React.Fragment>
    <NavLink
      exact={exact}
      className={["menu-settings-item", sub && sub].join(" ")}
      activeClassName="menu-settings-item-active"
      to={to}>
      {name}
    </NavLink>
    {children}
  </React.Fragment>
);

MenuSettingsItem.defaultProps = {
  sub: false
};

export default MenuSettingsItem;
