import React from "react";
import Aux from "../../hoc/aux";
import classes from "../Layouts/Layouts.module.css";
const layout = props => (
  <Aux>
    <div>Toolbar, sidebar , logo</div>
    <menu className={classes.Content}>{props.children}</menu>
  </Aux>
);

export default layout;
