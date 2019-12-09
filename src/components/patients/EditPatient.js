import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchPatient, updatePatient, deletePatient } from "../../actions/patientActions";
import SideNav from './SideNav'

function EditPatient(props) {

    const [fields, setValues] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: '',
        homeAddress: '', nextOfKin: '', phoneNumberOfNok: '',
        hmoId: '', dob: '', createdBy: '', pictureUrl: ''
    })
    const handleFieldChange = (e) => {
        e.preventDefault()
        setValues({
            ...fields,
            [e.target.name]: e.target.value
          })
    }

    const handleUploadFile = (e) => {
        let file = e.target.files[0];
        if (file) {
            setValues({
                ...fields,
                picture: file
              })
          }
    }

    const {fetchPatient, match, patient, user} = props
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
            dob: patient.data && patient.data.data && patient.data.data.dob,
            createdBy: user.idToken.payload.email,
            pictureUrl: patient.data && patient.data.data && patient.data.data.pictureUrl,
        })
    }, [patient, user]);

    const handleUpdate = (e) => {
        e.preventDefault()
        const { updatePatient } = props
        updatePatient(fields, match.params.id)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        const { deletePatient } = props
        const { createdBy } = fields
        deletePatient(createdBy, match.params.id)

    }
    console.log(fields.pictureUrl)
    return (
        <div>
            <div className="row">
                <SideNav />
                <div className="col s9 m8 l9">
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
                            <div className = "input-field file-field col s6">
                            <i className="material-icons">file_upload</i>
                                    <input type="file" name="file" onChange={handleUploadFile} />
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" defaultValue={fields.pictureUrl}
                                        placeholder="Upload Picture" />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <button onClick={handleUpdate} type='submit' name='btn_login' className='col s5 btn btn-large waves-effect indigo'>Update Patient</button>
                            <button onClick={handleDelete} type='submit' name='btn_login' className='col s5 btn btn-large waves-effect indigo'>Delete Patient</button>

                        </div>
                    </form>
                </div>
                </div>
                <div className="s3">
                    <img src={fields.pictureUrl} alt=""/>
                </div>
            </div>
        </div>
    )
}

EditPatient.propTypes = {
    fetchPatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    patient: state.patients.patient,
    user: state.login.user

});
export default connect(mapStateToProps, { fetchPatient, updatePatient, deletePatient })(EditPatient);