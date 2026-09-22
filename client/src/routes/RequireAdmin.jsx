// import { Navigate, Outlet } from "react-router-dom";

// const RequireAdmin = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (user.roll?.toLowerCase() === "user") {
//     return <Navigate to="/" replace />;
//   }

//   if (user.roll?.toLowerCase() !== "admin") {
//     return <Navigate to="/unauthorized" replace />;
//   }
 
//   return <Outlet />;
// };

// export default RequireAdmin;
