import React from "react";
import { connect } from "react-redux";

import { ownerStateMapper, ownerDispatcher } from "./owners-details-events";

import Navbar from "../navbar";
import Footer from "../footer";
import {ValidatedInput, validateAll, validatorTypes} from "../validation";


import "./owners-details.scss";

import URLSearchParams from "url-search-params";

const ownerValidators = {
    lastName: [validatorTypes.required, validatorTypes.min(4)],
    zip: [validatorTypes.exactLength(5), validatorTypes.digits]

};

const OwnerForm = (props) => {
    //console.log("OwnerForm=" + JSON.stringify(props) + Object.keys(props));
    var data = Object.assign({}, props.owner, {
        onChange: props.onOwnerChange,
        validators: ownerValidators
    });

    return <div>
        <div className="row">
            <ValidatedInput label="First Name" field="firstName" size="3" src={data} />
            <ValidatedInput label="Last Name" field="lastName" size="4" src={data}/>
        </div>
        <div className="row">
            <ValidatedInput label="Address" field="address" size="7" src={data} />
        </div>
        <div className="row">
            <ValidatedInput label="City" field="city" size="3" src={data} />
            <ValidatedInput label="State" field="state" size="2" src={data} />
            <ValidatedInput label="Zip Code" field="zip" size="2" src={data} />
        </div>
    </div>;
};

const OwnerLoadingForm = (props) => {
    //console.log("OwnerLoadingForm=" + JSON.stringify(props) + Object.keys(props));
    if (props.owner.intial) {
        props.fetchOwner(props.id);
    }

    if (props.owner.intial || props.owner.pending) {
        return <img src="assets/images/loading.gif"/>;
    } else if(props.owner.result) {
        return <OwnerForm {...props}/>;
    } else {
        return <div>???</div>;
    }
};

const OwnersDetails = (props) => {
    //console.log("OwnersDetails=" + JSON.stringify(props) + Object.keys(props));
    let renderOwnerTitle = null;
    let renderOwnerFooter = null;
    let save = () => props.saveOwner(validateAll(props.owner.changed, ownerValidators));

    if (!props.owner.editing) {
        renderOwnerTitle = <h1>Owner Information<button className="btn btn-link" onClick={() => props.editOwner()}>
                <span className="glyphicon glyphicon-edit"/> 
            </button>
        </h1>;
    } else {
        renderOwnerTitle = <h1>Owner Information
            <button className="btn btn-link" onClick={() => props.cancelEditOwner()}>
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
    
    return <div className="owners-details container">
        {renderOwnerTitle}
        <OwnerLoadingForm {...props}/>
        {renderOwnerFooter}
    </div>;
};

const ReduxOwnersDetails = connect(ownerStateMapper, ownerDispatcher)(OwnersDetails);

export default () => {
    const ownerId = new URLSearchParams(document.location.search).get("id");
    if (!ownerId) {
        window.location = "/owners";
    }

    return <div>
        <Navbar selected="owners" />
        <ReduxOwnersDetails id={ownerId}/>
        <Footer/>
    </div>;
};