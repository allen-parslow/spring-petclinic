import React from "react";
import { connect } from "react-redux";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import service from "../service";

import "./owners.scss";

const ownerSearchChanged = text => {
    return {
        type: "OWNER_SEARCH_CHANGED",
        text: text      
    };
};

const searchForOwners = ownerSearch => {
    return service("OWNER_SEARCH", "/api-owners/owners?q=" + ownerSearch);
};

const mapStateToProps = (state, ownProps) => {
    return Object.assign({}, ownProps, {
        search: state.ownerSearch
    });
};
export const OwnerSearch = connect(mapStateToProps)(props=> {
    return <div className="form-horizontal">
        <div className="form-group">
            <div className="control-group" id="lastName">
                <label className="col-sm-2 control-label">{i18n.t("TEXT__LAST_NAME")}</label>
                <div className="col-sm-10">
                    <input className="form-control" size="30" onBlur={e => props.dispatch(ownerSearchChanged(e.target.value))}
                        maxLength="80" name="lastName" defaultValue={props.search.searchText}/> <span className="help-inline" ></span>
                </div>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button className="btn btn-default" onClick={()=>props.dispatch(searchForOwners(props.search.searchText))}>Find Owner!</button>
            </div>
        </div>
    </div>;
});

export default connect()(({ dispatch }) => {
    return <div>
        <Navbar selected="owners" />
        <div className="owners container xd-container">
            <h1>{i18n.t("TEXT__OWNERS_GREETING")}</h1>
            <OwnerSearch dispatch={(event) => dispatch(event)}/>
        </div>
        <Footer/>
    </div>;
});

