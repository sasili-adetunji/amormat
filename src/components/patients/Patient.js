import React from 'react'

function Patient(props) {
    console.log(props.patients)
    const result = props.patients.data && props.patients.data['data']['Items'].map(patient => {
        return (
        <tr key={patient['patientId']}>
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


export default Patient