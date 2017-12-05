const STATE_KEY = "msg";
const msgInitialState = {
};

export const stateMapper = (state, ownProps) => {
    return Object.assign({}, {error: state.error}, ownProps, {
        msg: state[STATE_KEY]
    });
  };

export const messageReducer = (state = msgInitialState, action) => {
    switch (action.type) {
      case "CLEAR_MESSAGES":
        return {};  
      case "ERROR__JAVASCRIPT":  
      case "ERROR__API":    
        console.log("action=" + JSON.stringify(action));  
        return {error: true, text: action.text};
      default:
        return state;
    }
  };

  const reducers = {};
  reducers[STATE_KEY] = messageReducer;
    
  export default reducers;