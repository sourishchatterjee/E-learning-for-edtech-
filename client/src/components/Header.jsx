
// import React, { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Frame1 from "../assets/Frame 1.png";
// import Vector from "../assets/Vector.png"; // Default icon
// import { useAuth } from "../context/AuthProvider";
// import { toast } from "react-toastify";
// import { userDeleteAccount } from "../api/userApiFunctions/userApis";
// import Swal from "sweetalert2";
// import './Header.css'; 

// const Header = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   // Local state for fallback in case image fails to load
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   const [imgSrc, setImgSrc] = useState(
//     auth?.existUser?.image ? `${API_BASE_URL}/${auth.existUser.image}` : Vector
//   );



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





// const deleteAccount = async () => {
//   const token = auth.token;
//   const email = auth.existUser.email;

//   if (!token || !email) {
//     toast.error("To delete account, login first.");
//     return;
//   }

//   // SweetAlert confirmation
//   const result = await Swal.fire({
//     title: "Are you sure?",
//     text: "Once deleted, your account cannot be recovered!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     cancelButtonColor: "#3085d6",
//     confirmButtonText: "Yes, delete it!",
//     cancelButtonText: "Cancel",
//   });

//   if (result.isConfirmed) {
//     const response = await userDeleteAccount(email, token);
//     if (response && response?.status === 200) {
//       toast.success(response.data.message);
//       localStorage.removeItem("auth");
//       localStorage.removeItem("token");
//       setAuth({
//         existUser: null,
//         token: "",
//       });
//       navigate("/register");
//     } else {
//       toast.error(response?.data?.message || "Failed to delete account.");
//     }
//   }
// };



//   // Whenever auth changes, update imgSrc
//   useEffect(() => {
//     if (auth?.existUser?.image) {
//       setImgSrc(`${API_BASE_URL}/${auth.existUser.image}`);
//       console.log('auth', auth);

//       console.log('useEffect setting imgsrc from auth', `${API_BASE_URL}/${auth.existUser.image}`);

//     } else {
//       setImgSrc(Vector);
//       console.log('useeffect setting imgsrc from vector');
//     }
//   }, [auth]);




//   const getFirstName = (fullName) => {
//     if (!fullName) return "";
//     const first = fullName.trim().split(" ")[0];
//     return first.charAt(0).toUpperCase() + first.slice(1);
//   };


//   return (
//     <header>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm py-2">
//         <div className="container">
//           {/* Logo */}
//           <NavLink className="navbar-brand" to="/">
//             <img src={Frame1} alt="Logo" height="60" />
//           </NavLink>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNavDropdown"
//             aria-controls="navbarNavDropdown"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Navbar Content */}
//           <div className="collapse navbar-collapse" id="navbarNavDropdown">
//             {/* Center Nav Links */}
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/">Home</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/about">About Us</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/courses">Courses</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
//               </li>
//             </ul>

//             {/* User Dropdown */}
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle d-flex align-items-center gap-2"
//                   href="#"
//                   id="userDropdown"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                 >
//                   <img
//                     src={imgSrc}
//                     alt="User Icon"
//                     height="50"
//                     width="50"
//                     className="rounded-circle object-fit-cover"
//                     onError={() => setImgSrc(Vector)}
//                   />
//                   {auth?.existUser?.name && (
//                     <span className="fw-medium">
//                       {getFirstName(auth.existUser.name)}
//                     </span>
//                   )}

//                 </a>

//                 <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
//                   {auth?.existUser ? (
//                     <>
//                       <li>
//                         <NavLink className="dropdown-item" to="/user-dashboard">
//                           DashBoard
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink className="dropdown-item" to="/update-user">
//                           Update Account
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink className="dropdown-item" to="/user-change-password">
//                           Change Password
//                         </NavLink>
//                       </li>
//                       <li className="px-3 py-1">
//                         <button
//                           className="btn btn-danger btn-sm w-100"
//                           onClick={deleteAccount}
//                         >
//                           Delete Account
//                         </button>
//                       </li>

//                       <li className="px-3">
//                         <button
//                           className="btn btn-outline-danger btn-sm w-100"
//                           onClick={handleLogout}
//                         >
//                           Logout
//                         </button>
//                       </li>
//                     </>
//                   ) : (
//                     <>
//                       <li>
//                         <NavLink className="dropdown-item" to="/register">
//                           Register
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink className="dropdown-item" to="/login">
//                           Log In
//                         </NavLink>
//                       </li>
//                       <li>
//                         <NavLink className="dropdown-item" to="/forgot-password">
//                           Forgot Password
//                         </NavLink>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;





















import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Frame1 from "../assets/Frame 1.png";
import Vector from "../assets/Vector.png";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { userDeleteAccount } from "../api/userApiFunctions/userApis";
import Swal from "sweetalert2";
import './Header.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [imgSrc, setImgSrc] = useState(
    auth?.existUser?.image ? `${API_BASE_URL}/${auth.existUser.image}` : Vector
  );

  const handleLogout = () => {
    setAuth({ existUser: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    toast.success("Logout successful");
    navigate("/login");
  };

  const deleteAccount = async () => {
    const token = auth.token;
    const email = auth.existUser.email;

    if (!token || !email) {
      toast.error("To delete account, login first.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, your account cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const response = await userDeleteAccount(email, token);
      if (response?.status === 200) {
        toast.success(response.data.message);
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        setAuth({ existUser: null, token: "" });
        navigate("/register");
      } else {
        toast.error(response?.data?.message || "Failed to delete account.");
      }
    }
  };

  useEffect(() => {
    if (auth?.existUser?.image) {
      setImgSrc(`${API_BASE_URL}/${auth.existUser.image}`);
    } else {
      setImgSrc(Vector);
    }
  }, [auth]);

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    const first = fullName.trim().split(" ")[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg shadow-sm py-2">
        <div className="container">
          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <img src={Frame1} alt="Logo" height="80" style={{ height: '60px' }} />
          </NavLink>

          {/* Toggler */}
          {/* <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{color:"white"}}
          >
            <span className="navbar-toggler-icon "></span>
          </button> */}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars text-white"></i> {/* FontAwesome icon */}
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            {/* Center Links */}
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/courses">Courses</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
              </li>
            </ul>

            {/* Auth Buttons or User Dropdown */}
            <div className="d-flex flex-column flex-lg-row align-items-center gap-2 ms-lg-3">
              {!auth?.existUser ? (
                <>
                  <NavLink to="/register" className="custom-auth-btn-outline text-decoration-none text-center">
                    Register
                  </NavLink>
                  <NavLink to="/login" className="custom-auth-btn-filled text-decoration-none text-center">
                    Login
                  </NavLink>
                </>
              ) : (
                <div className="nav-item dropdown">
                  {/* <a
                    className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={imgSrc}
                      alt="User Icon"
                      height="50"
                      width="50"
                      className="rounded-circle object-fit-cover"
                      onError={() => setImgSrc(Vector)}
                    />
                    <span className="fw-medium">
                      {getFirstName(auth.existUser.name)}
                    </span>
                  </a> */}

                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={imgSrc}
                      alt="User Icon"
                      height="50"
                      width="50"
                      className="rounded-circle object-fit-cover"
                      onError={() => setImgSrc(Vector)}
                    />
                    <span className="fw-medium text-white" style={{ fontSize: '1.2rem' }}>
                      {getFirstName(auth.existUser.name)}
                    </span>
                    <button
                      className="btn dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ border: 'none', background: 'transparent', color: 'white' }}
                    ></button>
                  </div>


                  <ul className="dropdown-menu dropdown-menu-toggle" aria-labelledby="userDropdown">
                    <li>
                      <NavLink className="dropdown-item" to="/user-dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/update-user">Update Account</NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/user-change-password">Change Password</NavLink>
                    </li>
                    <li className="px-3 py-1">
                      <button className="btn btn-danger btn-sm w-100" onClick={deleteAccount}>
                        Delete Account
                      </button>
                    </li>
                    <li className="px-3">
                      <button className="btn btn-outline-danger btn-sm w-100" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>

  );
};

export default Header;
