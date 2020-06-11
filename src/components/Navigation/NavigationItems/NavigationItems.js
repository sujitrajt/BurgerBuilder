import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <li onClick={props.clicked}>
      <NavLink to="/" activeClassName={classes.active} exact>
        Burger Builder
      </NavLink>
      <NavLink to="/orders" activeClassName={classes.active}>
        Orders
      </NavLink>
      <NavLink to="/auth" activeClassName={classes.active}>
        Authenticate
      </NavLink>
    </li>
  </ul>
);
export default navigationItems;
