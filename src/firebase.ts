import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpAmqFVMeqoXriWmRrWzfHP_yQtPYkvT8",
  authDomain: "adweb-5a8a4.firebaseapp.com",
  projectId: "adweb-5a8a4",
  storageBucket: "adweb-5a8a4.firebasestorage.app",
  messagingSenderId: "698397657379",
  appId: "1:698397657379:web:57a244592e7342ac45a496"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const collectionHuishoudboekjes = "huishoudboekjes";
export const collectionUsers = "users";
export const collectionInkomsten = "inkomsten";
export const collectionUitgaven = "uitgaven";
export const collectionCategorieen = "categorieen";