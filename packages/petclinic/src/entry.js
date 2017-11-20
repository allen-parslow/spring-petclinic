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
import Home from "./home/home";
import Vets from "./vets/vets";
import Owners from "./owners/owners";

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
