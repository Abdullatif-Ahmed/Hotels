import { createContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [savedHotels, setSavedHotels] = useState([]);
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function handleSave(id, name, imgUrl) {
    const existing = savedHotels.some((h) => h.id === id);
    if (existing) {
      try {
        await updateDoc(doc(db, "users", user?.uid), {
          savedHotels: savedHotels.filter((h) => h.id !== id),
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await updateDoc(doc(db, "users", user?.uid), {
          savedHotels: arrayUnion({
            id,
            name,
            imgUrl,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setSavedHotels(doc.data().savedHotels);
        });
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, logOut, logIn, user, savedHotels, handleSave }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
