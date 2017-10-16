import React from "react";
import i18n from "../i18n/i18n";

import "./welcome.scss";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome container-fluid">
                <div className="container xd-container">
                    <h1>{i18n.t("TEXT__WELCOME_GREETING")}</h1>
                    <img className="img-responsive" src="/assets/images/pets.png"/>
                </div>
            </div>
        );
    }
}
