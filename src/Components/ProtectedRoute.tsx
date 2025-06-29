import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import type { RootState } from "../Redux/store";

export interface ProtectedRouteProps {
  allowedRoles?: ("ADMIN" | "USER")[];
}

interface JwtPayload {
  userId: number;
  userName: string;
  role: "ADMIN" | "USER";
  exp: number;
  iat: number;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const reduxToken = useSelector(
    (state: RootState) => state.loginSlice.data.Access_token
  );
  const token = reduxToken || localStorage.getItem("Access_token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles || !allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }
};
