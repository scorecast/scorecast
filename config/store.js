import { createStore, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import rootReducer from '../reducers';

const firebaseConfig = {
    apiKey: 'AIzaSyBd8u4BvdZylqyztlgTToIi6D1a79k3emA',
    authDomain: 'scorecast-5f168.firebaseapp.com',
    databaseURL: 'https://scorecast-5f168.firebaseio.com',
    projectId: 'scorecast-5f168',
    storageBucket: 'scorecast-5f168.appspot.com',
    messagingSenderId: '138861825009',
};
firebase.initializeApp(firebaseConfig);

// Add redux Firebase to compose
const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase, {
        userProfile: 'users', // firebase root where user profiles are stored
        useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
        enableLogging: false, // enable/disable Firebase's database logging
    })
)(createStore);

// Create store with reducers and initial state
export default createStoreWithMiddleware(rootReducer);
export { firebase };
