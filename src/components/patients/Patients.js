import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPatients } from "../../actions/patientActions";
import Patient from './Patient'

function Patients(props) {

    useEffect(() => {
        const { fetchPatients } = props
        fetchPatients()
      }, []);
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
                        <th>Date of Birth</th>
                    </tr>
                    </thead>
                    <Patient patients={props.patients} />
                </table>
                </div>
            </div>
        </div>
    )
}

Patients.propTypes = {
    fetchPatients: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    patients: state.patients.patients,

});
export default connect(mapStateToProps, { fetchPatients })(Patients);