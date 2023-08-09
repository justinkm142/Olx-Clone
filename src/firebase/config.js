// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import firebaseConfig1 from "../setting/firebase"
 

 

// AUTHENTICATION 
import {getAuth} from 'firebase/auth'


const firebaseConfig = firebaseConfig1


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)

export const storage = getStorage(app);
