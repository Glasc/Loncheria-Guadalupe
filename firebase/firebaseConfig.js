// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAC4shORPIMGCpoQ9r-_uzL7PsRIlOJdB0',
  authDomain: 'loncheria-f0541.firebaseapp.com',
  projectId: 'loncheria-f0541',
  storageBucket: 'loncheria-f0541.appspot.com',
  messagingSenderId: '518327927239',
  appId: '1:518327927239:web:af22cb284c943bca9dd9e2',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const auth = getAuth(app)

export default db
