import { FETCH_PATIENTS, ERROR, ADD_PATIENT, FETCH_PATIENT, UPDATE_PATIENT, DELETE_PATIENT } from "./types";
import { API, Auth } from "aws-amplify";
import history from '../history'
import axios from 'axios';

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
        body: {
            'name': patientInfo.picture.name,
            'type': patientInfo.picture.type
        }
    }

    const initiateResult = await API.post(
        "patients", `/patient/upload?file_name=${patientInfo.picture.name}&file_type=${patientInfo.picture.type}`,  myInit,
      );
    let data = initiateResult.data.data
    let url = initiateResult.data.url
    const postData = new FormData();
    for(let key in data.fields){
      postData.append(key, data.fields[key]);
    }
    postData.append('file', patientInfo.picture);
    var options = {
        headers: {
          'Content-Type': patientInfo.picture.type
        }
      };
    await axios.post(data.url, postData, options);
    delete myInit['body']
    delete patientInfo['picture']
    myInit['body'] = patientInfo
    myInit['body']['pictureUrl'] = url
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
        history.push('/patients')
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
        Swal.fire(
            'Success!',
            response.data.message,
            'success'
        )
        dispatch({
            type: UPDATE_PATIENT,
            payload: response
        })
        history.push('/patients')
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

export const deletePatient = (createdBy, patientId) => async dispatch => {
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
        const response = await API.del("patients", `/patient/${patientId}?createdBy=${createdBy}`, myInit);
        Swal.fire(
            'Success!',
            response.data.message,
            'success'
        )
        dispatch({
            type: DELETE_PATIENT,
            payload: response
        })
        history.push('/patients')
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