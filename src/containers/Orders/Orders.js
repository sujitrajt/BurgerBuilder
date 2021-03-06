import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../Axios-Orders";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder(this.props.token);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}
const connectToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};
const dispatchToProps = dispatch => {
  return {
    onFetchOrder: token => dispatch(actions.fetchOrder(token))
  };
};
export default connect(
  connectToProps,
  dispatchToProps
)(WithErrorHandler(Orders, axios));
