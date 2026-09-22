import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editCourse } from "../../../../api/adminApiFunctions/getAllCourseApi/getAllCourses";
import axiosInstance from "../../../../api/axiosInstance"; // For GET course data

//import "./AddCourses.css";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/admin/getcourse/${id}`);
        const course = res.data.data;
        setFormData({
          category: course.category,
          title: course.title,
          description: course.description,
          price: course.price,
          image: null,
        });
        setPreviewImage(course.image);
      } catch (err) {
        setMessage("Failed to fetch course.");
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (formData.image) {
      data.append("image", formData.image);
    }

    const response = await editCourse(id, data);
    if (response?.status === 200) {
      setMessage("Course updated successfully!");
      setTimeout(() => navigate("/admindashboard/allcourses"), 1500);
    } else {
      setMessage("Failed to update course.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
        />

        {previewImage && (
          <img
            src={
              previewImage.startsWith("blob:")
                ? previewImage
                : `${API_BASE_URL}/${previewImage}`
            }
            alt="Preview"
            style={{ width: "200px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button type="submit">Update Course</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default EditCourse;
