// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  apiKey: "AIzaSyBjxJFUpwMGzYCGIH7o8JAXNARVKdQ-zjM",
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: 'loncheria-guadalupe',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
} 

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const auth = getAuth(app)

export default db
