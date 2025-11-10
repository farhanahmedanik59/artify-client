import React, { useEffect, useState } from "react";
import { AuthContex } from "./AuthContex";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";

const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);

  //SignUp new users
  const signUp = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signIn user
  const signIn = (eamil, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, eamil, password);
  };

  // googleSignIn
  const signInWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authuser) => {
      setUser(authuser);
      setLoader(false);
    });
    return () => unsubscribe();
  }, [user]);

  const userInfo = {
    user,
    loader,
    signUp,
    signIn,
    signInWithGoogle,
    setUser,
  };
  return <AuthContex value={userInfo}>{children}</AuthContex>;
};

export default AuthProvider;
