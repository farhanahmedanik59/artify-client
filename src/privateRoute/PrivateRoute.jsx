import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex";
import Login from "../components/Login/Login";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { loader, user } = useContext(AuthContex);
  const location = useLocation();

  if (loader) {
    return (
      <div className="h-[100vh] w-[100vw]">
        <LoadingPage></LoadingPage>
      </div>
    );
  }
  if (user) {
    return children;
  } else {
    return <Navigate state={{ from: location }} replace to={"/login"}></Navigate>;
  }
};

export default PrivateRoute;
