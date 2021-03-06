import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layouts/Layouts";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "../src/containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
