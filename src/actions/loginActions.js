import { LOGIN_USER, LOGIN_ERROR , LOGOUT_USER, CURRENT_USER} from "./types";
import { Auth } from "aws-amplify";
import Swal from 'sweetalert2'


export const loginUser = (email, password) => async dispatch => {
    try {
        const response = await Auth.signIn(email, password)
        Swal.fire(
            'Success!',
            'Login Successfull',
            'success'
        )
        dispatch({
            type: LOGIN_USER,
            payload: response
        })
    } catch (error) {
        Swal.fire(
            'Error!',
            error.message,
            'error'
        )
        dispatch({
            type: LOGIN_ERROR,
            payload: error
        })
    }
}

export const logoutUser = () => async dispatch => {
    const response = await Auth.signOut()
    Swal.fire(
        'Success!',
        'Logout Successfull',
        'success'
    )
    dispatch({
        type: LOGOUT_USER,
        payload: response
    })
}

export const currentUser = () => async dispatch => {
    const response = await Auth.currentSession()
    dispatch({
        type: CURRENT_USER,
        payload: response
    })
}