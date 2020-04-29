import React from "react";
import Aux from "../../../hoc/aux";
import Button from "../../UI/Button/Button";
const orderSummary = props => {
  const ingredientsSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3> Your Order</h3>
      <p> Delicious Burger with the following ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <h4>Total Amount = {props.totalPrice.toFixed(2)}</h4>
      <p>Continue to Checkout</p>
      <Button clicked={props.purchaseCancel} btnType="Danger">
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinue}>
        Continue
      </Button>
    </Aux>
  );
};
export default orderSummary;
