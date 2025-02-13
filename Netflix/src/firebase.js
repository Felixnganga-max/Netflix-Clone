import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {toast} from 'react-toastify'

const firebaseConfig = {
  apiKey: "AIzaSyCCFbTNfBMZOeLAxtHbTABueGAVcki9wk0",
  authDomain: "netflix-b221a.firebaseapp.com",
  projectId: "netflix-b221a",
  storageBucket: "netflix-b221a.firebasestorage.app",
  messagingSenderId: "416635047947",
  appId: "1:416635047947:web:b169568fe6e1c55f2cf70e",
  measurementId: "G-HDCWCYHV3M",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

const logout = () => {
    signOut(auth)
}

export {auth, db, login, signup, logout}