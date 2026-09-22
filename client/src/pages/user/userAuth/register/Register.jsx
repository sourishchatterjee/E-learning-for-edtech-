


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import { toast } from "react-toastify";
import Layout from "../../../../layout/Layout";
import { registerUser } from "../../../../api/userApiFunctions/userApis";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const registerData = new FormData();
    registerData.append("name", data.name);
    registerData.append("email", data.email);
    registerData.append("password", data.password);
    if (data.image[0]) {
      registerData.append("image", data.image[0]);
    }
    const response = await registerUser(registerData);

    if (response && response?.status === 201) {
      toast.success(response?.data?.message);
      setLoading(false);
      reset();
    } else {
      setLoading(false);
      toast.error(response?.data?.message);
    }
  };

  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      setPreviewImage(URL.createObjectURL(file));
    }
  }, [imageFile]);

  const validateImage = (files) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!files.length) return "Image is required";
    const file = files[0];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, JPEG, and PNG images are allowed";
    }
    return true;
  };

  return (
    <Layout>
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-4 px-3 bg">
        <div className="container-fluid" style={{ maxWidth: "900px" }}>
          <div className="position-relative overflow-hidden rounded-4 shadow">
            <div className="background-image d-flex align-items-center justify-content-center p-4">
              <div
                className="glass-effect rounded-3 shadow p-4 p-md-5 animate-fade-in"
                style={{ maxWidth: "480px" }}
              >
                <h2 className="text-white text-center fw-bold mb-4 fs-1">Create Account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Full Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label text-white fw-semibold">
                      Full Name
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-user form-icon"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="John Doe"
                        {...register("name", {
                          required: "Full name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters",
                          },
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Name can only contain letters and spaces",
                          },
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-danger small mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label text-white fw-semibold">
                      Email Address
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-envelope form-icon"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="example@email.com"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-danger small mt-1">{errors.email.message}</p>
                    )}
                    <div className="form-text text-white opacity-75 small">
                      We'll never share your email with anyone else.
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white fw-semibold">
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-lock form-icon"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="••••••••"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                              "Password must include uppercase, lowercase, number, and special character",
                          },
                        })}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-danger small mt-1">{errors.password.message}</p>
                    )}
                    <div className="form-text text-white opacity-75 small">
                      Your password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.
                    </div>
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label text-white fw-semibold">
                      Upload Image
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-file-upload form-icon"></i>
                      </span>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        {...register("image", { validate: validateImage })}
                      />
                    </div>
                    {errors.image && (
                      <p className="text-danger small mt-1">{errors.image.message}</p>
                    )}
                    <div className="form-text text-white opacity-75 small">
                      Supported formats: JPG, JPEG, PNG (Max. 5MB)
                    </div>
                    {previewImage && (
                      <div className="d-flex justify-content-center mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          width="200"
                          height="200"
                          style={{ borderRadius: "5px", objectFit: "cover" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-register text-white fw-bold w-100 py-3 rounded-3 border-0 mt-3 d-flex justify-content-center align-items-center gap-2"
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
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
                <p className="text-white text-center fw-medium mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="login-link text-decoration-none">
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
