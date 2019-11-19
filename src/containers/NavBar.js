import React from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logoutUser } from "../actions/loginActions";

function NavBar(props) {

    const handleLogout = () => {
        const { logoutUser  } = props;
        logoutUser()
    }

    const {isAuthenticated} = props
    return (
        <div>
            {isAuthenticated ? (
                <nav>
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Amormat</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li> <Link to="add/patient"> Add patient</Link> </li>
                    <li> <Link onClick={handleLogout} to="#!"> Logout</Link></li>
                </ul>
                </div>
                </nav>
            ) : (
                <nav>
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Amormat</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li> <Link to="/login"> Login </Link> </li>
                </ul>
                </div>
                </nav>
            )}
        </div>
    )
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated
});
export default connect(mapStateToProps, { logoutUser })(NavBar);