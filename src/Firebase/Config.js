import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3vYKSSp3cShuQ6nGw7NL37R2edbTR50M",
    authDomain: "olx-clone-9ef65.firebaseapp.com",
    projectId: "olx-clone-9ef65",
    storageBucket: "olx-clone-9ef65.appspot.com",
    messagingSenderId: "782253496159",
    appId: "1:782253496159:web:0eeff180891f18b2f3c8ea",
    measurementId: "G-V0PV0B2TPN"
  };
export const Firebase = initializeApp(firebaseConfig)
export const auth  = getAuth(Firebase);
export const firestore = getFirestore(Firebase)
