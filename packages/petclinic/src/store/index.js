import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import { counterRedcuer } from "./counter-reducer";
import ownersReducers  from "../owners/owner-events";
import ownerReducers  from "../owners-details/owners-details-events";

let store = createStore(
    combineReducers(Object.assign(
      {"counter": counterRedcuer}, 
        ownersReducers,
        ownerReducers
      )
    ),
    applyMiddleware(
      thunkMiddleware
    )
  );
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
store.subscribe(() =>
    console.log("store=" + JSON.stringify(store.getState()))
);
console.log("initial store=" + JSON.stringify(store.getState()));

export default store;