import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import { jwtDecode } from "jwt-decode";
import type { Role } from "../types/Login";

interface JwtPayload {
  userId: number;
  userName: string;
  role: string;
  exp: number;
  iat: number;
}

const Dashboard: React.FC = () => {
  // Get token from Redux or localStorage
  const reduxToken = useSelector(
    (state: RootState) => state.loginSlice.data.Access_token
  );
  const token = reduxToken || localStorage.getItem("Access_token");

  let userInfo: { userName: string; role: string } = {
    userName: "Unknown",
    role: "Unknown",
  };

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      userInfo = {
        userName: decoded.userName,
        role: decoded.role as Role,
      };
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-700 mb-4">Welcome, <span className="font-semibold">{userInfo.userName}</span>!</p>
        <p className="text-gray-600">Your role: <span className="font-medium">{userInfo.role}</span></p>
      </div>
    </main>
  );
};

export default Dashboard;
