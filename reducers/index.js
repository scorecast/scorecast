import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';

// Add firebase to reducers
export default combineReducers({
    firebase: firebaseReducer,
});
