// AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

const AdminRoute = () => {
  const [auth] = useAuth();

  const isAdmin =
    auth?.existUser?.role === "admin" || auth?.existUser?.roll === "admin";

  if (!auth?.existUser) {
    return <div>Loading...</div>; // ensure auth loads first
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
