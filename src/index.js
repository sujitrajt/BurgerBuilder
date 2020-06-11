import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderreducer from "./store/reducers/burgerBuilder";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderreducer,
  order: orderReducer,
  auth: authReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>{app}</React.StrictMode>,
    document.getElementById("root")
  );
  serviceWorker.register();
};
if (window.cordova) {
  document.addEventListener("deviceready", startApp, false);
} else {
  startApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
