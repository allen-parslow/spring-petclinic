import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import { counterRedcuer } from "./counter-reducer";
import { ownerReducer } from "./owner-reducer";

let store = createStore(
    combineReducers({
      "ownerSearch": ownerReducer,
      "counter": counterRedcuer
    }),
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