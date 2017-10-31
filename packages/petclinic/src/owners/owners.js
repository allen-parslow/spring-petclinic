import React from "react";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import "./owners.scss";

export default class Owners extends React.Component {
    constructor() {
        super();

        this.state = {};
      }

    render() {
        return (
            <div>
                <Navbar selected="owners" />
                <div className="owners container xd-container">
                    <h1>{i18n.t("TEXT__OWNERS_GREETING")}</h1>
                    <div className="form-horizontal">
                        <div className="form-group">
                            <div className="control-group" id="lastName">
                                <label className="col-sm-2 control-label">{i18n.t("TEXT__LAST_NAME")}</label>
                                <div className="col-sm-10">
                                    <input className="form-control" size="30"
                                        maxLength="80" name="lastName" /> <span className="help-inline"></span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button className="btn btn-default">Find Owner</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

