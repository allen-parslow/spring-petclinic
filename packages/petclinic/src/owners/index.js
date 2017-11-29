import React from "react";
import { connect } from "react-redux";

import { ownerSearchStateMapper, ownerSearchDispatcher } from "./owner-events";

import Navbar from "../navbar";
import Footer from "../footer";

import i18n from "i18n-lite";

import "./owners.scss";

const submitOnEnterKey = (e, delegate) => {
    if (e.key === "Enter") { 
        e.preventDefault(); 
        delegate(e.target.value);
    }
};

const renderRow = (row, i) => {
    return <tr key={"owner_" + i}>
            <th><a href={"/owners-details?id=" + row.id}>{row.lastName + ", " + row.firstName}</a></th>
            <th>{row.city}</th>
            <th>{row.telephone}</th>
        </tr>;
};

export const OwnersTable = props => (
    <table className='owners-table table table-striped'>
        <thead>
            <tr>
                <th>Name</th>                
                <th>City</th>
                <th>Telephone</th>
            </tr>
        </thead>
        <tbody>
            {props.owners.map(renderRow)}
        </tbody>
    </table>
  );

export const OwnerSearchComponent = props => {
   // console.log("OwnerSearch=" + Object.keys(props));
    return <div className="form-horizontal">
        <div className="form-group">
            <div className="control-group">
                <label className="col-sm-2 control-label">{i18n.t("TEXT__LAST_NAME")}</label>
                <div className="col-sm-10">
                    <input className="form-control" size="30"
                        onKeyDown={e=>{submitOnEnterKey(e, props.submitSearch);}}
                        onBlur={(e) => props.searchTextChanged(e.target.value ) }
                        maxLength="80" name="lastName" defaultValue={props.search.searchText}/> <span className="help-inline" ></span>
                </div>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
                <button className="btn btn-default" onClick={()=>props.submitSearch(props.search.searchText)}>Find Owner</button>
            </div>
        </div>
        { props.search.results && props.search.results.length  ? <OwnersTable owners={props.search.results}/> : null }
    </div>;
};

const OwnerSearch = connect(ownerSearchStateMapper, ownerSearchDispatcher)(OwnerSearchComponent);

export default () => {
    return <div>
        <Navbar selected="owners" />
        <div className="owners container xd-container">
            <h1>{i18n.t("TEXT__OWNERS_GREETING")}</h1>
            <OwnerSearch />
        </div>
        <Footer/>
    </div>;
};
