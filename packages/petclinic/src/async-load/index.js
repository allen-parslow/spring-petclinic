import React from "react";

export default (props) => {
    if (!props.load) {
        return <div>???</div>;
    }

    if (!props.pending && !props.error && !props.result) {
        props.load();
    }

    if (props.error) {
        return null;
    } else if (!props.result  || props.pending) {
        return <img src="assets/images/loading.gif"/>;
    } else if (props.result) {
        return props.children;
    } else {
        return <div>???</div>;
    }
};