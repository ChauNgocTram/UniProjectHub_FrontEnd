import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import { LOGIN_PAGE } from "./constant";


const PrivateRoute = ({children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    return  <Navigate to={`/auth/${LOGIN_PAGE}`} replace />;
  }
  return children;
};

export default PrivateRoute;
