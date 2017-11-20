import {ownerSearchDispatcher, ownerReducer} from'../owner-events';
import restapi from "../../restapi";

describe('Owner Search Events', () => {  
  const GET_EVENT = "get.event";
  const OWNER_SEARCH_CHANGED_EVENT = {"text": "some text", "type": "OWNER_SEARCH_CHANGED"};
  const TEST_PAYLOAD = [{test: true}];
  const ERROR_TEXT = "Doh!";
  let mockDispatcher = null;

  beforeEach(() => {
    mockDispatcher = jest.fn();
  });

  it('Should dispatch change event', () => {
    ownerSearchDispatcher(mockDispatcher).searchTextChanged("some text")
    expect(mockDispatcher).toBeCalledWith(OWNER_SEARCH_CHANGED_EVENT);
  });  

  it('Should dispatch submit search event', () => {
    restapi.get =  jest.fn().mockReturnValueOnce(GET_EVENT);

    ownerSearchDispatcher(mockDispatcher).submitSearch("some text")
    expect(restapi.get).toBeCalledWith("OWNER_SEARCH", "/api-owners/owners?q=some text");
    expect(mockDispatcher).toBeCalledWith(GET_EVENT);
  }); 

  it('Should set state on search text changed', () => {
    const state ={};
    const newState = ownerReducer(state, OWNER_SEARCH_CHANGED_EVENT);
    expect(newState.searchText).toBe("some text");
    expect(state.searchText).toBe(undefined);
  }); 

  it('Should set state on search started', () => {
    const state ={};
    const newState = ownerReducer(state, {"type": "OWNER_SEARCH_PENDING"});
    expect(newState.pending).toBeTruthy();
    expect(state.pending).toBe(undefined);
  }); 


  it('Should set state on search error', () => {
    const state ={pending: true};
    const newState = ownerReducer(state, {"type": "OWNER_SEARCH_ERROR", text: ERROR_TEXT});
    expect(newState.error).toBe(ERROR_TEXT);
    expect(newState.pending).toBe(undefined);   
    expect(state.pending).toBeTruthy();
  }); 

  it('Should set state on search started', () => {
    const state ={pending: true};
    const newState = ownerReducer(state, {"type": "OWNER_SEARCH_SUCCESS", payload: TEST_PAYLOAD});
    expect(newState.results).toBe(TEST_PAYLOAD);
    expect(newState.pending).toBe(undefined);
    expect(state.pending).toBeTruthy();
  }); 
});