import React, { useEffect, useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { toast } from "react-toastify";
import { userDeleteAccount } from "../../../api/userApiFunctions/userApis";
import Swal from "sweetalert2";
import "./AdminHeader.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null); // ref for profile dropdown

  const [imgSrc, setImgSrc] = useState(
    auth?.existUser?.image ? `${API_BASE_URL}/${auth.existUser.image}` : null
  );

  const handleLogout = () => {
    setAuth({ existUser: null, token: "" });
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    toast.success("Admin logout successful");
    navigate("/login");
  };

  const deleteAccount = async () => {
    const token = auth.token;
    const email = auth.existUser.email;

    if (!token || !email) {
      toast.error("Authentication required to delete account.");
      return;
    }

    const result = await Swal.fire({
      title: "Delete Admin Account?",
      text: "This action cannot be undone. All admin data will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete account",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#f9fafb",
    });

    if (result.isConfirmed) {
      const response = await userDeleteAccount(email, token);
      if (response?.status === 200) {
        toast.success(response.data.message);
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        setAuth({ existUser: null, token: "" });
        navigate("/login");
      } else {
        toast.error(response?.data?.message || "Failed to delete account.");
      }
    }
  };

  useEffect(() => {
    if (auth?.existUser?.image) {
      setImgSrc(`${API_BASE_URL}/${auth.existUser.image}`);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [auth]);

  const getAdminName = (fullName) => {
    if (!fullName) return "Admin";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    }
    return `${parts[0].charAt(0).toUpperCase() + parts[0].slice(1)} ${parts[
      parts.length - 1
    ]
      .charAt(0)
      .toUpperCase()}.`;
  };
const getInitials = (name) => {
  if (!name) return "AD";

  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    // Return only first initial
    return parts[0].charAt(0).toUpperCase();
  }

  // Return only the first initial, skip the last one
  return parts[0].charAt(0).toUpperCase();
};

  return (
    <header className="admin-header">
      <nav className="admin-nav">
        <div className="nav-container">
          {/* Logo & Brand */}
          <div className="brand-section">
            <div className="logo-container">
              <div className="logo-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="brand-text">
                <h1>Admin Panel</h1>
                <p>E-Learning Management</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>

            {/* Profile Section */}
           {auth?.existUser && (
  <div className="profile-box">
    {imgSrc ? (
      <img
        src={imgSrc}
        alt="Admin Avatar"
        className="profile-avatar-large"
        onError={() => setImgSrc(null)}
      />
    ) : (
      <div className="profile-initials-large">
        {getInitials(auth.existUser.name)}
      </div>
    )}
    <div className="profile-info">
      <p className="profile-name">{getAdminName(auth.existUser.name)}</p>
      <p className="profile-role">Admin</p>
    </div>
  </div>
)}

          </div>
        </div>

        {/* Mobile Search */}
        {isMenuOpen && (
          <div className="mobile-search">
            <div className="mobile-search-container">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
