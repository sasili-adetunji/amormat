import { FETCH_PATIENTS, FETCH_PATIENTS_ERROR} from '../actions/types';


const initialState = {
    patients: [],
    error: '',
}

export default function(state=initialState, action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return {
                ...state,
                patients: action.payload,
            }
        case FETCH_PATIENTS_ERROR:
            return {
                ...state,
                error: action.payload.message
            }
        default:
            return state;
    }
}