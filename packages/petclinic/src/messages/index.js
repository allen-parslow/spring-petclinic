import React from "react";
import { connect } from "react-redux";

import { stateMapper, eventDispatcher } from "./events";
 
export const MessagesComponent = (props) => {
    console.log("Messages=" + JSON.stringify(props) + Object.keys(props));
    if (props.msg.error) {
        return <div className="alert alert-danger" role="alert">
         <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> {props.msg.text}
        </div>;
    }
    return null;
};

const Messages = connect(stateMapper)(MessagesComponent);

export default Messages;