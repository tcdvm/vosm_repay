// import * as firebase from 'firebase'
// import firebase from 'firebase/app';
// import database from 'firebase/database';
import firebase from 'firebase/app';
import 'firebase/database';

const app = firebase.initializeApp({
    // apiKey: "AIzaSyBnGL1bhyZRc8ggTM-vNrDFPDe84SNmqkU",
    // authDomain: "vosm-9a086.firebaseapp.com",
    databaseURL: "https://vosm-9a086.firebaseio.com",
    // projectId: "vosm-9a086",
    // storageBucket: "vosm-9a086.appspot.com",
    // messagingSenderId: "317683484107"
})

export const db = app.database();
export const attendeesRef = db.ref('attendees');
export const dipRegistrantNumberRef = db.ref('dipRegistrantNumber');