import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { ROUTES_DATA } from "../../routes";

export default function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  return loading ? (
    <p>Loading...</p>
  ) : currentUser ? (
    children
  ) : (
    <Navigate to={ROUTES_DATA.AUTH.PROFILE.url} />
  );
}

// boolean check first
