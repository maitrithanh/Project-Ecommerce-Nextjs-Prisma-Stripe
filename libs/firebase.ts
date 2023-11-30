// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkFBwXpd-GBUPfXHQuv_F5hZe9etL7dkU",
  authDomain: "tri-thanh-shop.firebaseapp.com",
  projectId: "tri-thanh-shop",
  storageBucket: "tri-thanh-shop.appspot.com",
  messagingSenderId: "315186704772",
  appId: "1:315186704772:web:6c210072ae57ee68996dd1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp