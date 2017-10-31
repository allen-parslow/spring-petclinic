import React from "react";
import ReactDOM from "react-dom";

import Home from "./home/home";
import Vets from "./vets/vets";

require("./entry.scss");

ReactDOM.render(<Vets/>, document.getElementById("app"));
