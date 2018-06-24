import restapi from "../restapi";

const STATE_KEY = "vets";
const ACTION_PREFIX = "VETS_FETCH";

const initialState = {
};

export const eventDispatcher = dispatch => {
    return {
        fetch: () => {
            dispatch(restapi.get(ACTION_PREFIX, "/api-vets/vets"));
        }
    };
};

export const stateMapper = (state, ownProps) => {
    return Object.assign({}, ownProps, {
        vets: state[STATE_KEY]
    });
};

export const vetsReducer = (state = initialState, action) => {
  //console.log("action=" + JSON.stringify(action));
  switch (action.type) {
      case ACTION_PREFIX + "_PENDING":
          return Object.assign({}, state, { pending: true, init: false });
      case ACTION_PREFIX + "_SUCCESS":
          return { result: action.payload };
      case "ERROR__API":
          return Object.assign({}, state, { pending: false, error: true });
      default:
        return state;
  }
};

const reducers = {};
reducers[STATE_KEY] = vetsReducer;

export default reducers;