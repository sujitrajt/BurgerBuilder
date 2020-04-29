import React from "react";
import Buildcontrol from "./BuildControl/Buildcontrol";
import classes from "./BuildControls.module.css";
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" }
];
const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      <strong>The current price is {props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <Buildcontrol
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseDisabled}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
