import React from 'react'
import { withRouter } from 'react-router-dom';

function Patient(props) {

    const routeChange = (patId) => {
        const newPath = `/patient/${patId}`
        props.history.push(newPath)
    }


    const result = props.patients.data && props.patients.data['data']['Items'].map(patient => {
        return (
        <tr key={patient['patientId']} onClick={() => routeChange(patient['patientId'])}>
            <td>{patient['firstName']} {patient['lastName']}</td>
            <td>{patient['email']}</td>
            <td>{patient['phoneNumber']}</td>
            <td>{patient['dob']}</td>
        </tr>
        )
    })

    return (
        <tbody>
            {props.patients.data ? result : null}
        </tbody>
    )
}


export default withRouter(Patient)
