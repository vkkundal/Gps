// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoEhPaK1kGMMj5qN7j6duOxrW7YuYLJDM",
  authDomain: "gps-app-85827.firebaseapp.com",
  projectId: "gps-app-85827",
  storageBucket: "gps-app-85827.appspot.com",
  messagingSenderId: "394835870902",
  appId: "1:394835870902:web:1e58f9535ee3b557445217",
  measurementId: "G-GQYV16NE6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;