import _ from "lodash";

export const createStateMapper = (stateKey) => {
    return (state, ownProps) => {
        var subState = {};
        subState[stateKey] = state[stateKey];
        return Object.assign({}, ownProps, subState);
    };
};

export const createReducer = (stateKey, initialState, ...actionsList) => {
    var actions = combineActions(...actionsList);
    console.log(JSON.stringify(initialState) + Object.keys(actions));
    const reducers = {};
    reducers[stateKey] = (state = initialState, action) => {
        return actions(state, action);
    };
    return reducers;
};


export const combineActions = (...actionsList) => {
    var  actions = {};
    var actionArg;

    if (_.isArray(actionsList)) {
        actionsList.forEach((actionArg) => {
            actions = _.extend(actions, actionArg);
        });
    } else {
        for (actionArg in actionsList) {
            actions = _.extend(actions, actionArg);
        }
    }

    console.log("Combining actions: " + Object.keys(actions));

    return (state, action) => {
        var reducer = actions[action.type];

        if (reducer) {
            //console.log("action '" + action.type +"' found in: " + Object.keys(actions));
            return reducer(state, action);
        } else {
            //console.log("action '" + action.type +"' not found in: " + Object.keys(actions));
            return state;
        }
    };
};
