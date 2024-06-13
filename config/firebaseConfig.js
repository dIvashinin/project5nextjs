// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// we can console.log any of these to check if 
//they are visible. we also need to use our variable 'app' in our _app.js file
// and of course we must delete these console.logs before we deploy the project
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};
// console.log("Firebase Config: ", firebaseConfig);

// Initialize Firebase
// i am exporting these variables to be able to use them outside of this file

export const app = initializeApp(firebaseConfig);
// console.log("Firebase App: ", app);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
// console.log("Firebase Auth: ", auth);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// console.log('db', db)