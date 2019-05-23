import React from "react";
import "./MenuItem.css";
import { NavLink } from "react-router-dom";

const MenuItem = ({ to, name, exact, sub, children }) => (
  <React.Fragment>
    <NavLink
      exact={exact}
      className={["menu-item", sub && sub].join(" ")}
      activeClassName="menu-item-active"
      to={to}>
      {name}
    </NavLink>
    {children}
  </React.Fragment>
);

MenuItem.defaultProps = {
  sub: false
};

export default MenuItem;
