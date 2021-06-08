import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCjENNaWZZovW78WdGkqm316ZLc5G53aQ",
    authDomain: "unichat-9e151.firebaseapp.com",
    projectId: "unichat-9e151",
    storageBucket: "unichat-9e151.appspot.com",
    messagingSenderId: "279210453986",
    appId: "1:279210453986:web:915c8641a150877bb627bb",
    measurementId: "G-BK82M3NM76"
}
export const auth = firebase.initializeApp(firebaseConfig).auth();