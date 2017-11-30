import restapi from "../restapi";

const STATE_KEY = "owner";

const ownerInitialState = {
    intial: true,
    // results: null,
    // searching: null,
    // error: null
  };

const ACTION_PREFIX = "OWNER_FETCH";
const EDIT_OWNER = ACTION_PREFIX + "_EDTING";
const EDIT_OWNER_VALIDATION = ACTION_PREFIX + "_VALIDATION";
const EDIT_OWNER_FIELD_CHANGED = ACTION_PREFIX + "_FIELD_CHANGED";
const CANCEL_EDIT_OWNER = ACTION_PREFIX + "_CANCEL_EDTING";
const SAVE_OWNER = ACTION_PREFIX + "_SAVE";

export const ownerDispatcher = dispatch => {
    return {
      onOwnerChange: (field, value, validation) => { 
        let changed = {};
        changed[field] = value;
        dispatch({type: EDIT_OWNER_FIELD_CHANGED, changed: changed, validation: validation});
      },
      cancelEditOwner: () => { 
        dispatch({type: CANCEL_EDIT_OWNER});
      },
      saveOwner: (body, validationErrors) => { 
        console.log("saveOwner=" + JSON.stringify(validationErrors));
        if (validationErrors) {
          dispatch({type: EDIT_OWNER_VALIDATION, validation: validationErrors});
        } else {
          dispatch(restapi.put(ACTION_PREFIX + "_SAVING", "/api-owners/owners/" + body.id, body));
        }
      },
      editOwner: () => { 
        dispatch({type: EDIT_OWNER});
      },
      fetchOwner: id => { 
        dispatch(restapi.get(ACTION_PREFIX, "/api-owners/owners/" + id));
      }
    }; 
};

export const ownerStateMapper = (state, ownProps) => {
  return Object.assign({}, ownProps, {
      owner: state[STATE_KEY]
  });
};

export const ownerReducer = (state = ownerInitialState, action) => {
  //console.log("action=" + JSON.stringify(action));
  switch (action.type) {
    case EDIT_OWNER_FIELD_CHANGED:      
      return Object.assign({}, state, {
        changed: Object.assign({}, state.changed, action.changed),
        validation: Object.assign({}, state.validation, action.validation)
      });
    case EDIT_OWNER_VALIDATION:      
      return Object.assign({}, state, {validation: Object.assign({}, state.validation, action.validation)}); 
    case CANCEL_EDIT_OWNER:
      return Object.assign({}, state, { editing: false, validation: null, changed: null });  
    case EDIT_OWNER:
      return Object.assign({}, state, { editing: true, validation: null, changed: state.result }); 
    case ACTION_PREFIX + "_SAVING_SUCCESS":
      return Object.assign({}, state, { editing: false, validation: null, changed: null, result: state.changed });  
    case ACTION_PREFIX + "_PENDING":
      return Object.assign({}, state, { pending: true, intial: false }); 
    case ACTION_PREFIX + "_SUCCESS":
      return { result: action.payload };   
    case ACTION_PREFIX + "_ERROR":
      return { error: action.text };  
    default:
      return state;
  }
};

const reducers = {};
reducers[STATE_KEY] = ownerReducer;

export default reducers;