// eventozaki — Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBddf9ZVly5EddbnbFJ2qOytWiYGMUyDAU",
  authDomain: "school-events-system.firebaseapp.com",
  projectId: "school-events-system",
  storageBucket: "school-events-system.firebasestorage.app",
  messagingSenderId: "529195393357",
  appId: "1:529195393357:web:29fae5fce10e69b6605704",
  measurementId: "G-8HD3TVFPL2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
