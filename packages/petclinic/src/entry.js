import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import Home from "./home/home";
import Vets from "./vets/vets";
import Owners from "./owners/owners";

require("./entry.scss");

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/vets" component={Vets}/>
      <Route path="/owners" component={Owners}/>
    </div>
  </Router>
);

ReactDOM.render(<App/>, document.getElementById("app"));
