import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loginUser } from "../../actions/loginActions";
import './Login.css'


class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    onChange = (e) => this.setState({[e.target.name]: e.target.value})

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const {error} = nextProps.error
        this.setState({
            error,
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const { loginUser  } = this.props;
        const { email, password} = this.state
        loginUser(email, password)

    }
    render() {
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
                        <form className="col s12" onSubmit={this.onSubmit}>
                            <div className='row'>
                                <div className='input-field col s12'>
                                <input className='validate' type='email' name='email' onChange={this.onChange} />
                                <label htmlFor='email'>Enter your email</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='input-field col s12'>
                                <input className='validate' type='password' name='password' onChange={this.onChange}/>
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
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.login.user,
    error: state.login.error
});
export default connect(mapStateToProps, { loginUser })(Login);