import restapi from "../restapi";
import {createFetchActions} from "../restapi";
import {createStateMapper, createReducer} from "../redux-actions";

const STATE_KEY = "vets";
const ACTION_PREFIX = "VETS_FETCH";

export const eventDispatcher = dispatch => {
    return {
        fetch: () => {
            dispatch(restapi.get(ACTION_PREFIX, "/api-vets/vets"));
        }
    };
};

export const stateMapper = createStateMapper(STATE_KEY);

export default createReducer(STATE_KEY,
    {
        test: true
    },
    createFetchActions(ACTION_PREFIX)
);