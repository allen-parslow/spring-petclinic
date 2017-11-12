import React from "react";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import "./vets.scss";

const renderSpecialty = (specialty, i) => {
    return <span key={"specialty_" + i}>{specialty} </span>;
};

const renderRow = (row, i) => {
    return <tr key={"vet_" + i}>
        <td>{row.firstName} {row.lastName}</td>
        <td>{ row.specialties.map( (specialty, j) =>  renderSpecialty(specialty, j) ) }</td>
    </tr>;
};

export default class Vets extends React.Component {
    constructor() {
        super();

        this.state = {
          vets: [
            {
              "id" : "34b85402-0ec8-4edb-9a37-b5e046e7b41c",
              "firstName" : "James",
              "lastName" : "Carter",
              "specialties" : [ "none" ]
            }, {
              "id" : "d53fa462-15ea-47c9-8458-7fe10672dd9d",
              "firstName" : "Helen",
              "lastName" : "Leary",
              "specialties" : [ "radiology" ]
            }, {
              "id" : "e0140ec1-e3bd-4e20-b3a9-99b93dc8ff6e",
              "firstName" : "Linda",
              "lastName" : "Douglas",
              "specialties" : [ "dentistry", "surgery" ]
            }, {
              "id" : "dbeb61b1-6fc1-497a-af6f-b336381a3fe5",
              "firstName" : "Rafael",
              "lastName" : "Ortega",
              "specialties" : [ "surgery" ]
            }, {
              "id" : "16719f77-9cb4-48dd-ac49-7fc8c9196385",
              "firstName" : "Henry",
              "lastName" : "Stevens",
              "specialties" : [ "radiology" ]
            }, {
              "id" : "df841cc4-ab38-4c71-9227-335186d0a1b4",
              "firstName" : "Sharon",
              "lastName" : "Jenkins",
              "specialties" : [ "none" ]
            }, {
              "id" : "df841cc4-ab38-4c71-9227-335186d0a1bX",
              "firstName" : "Hudson",
              "lastName" : "Jenkins",
              "specialties" : [ "radiology" ]
            }
          ]
        };
      }

    render() {
        return (
            <div>
                <Navbar selected="vets" />
                <div className="vets container xd-container">
                    <h1>{i18n.t("TEXT__VETERINARIANS_GREETING")}</h1>

                    <table>
                        <thead>
                            <tr>
                                <th>{i18n.t("TEXT__NAME_COLUMN")}</th>
                                <th>{i18n.t("TEXT__SPECIALTIES_COLUMN")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.vets.map( (row, i) => renderRow(row, i) )}
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        );
    }
}
