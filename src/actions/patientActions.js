import { FETCH_PATIENTS, ERROR, ADD_PATIENT } from "./types";
import { API, Auth } from "aws-amplify";
import Swal from 'sweetalert2'


export const fetchPatients = () => async dispatch => {
    try {
        let myInit = {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*",
            response: true,
            headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
        }
        const response = await API.get("patients", "/", myInit);
        dispatch({
            type: FETCH_PATIENTS,
            payload: response
        })
    } catch (error) {
        Swal.fire(
            'Error!',
            error.message,
            'error'
        )
        dispatch({
            type: ERROR,
            payload: error
        })

    }
}

export const addPatient = (patientInfo) => async dispatch => {
    try {
        let myInit = {
            "Access-Control-Allow-Credentials" : true,
            "Access-Control-Allow-Origin": "*",
            response: true,
            headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
            body: patientInfo
        }
        const response = await API.post("patients", "/patient", myInit);
        Swal.fire(
            'Success!',
            'Patient Added Successfull',
            'success'
        )
        dispatch({
            type: ADD_PATIENT,
            payload: response
        })
    } catch (error) {
        Swal.fire(
            'Error!',
            error.message,
            'error'
        )
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}