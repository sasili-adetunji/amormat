import React, { useState } from "react";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from "../../actions/loginActions";
import './Login.css'


function Login (props) {

    const [fields, setValues] = useState({
        email: '',
        password: ''
    })


    const handleFieldChange = (e) => {
        e.preventDefault()
        setValues({
          ...fields,
          [e.target.name]: e.target.value
        })
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { loginUser  } = props;
        const { email, password} = fields
        loginUser(email, password)
    }

    return (
        <div>
            <div className="section"></div>
            <center>
                <h3 className="light-blue-text">Amormat</h3>
                <br/>

                <h5 className="indigo-text">Please, login into your account</h5>
                <br/>
                <div className="container">
                <div className="z-depth-1 grey lighten-4 row" style={{display: 'inline-block', padding: '32px 48px 0px 48px', border: '1px solid #EEE'}}>
                    <form className="col s12" onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='input-field col s12'>
                            <input className='validate' type='email' name='email' onChange={handleFieldChange} />
                            <label htmlFor='email'>Enter your email</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                            <input className='validate' type='password' name='password' onChange={handleFieldChange}/>
                            <label htmlFor='password'>Enter your password</label>
                            </div>
                            <label style={{float: 'right'}}>
                                <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                            </label>
                        </div>
                        <br />
                        <div className='row'>
                            <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                        </div>
                    </form>
                </div>
                </div>
                <a href="#!">Create account</a>
            </center>
        </div>
    )
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    error: state.login.error
});
export default connect(mapStateToProps, { loginUser })(Login);