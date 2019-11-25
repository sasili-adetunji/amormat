import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPatient } from "../../actions/patientActions";
import SideNav from './SideNav'

function Patients(props) {

    const [fields, setValues] = useState({
        first_name: '', last_name: '', email: '', phone_number: '',
        home_address: '', next_of_kin: '', address_of_nok: '', phone_number_of_nok: '',
        hmo_policy_number: '', userId: ''
    })
    const handleFieldChange = (e) => {
        e.preventDefault()
        setValues({
            ...fields,
            [e.target.name]: e.target.value
          })
    }

    useEffect(() => {
        const {user} = props
        setValues({
            ...fields,
            userId: user.idToken.payload.email
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
                            <input type="text" className="validate" name='first_name' onChange={handleFieldChange} />
                            <label htmlFor="icon_prefix">First Name</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input type="text" className="validate" name='last_name' onChange={handleFieldChange}/>
                            <label htmlFor="icon_prefix">Last Name</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input type="text" className="validate" name='email' onChange={handleFieldChange} />
                            <label htmlFor="icon_email">Email</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input type="tel" className="validate" name='phone_number' onChange={handleFieldChange} />
                            <label htmlFor="icon_telephone">Telephone</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input type="text" className="validate" name='home_address' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Home Address</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input type="text" className="validate" name='next_of_kin' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Next of Kin</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">add_location</i>
                            <input type="text" className="validate" name='address_of_nok' onChange={handleFieldChange} />
                            <label htmlFor="icon_email">Address of Next of Kin</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input type="text" className="validate" name='phone_number_of_nok' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">Phone Number of Next of Kin</label>
                            </div>
                            <div className="input-field col s6">
                            <i className="material-icons prefix">create</i>
                            <input type="text" className="validate" name='hmo_policy_number' onChange={handleFieldChange}/>
                            <label htmlFor="icon_email">HMO Policy Number</label>
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