import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const counter = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return Object.assign({}, { counter: state.counter + 1 });
    case "DECREMENT":
    return Object.assign({}, { counter: state.counter - 1 });
    default:
      return state;
  }
};
let store = createStore(counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() =>
console.log(JSON.stringify(store.getState()))
);


store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });


import Home from "./home/home";
import Vets from "./vets/vets";
import Owners from "./owners/owners";

require("./entry.scss");

import { createStore } from "redux";
import { Provider } from "react-redux";


const App = () => (
  <Provider store={store}>
    <Owners/>
  </Provider>
);


ReactDOM.render(<App/>, document.getElementById("app"));
