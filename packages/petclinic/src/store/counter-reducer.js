export const counterRedcuer = (state = 0, action) => {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        console.log("action=" + JSON.stringify(action));
        return state;
    }
  };