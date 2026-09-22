// src/pages/user/UpdateUser/UpdateUser.jsx

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./UpdateUser.css";
import { toast } from "react-toastify";
import { updateUser } from "../../../../api/userApiFunctions/userApis";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthProvider";
import Layout from "../../../../layout/Layout";


const UpdateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const updateData = new FormData();
    updateData.append("name", data.name);
    if (data.image && data.image[0]) {
      updateData.append("image", data.image[0]);
    }

    const parseAuth = JSON.parse(localStorage.getItem("auth"));
    const token = parseAuth?.token;

    const response = await updateUser(updateData, token);

    if (response && response?.status === 200) {
      // const parsedAuth = JSON.parse(localStorage.getItem("auth"));
      console.log('response check',response?.data?.data);
      
      const updatedUser = {
        existUser: response.data.data,
        token,
      };
      setAuth({ ...updatedUser }); // <- Spread here ensures a new reference
      localStorage.setItem("auth", JSON.stringify(updatedUser));
      console.log("Updated Auth:", updatedUser);
      console.log('Local Storage auth',JSON.parse(localStorage.getItem("auth")));
      
      toast.success("Profile updated successfully!");
      setLoading(false);
      navigate("/user-dashboard",{ replace: true });
    }
    else {
      setLoading(false);
      toast.error(response?.data?.message || "Something went wrong.");
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
      <div className="min-vh-100 d-flex align-items-center justify-content-center py-4 px-3 bg" >
        <div className="container-fluid" style={{ maxWidth: "900px" }}>
          <div className="position-relative overflow-hidden rounded-4 shadow">
            <div className="background-image d-flex align-items-center justify-content-center p-4">
              <div
                className="glass-effect rounded-3 shadow p-4 p-md-5 animate-fade-in"
                style={{ maxWidth: "480px" }}
              >
                <h2 className="text-white text-center fw-bold mb-4 fs-1">Update Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Name */}
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
                        placeholder="Your Name"
                        {...register("name", { required: "Name is required" })}
                      />
                    </div>
                    {errors.name && <p className="text-danger small mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Image */}
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label text-white fw-semibold">
                      Upload New Image
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
                    {errors.image && <p className="text-danger small mt-1">{errors.image.message}</p>}
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
                        <span className="spinner-border spinner-border-sm"  style={{ width: "1rem", height: "1rem" }} role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateUser;
