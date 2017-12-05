import React from "react";

export default (props) => {
    //console.log("LoadAsync=" + Object.keys(props));
    if (props.initial && props.load) {
        props.load();
    }

    if (props.initial || props.pending) {
        return <img src="assets/images/loading.gif"/>;
    } else if (props.result || !props.load) {
        return props.children;
    } else if (props.error) {
        return null;
    } else {
        return <div>???</div>;
    }
};