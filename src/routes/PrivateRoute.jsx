import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/userSlice";
import { LOGIN_PAGE } from "./constant";
import { alert } from "../components/Alert/Alert";


const PrivateRoute = ({children }) => {
  const user = useSelector(selectUser);
  if (!user) {
    alert.alertInfoNotiForTrainee(
      "Vui lòng đăng nhập để sử dụng tính năng này!",
      "",
      2000,
      "25"
    );
    return  <Navigate to={`/auth/${LOGIN_PAGE}`} replace />;
  }

  if (user.userId === 'fb18366e-10e8-4688-874e-120afbc8dad1') {
    return <Navigate to="/admin/dashboard" />;
  }
  
  return children;
};

export default PrivateRoute;
