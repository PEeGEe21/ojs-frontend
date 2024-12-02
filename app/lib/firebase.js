// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'; // For file uploads
import { getFirestore } from 'firebase/firestore'; // For Firestore DB
import { getAuth } from 'firebase/auth'; // For Authentication
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MESUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in your app
export const storage = getStorage(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
