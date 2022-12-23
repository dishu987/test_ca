import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB07j7UHOxETsVHmYO77PDEn4yKEKJwLZY",
    authDomain: "zeitgeist-12de4.firebaseapp.com",
    projectId: "zeitgeist-12de4",
    storageBucket: "zeitgeist-12de4.appspot.com",
    messagingSenderId: "1057139878353",
    appId: "1:1057139878353:web:415e6d43208d2eead7d8f0",
    measurementId: "G-6XJ0PSDL6V"

};
const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export { app, provider };