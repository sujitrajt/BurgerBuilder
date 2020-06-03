import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../Axios-Orders";
import WithErrorHandler from "../../hoc/withErrorHandler/WithErrorHandler";
class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrder
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.totalPrice}
          />
        ))}
      </div>
    );
  }
}
export default WithErrorHandler(Orders, axios);
