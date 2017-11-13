import React from "react";
import { connect } from "react-redux";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import "./owners.scss";

const mapStateToProps = (state, ownProps) => {
    return {
        counter: state.counter
    };
  };

const CounterAmt = connect(mapStateToProps)(({counter}) => {
    return <div>Counter: {counter}</div>;
});

const CounterBtn = ({clicked}) => {
    return <button className="btn btn-default" onClick={()=>{clicked({ type: "INCREMENT" });}}>Find Owner</button>;
};

const ownerSearchChanged = (value) => {
    return {
        type: "OWNER_SEARCH_CHANGED",
        text: value
    };
};

const Owners = ({ dispatch }) => {
    return <div>
        <Navbar selected="owners" />
        <div className="owners container xd-container">
            <h1>{i18n.t("TEXT__OWNERS_GREETING")}</h1>
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="control-group" id="lastName">
                        <label className="col-sm-2 control-label">{i18n.t("TEXT__LAST_NAME")}</label>
                        <div className="col-sm-10">
                            <CounterAmt/>
                            <input className="form-control" size="30" onBlur={(e)=>{dispatch(ownerSearchChanged(e.target.value));}}
                                maxLength="80" name="lastName" /> <span className="help-inline" ></span>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                       <CounterBtn clicked={(event)=>dispatch(event)}/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>;
};

export default connect()(Owners);

