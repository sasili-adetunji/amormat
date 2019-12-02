import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPatient } from "../../actions/patientActions";
import SideNav from './SideNav'

function EditPatient(props) {

    const [fields, setValues] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        homeAddress: '', nextOfKin: '', phoneNumberOfNok: '',
        hmoId: '', dob: ''
    })
    const handleFieldChange = (e) => {
        e.preventDefault()
        setValues({
            ...fields,
            [e.target.name]: e.target.value
          })
    }

    const {fetchPatient, match, patient} = props
    useEffect(() => {
        fetchPatient(match.params.id)
    }, [fetchPatient, match]);

    useEffect(() => {
        setValues({
            firstName: patient.data && patient.data.data && patient.data.data.firstName,
            lastName: patient.data && patient.data.data && patient.data.data.lastName,
            email: patient.data && patient.data.data && patient.data.data.email,
            phoneNumber: patient.data && patient.data.data && patient.data.data.phoneNumber,
            homeAddress: patient.data && patient.data.data && patient.data.data.homeAddress,
            nextOfKin: patient.data && patient.data.data && patient.data.data.nextOfKin,
            phoneNumberOfNok: patient.data && patient.data.data && patient.data.data.phoneNumberOfNok,
            hmoId: patient.data && patient.data.data && patient.data.data.hmoId,
            dob: patient.data && patient.data.data && patient.data.data.dob
        })
    }, [patient]);

    const handleUpdate = (e) => {
        e.preventDefault()
        // const { addPatient } = props
        console.log('Updating')

    }
    const handleDelete = (e) => {
        e.preventDefault()
        // const { addPatient } = props
        console.log('Deleting....')
    }
    return (
        <div>
            <div className="row">
                <SideNav />
                <div className="col s12 m8 l9">
                <h3>Patient Details</h3>

                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input defaultValue={fields.firstName} type="text" required name='firstName' onChange={handleFieldChange} />
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input defaultValue={fields.lastName} type="text" required name='lastName' onChange={handleFieldChange}/>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input defaultValue={fields.email} type="email" required name='email' onChange={handleFieldChange} />
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input defaultValue={fields.phoneNumber} type="tel" required name='phoneNumber' onChange={handleFieldChange} />
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input defaultValue={fields.homeAddress} type="text" required name='homeAddress' onChange={handleFieldChange}/>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input defaultValue={fields.nextOfKin} type="text" required name='nextOfKin' onChange={handleFieldChange}/>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input defaultValue={fields.dob} type="text" required name='dob' onChange={handleFieldChange} />
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input type="text" defaultValue={fields.phoneNumberOfNok} required name='phoneNumberOfNok' onChange={handleFieldChange}/>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">create</i>
                            <input type="text" defaultValue={fields.hmoId} required name='hmoId' onChange={handleFieldChange}/>
                            </div>
                        </div>
                        <div className='row'>
                            <button onClick={handleUpdate} type='submit' name='btn_login' className='col s5 btn btn-large waves-effect indigo'>Update Patient</button>
                            <button onClick={handleDelete} type='submit' name='btn_login' className='col s5 btn btn-large waves-effect indigo'>Delete Patient</button>

                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

EditPatient.propTypes = {
    fetchPatient: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    patient: state.patients.patient,
    user: state.login.user

});
export default connect(mapStateToProps, { fetchPatient })(EditPatient);