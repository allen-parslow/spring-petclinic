import React from "react";
import i18n from "i18n-lite";

import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

import "./vets.scss";

export default class Vets extends React.Component {
    constructor() {
        super();

        this.state = {
          vets: [
              {
                    "firstName": "James",
                    "lastName": "Carter",
                    "specialties": [ "none" ]
              },
              {
                    "firstName": "Helen",
                    "lastName": "Leary",
                    "specialties": [ "radiology" ]
              },
              {
                    "firstName": "Linda",
                    "lastName": "Douglas",
                    "specialties": [ "dentistry", "surgery" ]
              },
              {
                    "firstName": "Rafael",
                    "lastName": "Ortega",
                    "specialties": [ "surgery" ]
              },
              {
                    "firstName": "Henry",
                    "lastName": "Stevens",
                    "specialties": [ "radiology" ]
              },
              {
                    "firstName": "Sharon",
                    "lastName": "Jenkins",
                    "specialties": [ "none" ]
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
                            { this.state.vets.map( (row, i) => this.renderRow(row, i) ) }
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </div>
        );
    }

    renderRow(row, i) {
        return (
            <tr key={"vet_" + i}>
                <td>{row.firstName} {row.lastName}</td>
                <td>{ row.specialties.map( (specialty, j) =>  this.renderSpecialty(specialty, j) ) }</td>
            </tr>
        );
    }

    renderSpecialty(specialty, i) {
        return (
            <span key={"specialty_" + i}>{specialty} </span>
        );
    }
}

