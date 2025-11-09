import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex";
import Login from "../components/Login/Login";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContex);
  if (user) {
    return children;
  } else {
    return <Login></Login>;
  }
};

export default PrivateRoute;
