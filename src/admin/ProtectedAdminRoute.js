import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedAdminRoute({ element, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      element={user && user.role === "admin" ? element : <Navigate to="/login" />}
    />
  );
}

export default ProtectedAdminRoute;
