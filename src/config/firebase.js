import { initializeApp } from "firebase/app";
// import "firebase/firestore";
import "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const emailAuth = getAuth();
const user = getAuth().currentUser;
const emailProvider = new EmailAuthProvider();

export { emailAuth, emailProvider, user };

// const { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } = firebase.auth
// const analytics = getAnalytics(app);
// export const db = firebase.firestore();
