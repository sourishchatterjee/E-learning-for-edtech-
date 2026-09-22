import React from 'react';
import Layout from '../../../../layout/Layout';
import './UserDashboard.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthProvider';
import { toast } from 'react-toastify';

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    
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

    return (
        <>
            <Layout>
                <div className="container-fluid">
                    <div className="row">

                        {/* Sidebar */}
                        <div className="sidebar col-4 col-lg-2">
                            <div className="py-4 px-3">
                               <Link to="/user-dashboard" className='text-white'>
                               <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-grid-1x2-fill"></i>
                                    <span className="fs-5 fw-bold">Dashboard</span>
                                </div>
                               </Link>
                            </div>

                            <div className="sidebar-category ms-2">ACADEMIC</div>

                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard/enrolled-courses">
                                        <i className="bi bi-book"></i>
                                        <span>Enrolled Courses</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard/quiz-performance">
                                        <i className="bi bi-graph-up-arrow"></i>
                                        <span>Quiz Performance</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard/certificates">
                                        <i className="bi bi-bar-chart-line"></i>
                                        <span>Certificates</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard/selected-courses">
                                        <i className="bi bi-heart-fill"></i>
                                        <span>Selected Courses</span>
                                    </Link>
                                </li>
                            </ul>

                            <div className="divider ms-3"></div>
                            <div className="sidebar-category">SETTINGS</div>

                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <button className="nav-link w-100" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                            </ul>
                        </div>


                        <Outlet/>

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default UserDashboard;


