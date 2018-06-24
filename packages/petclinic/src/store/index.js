import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import messageReducers from "../messages/events";
import ownersReducers  from "../owners/events";
import ownerReducers  from "../owners-details/events";
import vetReducers  from "../vets/events";

const logReducer = (state = {}, action) => {
    console.log("Action=" + JSON.stringify(action));
    return state;
};


let store = createStore(
    combineReducers(Object.assign(
        {"reducers": logReducer},
        messageReducers,         
        ownersReducers,
        ownerReducers,
        vetReducers
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


// window.onerror = (msg, url, lineNo, columnNo, error) => {
//     store.dispatch({type: "ERROR__JAVASCRIPT", text: msg});
//     debugger;
//     return false;
// };


export default store;