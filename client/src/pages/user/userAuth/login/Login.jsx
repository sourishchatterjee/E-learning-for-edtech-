

import React, { useState } from 'react';
import './Login.css';
import codingamico2 from '../../../../assets/Coding-amico 2.png';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Layout from '../../../../layout/Layout';
import { useAuth } from '../../../../context/AuthProvider';
import { loginUser } from '../../../../api/userApiFunctions/userApis';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await loginUser(data);
    if (response && response?.status === 200) {
      setAuth({
        ...auth,
        existUser: response.data.existUser,
        token: response.data.token,
      });

      localStorage.setItem("auth", JSON.stringify(response?.data));
      localStorage.setItem("token", response?.data.token);

      toast.success(response?.data?.message);
      setLoading(false);
      navigate("/", { replace: true });
    } else {
      setLoading(false);
      toast.error(response?.data?.message);
    }
  };

  return (
    <Layout>
      <section className="main-section py-5">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Left Side (Illustration) */}
            <div className="col-12 col-md-6 text-center">
              <img
                src={codingamico2}
                className="img-fluid"
                alt="Coding Illustration"
              />
            </div>

            {/* Right Side (Form) */}
            <div className="col-12 col-md-6">
              <div className="bg-light shadow rounded-4 p-4 p-md-5">
                <h2 className="text-center fw-bold mb-4" style={{ color: 'purple' }}>
                  Log In
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-info">Email</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fa-solid fa-envelope form-icon"></i>
                      </span>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Enter Your Email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <small className="text-danger">{errors.email.message}</small>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-info">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock form-icon"></i>
                      </span>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="••••••••"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                            message:
                              "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <small className="text-danger">{errors.password.message}</small>
                    )}
                    <div className="text-end mt-2">
                      <Link to="/forgot-password" className="small text-decoration-none text-primary">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary fw-bold w-100 py-3 rounded-3 mt-3 d-flex justify-content-center align-items-center gap-2"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          style={{ width: "1rem", height: "1rem" }}
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Logging in...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>

                  {/* Optional: Social Login Divider (commented out) */}

                  {/* Sign Up Link */}
                  <p className="text-center text-muted small mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none text-primary">
                      Sign Up Here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
