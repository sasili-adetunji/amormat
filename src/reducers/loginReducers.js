import { LOGIN_USER, LOGIN_ERROR , CURRENT_USER, LOGOUT_USER} from '../actions/types';


const initialState = {
    user: {},
    error: '',
    isAuthenticated: false,
    jwt: '',
}

export default function(state=initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                error: action.payload.message
            }
        case CURRENT_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                jwt: action.payload.idToken.jwtToken
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: {},
                jwt: ''
            }

        default:
            return state;
    }
}