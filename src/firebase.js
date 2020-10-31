import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBdl4bt7DJsy2LhGDPEkTy9M8K5CMUT17M",
    authDomain: "instagram-clone-bysaikrishnap.firebaseapp.com",
    databaseURL: "https://instagram-clone-bysaikrishnap.firebaseio.com",
    projectId: "instagram-clone-bysaikrishnap",
    storageBucket: "instagram-clone-bysaikrishnap.appspot.com",
    messagingSenderId: "226157958086",
    appId: "1:226157958086:web:7325ec2bb4bd820ff118c7",
    measurementId: "G-YKSVNGWBCG"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
