import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB_m2Fyrr3oNsSsrLtdWNeEzRdf5encLUc",
    authDomain: "instagram-clone-react-7fe48.firebaseapp.com",
    projectId: "instagram-clone-react-7fe48",
    storageBucket: "instagram-clone-react-7fe48.appspot.com",
    messagingSenderId: "996781548725",
    appId: "1:996781548725:web:777f526cf6ffab13c10afc",
    measurementId: "G-E2KHRP1RR3"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage}