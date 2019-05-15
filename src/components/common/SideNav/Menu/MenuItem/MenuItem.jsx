import React, { Fragment } from "react";
import "./MenuItem.css";
import { NavLink } from "react-router-dom";

const MenuItem = ({ to, name, exact, sub, children }) => (
  <Fragment>
    <NavLink
      exact={exact}
      className={["menu-item", sub && sub].join(" ")}
      activeClassName="menu-item-active"
      to={to}>
      {name}
    </NavLink>
    {children}
  </Fragment>
);

MenuItem.defaultProps = {
  sub: false
};

export default MenuItem;
