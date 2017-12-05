import {messageReducer} from "../events";

describe('Message Events', () => {  
  it('Should set state to empty on clear messages', () => {
    const state = {"error":true,"text":"Doh!"};
    const newState = messageReducer(state, {type: "CLEAR_MESSAGES"});
    expect(JSON.stringify(newState)).toBe("{}");
    expect(state.error).toBe(true);
  });  

  it('Should set state on adding an api error message', () => {
    const state = {};
    const newState = messageReducer(state, {type: "ERROR__API", text: "Doh!"});
    expect(newState.error).toBe(true);
    expect(newState.text).toBe("Doh!");
    expect(state.error).toBe(undefined);
  }); 
});