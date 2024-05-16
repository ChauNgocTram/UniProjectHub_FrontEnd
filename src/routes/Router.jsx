import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import { CREATE_TEAM, LOGIN_PAGE, REGISTER_PAGE } from "./constant";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import CommonLayout from "../layouts/CommonLayout";
import CreateTeam from "../pages/Teams/CreateTeam/CreateTeam";

const appRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: CREATE_TEAM, element: <CreateTeam /> },
    ],
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
