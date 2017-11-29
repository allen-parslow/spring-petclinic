// Assets
import "./entry.scss";

// React Imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

// App Libs
import store from "./store";

// App Components
import Home from "./home";
import Vets from "./vets";
import Owners from "./owners";
import OwnerDetails from "./owners-details";

const App = () => (
  <ReduxProvider store={store}>
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route path="/vets" component={Vets}/>
          <Route path="/owners" component={Owners}/>
          <Route path="/owners-details" component={OwnerDetails}/>
        </div>
      </Router>
  </ReduxProvider>
);

ReactDOM.render(<App/>, document.getElementById("app"));
