// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Firebase configuration (Use your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDbeyjqIAaRapU4yggQ-giUPsb3TQWK2rw",
  authDomain: "farmersmarket-207ad.firebaseapp.com",
  projectId: "farmersmarket-207ad",
  storageBucket: "farmersmarket-207ad.appspot.com",
  messagingSenderId: "812244167943",
  appId: "1:812244167943:web:e26d7354247eca02f469a2",
  measurementId: "G-008H0CTRCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
