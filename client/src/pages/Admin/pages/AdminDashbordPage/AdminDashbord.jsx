// import React from "react";
// import Layout from "../../Layout/Layout";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../../context/AuthProvider";
// import { toast } from "react-toastify";
// import "./AdminDashboard.css"; // Optional: create your own styles

// const AdminDashboard = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setAuth({
//       existUser: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     localStorage.removeItem("token");
//     toast.success("Logout successful");
//     navigate("/login");
//   };

//   return (
//     <Layout>
//       <div className="container-fluid">
//         <div className="row">
//           {/* Sidebar */}
//           <div className="sidebar col-8 col-lg-2">
//             <div className="py-4 px-3">
//               <Link to="/admindashboard" className="text-white">
//                 <div className="d-flex align-items-center gap-2">
//                   <i className="bi bi-speedometer2"></i>
//                   <span className="fs-5 fw-bold">Admin Panel</span>
//                 </div>
//               </Link>
//             </div>

//             <div className="sidebar-category ms-2">MANAGE</div>

//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admindashboard/manageallusers">
//                   <i className="bi bi-people-fill"></i>
//                   <span>Manage Users</span>//
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admindashboard/allcourses">
//                   <i className="bi bi-collection"></i>
//                   <span>All Courses</span>
//                 </Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/admindashboard/addcourse">
//                   <i className="bi bi-plus-circle"></i>
//                   <span>Add Course</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admindashboard/managecomments">
//                   <i className="bi bi-chat-dots"></i>{" "}
//                   {/* Better icon for comments */}
//                   <span>Manage Comments</span>
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admindashboard/add-quiz">
//                   <i className="bi bi-ui-checks"></i>
//                   <span>Add Quiz</span>
//                 </Link>
//               </li>
//             </ul>

//             <div className="divider ms-3"></div>
//             <div className="sidebar-category">SETTINGS</div>

//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <button className="nav-link w-100" onClick={handleLogout}>
//                   <i className="bi bi-box-arrow-in-right"></i>
//                   <span>Logout</span>
//                 </button>
//               </li>
//             </ul>
//           </div>

//           {/* Content Area */}
//           <div className="col-8 col-lg-10 p-4">
//             <Outlet />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default AdminDashboard;








import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import { toast } from "react-toastify";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      existUser: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Layout>
      <div className="admin-dashboard">
        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn d-lg-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="sidebar-overlay d-lg-none"
            onClick={closeSidebar}
          ></div>
        )}

        <div className="container-fluid p-0">
          <div className="row g-0">
            {/* Sidebar */}
            <div className={`col-lg-3 col-xl-2 sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
              <div className="sidebar-content">
                {/* Close button for mobile */}
                <button 
                  className="sidebar-close d-lg-none"
                  onClick={closeSidebar}
                  aria-label="Close sidebar"
                >
                  <i className="fas fa-times"></i>
                </button>

                <div className="py-4 px-3">
                  <Link to="/admindashboard" className="text-white">
                  <h4 className="fs-5 mb-0 text-center">
                    <i className="fas fa-user-shield me-2"></i>
                    Admin Panel
                  </h4>
                  </Link>
                </div>

                <nav className="nav flex-column px-2">
                  <div className="sidebar-category">MANAGE</div>
                  
                  <Link 
                    to="/admindashboard/manageallusers" 
                    className="nav-link"
                    onClick={closeSidebar}
                  >
                     
                   <i className="bi bi-people-fill"></i>
                    
                    <span>Manage Users</span>
                  </Link>
                  
                  <Link 
                    to="/admindashboard/allcourses" 
                    className="nav-link"
                    onClick={closeSidebar}
                  >
                   <i className="bi bi-collection"></i>
                    <span>All Courses</span>
                  </Link>
                  
                  <Link 
                    to="/admindashboard/addcourse" 
                    className="nav-link"
                    onClick={closeSidebar}
                  >
                     <i className="bi bi-plus-circle"></i>
                    <span>Add Course</span>
                  </Link>
                  
                  <Link 
                    to="/admindashboard/managecomments" 
                    className="nav-link"
                    onClick={closeSidebar}
                  >
                  <i className="bi bi-chat-dots"></i>{" "}
                    <span>Manage Comments</span>
                  </Link>
                  
                  <Link 
                    to="/admindashboard/add-quiz" 
                    className="nav-link"
                    onClick={closeSidebar}
                  >
                    <i className="bi bi-ui-checks"></i>
                    <span>Add Quiz</span>
                  </Link>

                  <div className="divider"></div>
                  
                  <div className="sidebar-category">SETTINGS</div>
                  
                  <button 
                    onClick={handleLogout} 
                    className="nav-link logout-btn"
                  >
                     <i className="bi bi-box-arrow-in-right"></i>
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="col-lg-9 col-xl-10">
              <div className="content-area">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;