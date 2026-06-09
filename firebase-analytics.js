import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbjH9n2kd4JOsWiVbECXUhZxV9Ax9UWqA",
  authDomain: "legal-and-vakil-45a5b.firebaseapp.com",
  projectId: "legal-and-vakil-45a5b",
  storageBucket: "legal-and-vakil-45a5b.firebasestorage.app",
  messagingSenderId: "683462356095",
  appId: "1:683462356095:web:b31122014774194264234a",
  measurementId: "G-4B4FVX5DFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase Analytics initialized");
