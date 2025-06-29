import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import SidebarLayout from "./Components/SidebarLayout";
import { ProtectedRoute } from "./Components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import Voters from "./pages/Voters/Voters";
import RegisterUser from "./pages/User/RegisterUser";
import UserList from "./pages/User/UserList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // ✅ always show header
    children: [
      { path: "login", element: <Login /> },
      {
        element: <ProtectedRoute allowedRoles={["ADMIN", "USER"]} />,
        children: [
          {
            path: "/",
            element: <SidebarLayout />,
            children: [
              { index: true, element: <Navigate to="/dashboard" replace /> },
              { path: "dashboard", element: <Dashboard /> },
              // Add other protected routes here...
               { path: "dashboard/voters", element: <Voters /> },
               { path: "RegisterUser", element: <RegisterUser/> },
               { path: "UserList", element: <UserList/> },
            ],
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
