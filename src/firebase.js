import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmhbpwpPmONd-5yD6O_BQPj5N1fPBAqVI",
    authDomain: "recipe-app-ad226.firebaseapp.com",
    projectId: "recipe-app-ad226",
    storageBucket: "recipe-app-ad226.appspot.com",
    messagingSenderId: "1016486972656",
    appId: "1:1016486972656:web:984460f73536c85a640635"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;