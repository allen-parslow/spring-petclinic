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
                    </div>
                    <div className="navbar-collapse collapse" id="main-navbar">
                        <ul className="nav navbar-nav navbar-right">
                            <NavBarItem href="/" name="NAV__HOME" icon="home" active={this.props.selected === "home"} />
                            <NavBarItem href="/owners" name="NAV__OWNERS" icon="search" active={this.props.selected === "owners"} />
                            <NavBarItem href="/vets" name="NAV__VETERINARIANS" icon="th-list" active={this.props.selected === "vets"} />
                            <NavBarItem name="NAV__ERROR" icon="warning-sign" active={this.props.selected === "error"} />
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
