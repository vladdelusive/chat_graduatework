import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/database'

const config = {
    apiKey: "AIzaSyDh8jwIC1dr8cznmteS3jGgrCW-pmuQAKE",
    authDomain: "electron-chat-test-47c35.firebaseapp.com",
    databaseURL: "https://electron-chat-test-47c35.firebaseio.com",
    projectId: "electron-chat-test-47c35",
    storageBucket: "electron-chat-test-47c35.appspot.com",
    messagingSenderId: "1006786790325",
    appId: "1:1006786790325:web:dc7a12822cda97686a8ffc",
    measurementId: "G-YJ0E1D34G2"
};

export const { Timestamp } = firebase.firestore

const FB = firebase.initializeApp(config)

export const db = FB.firestore();
// export const database = FB.database();

export const createStorageRef = async (file, fileName, callback) => {
    const fullPath = 'photos/' + fileName;
    const storageRef = firebase.storage().ref(fullPath)
    await storageRef.put(file)
    return storageRef.getDownloadURL()
}