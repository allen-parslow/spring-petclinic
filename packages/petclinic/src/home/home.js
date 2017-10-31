import React from "react";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import "./home.scss";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <Navbar selected="home"/>
                <div className="welcome container-fluid">
                    <div className="container xd-container">
                        <h1>{i18n.t("TEXT__WELCOME_GREETING")}</h1>
                        <img className="img-responsive" src="/assets/images/pets.png"/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}
