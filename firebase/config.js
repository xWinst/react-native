import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAffR1GZ2dHYCsc5lMVD7PSe1b-tOhvndE",
    authDomain: "rn-diary-3ad2c.firebaseapp.com",
    projectId: "rn-diary-3ad2c",
    storageBucket: "rn-diary-3ad2c.appspot.com",
    messagingSenderId: "348265886482",
    appId: "1:348265886482:web:3bcd5780d7f205af0ff9cb",
    measurementId: "G-77JCPHV0RH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
