import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
// import codingAmico from "../../assets/forgotPassword/Coding-amico2.png";
import codingAmico from "../../../assets/forgotPassword/Coding-amico2.png";
import { sendOtp } from "../../../api/userApiFunctions/userApis";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Layout from "../../../layout/Layout";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await sendOtp(data.email);
      if (res?.status === 200) {
        toast.success(res.data.message);
        navigate(`/verify-otp/${data.email}`,{ replace: true });
      } else {
        toast.error(res?.data?.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <Layout>
      <section className="main-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="illustration-container text-center">
                <img
                  src={codingAmico}
                  className="img-fluid illustration-img"
                  alt="Coding Illustration"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-container">
                <div className="glass-effect p-4 p-md-5 shadow rounded">
                  <h2 className="text-center mb-4" style={{color:"violet"}}>Forget Password</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <input
                          type="email"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          id="email"
                          placeholder="Enter Your Email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              message: "Invalid email address",
                            },
                          })}
                        />
                        {errors.email && (
                          <div className="invalid-feedback">{errors.email.message}</div>
                        )}
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send OTP"}
                    </button>

                    <div className="divider d-flex align-items-center my-3">
                      <div className="flex-grow-1 border-top"></div>
                      <span className="mx-2 text-muted small">Or Continue With</span>
                      <div className="flex-grow-1 border-top"></div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 mb-3">
                      <Link to="#" className="social-icon facebook text-decoration-none text-primary">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      <Link to="#" className="social-icon google text-decoration-none text-danger">
                        <i className="fab fa-google"></i>
                      </Link>
                      <Link to="#" className="social-icon twitter text-decoration-none text-info">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </div>

                    <p className="text-center small mt-2 text-white">
                      Don't Have An Account?{" "}
                      <Link to="/register" className="sign-up-link text-decoration-none">
                        Sign Up Here
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForgotPassword;
