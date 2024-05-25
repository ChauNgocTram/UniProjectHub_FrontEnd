import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import {
  ALL_PERSONAL_PROJECTS,
  ALL_TASK,
  ALL_TEAM_PROJECTS,
  CREATE_PERSONAL_PROJECT,
  CREATE_TEAM_PROJECT,
  EDIT_PERSONAL_PROJECT,
  EDIT_TEAM_PROJECT,
  LOGIN_PAGE,
  REGISTER_PAGE,
  TASK_COMPLETED,
  TASK_DETAILS,
  TASK_INPROGRESS,
  TASK_PENDING,
  TASK_TODO,
} from "./constant";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout";
import CommonLayout from "../layouts/CommonLayout";
import CreateTeam from "../pages/Teams/ManageTeamProject/CreateTeam/CreateTeam";
import CreateProject from "../pages/PersonalProject/ManageProject/CreateProject";
import AllTeamProject from "../pages/Teams/TeamProjects/AllTeamProject";
import AllPersonalProject from "../pages/PersonalProject/AllPersonalProject";
import EditProject from "../pages/PersonalProject/ManageProject/EditProject";
import EditTeamProject from "../pages/Teams/ManageTeamProject/EditTeamProject";
import AllTask from "../pages/Teams/TeamProjectDetails/AllTask/AllTask";
import TeamLayout from "../layouts/TeamLayout";
import Task from "../pages/Teams/TeamProjectDetails/AllTask/Task";
import TaskDetails from "../pages/Teams/TeamProjectDetails/AllTask/TaskDetails/TaskDetails";

const appRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: ALL_TEAM_PROJECTS, element: <AllTeamProject /> },
      { path: CREATE_TEAM_PROJECT, element: <CreateTeam /> },
      { path: EDIT_TEAM_PROJECT, element: <EditTeamProject/> },

      { path: ALL_PERSONAL_PROJECTS, element: <AllPersonalProject /> },
      { path: CREATE_PERSONAL_PROJECT, element: <CreateProject /> },
      { path: EDIT_PERSONAL_PROJECT, element: <EditProject /> },
    ],
  },
  {
    path: "/du-an-nhom",
    element: <TeamLayout />,
    children: [
      { path: ALL_TASK, element: <AllTask/> },
      { path: TASK_TODO, element: <Task/> },
      { path: TASK_INPROGRESS, element: <Task/> },
      { path: TASK_COMPLETED, element: <Task/> },
      { path: TASK_PENDING, element: <Task/> },

      { path: TASK_DETAILS, element: <TaskDetails/> },
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
