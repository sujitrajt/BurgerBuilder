import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../Axios-Orders";
import withErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loadStatus: false,
    error: false
  };
  componentDidMount() {
    this.props.onInitIngredient();
  }
  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };
  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };
  // purchaseContinue = () => {
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(
  //       encodeURIComponent(i) +
  //         "=" +
  //         encodeURIComponent(this.state.ingredients[i])
  //     );
  //   }
  //   queryParams.push("price=" + this.props.price);
  //   const queryString = queryParams.join("&");
  //   this.props.history.push({
  //     pathname: "/checkout",
  //     search: "?" + queryString
  //   });
  // };
  purchaseContinue = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    let orderSummary = null;
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.props.error ? (
      <p>Ingredients are not loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseDisabled={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinue}
          totalPrice={this.props.price}
        />
      );
    }
    // if (this.state.loadStatus) {
    //   orderSummary = <Spinner />;
    // }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: igName =>
      dispatch(burgerBuilderActions.addIngredient(igName)),
    onIngredientRemoved: igName =>
      dispatch(burgerBuilderActions.removeIngredient(igName)),
    onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient()),
    onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
