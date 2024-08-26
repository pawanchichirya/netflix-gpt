/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAql8amsVtCOKNPA3H80n_uRwPX7gyr0i4",
  authDomain: "netflixgpt-5c6f0.firebaseapp.com",
  projectId: "netflixgpt-5c6f0",
  storageBucket: "netflixgpt-5c6f0.appspot.com",
  messagingSenderId: "819892733085",
  appId: "1:819892733085:web:7f071c4d55de8902070074",
  measurementId: "G-CE1DNZWRD0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();