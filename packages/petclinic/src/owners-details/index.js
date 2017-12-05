import React from "react";
import { connect } from "react-redux";

import Messages from "../messages";

import { stateMapper, eventDispatcher } from "./events";

import LoadAsync from "../async-load";
import Navbar from "../navbar";
import Footer from "../footer";
import {ValidatedInput, ValidatedSelect, validateAll, validatorTypes} from "../validation";

import STATES from "../data/states";

import "./owners-details.scss";

import URLSearchParams from "url-search-params";

const ownerValidators = {
    firstName: [validatorTypes.required],
    lastName: [validatorTypes.required, validatorTypes.min(4)],
    zip: [validatorTypes.exactLength(5), validatorTypes.digits],
    state: [validatorTypes.required]

};

const OwnerForm = (props) => {
    //console.log("OwnerForm=" + JSON.stringify(props) + Object.keys(props));
    var data = Object.assign({}, props.owner, {
        onChange: props.onOwnerChange,
        validators: ownerValidators
    });

    return <div>
        <div className="row">
            <ValidatedInput label="First Name" field="firstName" size="4" src={data} />
            <ValidatedInput label="Last Name" field="lastName" size="6" src={data}/>
        </div>
        <div className="row">
            <ValidatedInput label="Address" field="address" size="10" src={data} />
        </div>
        <div className="row">
            <ValidatedInput label="City" field="city" size="4" src={data} />
            <ValidatedSelect label="State" field="state" size="3" src={data} options={STATES}/>
            <ValidatedInput label="Zip Code" field="zip" size="3" src={data} />
        </div>
    </div>;
};

export const OwnersDetails = (props) => {
    //console.log("OwnersDetails=" + JSON.stringify(props) + Object.keys(props));
    let title = "Owner Information";
    let save = () => props.saveOwner(props.owner.changed, validateAll(props.owner.changed, ownerValidators));
    let load = () => props.fetchOwner(props.id);
    let edit = () => props.editOwner(); 
    let cancelEdit = () => props.cancelEditOwner();
    let renderOwnerTitle = null;
    let renderOwnerFooter = null;

    if (!props.owner.editing) {
        renderOwnerTitle = <h1>{title}{props.owner.result ? <button className="btn btn-link" onClick={edit}>
                <span className="glyphicon glyphicon-edit"/> 
            </button>
        : null}</h1>;
    } else {
        renderOwnerTitle = <h1>{title}
            <button className="btn btn-link" onClick={cancelEdit}>
                <span className="glyphicon glyphicon-remove"/> 
            </button>
            <button className="btn btn-link" onClick={save}>
                <span className="glyphicon glyphicon-ok"/> 
            </button>
        </h1>;
        renderOwnerFooter = <button className="btn btn-primary" onClick={save}>
            Update
        </button>;
    }
    
    return <div>
        {renderOwnerTitle}
        <LoadAsync {...props.owner} load={load}>
            <OwnerForm {...props}/>
        </LoadAsync>
        {renderOwnerFooter}
    </div>;
};

const ReduxOwnersDetails = connect(stateMapper, eventDispatcher)(OwnersDetails);

export default () => {
    const ownerId = new URLSearchParams(document.location.search).get("id");
    if (!ownerId) {
        window.location = "/owners";
    }

    return <div>
        <Navbar selected="owners" />
        <div className="owners-details container">
            <Messages/>
            <ReduxOwnersDetails id={ownerId}/>
        </div>
        <Footer/>
    </div>;
};