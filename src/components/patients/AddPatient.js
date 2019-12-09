import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPatient } from "../../actions/patientActions";
import SideNav from './SideNav'

function Patients(props) {

    const [fields, setValues] = useState({
        firstName: null, lastName: null, email: null, phoneNumber: null,
        homeAddress: null, nextOfKin: null, phoneNumberOfNok: null,
        hmoId: null, createdBy: null, dob: null, picture: null
    })
    const handleFieldChange = (e) => {
        e.preventDefault()
        setValues({
            ...fields,
            [e.target.name]: e.target.value
          })
    }

    const onDrop = useCallback(acceptedFiles => {
        handleImageCompression(acceptedFiles[0]).then(x => {
            setValues({
                ...fields,
                picture: x
            })
        })
    }, [fields]);

    const handleImageCompression = async (imageFile) => {
        var options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true
        }
        try {
            return await imageCompression(imageFile, options);
        } catch (error) {
          console.log(error);
        }
    }

    const maxSize = 1048576;

    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
        onDrop,
        accept: "image/png, image/jpg, image/jpeg",
        minSize: 0,
        maxSize: maxSize
    });

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;


    useEffect(() => {
        const {user} = props
        setValues({
            // ...fields,
            createdBy: user.idToken.payload.email
        })
      }, [props]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const { addPatient } = props
        addPatient(fields)
    }
    return (
        <div>
            <div className="row">
                <SideNav />
                <div className="col s12 m8 l9">
                <h3>Add Patient</h3>
                <div className="row">
                    <form className="col s12" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input type="text" required name='firstName' onChange={handleFieldChange} />
                            <label htmlFor="icon_prefix">First Name</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input type="text" required name='lastName' onChange={handleFieldChange}/>
                            <label htmlFor="icon_prefix">Last Name</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input type="email" required name='email' onChange={handleFieldChange} />
                            <label htmlFor="icon_email">Email</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input type="tel" required name='phoneNumber' onChange={handleFieldChange} />
                            <label htmlFor="icon_telephone">Telephone</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input type="text" required name='homeAddress' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Home Address</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input type="text" required name='nextOfKin' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Next of Kin</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input type="text" required name='dob' onChange={handleFieldChange} />
                            <label htmlFor="icon_email">Date of Birth</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input type="text" required name='phoneNumberOfNok' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Phone Number of Next of Kin</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">create</i>
                            <input type="text" required name='hmoId' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">HMO Policy Number</label>
                            </div>
                            </div>
                            <div className="container">
                                <div className="card-panel" {...getRootProps()}>
                                    <i className="material-icons">cloud_upload</i>
                                    <input {...getInputProps()} />
                                        {!isDragActive && 'Click here or drop a file to upload picture!'}
                                        {isDragActive && !isDragReject && "Drop it here"}
                                        {isDragReject && "File type not accepted, sorry!"}
                                        {isFileTooLarge && (
                                            <div className="text-danger mt-2">
                                            File is too large, It should not exceeds {maxSize / 1024 / 1024} MB.
                                            </div>
                                        )}
                                        <ul className="list-group mt-2">
                                        {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (
                                            <li key={acceptedFile.lastModifiedDate} className="list-group-item list-group-item-success">
                                            {acceptedFile.name}
                                            </li>
                                        ))}
                                        </ul>
                                </div>
                        </div>
                        <div className='row'>
                            <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Add Patient</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}

Patients.propTypes = {
    addPatient: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    patients: state.patients.patients,
    user: state.login.user

});
export default connect(mapStateToProps, { addPatient })(Patients);