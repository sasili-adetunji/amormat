import { combineReducers } from 'redux';
import loginReducers from './loginReducers';
import patientsReducers from './patientsReducers';

export default combineReducers({
    login: loginReducers,
    patients: patientsReducers
});
