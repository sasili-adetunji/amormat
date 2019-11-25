import React from 'react'

function Patient(props) {
    console.log(props.patients)
    const result = props.patients.data && props.patients.data['data']['Items'].map(patient => {
        return (
        <tr key={patient['patientId']}>
            <td>{patient['first_name']} {patient['last_name']}</td>
            <td>{patient['gender']}</td>
            <td>{patient['phone_number']}</td>
            <td>{patient['date_of_birth']}</td>
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