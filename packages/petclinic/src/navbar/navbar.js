import React from "react";
import i18n from "i18n-lite";

require("./navbar.scss");

class NavBarItem extends React.Component {
    render() {
        let title = i18n.t(this.props.name);
        return (
            <li className={this.props.active ? "active" : ""}>
                <a href={this.props.href} title={this.title}>
                    <span className={"glyphicon glyphicon-" + this.props.icon} aria-hidden="true"></span>
                    <span>{title}</span>
                </a>
            </li>
    );}
}

export default class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="/"><span/></a>
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#main-navbar">
                            <span className="sr-only"><os-p>Toggle navigation</os-p></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="navbar-collapse collapse" id="main-navbar">
                        <ul className="nav navbar-nav navbar-right">
                            <NavBarItem active={true} href="/" name="NAV__HOME" icon="home" />
                            <NavBarItem href="/owners/find" name="NAV__OWNERS" icon="search" />
                            <NavBarItem name="NAV__VETERINARIANS" icon="th-list" />
                            <NavBarItem name="NAV__ERROR" icon="warning-sign" />
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
