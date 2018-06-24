import restapi from "../restapi";

const STATE_KEY = "vets";

const initialState = {
    result: [{
      firstName: "Bob",
      lastName: "Jones",
      specialties: []
    }]
  };

export const eventDispatcher = dispatch => {
    return {}; 
};

export const stateMapper = (state, ownProps) => {
  return Object.assign({}, {error: state.error}, ownProps, {
      owner: state[STATE_KEY]
  });
};

export const vetsReducer = (state = initialState, action) => {
  //console.log("action=" + JSON.stringify(action));
  switch (action.type) {
    default:
      return state;
  }
};

const reducers = {};
reducers[STATE_KEY] = vetsReducer;

export default reducers;