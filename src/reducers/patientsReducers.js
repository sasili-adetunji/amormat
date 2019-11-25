import { FETCH_PATIENTS, ERROR} from '../actions/types';


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
        case ERROR:
            return {
                ...state,
                error: action.payload.message
            }
        default:
            return state;
    }
}