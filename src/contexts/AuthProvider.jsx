import React from "react";
import { AuthContex } from "./AuthContex";

const AuthProvider = ({ children }) => {
  const name = "anik";
  const userInfo = () => {
    name;
  };
  return <AuthContex value={userInfo}>{children}</AuthContex>;
};

export default AuthProvider;
