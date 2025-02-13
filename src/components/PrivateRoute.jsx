import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // Ensure the correct path to firebase.js

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Loading...</div>; // Optional: Add a loading state

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
