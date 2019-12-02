import { FETCH_PATIENTS, FETCH_PATIENT, ERROR, UPDATE_PATIENT, DELETE_PATIENT, ADD_PATIENT} from '../actions/types';


const initialState = {
    patients: [],
    patient: {},
    error: '',
}

export default function(state=initialState, action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return {
                ...state,
                patients: action.payload,
            }
        case ADD_PATIENT:
            return {
                ...state,
                patients: [action.payload, ...state.patients]
            }
        case FETCH_PATIENT:
            return {
                ...state,
                patient: action.payload,
            }
        case UPDATE_PATIENT:
            return {
                ...state,
                patients: state.patients.map(patient =>
                    patient.patientId === action.payload.patientId ?
                    (patient = action.payload) : patient
                    )
            }
        case DELETE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(patient =>
                    patient.partientId !== action.payload)
            }
        case ERROR:
            return {
                ...state,
                error: action.payload.message
            }
        default:
            return state;
    }
}