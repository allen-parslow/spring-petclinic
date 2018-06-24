import React from "react";
import { connect } from "react-redux";
import i18n from "i18n-lite";

import { stateMapper, eventDispatcher } from "./events";

import Messages from "../messages";
import Navbar from "../navbar";
import Footer from "../footer";
import LoadAsync from "../async-load";

import "./vets.scss";

const renderSpecialty = (specialty, i) => {
    return <span key={"specialty_" + i}>{specialty} </span>;
};

const renderRow = (row, i) => {
    var specialties = row.specialties || [];

    return <tr key={"vet_" + i}>
        <td>{row.firstName} {row.lastName}</td>
        <td>{ specialties.map( (specialty, j) =>  renderSpecialty(specialty, j) ) }</td>
    </tr>;
};

export const VetTable = (props) => {
    return <table>
        <thead>
            <tr>
                <th>{i18n.t("TEXT__NAME_COLUMN")}</th>
                <th>{i18n.t("TEXT__SPECIALTIES_COLUMN")}</th>
            </tr>
        </thead>
        <tbody>
            {props.vets.result.map( (row, i) => renderRow(row, i) )}
        </tbody>
    </table>;
};

export const Vets = (props) => {
    console.log(Object.keys(props));
    let load = () => props.fetch();

    return <LoadAsync {...props.vets} load={load}>
        <VetTable {...props}/>
    </LoadAsync>;
};


const ReduxVetTable = connect(stateMapper, eventDispatcher)(Vets);

export default (props) => {
    return <div>
        <Navbar selected="vets" />
        <div className="vets container xd-container">
            <h1>{i18n.t("TEXT__VETERINARIANS_GREETING")}</h1>
            <Messages/>
            <ReduxVetTable/>
        </div>
        <Footer/>
    </div>;
};
