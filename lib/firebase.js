import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyArDMwfNnCXj7xSAwtd_ovIIT1Likd6bcs",
    authDomain: "relikt-b74a6.firebaseapp.com",
    projectId: "relikt-b74a6",
    storageBucket: "relikt-b74a6.appspot.com",
    messagingSenderId: "985666558766",
    appId: "1:985666558766:web:2bdad1eeb19f64222338bf",
    measurementId: "G-60FDK4PYN0"
};
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();