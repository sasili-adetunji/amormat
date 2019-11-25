import { FETCH_PATIENTS, FETCH_PATIENTS_ERROR } from "./types";
import { API, Auth } from "aws-amplify";
// import Swal from 'sweetalert2'


export const fetchPatients = () => async dispatch => {
    try {
        let myInit = {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*",
            response: true,
            headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        }
        const response = await API.get("patients", "/", myInit);
        // Swal.fire(
        //     'Success!',
        //     'Login Successfull',
        //     'success'
        // )
        dispatch({
            type: FETCH_PATIENTS,
            payload: response
        })
    } catch (error) {
        // Swal.fire(
        //     'Error!',
        //     error.message,
        //     'error'
        // )
        dispatch({
            type: FETCH_PATIENTS_ERROR,
            payload: error
        })
    }
}
