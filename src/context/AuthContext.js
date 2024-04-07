import { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebaseConfig/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log(user);
      toast.success(`User ${user ? "signed in" : "signed out"}`);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
