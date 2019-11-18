import { LOGIN_USER, LOGIN_ERROR } from "./types";


// axios call to the login API
export const loginUser = (data) => {
    return {
        type: LOGIN_USER,
        payload: data,
    }
}

export const loginError = (data) => {
    return {
        type: LOGIN_ERROR,
        payload: data,
    }
}