import restapi from "../restapi";

const OWNER_STATE_KEY = "ownerSearch";

const ownerInitialState = {
    searchText: "",
    // results: null,
    // searching: null,
    // error: null
  };

const ACTION_PREFIX = "OWNER_SEARCH";
const OWNER_SEARCH_CHANGED = ACTION_PREFIX + "_CHANGED";

export const ownerSearchDispatcher = dispatch => {
    return {
        searchTextChanged: text => dispatch({
            type: OWNER_SEARCH_CHANGED,
            text: text     
        }),
        submitSearch: text => { 
            dispatch(restapi.get(ACTION_PREFIX, "/api-owners/owners?q=" + text));
        }
    }; 
};
   
export const ownerSearchStateMapper = (state, ownProps) => {
  return Object.assign({}, ownProps, {
      search: state[OWNER_STATE_KEY]
  });
};

export const ownerReducer = (state = ownerInitialState, action) => {
  //console.log("action=" + JSON.stringify(action));
  switch (action.type) {
    case OWNER_SEARCH_CHANGED:
      return Object.assign({}, state, { searchText: action.text });
    case ACTION_PREFIX + "_PENDING":
      return Object.assign({}, state, { pending: true }); 
    case ACTION_PREFIX + "_SUCCESS":
      //console.log("payload=" + JSON.stringify(action.payload));
      return { results: action.payload};   
    case ACTION_PREFIX + "_ERROR":
      return { error: action.text };  
    default:
      return state;
  }
};

const reducers = {};
reducers[OWNER_STATE_KEY] = ownerReducer;

export default reducers;