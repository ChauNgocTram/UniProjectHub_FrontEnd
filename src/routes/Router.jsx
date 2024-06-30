import React from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import {
  ALL_PERSONAL_PROJECTS,
  ALL_PERSONAL_TASK,
  ALL_TASK,
  ALL_TEAM_PROJECTS,
  BLOG_MEMBER_TUTORIAL,
  CREATE_PERSONAL_PROJECT,
  CREATE_TEAM_PROJECT,
  EDIT_PERSONAL_PROJECT,
  EDIT_TEAM_PROJECT,
  GROUP_CHAT,
  LOGIN_PAGE,
  MEMBERS,
  PERSONAL_TASK_DETAILS,
  PROFILE,
  REGISTER_PAGE,
  TASK_COMPLETED,
  TASK_DETAILS,
  TASK_INPROGRESS,
  TASK_PENDING,
  TASK_TODO,
  TEACHER_SCHEDULE,
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
import TeamTaskLayout from "../layouts/TeamTaskLayout";
import Task from "../pages/Teams/TeamProjectDetails/AllTask/Task";
import TaskDetails from "../pages/Teams/TeamProjectDetails/AllTask/TaskDetails/TaskDetails";
import Members from "../pages/Teams/TeamProjectDetails/Members/Members"
import GeneralChat from "../pages/Teams/Chat/GeneralChat"
import Profile from "../pages/UserProfile/Profile";
import PersonalTaskLayout from "../layouts/PersonalTaskLayout"
import AllPersonalTask from "../pages/PersonalProject/PersonalProjectDetails/AllPersonalTask/AllPersonalTask";
import DetailedInfo from "../pages/PersonalProject/PersonalProjectDetails/AllPersonalTask/PersonalTaskDetails/DetailedInfo";
import TeacherSchedule from "../pages/TeacherSchedule/TeacherSchedule";
import Tutorial from "../pages/BlogMember/Tutorial";

const appRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: PROFILE, element: <Profile /> },
      { path: ALL_TEAM_PROJECTS, element: <AllTeamProject /> },
      { path: CREATE_TEAM_PROJECT, element: <CreateTeam /> },
      { path: EDIT_TEAM_PROJECT, element: <EditTeamProject/> },

      { path: GROUP_CHAT, element: <GeneralChat/>},

      { path: ALL_PERSONAL_PROJECTS, element: <AllPersonalProject /> },
      { path: CREATE_PERSONAL_PROJECT, element: <CreateProject /> },
      { path: EDIT_PERSONAL_PROJECT, element: <EditProject /> },

      { path: TEACHER_SCHEDULE, element: <TeacherSchedule /> },

      { path: BLOG_MEMBER_TUTORIAL, element: <Tutorial /> },
    ],
  },
  {
    path: "/du-an-nhom",
    element: <TeamTaskLayout />,
    children: [
      { path: ALL_TASK, element: <AllTask/> },
      { path: TASK_TODO, element: <Task/> },
      { path: TASK_INPROGRESS, element: <Task/> },
      { path: TASK_COMPLETED, element: <Task/> },
      { path: TASK_PENDING, element: <Task/> },

      { path: TASK_DETAILS, element: <TaskDetails/> },

      { path: MEMBERS, element: <Members/> },

     
    ],
  },
  {
    path: "/du-an-ca-nhan",
    element: <PersonalTaskLayout />,
    children: [
      { path: ALL_PERSONAL_TASK, element: <AllPersonalTask/> },
      { path: PERSONAL_TASK_DETAILS, element: <DetailedInfo/> },
      

     
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
