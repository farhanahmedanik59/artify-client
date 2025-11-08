import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContex);
  if (user) {
    return children;
  }
};

export default PrivateRoute;
