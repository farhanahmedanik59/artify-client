import React, { useContext } from "react";
import { AuthContex } from "../contexts/AuthContex";
import Login from "../components/Login/Login";
import LoadingPage from "../components/LoadingPage/LoadingPage";

const PrivateRoute = ({ children }) => {
  const { loader, user } = useContext(AuthContex);
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
    return <Login></Login>;
  }
};

export default PrivateRoute;
