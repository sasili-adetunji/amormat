import React from 'react'
import { Link } from "react-router-dom";


export default function Patient() {
    return (
        <div>
            <div className="row">
                <div className="col s12 m4 l3">
                <ul id="sidenav-1" className="sidenav sidenav-fixed">
                    <li><Link to="/patients" className="subheader">Patients</Link></li>
                    <li> <Link to="/patient/add"> Add New Patient</Link></li>
                </ul>
                </div>
                <div className="col s12 m8 l9">
                <h3>Patients List</h3>
                <table className="striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sex</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Alvin</td>
                        <td>Female</td>
                        <td>08037871232</td>
                        <td>alvin@example.com</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}
