import React from 'react'
import { Link } from "react-router-dom";

function SideNav() {
    return (
        <div className="col s12 m4 l3">
            <ul id="sidenav-1" className="sidenav sidenav-fixed">
                <li><Link to="/patients">Patients</Link></li>
                <li> <Link to="/patient/add"> Add New Patient</Link></li>
            </ul>
            </div>
    )
}

export default SideNav;
