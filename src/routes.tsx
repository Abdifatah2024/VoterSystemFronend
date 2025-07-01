// import { createBrowserRouter, Navigate } from "react-router-dom";
// import MainLayout from "./MainLayout";
// import SidebarLayout from "./Components/SidebarLayout";
// import { ProtectedRoute } from "./Components/ProtectedRoute";

// import Login from "./pages/Login/Login";
// import Dashboard from "./pages/Dashboard";
// import NotFoundPage from "./pages/NotFoundPage";
// import Voters from "./pages/Voters/Voters";
// import RegisterUser from "./pages/User/RegisterUser";
// import UserList from "./pages/User/UserList";
// import RegisterVoter from "./pages/Voters/CreateVoterForm";
// import UploadVoters from "./pages/Voters/UploadVoters";
// import ChangePassword from "./pages/User/ChangePassword";
// import CityDistrictReportComponent from "./pages/Voters/CityDistrictReportComponent";
// import VoterList from "./pages/Voters/VoterList";
// import VoterClanSearch from "./pages/Voters/VoterClanSearch";
// import ResetUserPassword from "./pages/User/ResetUserPassword";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />, // ✅ always show header
//     children: [
//       { path: "login", element: <Login /> },
//         { path: "ChangePassword", element: <ChangePassword/> },
       
//       {
//         element: <ProtectedRoute allowedRoles={["ADMIN", "USER"]} />,
//         children: [
//           {
//             path: "/",
//             element: <SidebarLayout />,
//             children: [
//               { index: true, element: <Navigate to="/dashboard" replace /> },
//               { path: "dashboard", element: <Dashboard /> },
//               // Add other protected routes here...
            
//                { path: "dashboard/voters", element: <Voters /> },
//                { path: "RegisterUser", element: <RegisterUser/> },
//                { path: "ListAll", element: <VoterList/> },
//                { path: "UserList", element: <UserList/> },
//                { path: "RegisterPerson", element: <RegisterVoter/> },
//                { path: "RegisterEcxel", element: <UploadVoters/> },
              
//                { path: "CityAndDistrict", element: <CityDistrictReportComponent/> },
//                { path: "VoterByClan", element: <VoterClanSearch/> },
//                { path: "admin/reset-user-password", element: <ResetUserPassword/> },

//             ],
//           },
//         ],
//       },
//       { path: "*", element: <NotFoundPage /> },
//     ],
//   },
// ]);
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
import RegisterVoter from "./pages/Voters/CreateVoterForm";
import UploadVoters from "./pages/Voters/UploadVoters";
import ChangePassword from "./pages/User/ChangePassword";
import CityDistrictReportComponent from "./pages/Voters/CityDistrictReportComponent";
import VoterList from "./pages/Voters/VoterList";
import VoterClanSearch from "./pages/Voters/VoterClanSearch";
import ResetUserPassword from "./pages/User/ResetUserPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // always show header
    children: [
      { path: "login", element: <Login /> },
      { path: "ChangePassword", element: <ChangePassword /> },

      {
        // Routes for ADMIN and USER
        element: <ProtectedRoute allowedRoles={["ADMIN", "USER"]} />,
        children: [
          {
            path: "/",
            element: <SidebarLayout />,
            children: [
              { index: true, element: <Navigate to="/dashboard" replace /> },
              { path: "dashboard", element: <Dashboard /> },
              { path: "RegisterEcxel", element: <UploadVoters /> },
              { path: "dashboard/voters", element: <Voters /> },
                 { path: "RegisterPerson", element: <RegisterVoter /> },
           
  
            ],
          },
        ],
      },

      {
        // Routes for ADMIN only
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          {
            path: "/",
            element: <SidebarLayout />,
            children: [
              { path: "RegisterUser", element: <RegisterUser /> },
              
              { path: "admin/reset-user-password", element: <ResetUserPassword /> },
                       
              { path: "CityAndDistrict", element: <CityDistrictReportComponent /> },
              { path: "VoterByClan", element: <VoterClanSearch /> },
                 { path: "ListAll", element: <VoterList /> },
              { path: "UserList", element: <UserList /> },
            ],
          },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
