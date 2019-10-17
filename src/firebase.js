import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBNZUGIdFEzFXjQlLrebfQklFkT1Oa4n3A",
    authDomain: "food-b2523.firebaseapp.com",
    databaseURL: "https://food-b2523.firebaseio.com",
    projectId: "food-b2523",
    storageBucket: "food-b2523.appspot.com",
    messagingSenderId: "201802274332",
    appId: "1:201802274332:web:2d81176601dd441e66b1d9",
    measurementId: "G-Z9FVE0PP6J"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;
