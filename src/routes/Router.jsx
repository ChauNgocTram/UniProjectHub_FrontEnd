import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import { LOGIN_PAGE, REGISTER_PAGE } from "./constant";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";

const appRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: LOGIN_PAGE, element: <Login /> },
      { path: REGISTER_PAGE, element: <Register /> },
    ],
    //
  },
];

export const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: appRoutes,
  },
]);
