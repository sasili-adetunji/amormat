import React, { useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPatients } from "../../actions/patientActions";
import Patient from './Patient'
import SideNav from './SideNav'

function Patients(props) {

    useEffect(() => {
        const { fetchPatients } = props
        fetchPatients()
      }, []);
    return (
        <div>
            <div className="row">
                <SideNav />
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