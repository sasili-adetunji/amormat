import { FETCH_PATIENTS, ERROR, ADD_PATIENT, FETCH_PATIENT, UPDATE_PATIENT } from "./types";
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
    let myInit = {
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin": "*",
        response: true,
        headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            "Access-Control-Allow-Origin": "*"
        },
        body: patientInfo
    }
    try {
        const response = await API.post("patients", "/patient", myInit);
        Swal.fire(
            'Success!',
            response.data.message,
            'success'
        )
        dispatch({
            type: ADD_PATIENT,
            payload: response
        })
    } catch (error) {
        Swal.fire(
            'Error!',
            error.response.data.message,
            'error'
        )
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}

export const fetchPatient = (patientId) => async dispatch => {
    let myInit = {
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin": "*",
        response: true,
        headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            "Access-Control-Allow-Origin": "*"
        },
    }
    try {
        const response = await API.get("patients", `/patient/${patientId}?createdBy=${(await Auth.currentSession()).getIdToken()['payload']['email']}`, myInit);
        dispatch({
            type: FETCH_PATIENT,
            payload: response
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}

export const updatePatient = (patientInfo, patientId) => async dispatch => {
    const { createdBy } = patientInfo
    delete patientInfo.createdBy
    let myInit = {
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin": "*",
        response: true,
        headers: {
            Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`,
            "Access-Control-Allow-Origin": "*"
        },
        body: patientInfo
    }
    try {
        const response = await API.put("patients", `/patient/${patientId}?createdBy=${createdBy}`, myInit);
        console.log(response, 'sss')
        Swal.fire(
            'Success!',
            response.data.message,
            'success'
        )
        dispatch({
            type: UPDATE_PATIENT,
            payload: response
        })
    } catch (error) {
        Swal.fire(
            'Error!',
            error,
            'error'
        )
        dispatch({
            type: ERROR,
            payload: error
        })
    }
}