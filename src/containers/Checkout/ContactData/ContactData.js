import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../Axios-Orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import * as burgerBuilderActions from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Zip Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter your email"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "cheapest" }
          ]
        }
      }
    }
  };
  orderHandler = event => {
    event.preventDefault();
    // this.setState({
    //   loadStatus: true
    // });

    const formData = {};
    for (let formIdentifier in this.state.orderForm) {
      formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      totalPrice: this.props.price,
      orderData: formData
    };
    this.props.onOrderBurger(order, this.props.token);
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElements = {
      ...updatedOrderForm[inputIdentifier]
    };
    // console.log(updatedFormElements);
    updatedFormElements.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElements;
    this.setState({
      orderForm: updatedOrderForm
    });
    // console.log(event.target.value);
  };
  render() {
    const formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(formElement => (
          <Input
            key={formElement.id}
            elementtype={formElement.config.elementType}
            elementconfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Contact Details</h4>
        {form}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(burgerBuilderActions.purchaseBurger(orderData, token))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
