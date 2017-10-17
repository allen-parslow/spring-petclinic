import React from "react";
import i18n from "i18n-lite";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <img src="assets/images/spring-pivotal-logo.png" alt={i18n.t("ALT__FOOTER_SPONSORED")}/>
                        <div>{i18n.t("TEXT__FOOTER_REACT_IMPLEMENTATION")}</div>
                    </div>
                </div>
            </div>
        );
    }
}
