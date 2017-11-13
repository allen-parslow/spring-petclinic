const ownerInitialState = {
    searchText: "",
    // results: null,
    // searching: null,
    // error: null
  };
   
export const ownerReducer = (state = ownerInitialState, action) => {
    switch (action.type) {
      case "OWNER_SEARCH_CHANGED":
        return { searchText: action.text };
      case "OWNER_SEARCH_PENDING":
        return { searching: true }; 
      case "OWNER_SEARCH_SUCCESS":
        console.log("payload=" + action.payload.length);
        return { results: action.payload};   
      case "OWNER_SEARCH_ERROR":
        return { error: action.text };  
      default:
        return state;
    }
  };