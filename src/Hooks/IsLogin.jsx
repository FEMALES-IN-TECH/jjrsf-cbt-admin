import { Navigate } from "react-router-dom";

export const isAuthenticated = () => {
  return localStorage.getItem("token"); // Returns token if available
};

export const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};
