// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {initializeAuth, getReactNativePersistence} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeljgv6z7gSeAGQQsTgKNX90qgFHYG890",
  authDomain: "heilo-mind-research.firebaseapp.com",
  projectId: "heilo-mind-research",
  storageBucket: "heilo-mind-research.firebasestorage.app",
  messagingSenderId: "792929011478",
  appId: "1:792929011478:web:92fceac132ae9de578f237"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

//db
export const firestore = getFirestore(app);