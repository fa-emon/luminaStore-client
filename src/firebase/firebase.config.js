// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW_5xbqOKnp9Q7QoC-u8HRQGM6CzaE5i8",
  authDomain: "luminastore-client.firebaseapp.com",
  projectId: "luminastore-client",
  storageBucket: "luminastore-client.appspot.com",
  messagingSenderId: "223328285223",
  appId: "1:223328285223:web:be391f6a98da472c411402"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;