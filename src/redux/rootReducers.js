import { combineReducers } from 'redux';
import getprofileReducer from '../components/auth/reducers/profileReducers';



export default combineReducers({
    // getuser: getuserReducer,
    getprofile: getprofileReducer
});