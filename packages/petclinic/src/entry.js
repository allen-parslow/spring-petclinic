// Assets
import "./entry.scss";

// React Imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

// App Libs
import store from "./store";
import service from "./service";

// App Components
import Home from "./home/home";
import Vets from "./vets/vets";
import Owners from "./owners/owners";

store.dispatch({ type: "INCREMENT" });
// store.dispatch({ type: "DECREMENT" });
// store.dispatch({ type: "OWNER_SEARCH_CHANGED", text: "nothing" });
store.dispatch(service("OWNER_SEARCH", "/api-owners/owners/"));
//store.dispatch({ type: "OWNER_SEARCH_ERROR", text: "sad face" });

const App = () => (
  <ReduxProvider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/vets" component={Vets}/>
          <Route path="/owners" component={Owners}/>
        </div>
      </Router>
  </ReduxProvider>
);

ReactDOM.render(<App/>, document.getElementById("app"));
