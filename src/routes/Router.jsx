import React, { lazy, Suspense } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import {
  ALL_PERSONAL_PROJECTS,
  ALL_PERSONAL_TASK,
  ALL_TASK,
  ALL_TEAM_PROJECTS,
  BLOG_MEMBER,
  BLOG_MEMBER_TUTORIAL,
  CREATE_BLOG,
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
  SCHEDULE,
  TEACHER_SCHEDULE,
  SAVED_TEAM_PROJECT,
  DASHBOARD,
  PERSONAL_TASK_TODO,
  PERSONAL_TASK_INPROGRESS,
  PERSONAL_TASK_COMPLETED,
  PERSONAL_TASK_PENDING,
  CATEGORY,
} from "./constant";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const CommonLayout = lazy(() => import("../layouts/CommonLayout"));
const CreateTeam = lazy(() => import("../pages/Teams/ManageTeamProject/CreateTeam/CreateTeam"));
const CreateProject = lazy(() => import("../pages/PersonalProject/ManageProject/CreateProject"));
const AllTeamProject = lazy(() => import("../pages/Teams/TeamProjects/AllTeamProject"));
const AllPersonalProject = lazy(() => import("../pages/PersonalProject/AllPersonalProject"));
const EditProject = lazy(() => import("../pages/PersonalProject/ManageProject/EditProject"));
const EditTeamProject = lazy(() => import("../pages/Teams/ManageTeamProject/EditTeamProject"));
const AllTask = lazy(() => import("../pages/Teams/TeamProjectDetails/AllTask/AllTask"));
const TeamTaskLayout = lazy(() => import("../layouts/TeamTaskLayout"));
const TaskDetails = lazy(() => import("../pages/Teams/TeamProjectDetails/AllTask/TaskDetails/TaskDetails"));
const Members = lazy(() => import("../pages/Teams/TeamProjectDetails/Members/Members"));
const GeneralChat = lazy(() => import("../pages/Teams/Chat/GeneralChat"));
const Profile = lazy(() => import("../pages/UserProfile/Profile"));
const PersonalTaskLayout = lazy(() => import("../layouts/PersonalTaskLayout"));
const AllPersonalTask = lazy(() => import("../pages/PersonalProject/PersonalProjectDetails/AllPersonalTask/AllPersonalTask"));
const DetailedInfo = lazy(() => import("../pages/PersonalProject/PersonalProjectDetails/AllPersonalTask/PersonalTaskDetails/DetailedInfo"));
const Tutorial = lazy(() => import("../pages/BlogMember/Tutorial"));
const BlogMember = lazy(() => import("../pages/BlogMember/BlogMember"));
const CreateBlog = lazy(() => import("../pages/BlogMember/CreateBlog"));
const Schedule = lazy(() => import("../pages/TeacherSchedule/Schedule"));
const TeacherSchedule = lazy(() => import("../pages/TeacherSchedule/TeacherSchedule"));
const SavedProjectsPage = lazy(() => import("../pages/Teams/TeamProjects/SaveProjectPage"));

import PrivateRoute from "./PrivateRoute";
import Loading from "../components/Loading/Loading";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";
import CategoryList from "../pages/BlogMember/CategoryList";
import CategoryBlogs from "../pages/BlogMember/CategoryBlogs";
import AccountManagementPage from "../pages/Admin/AccountManagementPage";
const AppRouter = () => (
  <Suspense fallback={<Loading/>}>
    <Outlet />
  </Suspense>
);

const appRoutes = [
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: PROFILE, element: <Profile /> },
      {
        path: ALL_TEAM_PROJECTS,
        element: (
          <PrivateRoute>
            <AllTeamProject />
          </PrivateRoute>
        ),
      },
      { path: SAVED_TEAM_PROJECT, element: <SavedProjectsPage /> },
      { path: CREATE_TEAM_PROJECT, element: <CreateTeam /> },
      { path: EDIT_TEAM_PROJECT, element: <EditTeamProject /> },

      { path: GROUP_CHAT, element: <GeneralChat /> },

      {
        path: ALL_PERSONAL_PROJECTS,
        element: (
          <PrivateRoute>
            <AllPersonalProject />
          </PrivateRoute>
        ),
      },
      { path: CREATE_PERSONAL_PROJECT, element: <CreateProject /> },
      { path: EDIT_PERSONAL_PROJECT, element: <EditProject /> },
      
      { path: SCHEDULE, element: <Schedule /> },
      { path: TEACHER_SCHEDULE, element: <TeacherSchedule /> },

      { path: BLOG_MEMBER_TUTORIAL, element: <Tutorial /> },
      {
        path: BLOG_MEMBER,
        element: (
          <PrivateRoute>
            <BlogMember />
          </PrivateRoute>
        ),
      },
      { path: CREATE_BLOG, element: <CreateBlog /> },
      { path: CATEGORY, element: <CategoryList /> },
      { path: "/category/:categoryId", element: <CategoryBlogs  /> },
    ],
  },
  {
    path: "/du-an-nhom",
    element: <TeamTaskLayout />,
    children: [
      { path: ALL_TASK, element: <AllTask /> },
      { path: TASK_TODO, element: <AllTask /> },
      { path: TASK_INPROGRESS, element: <AllTask /> },
      { path: TASK_COMPLETED, element: <AllTask /> },
      { path: TASK_PENDING, element: <AllTask /> },      
      { path: MEMBERS, element: <Members /> },
    ],
  },
  {
    path: "/nhiem-vu",
    element: <TaskDetails />,
    children: [
      { path: TASK_DETAILS, element: <TaskDetails /> },

    ],
  },
  {
    path: "/du-an-ca-nhan",
    element: <PersonalTaskLayout />,
    children: [
      { path: ALL_PERSONAL_TASK, element: <AllPersonalTask /> },
      { path: PERSONAL_TASK_TODO, element: <AllPersonalTask /> },
      { path: PERSONAL_TASK_INPROGRESS, element: <AllPersonalTask /> },
      { path: PERSONAL_TASK_COMPLETED, element: <AllPersonalTask /> },
      { path: PERSONAL_TASK_PENDING, element: <AllPersonalTask /> },
      { path: PERSONAL_TASK_DETAILS, element: <DetailedInfo /> },
    ],
  },
  {
    path: "/nhiem-vu",
    element: <DetailedInfo />,
    children: [
      { path: PERSONAL_TASK_DETAILS, element: <DetailedInfo /> },

    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: LOGIN_PAGE, element: <Login /> },
      { path: REGISTER_PAGE, element: <Register /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "manage-user", element: <AccountManagementPage /> },
    ],
  },
];

export const router = createBrowserRouter([
  {
    element: <AppRouter />,
    children: appRoutes,
  },
]);
