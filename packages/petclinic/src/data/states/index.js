import _ from "lodash";

import STATES from "./us-states.json";

const byKey = _.keyBy(STATES, i => i.key);

export default {
    pairs: STATES,
    lookup: (key) => {
        return (byKey[key] || {}).value;
    }    
};